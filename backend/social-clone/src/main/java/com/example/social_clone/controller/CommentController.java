package com.example.social_clone.controller;

import com.example.social_clone.dto.ApiResponse;
import com.example.social_clone.dto.CommentDto;
import com.example.social_clone.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/comments") // plural, consistent REST naming
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping
    public ResponseEntity<ApiResponse<CommentDto>> createComment(@RequestBody CommentDto commentDto) {
        CommentDto savedComment = commentService.createComment(commentDto);

        ApiResponse<CommentDto> response =
                new ApiResponse<>(true, "Comment created successfully", savedComment);

        return ResponseEntity.ok(response);
    }
}

