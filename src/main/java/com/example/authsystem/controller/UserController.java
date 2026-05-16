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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserProfileService userProfileService;

    // IMPORTANT: When you deploy to Render, change "http://localhost:8080" 
    // to your actual Render backend URL
    private final String BACKEND_URL = "http://localhost:8080";

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

    // --- NEW IMAGE UPLOAD ENDPOINT ---
    @PostMapping("/upload-profile-image")
    public ResponseEntity<ApiResponse> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            // 1. Create the uploads folder if it doesn't exist
            String uploadDir = "uploads/";
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // 2. Generate a unique filename
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir + fileName);

            // 3. Save the file to the local folder
            Files.copy(file.getInputStream(), filePath);

            // 4. Generate the URL that Vercel will use to display the image
            String publicImageUrl = BACKEND_URL + "/uploads/" + fileName;

            // 5. Return the URL to the frontend so it can be used in the updateProfile request
            return ResponseEntity.ok(new ApiResponse(true, publicImageUrl));

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new ApiResponse(false, "Could not upload image"));
        }
    }
}
