package com.example.social_clone.controller;

import com.example.social_clone.dto.AuthenticatedUser;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/operation")
public class TestController {

    @GetMapping("/test")
    public ResponseEntity<String> test(Authentication authentication) {
        AuthenticatedUser user = (AuthenticatedUser) authentication.getPrincipal();
        return ResponseEntity.ok("Hello from SocialClone! User ID: " + user.getUserId()+"username :" + user.getUsername());
    }
}