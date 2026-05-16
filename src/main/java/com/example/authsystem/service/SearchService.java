package com.example.authsystem.service;

import com.example.authsystem.dto.PagedResponse;
import com.example.authsystem.dto.PostResponse;
import com.example.authsystem.dto.UserSummaryResponse;

public interface SearchService {

    PagedResponse<UserSummaryResponse> searchUsers(String keyword, int page, int size);

    PagedResponse<PostResponse> searchPosts(String keyword, int page, int size);
}
