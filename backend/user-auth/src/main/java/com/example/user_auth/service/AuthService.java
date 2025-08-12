package com.example.user_auth.service;


import com.example.user_auth.dto.AuthRequestDto;
import com.example.user_auth.dto.AuthResponseDto;
import com.example.user_auth.dto.RegisterRequestDto;

public interface AuthService {
    String registerUser(RegisterRequestDto registerRequestDto);
    AuthResponseDto authenticateUser(AuthRequestDto loginRequestDto);
    AuthResponseDto refreshAccessToken(String token);
}
