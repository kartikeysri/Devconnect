package com.example.authsystem.repository;

import com.example.authsystem.dto.UserSummaryResponse;
import com.example.authsystem.entity.User;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsernameIgnoreCase(String username);

    Optional<User> findByUsernameIgnoreCaseOrEmailIgnoreCase(String username, String email);

    boolean existsByUsernameIgnoreCase(String username);

    boolean existsByEmailIgnoreCase(String email);

    @Query(value = """
            select new com.example.authsystem.dto.UserSummaryResponse(
                u.id,
                u.firstName,
                u.lastName,
                u.username,
                u.profileImageUrl
            )
            from User u
            where lower(u.username) like lower(concat('%', :keyword, '%'))
               or lower(u.firstName) like lower(concat('%', :keyword, '%'))
               or lower(u.lastName) like lower(concat('%', :keyword, '%'))
               or lower(concat(u.firstName, ' ', u.lastName)) like lower(concat('%', :keyword, '%'))
            """,
            countQuery = """
            select count(u)
            from User u
            where lower(u.username) like lower(concat('%', :keyword, '%'))
               or lower(u.firstName) like lower(concat('%', :keyword, '%'))
               or lower(u.lastName) like lower(concat('%', :keyword, '%'))
               or lower(concat(u.firstName, ' ', u.lastName)) like lower(concat('%', :keyword, '%'))
            """)
    Page<UserSummaryResponse> searchUsers(@Param("keyword") String keyword, Pageable pageable);
}
