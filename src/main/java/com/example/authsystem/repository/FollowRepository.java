package com.example.authsystem.repository;

import com.example.authsystem.dto.UserSummaryResponse;
import com.example.authsystem.entity.Follow;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    boolean existsByFollowerIdAndFollowingId(Long followerId, Long followingId);

    long countByFollowingId(Long followingId);

    long countByFollowerId(Long followerId);

    @Modifying
    long deleteByFollowerIdAndFollowingId(Long followerId, Long followingId);

    @Query("""
            select new com.example.authsystem.dto.UserSummaryResponse(
                f.follower.id,
                f.follower.firstName,
                f.follower.lastName,
                f.follower.username,
                f.follower.profileImageUrl
            )
            from Follow f
            where lower(f.following.username) = lower(:username)
            order by f.follower.username asc
            """)
    List<UserSummaryResponse> findFollowersByUsername(@Param("username") String username);

    @Query("""
            select new com.example.authsystem.dto.UserSummaryResponse(
                f.following.id,
                f.following.firstName,
                f.following.lastName,
                f.following.username,
                f.following.profileImageUrl
            )
            from Follow f
            where lower(f.follower.username) = lower(:username)
            order by f.following.username asc
            """)
    List<UserSummaryResponse> findFollowingByUsername(@Param("username") String username);
}
