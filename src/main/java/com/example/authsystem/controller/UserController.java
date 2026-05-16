package com.example.authsystem.controller;

import com.example.authsystem.dto.ApiResponse;
import com.example.authsystem.dto.FollowRequest;
import com.example.authsystem.dto.UpdateProfileRequest;
import com.example.authsystem.dto.UserProfileResponse;
import com.example.authsystem.service.UserProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserProfileService userProfileService;

    @GetMapping("/{username}")
    public ResponseEntity<UserProfileResponse> getProfile(@PathVariable String username) {
        return ResponseEntity.ok(userProfileService.getProfile(username));
    }

    @PostMapping("/follow")
    public ResponseEntity<ApiResponse> followUser(@Valid @RequestBody FollowRequest request) {
        return ResponseEntity.ok(userProfileService.followUser(request));
    }

    @PostMapping("/unfollow")
    public ResponseEntity<ApiResponse> unfollowUser(@Valid @RequestBody FollowRequest request) {
        return ResponseEntity.ok(userProfileService.unfollowUser(request));
    }

    @PutMapping("/profile")
    public ResponseEntity<UserProfileResponse> updateProfile(@Valid @RequestBody UpdateProfileRequest request) {
        return ResponseEntity.ok(userProfileService.updateProfile(request));
    }
}
