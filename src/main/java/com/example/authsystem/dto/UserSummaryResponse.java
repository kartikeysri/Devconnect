package com.example.authsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class UserSummaryResponse {

    private final Long id;
    private final String firstName;
    private final String lastName;
    private final String username;
    private final String profileImageUrl;
}
