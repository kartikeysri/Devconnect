package com.example.authsystem.repository;

import com.example.authsystem.entity.PostLike;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {

    boolean existsByUserIdAndPostId(Long userId, Long postId);

    @Query("""
            select pl.post.id
            from PostLike pl
            where pl.user.id = :userId
              and pl.post.id in :postIds
            """)
    List<Long> findLikedPostIdsByUserIdAndPostIdIn(@Param("userId") Long userId, @Param("postIds") List<Long> postIds);
}
