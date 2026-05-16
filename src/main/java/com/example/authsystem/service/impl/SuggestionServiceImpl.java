package com.example.authsystem.service.impl;

import com.example.authsystem.dto.SuggestionRequest;
import com.example.authsystem.dto.SuggestionResponse;
import com.example.authsystem.repository.UserRepository;
import com.example.authsystem.service.SuggestionService;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SuggestionServiceImpl implements SuggestionService {

    private static final List<String> EMAIL_DOMAINS = List.of("gmail.com", "yahoo.com", "outlook.com");
    private static final int MAX_USERNAME_SUGGESTIONS = 5;

    private final UserRepository userRepository;

    @Override
    public SuggestionResponse generateSuggestions(SuggestionRequest request) {
        String firstName = normalizeNamePart(request.getFirstName());
        String lastName = normalizeNamePart(request.getLastName());

        return SuggestionResponse.builder()
                .usernameSuggestions(generateUsernameSuggestions(firstName, lastName))
                .emailSuggestions(generateEmailSuggestions(firstName, lastName))
                .build();
    }

    private List<String> generateUsernameSuggestions(String firstName, String lastName) {
        Set<String> baseCandidates = new LinkedHashSet<>();
        baseCandidates.add(firstName + lastName);
        baseCandidates.add(firstName + "." + lastName);
        baseCandidates.add(firstName + "_" + lastName);
        baseCandidates.add(firstName + lastName.charAt(0));
        baseCandidates.add(String.valueOf(firstName.charAt(0)) + lastName);
        baseCandidates.add(firstName + lastName + "01");

        List<String> suggestions = new ArrayList<>();
        for (String baseCandidate : baseCandidates) {
            String uniqueCandidate = makeUsernameUnique(baseCandidate);
            if (!suggestions.contains(uniqueCandidate)) {
                suggestions.add(uniqueCandidate);
            }

            if (suggestions.size() == MAX_USERNAME_SUGGESTIONS) {
                break;
            }
        }

        return suggestions;
    }

    private List<String> generateEmailSuggestions(String firstName, String lastName) {
        String baseLocalPart = firstName + "." + lastName;
        List<String> suggestions = new ArrayList<>();

        for (String domain : EMAIL_DOMAINS) {
            suggestions.add(makeEmailUnique(baseLocalPart, domain));
        }

        return suggestions;
    }

    private String makeUsernameUnique(String baseUsername) {
        String candidate = baseUsername;
        int suffix = 1;

        while (userRepository.existsByUsernameIgnoreCase(candidate)) {
            candidate = baseUsername + suffix;
            suffix++;
        }

        return candidate;
    }

    private String makeEmailUnique(String baseLocalPart, String domain) {
        String candidate = baseLocalPart + "@" + domain;
        int suffix = 1;

        while (userRepository.existsByEmailIgnoreCase(candidate)) {
            candidate = baseLocalPart + suffix + "@" + domain;
            suffix++;
        }

        return candidate;
    }

    private String normalizeNamePart(String value) {
        String normalized = value.trim().toLowerCase(Locale.ROOT).replaceAll("[^a-z0-9]", "");
        return normalized.isBlank() ? "user" : normalized;
    }
}
