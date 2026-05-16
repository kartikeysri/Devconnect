import { useEffect, useMemo, useRef, useState } from 'react';

import AppShell from '../components/AppShell';
import Avatar from '../components/Avatar';
import LoadingState from '../components/LoadingState';
import PostCard from '../components/PostCard';
import SearchPanel from '../components/SearchPanel';
import TrendingPanel from '../components/TrendingPanel';

import { useAuth } from '../hooks/useAuth';

import { getApiErrorMessage } from '../services/errorService';
import { postService } from '../services/postService';
import { searchService } from '../services/searchService';
import { trendingService } from '../services/trendingService';

const PAGE_SIZE = 8;

const initialComposer = {
  content: '',
  type: 'TEXT',
};

export default function HomeFeedPage() {
  const { user } = useAuth();

  const [posts, setPosts] = useState([]);

  const [composer, setComposer] =
    useState(initialComposer);

  const [initialLoading, setInitialLoading] =
    useState(true);

  const [loadingMore, setLoadingMore] =
    useState(false);

  const [busyPostId, setBusyPostId] =
    useState(null);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] = useState('');

  const [trending, setTrending] = useState({
    topPosts: [],
    topTags: [],
  });

  const [searchQuery, setSearchQuery] =
    useState('');

  const [searchLoading, setSearchLoading] =
    useState(false);

  const [searchResults, setSearchResults] =
    useState({
      users: [],
      posts: [],
    });

  const [currentPage, setCurrentPage] =
    useState(0);

  const [hasMore, setHasMore] =
    useState(true);

  const observerRef = useRef(null);

  const sentinelRef = useRef(null);

  const loadingRef = useRef(false);

  const subtitle = useMemo(
    () =>
      'Explore developer discussions, technical blogs, projects, and trending technologies.',
    [],
  );

  useEffect(() => {
    document.title = 'Home Feed | DevConnect';

    void Promise.all([
      loadFeed(0, true),
      loadTrending(),
    ]);
  }, []);

  useEffect(() => {
    if (
      !sentinelRef.current ||
      !hasMore ||
      initialLoading
    ) {
      return undefined;
    }

    observerRef.current?.disconnect();

    observerRef.current =
      new IntersectionObserver(
        (entries) => {
          const [entry] = entries;

          if (
            entry?.isIntersecting &&
            !loadingRef.current &&
            hasMore
          ) {
            void loadFeed(
              currentPage + 1,
              false,
            );
          }
        },
        {
          rootMargin: '260px 0px',
          threshold: 0.1,
        },
      );

    observerRef.current.observe(
      sentinelRef.current,
    );

    return () =>
      observerRef.current?.disconnect();
  }, [
    currentPage,
    hasMore,
    initialLoading,
  ]);

  async function loadFeed(
    page = 0,
    reset = false,
  ) {
    if (loadingRef.current) {
      return;
    }

    loadingRef.current = true;

    if (reset) {
      setInitialLoading(true);

      setError('');
    } else {
      setLoadingMore(true);
    }

    try {
      const { data } =
        await postService.getFeed(
          page,
          PAGE_SIZE,
        );

      setPosts((current) => {
        if (reset) {
          return data.content;
        }

        const seenIds = new Set(
          current.map((post) => post.id),
        );

        const incoming = data.content.filter(
          (post) => !seenIds.has(post.id),
        );

        return [...current, ...incoming];
      });

      setCurrentPage(data.page);

      setHasMore(!data.last);
    } catch (apiError) {
      setError(
        getApiErrorMessage(
          apiError,
          'Unable to load the feed.',
        ),
      );
    } finally {
      loadingRef.current = false;

      setInitialLoading(false);

      setLoadingMore(false);
    }
  }

  async function loadTrending() {
    try {
      const { data } =
        await trendingService.getTrending();

      setTrending(data);
    } catch {
      setTrending({
        topPosts: [],
        topTags: [],
      });
    }
  }

  async function handleCreatePost(event) {
    event.preventDefault();

    setSubmitting(true);

    setError('');

    try {
      await postService.createPost(
        composer,
      );

      setComposer(initialComposer);

      await Promise.all([
        loadFeed(0, true),
        loadTrending(),
      ]);
    } catch (apiError) {
      setError(
        getApiErrorMessage(
          apiError,
          'Unable to create the post.',
        ),
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLike(postId) {
    const targetPost = posts.find(
      (post) => post.id === postId,
    );

    if (targetPost?.likedByCurrentUser) {
      return;
    }

    setBusyPostId(postId);

    try {
      await postService.likePost(postId);

      setPosts((current) =>
        current.map((post) =>
          post.id === postId
            ? {
                ...post,
                likeCount:
                  (post.likeCount ?? 0) + 1,
                likedByCurrentUser: true,
              }
            : post,
        ),
      );

      await loadTrending();
    } catch (apiError) {
      setError(
        getApiErrorMessage(
          apiError,
          'Unable to like the post.',
        ),
      );
    } finally {
      setBusyPostId(null);
    }
  }

  async function handleComment(
    postId,
    content,
  ) {
    setBusyPostId(postId);

    try {
      const { data: createdComment } =
        await postService.addComment(
        postId,
        { content },
      );

      setPosts((current) =>
        current.map((post) =>
          post.id === postId
            ? {
                ...post,
                commentCount:
                  post.commentCount + 1,
                comments: [
                  ...(post.comments ?? []),
                  createdComment,
                ],
              }
            : post,
        ),
      );
    } catch (apiError) {
      setError(
        getApiErrorMessage(
          apiError,
          'Unable to add the comment.',
        ),
      );
    } finally {
      setBusyPostId(null);
    }
  }

  async function handleSearch(event) {
    event.preventDefault();

    const keyword =
      searchQuery.trim();

    if (!keyword) {
      setSearchResults({
        users: [],
        posts: [],
      });

      return;
    }

    setSearchLoading(true);

    try {
      const [
        usersResponse,
        postsResponse,
      ] = await Promise.all([
        searchService.searchUsers(
          keyword,
        ),
        searchService.searchPosts(
          keyword,
        ),
      ]);

      setSearchResults({
        users:
          usersResponse.data.content,
        posts:
          postsResponse.data.content,
      });
    } catch {
      setSearchResults({
        users: [],
        posts: [],
      });
    } finally {
      setSearchLoading(false);
    }
  }

  return (
    <AppShell
      title="Home Feed"
      subtitle={subtitle}
      sidebar={
        <>
          <TrendingPanel
            data={trending}
          />

          <SearchPanel
            query={searchQuery}
            setQuery={setSearchQuery}
            onSearch={handleSearch}
            loading={searchLoading}
            results={searchResults}
          />
        </>
      }
    >

      {/* CREATE POST */}
      <section className="overflow-hidden rounded-[32px] border border-white/20 bg-white/80 shadow-xl backdrop-blur-xl">

        {/* HEADER */}
        <div className="border-b border-white/20 bg-gradient-to-r from-[#DCE8F2] via-white to-[#DCE8F2] px-6 py-5">

          <div className="flex items-center justify-between gap-4">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1A3F75]">
                START A CONVERSATION
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#00002A]">
                Create a post
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                Share ideas, coding insights,
                development updates, or technical blogs.
              </p>

            </div>

            <div className="hidden items-center gap-4 rounded-3xl bg-gradient-to-br from-[#00002A] via-[#1A3F75] to-[#44A4CC] px-4 py-4 text-white shadow-xl sm:flex">
              <Avatar
                src={user?.profileImageUrl}
                firstName={user?.firstName}
                lastName={user?.lastName}
                username={user?.username}
                className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl ring-1 ring-white/20"
                fallbackClassName="bg-white/10"
                textClassName="text-base font-bold text-white"
              />

              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-200">
                  Posting as
                </p>

                <p className="mt-2 text-lg font-semibold">
                  @{user?.username}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleCreatePost}
          className="space-y-5 px-6 py-6"
        >

          <div className="flex gap-4">

            {/* AVATAR */}
            <Avatar
              src={user?.profileImageUrl}
              firstName={user?.firstName}
              lastName={user?.lastName}
              username={user?.username}
              className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl ring-1 ring-white/30"
              fallbackClassName="bg-gradient-to-br from-[#1A3F75]/10 via-white to-[#44A4CC]/20"
              textClassName="text-lg font-bold text-[#00002A]"
            />

            {/* TEXTAREA */}
            <div className="flex-1">

              <textarea
                className="field min-h-32 resize-none border-white/20 bg-[#F4F8FC]/80 text-[15px] leading-7 backdrop-blur-xl transition duration-200 focus:bg-white"
                placeholder="Share an idea, technical insight, coding experience or project update..."
                value={composer.content}
                onChange={(event) =>
                  setComposer(
                    (current) => ({
                      ...current,
                      content:
                        event.target.value,
                    }),
                  )
                }
                maxLength={10000}
              />

            </div>
          </div>

          {/* FOOTER */}
          <div className="flex flex-col gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex flex-wrap items-center gap-3">

              <select
                className="field min-w-40 sm:max-w-xs"
                value={composer.type}
                onChange={(event) =>
                  setComposer(
                    (current) => ({
                      ...current,
                      type:
                        event.target.value,
                    }),
                  )
                }
              >

                <option value="TEXT">
                  TEXT
                </option>

                <option value="BLOG">
                  BLOG
                </option>

                <option value="CODE">
                  CODE
                </option>

              </select>

              <span className="rounded-full bg-[#DCE8F2] px-3 py-2 text-sm text-slate-600">

                {composer.content.length}
                /10000 characters

              </span>

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="min-w-40 rounded-2xl bg-[#1A3F75] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#00002A]"
              disabled={submitting}
            >

              {submitting
                ? 'Publishing...'
                : 'Publish Post'}

            </button>
          </div>
        </form>
      </section>

      {/* ERROR */}
      {error ? (
        <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </p>
      ) : null}

      {/* FEED */}
      {initialLoading ? (
        <LoadingState label="Loading your feed" />
      ) : (
        <div className="space-y-5">

          {/* FEED HEADER */}
          <section className="rounded-[28px] border border-white/20 bg-white/70 px-5 py-4 shadow-lg backdrop-blur-xl">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#44A4CC]">
                  CURATED FEED
                </p>

                <h3 className="mt-1 text-2xl font-bold text-[#00002A]">
                  Fresh posts from developers
                </h3>

              </div>

              <p className="text-sm text-slate-600">
                New posts load automatically.
              </p>

            </div>
          </section>

          {/* POSTS */}
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={() =>
                handleLike(post.id)
              }
              onComment={(content) =>
                handleComment(
                  post.id,
                  content,
                )
              }
              busy={
                busyPostId === post.id
              }
            />
          ))}

          {/* LOADER */}
          <div
            ref={sentinelRef}
            className="flex min-h-16 items-center justify-center"
          >

            {loadingMore ? (
              <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">

                <span className="h-3 w-3 animate-spin rounded-full border-2 border-slate-300 border-t-[#1A3F75]" />

                Loading more posts...

              </div>
            ) : null}

            {!hasMore &&
            posts.length ? (
              <p className="rounded-full border border-white/20 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
                You are all caught up for now.
              </p>
            ) : null}

          </div>
        </div>
      )}
    </AppShell>
  );
}
