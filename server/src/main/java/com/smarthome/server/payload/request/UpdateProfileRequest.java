package com.smarthome.server.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProfileRequest {
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;

    // We optionally allow updating these fields
    private String phone;
    private String address;
    private String primaryRequirement;
}
