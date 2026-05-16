package com.example.authsystem.service;

import com.example.authsystem.dto.ApiResponse;
import com.example.authsystem.dto.CommentResponse;
import com.example.authsystem.dto.CreateCommentRequest;
import com.example.authsystem.dto.CreatePostRequest;
import com.example.authsystem.dto.PagedResponse;
import com.example.authsystem.dto.PostResponse;

public interface PostService {

    PostResponse createPost(CreatePostRequest request);

    PagedResponse<PostResponse> getFeed(int page, int size);

    ApiResponse likePost(Long postId);

    CommentResponse addComment(Long postId, CreateCommentRequest request);
}
