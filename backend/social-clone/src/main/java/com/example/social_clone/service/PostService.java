package com.example.social_clone.service;

import com.example.social_clone.dto.*;
import com.example.social_clone.feignClient.UserClient;
import com.example.social_clone.model.Comment;
import com.example.social_clone.model.Post;
import com.example.social_clone.repository.CommentRepository;
import com.example.social_clone.repository.LikeRepository;
import com.example.social_clone.repository.PostRepository;
import com.example.social_clone.security.AuthenticatedUserProvider;
import feign.FeignException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserClient userClient;

    @Autowired
    private AuthenticatedUserProvider authUserProvider;

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private CommentRepository commentRepository;

    private String getUsernameFromUserService(Long userId) {
        try {
            UserResponse userResponse = userClient.getUserById(userId);
            if (userResponse != null && userResponse.getData() != null) {
                return userResponse.getData().getUsername();
            }
        } catch (FeignException e) {
            // Log error
        }
        return "Unknown";
    }

    public PostDto createPost(PostDto postDto) {
        AuthenticatedUser user = authUserProvider.getCurrentUser();

        Post post = new Post();
        post.setContent(postDto.getContent());
        post.setCreatedAt(LocalDateTime.now());
        post.setUserId(user.getUserId());

        Post saved = postRepository.save(post);

        return new PostDto(saved.getId(), saved.getContent(), saved.getCreatedAt(), saved.getUserId());
    }

    // Get paginated posts (infinite scroll)
    public List<PostResponseDto> getPaginatedPosts(int page, int size) {
        AuthenticatedUser user = authUserProvider.getCurrentUser();

        Pageable pageable = PageRequest.of(page, size);
        Page<Post> postPage = postRepository.findAllByOrderByCreatedAtDesc(pageable);

        return postPage.getContent().stream().map(post -> {
            String username = getUsernameFromUserService(post.getUserId());
            boolean likedByUser = likeRepository.findByUserIdAndPost(user.getUserId(), post).isPresent();
            int likesCount = likeRepository.countByPost(post);
            int commentsCount = commentRepository.countByPost(post);

            // Only latest 3 comments for initial load
            List<Comment> latestComments = commentRepository
                    .findByPostOrderByCreatedAtDesc(post, PageRequest.of(0, 3))
                    .getContent();

            List<CommentDto> commentDtos = latestComments.stream()
                    .map(c -> CommentDto.builder()
                            .id(c.getId())
                            .content(c.getContent())
                            .createdAt(c.getCreatedAt())
                            .userId(c.getUserId())
                            .username(getUsernameFromUserService(c.getUserId()))
                            .postId(post.getId())
                            .parentCommentId(c.getParentComment() != null ? c.getParentComment().getId() : null)
                            .build()
                    ).collect(Collectors.toList());

            return new PostResponseDto(
                    post.getId(),
                    post.getContent(),
                    post.getCreatedAt(),
                    post.getUserId(),
                    username,
                    likesCount,
                    commentsCount,
                    commentDtos,
                    likedByUser
            );
        }).collect(Collectors.toList());
    }

    // Get paginated comments for a specific post
    public List<CommentDto> getMoreComments(Long postId, int page, int size) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Pageable pageable = PageRequest.of(page, size);
        List<Comment> comments = commentRepository.findByPostOrderByCreatedAtDesc(post, pageable).getContent();

        return comments.stream()
                .map(c -> CommentDto.builder()
                        .id(c.getId())
                        .content(c.getContent())
                        .createdAt(c.getCreatedAt())
                        .userId(c.getUserId())
                        .username(getUsernameFromUserService(c.getUserId()))
                        .postId(postId)
                        .parentCommentId(c.getParentComment() != null ? c.getParentComment().getId() : null)
                        .build()
                )
                .collect(Collectors.toList());
    }
}
