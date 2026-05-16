package com.example.authsystem.repository;

import com.example.authsystem.dto.CommentResponse;
import com.example.authsystem.entity.Comment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("""
            select new com.example.authsystem.dto.CommentResponse(
                c.id,
                c.post.id,
                u.id,
                u.username,
                u.firstName,
                u.lastName,
                c.content,
                c.createdAt
            )
            from Comment c
            join c.user u
            where c.post.id in :postIds
            order by c.createdAt asc
            """)
    List<CommentResponse> findCommentsByPostIds(@Param("postIds") List<Long> postIds);
}