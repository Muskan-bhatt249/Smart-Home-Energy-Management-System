package com.smarthome.server.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "energy_usage")
@Getter
@Setter
public class EnergyUsage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double kwhConsumed; // The amount of energy consumed

    @Column(nullable = false)
    private LocalDateTime timestamp;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "device_id")
    private Device device;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public EnergyUsage() {
    }

    public EnergyUsage(Double kwhConsumed, Device device, User user) {
        this.kwhConsumed = kwhConsumed;
        this.device = device;
        this.user = user;
        this.timestamp = LocalDateTime.now();
    }
}
