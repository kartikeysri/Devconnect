package com.example.authsystem.service.impl;

import com.example.authsystem.dto.ApiResponse;
import com.example.authsystem.dto.FollowRequest;
import com.example.authsystem.dto.UpdateProfileRequest;
import com.example.authsystem.dto.UserProfileResponse;
import com.example.authsystem.dto.UserSummaryResponse;
import com.example.authsystem.entity.Follow;
import com.example.authsystem.entity.User;
import com.example.authsystem.exception.ResourceAlreadyExistsException;
import com.example.authsystem.exception.ResourceNotFoundException;
import com.example.authsystem.repository.FollowRepository;
import com.example.authsystem.repository.UserRepository;
import com.example.authsystem.service.UserProfileService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserProfileServiceImpl implements UserProfileService {

    private final UserRepository userRepository;
    private final FollowRepository followRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional(readOnly = true)
    public UserProfileResponse getProfile(String username) {
        User profileUser = findUserByUsername(username);
        User currentUser = getCurrentUser();

        List<UserSummaryResponse> followers = followRepository.findFollowersByUsername(profileUser.getUsername());
        List<UserSummaryResponse> following = followRepository.findFollowingByUsername(profileUser.getUsername());

        return UserProfileResponse.builder()
                .id(profileUser.getId())
                .firstName(profileUser.getFirstName())
                .lastName(profileUser.getLastName())
                .email(profileUser.getEmail())
                .username(profileUser.getUsername())
                .mobile(profileUser.getMobile())
                .profileImageUrl(profileUser.getProfileImageUrl())
                .followersCount(followRepository.countByFollowingId(profileUser.getId()))
                .followingCount(followRepository.countByFollowerId(profileUser.getId()))
                .followedByCurrentUser(followRepository.existsByFollowerIdAndFollowingId(currentUser.getId(), profileUser.getId()))
                .followers(followers)
                .following(following)
                .build();
    }

    @Override
    @Transactional
    public UserProfileResponse updateProfile(UpdateProfileRequest request) {
        User currentUser = getCurrentUser();

        if (request.getMobile() != null) {
            currentUser.setMobile(request.getMobile().trim());
        }

        if (request.getNewPassword() != null && !request.getNewPassword().isBlank()) {
            currentUser.setPassword(passwordEncoder.encode(request.getNewPassword().trim()));
        }

        currentUser.setProfileImageUrl(normalizeProfileImageUrl(request.getProfileImageUrl()));

        userRepository.save(currentUser);
        return getProfile(currentUser.getUsername());
    }

    @Override
    @Transactional
    public ApiResponse followUser(FollowRequest request) {
        User currentUser = getCurrentUser();
        User targetUser = findUserByUsername(request.getUsername().trim());

        validateFollowOperation(currentUser, targetUser);

        if (followRepository.existsByFollowerIdAndFollowingId(currentUser.getId(), targetUser.getId())) {
            throw new ResourceAlreadyExistsException("You are already following this user");
        }

        Follow follow = Follow.builder()
                .follower(currentUser)
                .following(targetUser)
                .build();
        followRepository.save(follow);

        return ApiResponse.builder()
                .message("User followed successfully")
                .build();
    }

    @Override
    @Transactional
    public ApiResponse unfollowUser(FollowRequest request) {
        User currentUser = getCurrentUser();
        User targetUser = findUserByUsername(request.getUsername().trim());

        if (currentUser.getId().equals(targetUser.getId())) {
            throw new IllegalArgumentException("You cannot unfollow yourself");
        }

        long deletedRows = followRepository.deleteByFollowerIdAndFollowingId(currentUser.getId(), targetUser.getId());
        if (deletedRows == 0) {
            throw new ResourceNotFoundException("Follow relationship not found");
        }

        return ApiResponse.builder()
                .message("User unfollowed successfully")
                .build();
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return findUserByUsername(username);
    }

    private User findUserByUsername(String username) {
        return userRepository.findByUsernameIgnoreCase(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));
    }

    private void validateFollowOperation(User currentUser, User targetUser) {
        if (currentUser.getId().equals(targetUser.getId())) {
            throw new IllegalArgumentException("You cannot follow yourself");
        }
    }

    private String normalizeProfileImageUrl(String profileImageUrl) {
        if (profileImageUrl == null || profileImageUrl.isBlank()) {
            return null;
        }

        return profileImageUrl.trim();
    }
}
