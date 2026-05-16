package com.example.authsystem.service.impl;

import com.example.authsystem.dto.AuthResponse;
import com.example.authsystem.dto.LoginRequest;
import com.example.authsystem.dto.RegisterRequest;
import com.example.authsystem.dto.SuggestionRequest;
import com.example.authsystem.dto.SuggestionResponse;
import com.example.authsystem.dto.UserResponse;
import com.example.authsystem.entity.User;
import com.example.authsystem.exception.ResourceAlreadyExistsException;
import com.example.authsystem.repository.UserRepository;
import com.example.authsystem.security.JwtService;
import com.example.authsystem.service.AuthService;
import com.example.authsystem.service.SuggestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final SuggestionService suggestionService;

    @Override
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        String normalizedUsername = request.getUsername().trim();
        String normalizedEmail = request.getEmail().trim().toLowerCase();

        if (userRepository.existsByUsernameIgnoreCase(normalizedUsername)) {
            throw new ResourceAlreadyExistsException("Username is already taken");
        }

        if (userRepository.existsByEmailIgnoreCase(normalizedEmail)) {
            throw new ResourceAlreadyExistsException("Email is already registered");
        }

        User user = User.builder()
                .firstName(request.getFirstName().trim())
                .lastName(request.getLastName().trim())
                .email(normalizedEmail)
                .username(normalizedUsername)
                .password(passwordEncoder.encode(request.getPassword()))
                .mobile(request.getMobile().trim())
                .profileImageUrl(normalizeProfileImageUrl(request.getProfileImageUrl()))
                .build();

        User savedUser = userRepository.save(user);
        String token = jwtService.generateToken(savedUser.getUsername());

        return AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .user(mapToUserResponse(savedUser))
                .build();
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        String normalizedIdentifier = request.getUsername().trim();

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(normalizedIdentifier, request.getPassword())
            );
        } catch (org.springframework.security.core.AuthenticationException ex) {
            throw new BadCredentialsException("Invalid username/email or password");
        }

        User user = userRepository.findByUsernameIgnoreCaseOrEmailIgnoreCase(normalizedIdentifier, normalizedIdentifier)
                .orElseThrow(() -> new BadCredentialsException("Invalid username/email or password"));

        String token = jwtService.generateToken(user.getUsername());

        return AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .user(mapToUserResponse(user))
                .build();
    }

    @Override
    public SuggestionResponse getSuggestions(SuggestionRequest request) {
        return suggestionService.generateSuggestions(request);
    }

    private UserResponse mapToUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .username(user.getUsername())
                .mobile(user.getMobile())
                .profileImageUrl(user.getProfileImageUrl())
                .build();
    }

    private String normalizeProfileImageUrl(String profileImageUrl) {
        if (profileImageUrl == null || profileImageUrl.isBlank()) {
            return null;
        }

        return profileImageUrl.trim();
    }
}
