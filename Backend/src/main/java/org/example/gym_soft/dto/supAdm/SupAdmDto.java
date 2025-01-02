package org.example.gym_soft.dto.supAdm;

import jakarta.validation.constraints.NotBlank;

public record SupAdmDto(
        @NotBlank
        String fullName,
        @NotBlank
        String password,
        @NotBlank
        String username

) {
}
