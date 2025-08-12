package com.example.social_clone.feignClient;

import com.example.social_clone.config.FeignClientConfig;
import com.example.social_clone.dto.UserDto;
import com.example.social_clone.dto.UserResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "user-auth", url = "http://localhost:8080/api/v1/users", configuration = FeignClientConfig.class)
public interface UserClient {
    @GetMapping("/{userId}")
    UserResponse getUserById(@PathVariable("userId") Long userId);
}

