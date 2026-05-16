package com.example.authsystem.controller;

import com.example.authsystem.dto.TrendingResponse;
import com.example.authsystem.service.TrendingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/trending")
@RequiredArgsConstructor
public class TrendingController {

    private final TrendingService trendingService;

    @GetMapping
    public ResponseEntity<TrendingResponse> getTrending() {
        return ResponseEntity.ok(trendingService.getTrending());
    }
}
