package org.example.gym_soft.dto.admin;

import jakarta.validation.constraints.NotBlank;

public record RateDto(
        @NotBlank
        String adminName,
        @NotBlank
        Integer day,
        @NotBlank
        Integer everyDay,
        @NotBlank
        String name,
        @NotBlank
        Integer price
) {
}
