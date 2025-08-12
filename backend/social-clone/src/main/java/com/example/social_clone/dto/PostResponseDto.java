package com.example.social_clone.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostResponseDto {
    private Long id;
    private String content;
    private LocalDateTime createdAt;
    private Long userId;
    private String username;

    private int likesCount;
    private int commentsCount;
    private List<CommentDto> comments;
    private boolean isLikedByUser;
}
