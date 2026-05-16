package com.example.authsystem.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class CommentResponse {

    private final Long id;
    private final Long postId;
    private final Long userId;
    private final String username;
    private final String firstName;
    private final String lastName;
    private final String content;
    private final LocalDateTime createdAt;
}