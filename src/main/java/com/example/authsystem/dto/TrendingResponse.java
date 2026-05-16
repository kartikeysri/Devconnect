package com.example.authsystem.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class TrendingResponse {

    private final List<TrendingPostResponse> topPosts;
    private final List<TrendingTagResponse> topTags;
}
