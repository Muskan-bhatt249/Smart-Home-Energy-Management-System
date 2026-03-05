package com.smarthome.server.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "security_logs")
@Getter
@Setter
public class SecurityLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String eventType; // e.g., "LOGIN_SUCCESS", "DEVICE_ALERT"
    private String details;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public SecurityLog() {
    }

    public SecurityLog(String eventType, String details, User user) {
        this.eventType = eventType;
        this.details = details;
        this.user = user;
        this.timestamp = LocalDateTime.now();
    }
}
