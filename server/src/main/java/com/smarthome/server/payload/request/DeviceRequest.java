package com.smarthome.server.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeviceRequest {
    @NotBlank
    private String name;

    @NotBlank
    private String type;

    @NotBlank
    private String room;

    @NotBlank
    private String status;

    private String powerRating;
    private String iconName;
}
