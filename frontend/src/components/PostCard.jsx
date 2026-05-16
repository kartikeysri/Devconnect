import { useState } from 'react';
import { Link } from 'react-router-dom';

import Avatar from './Avatar';

function formatDate(value) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export default function PostCard({
  post,
  onLike,
  onComment,
  busy,
}) {
  const [commentOpen, setCommentOpen] =
    useState(false);

  const likeCount =
    post.likeCount ?? post.recentLikeCount;
  const comments = post.comments ?? [];
  const hasComments = comments.length > 0;
  const likedByCurrentUser =
    Boolean(post.likedByCurrentUser);

  return (
    <article className="group overflow-hidden rounded-[30px] border border-white/20 bg-white/80 p-0 shadow-xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl">

      {/* TOP */}
      <div className="border-b border-white/20 bg-gradient-to-r from-[#DCE8F2] via-white to-[#DCE8F2] px-6 py-5">

        <div className="flex items-start justify-between gap-4">

          {/* USER */}
          <div className="flex items-start gap-4">

            <Avatar
              src={post.profileImageUrl}
              firstName={post.firstName}
              lastName={post.lastName}
              username={post.username}
              className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl ring-1 ring-white/30 transition duration-300 group-hover:scale-105"
              fallbackClassName="bg-gradient-to-br from-[#1A3F75]/10 via-white to-[#44A4CC]/20"
              textClassName="text-lg font-bold text-[#00002A]"
            />

            <div>

              <Link
                to={`/profile/${post.username}`}
                className="text-xl font-bold text-[#00002A] transition hover:text-[#1A3F75]"
              >
                @{post.username}
              </Link>

              <p className="mt-1 text-sm font-medium text-slate-700">
                {post.firstName} {post.lastName}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {formatDate(post.createdAt)}
              </p>

            </div>
          </div>

          {/* TYPE */}
          <p className="inline-flex rounded-full border border-white/20 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-600 shadow-sm backdrop-blur-xl">
            {post.type}
          </p>
        </div>
      </div>

      {/* BODY */}
      <div className="px-6 py-6">

        <p className="whitespace-pre-wrap text-[15px] leading-8 text-slate-700">
          {post.content}
        </p>

        {/* STATS */}
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">

          <span className="rounded-full bg-[#1A3F75]/10 px-3 py-1.5 font-medium text-[#1A3F75]">
            {likeCount} likes
          </span>

          <span className="rounded-full bg-[#44A4CC]/10 px-3 py-1.5 font-medium text-[#1A3F75]">
            {post.commentCount} comments
          </span>

        </div>

        {(onLike || onComment) ? (
          <div className="mt-6 space-y-4">

            {/* ACTIONS */}
            <div className="grid grid-cols-2 gap-3 border-t border-white/20 pt-5">

              {onLike ? (
                <button
                  type="button"
                  onClick={onLike}
                  className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 font-semibold shadow-sm backdrop-blur-xl transition duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${
                    likedByCurrentUser
                      ? 'border-rose-200 bg-rose-50 text-rose-600'
                      : 'border-white/20 bg-white/80 text-slate-700 hover:border-[#1A3F75]/20 hover:bg-[#1A3F75]/5 hover:text-[#1A3F75]'
                  }`}
                  disabled={busy || likedByCurrentUser}
                >
                  <HeartIcon
                    filled={likedByCurrentUser}
                  />

                  <span>
                    {likedByCurrentUser
                      ? 'Liked'
                      : 'Like'}
                  </span>
                </button>
              ) : (
                <div />
              )}

              {onComment ? (
                <button
                  type="button"
                  onClick={() =>
                    setCommentOpen(
                      (current) => !current,
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/80 px-4 py-3 font-semibold text-slate-700 shadow-sm backdrop-blur-xl transition duration-200 hover:border-[#44A4CC]/20 hover:bg-[#44A4CC]/5 hover:text-[#1A3F75]"
                >
                  <CommentIcon />

                  <span>
                    {commentOpen
                      ? 'Hide comments'
                      : 'Comment'}
                  </span>
                </button>
              ) : null}
            </div>

            {/* COMMENT FORM */}
            {onComment && commentOpen ? (
              <CommentForm
                onSubmit={onComment}
                busy={busy}
              />
            ) : null}

            {/* COMMENTS */}
            {commentOpen || hasComments ? (
              <div className="mt-5 space-y-3 border-t border-white/20 pt-5">

                {hasComments ? (
                  comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="rounded-2xl bg-[#F4F8FC]/80 px-4 py-4 backdrop-blur-xl transition duration-200 hover:bg-white"
                    >

                      <div className="flex items-start justify-between gap-3">

                        <div className="flex items-center gap-3">

                          <Avatar
                            firstName={comment.firstName}
                            lastName={comment.lastName}
                            username={comment.username}
                            className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl"
                            fallbackClassName="bg-gradient-to-br from-[#1A3F75] to-[#44A4CC]"
                            textClassName="text-sm font-bold text-white"
                          />

                          <div>

                            <p className="font-semibold text-[#00002A]">
                              {comment.firstName} {comment.lastName}
                            </p>

                            <p className="text-xs text-slate-500">
                              @{comment.username}
                            </p>

                          </div>
                        </div>

                        {comment.createdAt ? (
                          <p className="text-xs text-slate-400">
                            {formatDate(
                              comment.createdAt,
                            )}
                          </p>
                        ) : null}
                      </div>

                      <p className="mt-3 text-[15px] leading-7 text-slate-700">
                        {comment.content}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-[#1A3F75]/15 bg-[#F4F8FC]/70 px-4 py-4 text-sm text-slate-500">
                    No comments yet. Start the conversation.
                  </div>
                )}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}

function CommentForm({
  onSubmit,
  busy,
}) {
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(
      event.currentTarget,
    );

    const content = formData
      .get('content')
      ?.toString()
      .trim();

    if (!content) {
      return;
    }

    await onSubmit(content);

    event.currentTarget.reset();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-fade-up flex flex-col gap-3 sm:flex-row"
    >

      <input
        name="content"
        placeholder="Write a thoughtful comment..."
        className="field flex-1 border-white/20 bg-[#F4F8FC]/80 backdrop-blur-xl"
        maxLength={2000}
      />

      <button
        type="submit"
        className="rounded-2xl bg-[#1A3F75] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#00002A] sm:min-w-32"
        disabled={busy}
      >
        Comment
      </button>
    </form>
  );
}

function HeartIcon({ filled = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        d="M12 20.25c-4.95-3.1-8.25-5.95-8.25-10.03A4.72 4.72 0 0 1 8.5 5.5c1.48 0 2.9.68 3.82 1.85A5 5 0 0 1 16.14 5.5a4.72 4.72 0 0 1 4.74 4.72c0 4.08-3.3 6.93-8.25 10.03h-.63Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        d="M7 17.25 3.75 20V6.75A2.25 2.25 0 0 1 6 4.5h12a2.25 2.25 0 0 1 2.25 2.25v7.5A2.25 2.25 0 0 1 18 16.5H7Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
