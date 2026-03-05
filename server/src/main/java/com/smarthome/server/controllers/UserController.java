package com.smarthome.server.controllers;

import com.smarthome.server.models.User;
import com.smarthome.server.models.UserPreference;
import com.smarthome.server.payload.request.UpdateProfileRequest;
import com.smarthome.server.payload.response.MessageResponse;
import com.smarthome.server.repository.UserPreferenceRepository;
import com.smarthome.server.repository.UserRepository;
import com.smarthome.server.security.services.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserPreferenceRepository userPreferenceRepository;

    private User getLoggedInUser() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return userRepository.findById(userDetails.getId()).orElse(null);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getUserProfile() {
        User user = getLoggedInUser();
        if (user == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("User not found!"));
        }
        // Mask the password before returning
        user.setPassword(null);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateProfile(@Valid @RequestBody UpdateProfileRequest request) {
        User user = getLoggedInUser();
        if (user == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("User not found!"));
        }

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        user.setPrimaryRequirement(request.getPrimaryRequirement());
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("Profile updated successfully!"));
    }

    @GetMapping("/preferences")
    public ResponseEntity<?> getPreferences() {
        User user = getLoggedInUser();
        if (user == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("User not found!"));
        }

        Optional<UserPreference> prefOpt = userPreferenceRepository.findByUserId(user.getId());
        if (prefOpt.isPresent()) {
            return ResponseEntity.ok(prefOpt.get());
        } else {
            // Create default preferences if none exist yet
            UserPreference newPref = new UserPreference(user);
            userPreferenceRepository.save(newPref);
            return ResponseEntity.ok(newPref);
        }
    }

    @PutMapping("/preferences")
    public ResponseEntity<?> updatePreferences(@RequestBody UserPreference preferencesRequest) {
        User user = getLoggedInUser();
        if (user == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("User not found!"));
        }

        UserPreference pref = userPreferenceRepository.findByUserId(user.getId())
                .orElse(new UserPreference(user));

        pref.setEmailNotifications(preferencesRequest.isEmailNotifications());
        pref.setSecurityAlerts(preferencesRequest.isSecurityAlerts());
        pref.setTheme(preferencesRequest.getTheme());

        userPreferenceRepository.save(pref);
        return ResponseEntity.ok(new MessageResponse("Preferences updated successfully!"));
    }
}
