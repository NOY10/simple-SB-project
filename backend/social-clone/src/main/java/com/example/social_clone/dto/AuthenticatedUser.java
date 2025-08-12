package com.example.social_clone.dto;


public class AuthenticatedUser {
    private final Long userId;
    private final String username;

    public AuthenticatedUser(Long userId, String username) {
        this.userId = userId;
        this.username = username;
    }

    public Long getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }
}