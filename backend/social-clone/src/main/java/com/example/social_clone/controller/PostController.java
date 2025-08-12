package com.example.social_clone.controller;

import com.example.social_clone.dto.ApiResponse;
import com.example.social_clone.dto.CommentDto;
import com.example.social_clone.dto.PostDto;
import com.example.social_clone.dto.PostResponseDto;
import com.example.social_clone.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/post/")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping("create")
    public ResponseEntity<ApiResponse<PostDto>> createPost(@RequestBody PostDto postDto) {
        PostDto rel = postService.createPost(postDto);
        ApiResponse<PostDto> response = new ApiResponse<>(true, "Post Created", rel);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 🔹 Infinite scroll posts
    @GetMapping("posts")
    public ResponseEntity<ApiResponse<List<PostResponseDto>>> getPaginatedPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        List<PostResponseDto> rel = postService.getPaginatedPosts(page, size);
        ApiResponse<List<PostResponseDto>> response = new ApiResponse<>(true, "Posts Loaded", rel);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 🔹 View more comments for a specific post
    @GetMapping("posts/{postId}/comments")
    public ResponseEntity<ApiResponse<List<CommentDto>>> getMoreComments(
            @PathVariable Long postId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        List<CommentDto> rel = postService.getMoreComments(postId, page, size);
        ApiResponse<List<CommentDto>> response = new ApiResponse<>(true, "Comments Loaded", rel);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
