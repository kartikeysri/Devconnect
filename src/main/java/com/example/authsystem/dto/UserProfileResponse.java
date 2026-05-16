package com.example.authsystem.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class UserProfileResponse {

    private final Long id;
    private final String firstName;
    private final String lastName;
    private final String email;
    private final String username;
    private final String mobile;
    private final String profileImageUrl;
    private final long followersCount;
    private final long followingCount;
    private final boolean followedByCurrentUser;
    private final List<UserSummaryResponse> followers;
    private final List<UserSummaryResponse> following;
}
