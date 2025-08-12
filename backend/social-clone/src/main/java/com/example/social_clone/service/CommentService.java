package com.example.social_clone.service;


import com.example.social_clone.dto.AuthenticatedUser;
import com.example.social_clone.dto.CommentDto;
import com.example.social_clone.dto.PostDto;
import com.example.social_clone.model.Comment;
import com.example.social_clone.model.Post;
import com.example.social_clone.repository.CommentRepository;
import com.example.social_clone.repository.PostRepository;
import com.example.social_clone.security.AuthenticatedUserProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    private AuthenticatedUserProvider authUserProvider;


    public CommentDto createComment(CommentDto comment) {

        AuthenticatedUser user = authUserProvider.getCurrentUser();

        Post post = postRepository.findById(comment.getPostId())
                .orElseThrow(()->new RuntimeException("Post not found"));

        Comment parentComment = null;
        if (comment.getParentCommentId() != null) {
            parentComment = commentRepository.findById(comment.getParentCommentId())
                    .orElseThrow(() -> new RuntimeException("Parent comment not found"));
        }

        Comment comm = new Comment();
        comm.setContent(comment.getContent());
        comm.setCreatedAt(LocalDateTime.now());
        comm.setUserId(user.getUserId());
        comm.setPost(post);
        comm.setParentComment(parentComment);

        commentRepository.save(comm);

        return CommentDto.builder()
                .id(comm.getId())
                .content(comm.getContent())
                .createdAt(comm.getCreatedAt())
                .postId(comm.getPost().getId())
                .userId(comm.getUserId())
                .parentCommentId(comm.getParentComment() != null ? comm.getParentComment().getId() : null)
                .build();
    }
}
