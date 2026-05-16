package com.example.authsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class TrendingTagResponse {

    private final String tag;
    private final long usageCount;
}
