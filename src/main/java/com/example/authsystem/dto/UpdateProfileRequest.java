package com.example.authsystem.dto;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProfileRequest {

    @Pattern(regexp = "^[0-9]{10,15}$", message = "Mobile must contain 10 to 15 digits")
    private String mobile;

    @Size(min = 8, max = 100, message = "New password must be between 8 and 100 characters")
    private String newPassword;

    @Pattern(regexp = "^(https?://.*)?$", message = "Profile image URL must start with http:// or https://")
    @Size(max = 500, message = "Profile image URL must not exceed 500 characters")
    private String profileImageUrl;
}
