package com.example.social_clone.repository;

import com.example.social_clone.model.Like;
import com.example.social_clone.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByUserIdAndPost(Long userId, Post post);
    void deleteByUserIdAndPost(Long userId, Post post);
    int countByPost(Post post);
}
