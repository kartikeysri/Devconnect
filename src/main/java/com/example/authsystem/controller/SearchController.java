package com.example.authsystem.controller;

import com.example.authsystem.dto.PagedResponse;
import com.example.authsystem.dto.PostResponse;
import com.example.authsystem.dto.UserSummaryResponse;
import com.example.authsystem.service.SearchService;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
@Validated
public class SearchController {

    private final SearchService searchService;

    @GetMapping("/users")
    public ResponseEntity<PagedResponse<UserSummaryResponse>> searchUsers(
            @RequestParam @NotBlank(message = "Keyword is required") String keyword,
            @RequestParam(defaultValue = "0") @Min(value = 0, message = "Page must be greater than or equal to 0") int page,
            @RequestParam(defaultValue = "10") @Min(value = 1, message = "Size must be at least 1")
            @Max(value = 50, message = "Size must not exceed 50") int size) {
        return ResponseEntity.ok(searchService.searchUsers(keyword, page, size));
    }

    @GetMapping("/posts")
    public ResponseEntity<PagedResponse<PostResponse>> searchPosts(
            @RequestParam @NotBlank(message = "Keyword is required") String keyword,
            @RequestParam(defaultValue = "0") @Min(value = 0, message = "Page must be greater than or equal to 0") int page,
            @RequestParam(defaultValue = "10") @Min(value = 1, message = "Size must be at least 1")
            @Max(value = 50, message = "Size must not exceed 50") int size) {
        return ResponseEntity.ok(searchService.searchPosts(keyword, page, size));
    }
}
