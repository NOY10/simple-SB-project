package com.example.user_auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class TokenBlacklistService {

    private static final String TOKEN_BLACKLIST_PREFIX = "blacklisted:";
    private static final Duration EXPIRY = Duration.ofHours(2); // or JWT expiry duration

    @Autowired
    private StringRedisTemplate redisTemplate;

    public void blacklistToken(String token) {
        redisTemplate.opsForValue().set(TOKEN_BLACKLIST_PREFIX + token, "true", EXPIRY);
    }

    public boolean isTokenBlacklisted(String token) {
        return Boolean.TRUE.equals(
                redisTemplate.hasKey(TOKEN_BLACKLIST_PREFIX + token)
        );
    }
}
