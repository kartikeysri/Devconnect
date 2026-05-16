package com.example.authsystem.service;

import com.example.authsystem.dto.SuggestionRequest;
import com.example.authsystem.dto.SuggestionResponse;

public interface SuggestionService {

    SuggestionResponse generateSuggestions(SuggestionRequest request);
}
