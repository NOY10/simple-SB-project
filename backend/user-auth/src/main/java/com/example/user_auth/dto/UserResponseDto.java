package com.example.user_auth.dto;

import java.util.Set;

public record UserResponseDto(
        Long id,
        String firstName,
        String lastName,
        String username,
        String email,
        Set<String> roles
) {}