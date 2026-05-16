package com.example.authsystem.repository;

import com.example.authsystem.dto.PostResponse;
import com.example.authsystem.dto.TrendingPostResponse;
import com.example.authsystem.entity.Post;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostRepository extends JpaRepository<Post, Long> {

    @Override
    @EntityGraph(attributePaths = {"user"})
    Page<Post> findAll(Pageable pageable);

    @Query(value = """
            select new com.example.authsystem.dto.PostResponse(
                p.id,
                u.id,
                u.username,
                u.firstName,
                u.lastName,
                u.profileImageUrl,
                p.content,
                p.type,
                p.createdAt,
                (select count(pl) from PostLike pl where pl.post.id = p.id),
                (select count(c) from Comment c where c.post.id = p.id)
            )
            from Post p
            join p.user u
            where lower(p.content) like lower(concat('%', :keyword, '%'))
            """,
            countQuery = """
            select count(p)
            from Post p
            where lower(p.content) like lower(concat('%', :keyword, '%'))
            """)
    Page<PostResponse> searchPosts(@Param("keyword") String keyword, Pageable pageable);

    @Query("""
            select new com.example.authsystem.dto.TrendingPostResponse(
                p.id,
                u.id,
                u.username,
                u.firstName,
                u.lastName,
                u.profileImageUrl,
                p.content,
                p.type,
                p.createdAt,
                count(pl.id),
                (select count(c) from Comment c where c.post.id = p.id)
            )
            from PostLike pl
            join pl.post p
            join p.user u
            where pl.createdAt >= :since
            group by p.id, u.id, u.username, u.firstName, u.lastName, p.content, p.type, p.createdAt
            order by count(pl.id) desc, p.createdAt desc
            """)
    List<TrendingPostResponse> findTrendingPostsSince(@Param("since") LocalDateTime since, Pageable pageable);

    @Query("""
            select p.content
            from Post p
            where p.createdAt >= :since
              and p.content like '%#%'
            """)
    List<String> findRecentPostContentsWithTags(@Param("since") LocalDateTime since);
}
