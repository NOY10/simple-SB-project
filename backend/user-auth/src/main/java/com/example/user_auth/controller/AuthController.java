package com.example.user_auth.controller;

import com.example.user_auth.dto.AuthRequestDto;
import com.example.user_auth.dto.AuthResponseDto;
import com.example.user_auth.dto.RegisterRequestDto;
import com.example.user_auth.dto.ResponseDto;
import com.example.user_auth.service.AuthService;
import com.example.user_auth.service.TokenBlacklistService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    AuthService authService;
    @Autowired
    private TokenBlacklistService tokenBlacklistService;

    @PostMapping("register")
    public ResponseEntity<ResponseDto<String>> register(@RequestBody RegisterRequestDto registerRequestDto) {
        String message = authService.registerUser(registerRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ResponseDto<>(201, "User registered successfully", message));
    }

    @PostMapping("login")
    public ResponseEntity<ResponseDto<AuthResponseDto>> login(@RequestBody AuthRequestDto request) {
        AuthResponseDto tokens = authService.authenticateUser(request);
        return ResponseEntity.ok(new ResponseDto<>(200, "Login successful", tokens));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<ResponseDto<AuthResponseDto>> refreshToken(@RequestParam("token")  String refreshToken) {
        AuthResponseDto newTokens = authService.refreshAccessToken(refreshToken);
        return ResponseEntity.ok(new ResponseDto<>(200, "Refresh successful", newTokens));
    }
    @PostMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");

        Map<String, Object> response = new HashMap<>();

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            tokenBlacklistService.blacklistToken(token);

            response.put("statusCode", 200);
            response.put("message", "Logged out successfully.");
            response.put("data", null);

            return ResponseEntity.ok(response);
        } else {
            response.put("statusCode", 400);
            response.put("message", "No valid Bearer token found in request.");
            response.put("data", null);

            return ResponseEntity.badRequest().body(response);
        }
    }
}
