package com.smarthome.server.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user_preferences")
@Getter
@Setter
public class UserPreference {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean emailNotifications = true;
    private boolean securityAlerts = true;

    // Optional themes, automation toggles, etc.
    private String theme = "dark";

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public UserPreference() {
    }

    public UserPreference(User user) {
        this.user = user;
    }
}
