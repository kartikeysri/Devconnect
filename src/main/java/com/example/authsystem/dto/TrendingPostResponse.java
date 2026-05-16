package com.example.authsystem.dto;

import com.example.authsystem.entity.PostType;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class TrendingPostResponse {

    private final Long id;
    private final Long userId;
    private final String username;
    private final String firstName;
    private final String lastName;
    private final String profileImageUrl;
    private final String content;
    private final PostType type;
    private final LocalDateTime createdAt;
    private final long recentLikeCount;
    private final long commentCount;
}
