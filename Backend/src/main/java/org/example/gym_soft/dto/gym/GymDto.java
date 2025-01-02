package org.example.gym_soft.dto.gym;

import jakarta.validation.constraints.NotBlank;

public record GymDto(
        @NotBlank
        String name,
        @NotBlank
        String location

) {
}
