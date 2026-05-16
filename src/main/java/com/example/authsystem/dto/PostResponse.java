package com.example.authsystem.dto;

import com.example.authsystem.entity.PostType;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
public class PostResponse {

    private final Long id;
    private final Long userId;
    private final String username;
    private final String firstName;
    private final String lastName;
    private final String profileImageUrl;
    private final String content;
    private final PostType type;
    private final LocalDateTime createdAt;
    private final long likeCount;
    private final long commentCount;
    private final boolean likedByCurrentUser;
    private final List<CommentResponse> comments;

    public PostResponse(Long id,
                        Long userId,
                        String username,
                        String firstName,
                        String lastName,
                        String profileImageUrl,
                        String content,
                        PostType type,
                        LocalDateTime createdAt,
                        long likeCount,
                        long commentCount) {
        this(id, userId, username, firstName, lastName, profileImageUrl, content, type, createdAt, likeCount, commentCount, false, List.of());
    }

    @Builder
    public PostResponse(Long id,
                        Long userId,
                        String username,
                        String firstName,
                        String lastName,
                        String profileImageUrl,
                        String content,
                        PostType type,
                        LocalDateTime createdAt,
                        long likeCount,
                        long commentCount,
                        boolean likedByCurrentUser,
                        List<CommentResponse> comments) {
        this.id = id;
        this.userId = userId;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.profileImageUrl = profileImageUrl;
        this.content = content;
        this.type = type;
        this.createdAt = createdAt;
        this.likeCount = likeCount;
        this.commentCount = commentCount;
        this.likedByCurrentUser = likedByCurrentUser;
        this.comments = comments == null ? List.of() : comments;
    }
}
