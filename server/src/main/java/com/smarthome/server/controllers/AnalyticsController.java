package com.smarthome.server.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @GetMapping("/efficiency")
    public ResponseEntity<?> getEfficiencyMetrics() {
        // In a real application, this would calculate efficiency 
        // by summing device energy usage and operational output.
        // Formula: Efficiency = (Useful Output / Total Input) * 100
        
        double usefulOutput = 85.0;
        double totalInput = 100.0;
        double efficiencyPercentage = (usefulOutput / totalInput) * 100.0;

        Map<String, Object> metrics = new HashMap<>();
        metrics.put("usefulOutput", usefulOutput);
        metrics.put("totalInput", totalInput);
        metrics.put("efficiencyPercentage", efficiencyPercentage);
        metrics.put("trend", 2.4);
        metrics.put("totalConsumptionKwh", 342);
        metrics.put("monthlyCost", 4250);

        return ResponseEntity.ok(metrics);
    }
}
