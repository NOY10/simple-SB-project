package com.example.social_clone.repository;

import com.example.social_clone.model.Comment;
import com.example.social_clone.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    Page<Comment> findByPostOrderByCreatedAtDesc(Post post, Pageable pageable);

    int countByPost(Post post);
}
