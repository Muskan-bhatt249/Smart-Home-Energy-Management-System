package com.smarthome.server.controllers;

import com.smarthome.server.models.SecurityLog;
import com.smarthome.server.models.User;
import com.smarthome.server.payload.response.MessageResponse;
import com.smarthome.server.repository.SecurityLogRepository;
import com.smarthome.server.repository.UserRepository;
import com.smarthome.server.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Map;
import java.util.HashMap;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/security")
public class SecurityController {

    @Autowired
    SecurityLogRepository securityLogRepository;

    @Autowired
    UserRepository userRepository;

    private User getLoggedInUser() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return userRepository.findById(userDetails.getId()).orElse(null);
    }

    @GetMapping("/logs")
    public ResponseEntity<?> getSecurityLogs() {
        User user = getLoggedInUser();
        if (user == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("User not found!"));
        }

        List<SecurityLog> logs = securityLogRepository.findByUserIdOrderByTimestampDesc(user.getId());

        // Format the response for the frontend
        List<Map<String, String>> responseLogs = logs.stream().map(log -> {
            Map<String, String> map = new HashMap<>();
            map.put("id", String.valueOf(log.getId()));
            map.put("eventType", log.getEventType());
            map.put("details", log.getDetails());
            map.put("timestamp", log.getTimestamp().format(DateTimeFormatter.ofPattern("MMM dd, yyyy HH:mm:ss")));
            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(responseLogs);
    }

    // Test endpoint to add a quick mock log since we aren't automatically
    // triggering them yet
    @PostMapping("/mock-log")
    public ResponseEntity<?> addMockLog(@RequestBody Map<String, String> request) {
        User user = getLoggedInUser();
        if (user != null) {
            SecurityLog log = new SecurityLog(request.get("eventType"), request.get("details"), user);
            securityLogRepository.save(log);
            return ResponseEntity.ok(new MessageResponse("Mock log added."));
        }
        return ResponseEntity.badRequest().build();
    }
}
