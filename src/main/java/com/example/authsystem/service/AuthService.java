package com.example.authsystem.service;

import com.example.authsystem.dto.AuthResponse;
import com.example.authsystem.dto.LoginRequest;
import com.example.authsystem.dto.RegisterRequest;
import com.example.authsystem.dto.SuggestionRequest;
import com.example.authsystem.dto.SuggestionResponse;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    SuggestionResponse getSuggestions(SuggestionRequest request);
}
