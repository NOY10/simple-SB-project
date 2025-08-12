package com.example.social_clone.controller;

import com.example.social_clone.dto.ApiResponse;
import com.example.social_clone.dto.LikeDto;
import com.example.social_clone.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/likes")
@RequiredArgsConstructor
public class LikeController {

    private final LikeService likeService;

    @PostMapping
    public ResponseEntity<ApiResponse<String>> like(@RequestBody LikeDto dto) {
        String message = likeService.likePost(dto);
        ApiResponse <String> response = new ApiResponse<>(true, "Like Post", message);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<ApiResponse<String>> unlike(@PathVariable Long postId) {
        String message = likeService.unlikePost(postId);
        ApiResponse<String> response = new ApiResponse<>(true, "Unlike Post", message);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
