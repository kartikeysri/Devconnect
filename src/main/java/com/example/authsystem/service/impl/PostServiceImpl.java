package com.example.authsystem.service.impl;

import com.example.authsystem.dto.ApiResponse;
import com.example.authsystem.dto.CommentResponse;
import com.example.authsystem.dto.CreateCommentRequest;
import com.example.authsystem.dto.CreatePostRequest;
import com.example.authsystem.dto.PagedResponse;
import com.example.authsystem.dto.PostResponse;
import com.example.authsystem.entity.Comment;
import com.example.authsystem.entity.Post;
import com.example.authsystem.entity.PostLike;
import com.example.authsystem.entity.User;
import com.example.authsystem.exception.ResourceAlreadyExistsException;
import com.example.authsystem.exception.ResourceNotFoundException;
import com.example.authsystem.repository.CommentRepository;
import com.example.authsystem.repository.PostLikeRepository;
import com.example.authsystem.repository.PostRepository;
import com.example.authsystem.repository.UserRepository;
import com.example.authsystem.service.PostService;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private static final int MAX_PAGE_SIZE = 50;

    private final PostRepository postRepository;
    private final PostLikeRepository postLikeRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public PostResponse createPost(CreatePostRequest request) {
        User currentUser = getCurrentUser();

        Post post = Post.builder()
                .user(currentUser)
                .content(request.getContent().trim())
                .type(request.getType())
                .build();

        Post savedPost = postRepository.save(post);
        return mapToPostResponse(savedPost, List.of(), Set.of());
    }

    @Override
    @Transactional(readOnly = true)
    public PagedResponse<PostResponse> getFeed(int page, int size) {
        int sanitizedPage = Math.max(page, 0);
        int sanitizedSize = Math.min(Math.max(size, 1), MAX_PAGE_SIZE);
        Pageable pageable = PageRequest.of(sanitizedPage, sanitizedSize, Sort.by(Sort.Direction.DESC, "createdAt"));
        User currentUser = getCurrentUser();

        Page<Post> posts = postRepository.findAll(pageable);
        Map<Long, List<CommentResponse>> commentsByPostId = getCommentsByPostId(posts.getContent());
        Set<Long> likedPostIds = getLikedPostIds(posts.getContent(), currentUser.getId());

        List<PostResponse> postResponses = posts.getContent().stream()
                .map(post -> mapToPostResponse(
                        post,
                        commentsByPostId.getOrDefault(post.getId(), List.of()),
                        likedPostIds
                ))
                .toList();

        return PagedResponse.<PostResponse>builder()
                .content(postResponses)
                .page(posts.getNumber())
                .size(posts.getSize())
                .totalElements(posts.getTotalElements())
                .totalPages(posts.getTotalPages())
                .last(posts.isLast())
                .build();
    }

    @Override
    @Transactional
    public ApiResponse likePost(Long postId) {
        User currentUser = getCurrentUser();
        Post post = getPostById(postId);

        if (postLikeRepository.existsByUserIdAndPostId(currentUser.getId(), postId)) {
            throw new ResourceAlreadyExistsException("You have already liked this post");
        }

        PostLike postLike = PostLike.builder()
                .user(currentUser)
                .post(post)
                .build();
        postLikeRepository.save(postLike);

        return ApiResponse.builder()
                .message("Post liked successfully")
                .build();
    }

    @Override
    @Transactional
    public CommentResponse addComment(Long postId, CreateCommentRequest request) {
        User currentUser = getCurrentUser();
        Post post = getPostById(postId);

        Comment comment = Comment.builder()
                .user(currentUser)
                .post(post)
                .content(request.getContent().trim())
                .build();

        Comment savedComment = commentRepository.save(comment);
        return mapToCommentResponse(savedComment);
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        return userRepository.findByUsernameIgnoreCase(username)
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found"));
    }

    private Post getPostById(Long postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));
    }

    private Map<Long, List<CommentResponse>> getCommentsByPostId(List<Post> posts) {
        if (posts.isEmpty()) {
            return Map.of();
        }

        List<Long> postIds = posts.stream()
                .map(Post::getId)
                .toList();

        return commentRepository.findCommentsByPostIds(postIds).stream()
                .collect(Collectors.groupingBy(CommentResponse::getPostId));
    }

    private Set<Long> getLikedPostIds(List<Post> posts, Long currentUserId) {
        if (posts.isEmpty()) {
            return Set.of();
        }

        List<Long> postIds = posts.stream()
                .map(Post::getId)
                .toList();

        return new HashSet<>(postLikeRepository.findLikedPostIdsByUserIdAndPostIdIn(currentUserId, postIds));
    }

    private PostResponse mapToPostResponse(Post post, List<CommentResponse> comments, Set<Long> likedPostIds) {
        return PostResponse.builder()
                .id(post.getId())
                .userId(post.getUser().getId())
                .username(post.getUser().getUsername())
                .firstName(post.getUser().getFirstName())
                .lastName(post.getUser().getLastName())
                .profileImageUrl(post.getUser().getProfileImageUrl())
                .content(post.getContent())
                .type(post.getType())
                .createdAt(post.getCreatedAt())
                .likeCount(post.getLikes().size())
                .commentCount(comments.size())
                .likedByCurrentUser(likedPostIds.contains(post.getId()))
                .comments(comments)
                .build();
    }

    private CommentResponse mapToCommentResponse(Comment comment) {
        return CommentResponse.builder()
                .id(comment.getId())
                .postId(comment.getPost().getId())
                .userId(comment.getUser().getId())
                .username(comment.getUser().getUsername())
                .firstName(comment.getUser().getFirstName())
                .lastName(comment.getUser().getLastName())
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt())
                .build();
    }
}
