import Avatar from './Avatar';

export default function TrendingPanel({
  data,
}) {
  return (
    <section className="rounded-[30px] border border-white/20 bg-white/80 p-5 shadow-xl backdrop-blur-xl">

      {/* HEADER */}
      <div className="mb-5">

        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1A3F75]">
          LIVE RADAR
        </p>

        <h2 className="mt-2 text-2xl font-bold text-[#00002A]">
          Trending now
        </h2>

      </div>

      <div className="space-y-6">

        {/* TAGS */}
        <div>

          <h3 className="mb-3 font-semibold text-slate-800">
            Top technologies
          </h3>

          <div className="flex flex-wrap gap-2">

            {data.topTags?.length ? (
              data.topTags.map((tag) => (
                <span
                  key={tag.tag}
                  className="rounded-full bg-[#F4F8FC]/80 px-4 py-2 text-sm font-medium text-[#1A3F75] backdrop-blur-xl"
                >
                  #{tag.tag} {tag.usageCount} uses
                </span>
              ))
            ) : (
              <p className="text-sm text-slate-500">
                No trending tags yet.
              </p>
            )}

          </div>
        </div>

        {/* POSTS */}
        <div>

          <h3 className="mb-3 font-semibold text-slate-800">
            Hot discussions
          </h3>

          <div className="space-y-3">

            {data.topPosts?.length ? (
              data.topPosts.map(
                (post, index) => (
                  <div
                    key={post.id}
                    className="rounded-2xl bg-[#F4F8FC]/80 px-4 py-4 backdrop-blur-xl transition hover:-translate-y-0.5"
                  >

                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#44A4CC]">
                      #{index + 1} Trending
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                      <Avatar
                        src={post.profileImageUrl}
                        firstName={post.firstName}
                        lastName={post.lastName}
                        username={post.username}
                        className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl"
                        fallbackClassName="bg-gradient-to-br from-[#1A3F75]/10 via-white to-[#44A4CC]/20"
                        textClassName="text-sm font-bold text-[#00002A]"
                      />

                      <div>
                        <p className="font-semibold text-[#00002A]">
                          @{post.username}
                        </p>

                        <p className="text-xs text-slate-500">
                          {post.firstName}{' '}
                          {post.lastName}
                        </p>
                      </div>
                    </div>

                    <p className="mt-2 line-clamp-3 text-sm leading-7 text-slate-600">
                      {post.content}
                    </p>

                    <p className="mt-3 text-xs text-slate-500">
                      {post.recentLikeCount}{' '}
                      recent likes
                    </p>

                  </div>
                ),
              )
            ) : (
              <p className="text-sm text-slate-500">
                No trending posts yet.
              </p>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
