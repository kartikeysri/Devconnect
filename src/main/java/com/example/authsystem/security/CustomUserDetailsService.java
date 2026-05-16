package com.example.authsystem.security;

import com.example.authsystem.entity.User;
import com.example.authsystem.repository.UserRepository;
import java.util.Collections;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        String normalizedIdentifier = username.trim();
        User user = userRepository.findByUsernameIgnoreCaseOrEmailIgnoreCase(normalizedIdentifier, normalizedIdentifier)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with identifier: " + username));

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                Collections.emptyList()
        );
    }
}
