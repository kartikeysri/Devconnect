package com.example.authsystem.service.impl;

import com.example.authsystem.dto.TrendingPostResponse;
import com.example.authsystem.dto.TrendingResponse;
import com.example.authsystem.dto.TrendingTagResponse;
import com.example.authsystem.repository.PostRepository;
import com.example.authsystem.service.TrendingService;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TrendingServiceImpl implements TrendingService {

    private static final int TRENDING_LIMIT = 10;
    private static final Pattern HASHTAG_PATTERN = Pattern.compile("(?<!\\w)#([A-Za-z0-9_]+)");

    private final PostRepository postRepository;

    @Override
    @Transactional(readOnly = true)
    public TrendingResponse getTrending() {
        LocalDateTime since = LocalDateTime.now().minusHours(24);

        List<TrendingPostResponse> topPosts = postRepository.findTrendingPostsSince(since, PageRequest.of(0, TRENDING_LIMIT));
        List<TrendingTagResponse> topTags = extractTopTags(postRepository.findRecentPostContentsWithTags(since));

        return TrendingResponse.builder()
                .topPosts(topPosts)
                .topTags(topTags)
                .build();
    }

    private List<TrendingTagResponse> extractTopTags(List<String> contents) {
        Map<String, Long> tagCounts = contents.stream()
                .flatMap(content -> extractTags(content).stream())
                .collect(java.util.stream.Collectors.groupingBy(tag -> tag, java.util.stream.Collectors.counting()));

        return tagCounts.entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue(Comparator.reverseOrder())
                        .thenComparing(Map.Entry.comparingByKey()))
                .limit(TRENDING_LIMIT)
                .map(entry -> TrendingTagResponse.builder()
                        .tag(entry.getKey())
                        .usageCount(entry.getValue())
                        .build())
                .toList();
    }

    private List<String> extractTags(String content) {
        Matcher matcher = HASHTAG_PATTERN.matcher(content);
        java.util.ArrayList<String> tags = new java.util.ArrayList<>();

        while (matcher.find()) {
            tags.add(matcher.group(1).toLowerCase(Locale.ROOT));
        }

        return tags;
    }
}
