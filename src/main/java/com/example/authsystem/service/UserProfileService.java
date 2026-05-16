package com.example.authsystem.service;

import com.example.authsystem.dto.ApiResponse;
import com.example.authsystem.dto.FollowRequest;
import com.example.authsystem.dto.UpdateProfileRequest;
import com.example.authsystem.dto.UserProfileResponse;

public interface UserProfileService {

    UserProfileResponse getProfile(String username);

    ApiResponse followUser(FollowRequest request);

    ApiResponse unfollowUser(FollowRequest request);

    UserProfileResponse updateProfile(UpdateProfileRequest request);
}
