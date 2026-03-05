package com.smarthome.server.controllers;

import com.smarthome.server.models.Device;
import com.smarthome.server.models.User;
import com.smarthome.server.payload.request.DeviceRequest;
import com.smarthome.server.payload.response.MessageResponse;
import com.smarthome.server.repository.DeviceRepository;
import com.smarthome.server.repository.UserRepository;
import com.smarthome.server.security.services.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/devices")
public class DeviceController {

    @Autowired
    DeviceRepository deviceRepository;

    @Autowired
    UserRepository userRepository;

    private User getLoggedInUser() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return userRepository.findById(userDetails.getId()).orElse(null);
    }

    @GetMapping
    public ResponseEntity<?> getAllDevices() {
        User user = getLoggedInUser();
        if (user == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("User not found!"));
        }

        List<Device> devices = deviceRepository.findByUserId(user.getId());
        return ResponseEntity.ok(devices);
    }

    @PostMapping
    public ResponseEntity<?> addDevice(@Valid @RequestBody DeviceRequest request) {
        User user = getLoggedInUser();
        if (user == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("User not found!"));
        }

        Device device = new Device(
                request.getName(),
                request.getType(),
                request.getRoom(),
                request.getStatus(),
                request.getPowerRating(), // Passed directly as requested string representation "45 W"
                request.getIconName(),
                user);

        deviceRepository.save(device);
        return ResponseEntity.ok(device);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateDevice(@PathVariable Long id, @Valid @RequestBody DeviceRequest request) {
        User user = getLoggedInUser();
        if (user == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("User not found!"));
        }

        Optional<Device> deviceOpt = deviceRepository.findByIdAndUserId(id, user.getId());
        if (!deviceOpt.isPresent()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Device not found or not owned by user."));
        }

        Device device = deviceOpt.get();
        device.setName(request.getName());
        device.setType(request.getType());
        device.setRoom(request.getRoom());
        device.setStatus(request.getStatus());
        device.setPower(request.getPowerRating());
        device.setIconName(request.getIconName());

        deviceRepository.save(device);
        return ResponseEntity.ok(device);
    }

    @PutMapping("/{id}/toggle")
    public ResponseEntity<?> toggleDeviceStatus(@PathVariable Long id, @RequestBody DeviceRequest request) {
        // Quick endpoint specifically for toggling status
        User user = getLoggedInUser();
        if (user == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("User not found!"));
        }

        Optional<Device> deviceOpt = deviceRepository.findByIdAndUserId(id, user.getId());
        if (!deviceOpt.isPresent()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Device not found or not owned by user."));
        }

        Device device = deviceOpt.get();
        device.setStatus(request.getStatus()); // 'On', 'Off', 'Standby'

        deviceRepository.save(device);
        return ResponseEntity.ok(device);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDevice(@PathVariable Long id) {
        User user = getLoggedInUser();
        if (user == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("User not found!"));
        }

        Optional<Device> deviceOpt = deviceRepository.findByIdAndUserId(id, user.getId());
        if (!deviceOpt.isPresent()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Device not found or not owned by user."));
        }

        deviceRepository.delete(deviceOpt.get());
        return ResponseEntity.ok(new MessageResponse("Device removed successfully!"));
    }
}
