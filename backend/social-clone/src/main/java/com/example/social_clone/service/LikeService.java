package com.example.social_clone.service;

import com.example.social_clone.dto.AuthenticatedUser;
import com.example.social_clone.dto.LikeDto;
import com.example.social_clone.dto.UserDto;
import com.example.social_clone.feignClient.UserClient;
import com.example.social_clone.model.Like;
import com.example.social_clone.model.Post;
import com.example.social_clone.repository.LikeRepository;
import com.example.social_clone.repository.PostRepository;
import com.example.social_clone.security.AuthenticatedUserProvider;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    private final PostRepository postRepository;
    private final AuthenticatedUserProvider authUserProvider;



    @Transactional
    public String likePost(LikeDto dto) {

        AuthenticatedUser user = authUserProvider.getCurrentUser();

        // Get User from user-auth service

        Post post = postRepository.findById(dto.getPostId())
                .orElseThrow(() -> new RuntimeException("Post not found"));

        // Check if like already exists
        if (likeRepository.findByUserIdAndPost(user.getUserId(), post).isPresent()) {
            return "Already liked!";
        }

        Like like = Like.builder()
                .userId(user.getUserId())
                .post(post)
                .likedAt(LocalDateTime.now())
                .build();

        likeRepository.save(like);
        return "Post liked successfully.";
    }

    @Transactional
    public String unlikePost(Long postId) {
        AuthenticatedUser user = authUserProvider.getCurrentUser();

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        likeRepository.deleteByUserIdAndPost(user.getUserId(), post);
        return "Post unliked.";
    }

}
