package org.example.gym_soft.dto.gym;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record GymAdminDto(
        @NotBlank
        String GymId,
        @NotBlank
        String fullName,
        @NotBlank
        String password,
        @NotBlank
        String username

) {
}
