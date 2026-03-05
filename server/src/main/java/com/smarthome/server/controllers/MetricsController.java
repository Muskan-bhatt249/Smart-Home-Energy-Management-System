package com.smarthome.server.controllers;

import com.smarthome.server.models.Device;
import com.smarthome.server.models.User;
import com.smarthome.server.payload.response.MessageResponse;
import com.smarthome.server.repository.DeviceRepository;
import com.smarthome.server.repository.UserRepository;
import com.smarthome.server.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/metrics")
public class MetricsController {

    @Autowired
    DeviceRepository deviceRepository;

    @Autowired
    UserRepository userRepository;

    private User getLoggedInUser() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return userRepository.findById(userDetails.getId()).orElse(null);
    }

    @GetMapping("/overview")
    public ResponseEntity<?> getDashboardOverview() {
        User user = getLoggedInUser();
        if (user == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("User not found!"));
        }

        List<Device> devices = deviceRepository.findByUserId(user.getId());

        // Calculate dynamic metrics based on devices
        int activeDevices = 0;
        double totalPowerW = 0.0;

        for (Device d : devices) {
            if ("On".equalsIgnoreCase(d.getStatus())) {
                activeDevices++;
                // Rudimentary parsing of power rating string (e.g. "45 W" or "1.2 kW")
                try {
                    String p = d.getPower().toLowerCase();
                    if (p.contains("kw")) {
                        totalPowerW += Double.parseDouble(p.replace("kw", "").trim()) * 1000;
                    } else if (p.contains("w")) {
                        totalPowerW += Double.parseDouble(p.replace("w", "").trim());
                    }
                } catch (Exception e) {
                    // ignore parsing errors
                }
            }
        }

        // Mocking some of the logic for demonstration:
        // Assume the totalPowerW is being drawn over a 24h period for estimated total
        // kWh usage
        double estimatedKwh = (totalPowerW * 24) / 1000.0;
        double costPerKwh = 8.5; // Indian Rupees per kWh average
        double estCost = estimatedKwh * costPerKwh * 30; // 30 days projection

        Map<String, Object> response = new HashMap<>();
        response.put("totalUsageKwh", String.format("%.1f", estimatedKwh > 0 ? estimatedKwh : 135.2)); // Fallback if no
                                                                                                       // devices ON
        response.put("estimatedCost", String.format("₹%.0f", estCost > 0 ? estCost : 2450.0));
        response.put("averageTemp", "26"); // Mock environment sensor data
        response.put("efficiencyScore", "89"); // Mock calculation
        response.put("activeDevices", activeDevices);
        response.put("totalDevices", devices.size());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/energy")
    public ResponseEntity<?> getEnergyGraphData() {
        // In a real app, query EnergyUsageRepository for the last 24 hours.
        // For now, return the mock data format expected by Recharts in the frontend.
        var data = List.of(
                Map.of("time", "00:00", "kwh", 1.2),
                Map.of("time", "04:00", "kwh", 0.8),
                Map.of("time", "08:00", "kwh", 3.5),
                Map.of("time", "12:00", "kwh", 2.1),
                Map.of("time", "16:00", "kwh", 4.8),
                Map.of("time", "20:00", "kwh", 5.2),
                Map.of("time", "23:59", "kwh", 1.5));
        return ResponseEntity.ok(data);
    }
}
