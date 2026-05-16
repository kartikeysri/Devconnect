package com.example.authsystem.service.impl;

import com.example.authsystem.dto.PagedResponse;
import com.example.authsystem.dto.PostResponse;
import com.example.authsystem.dto.UserSummaryResponse;
import com.example.authsystem.repository.PostRepository;
import com.example.authsystem.repository.UserRepository;
import com.example.authsystem.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {

    private static final int MAX_PAGE_SIZE = 50;

    private final UserRepository userRepository;
    private final PostRepository postRepository;

    @Override
    @Transactional(readOnly = true)
    public PagedResponse<UserSummaryResponse> searchUsers(String keyword, int page, int size) {
        Pageable pageable = buildPageable(page, size, Sort.by(Sort.Direction.ASC, "username"));
        Page<UserSummaryResponse> users = userRepository.searchUsers(normalizeKeyword(keyword), pageable);
        return buildPagedResponse(users);
    }

    @Override
    @Transactional(readOnly = true)
    public PagedResponse<PostResponse> searchPosts(String keyword, int page, int size) {
        Pageable pageable = buildPageable(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<PostResponse> posts = postRepository.searchPosts(normalizeKeyword(keyword), pageable);
        return buildPagedResponse(posts);
    }

    private Pageable buildPageable(int page, int size, Sort sort) {
        int sanitizedPage = Math.max(page, 0);
        int sanitizedSize = Math.min(Math.max(size, 1), MAX_PAGE_SIZE);
        return PageRequest.of(sanitizedPage, sanitizedSize, sort);
    }

    private String normalizeKeyword(String keyword) {
        return keyword == null ? "" : keyword.trim();
    }

    private <T> PagedResponse<T> buildPagedResponse(Page<T> page) {
        return PagedResponse.<T>builder()
                .content(page.getContent())
                .page(page.getNumber())
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .last(page.isLast())
                .build();
    }
}
