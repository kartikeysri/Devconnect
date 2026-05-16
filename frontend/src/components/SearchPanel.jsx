import { Link } from 'react-router-dom';
import Avatar from './Avatar';

export default function SearchPanel({
  results,
  query,
  setQuery,
  onSearch,
  loading,
}) {
  return (
    <section className="rounded-[30px] border border-white/20 bg-white/80 p-5 shadow-xl backdrop-blur-xl">

      {/* HEADER */}
      <div className="mb-5">

        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1A3F75]">
          DISCOVER
        </p>

        <h2 className="mt-2 text-2xl font-bold text-[#00002A]">
          Quick search
        </h2>

      </div>

      {/* SEARCH */}
      <form
        onSubmit={onSearch}
        className="space-y-3"
      >

        <input
          value={query}
          onChange={(event) =>
            setQuery(event.target.value)
          }
          className="field border-white/20 bg-[#F4F8FC]/80 backdrop-blur-xl"
          placeholder="Search developers or posts..."
        />

        <button
          type="submit"
          className="w-full rounded-2xl bg-[#1A3F75] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#00002A]"
          disabled={loading}
        >

          {loading
            ? 'Searching...'
            : 'Search'}

        </button>
      </form>

      {/* RESULTS */}
      <div className="mt-6 space-y-5">

        {/* USERS */}
        <div>

          <h3 className="mb-3 font-semibold text-slate-800">
            Developers
          </h3>

          <div className="space-y-3">

            {results.users.length ? (
              results.users.map((user) => (
                <Link
                  key={user.id}
                  to={`/profile/${user.username}`}
                  className="flex items-center gap-3 rounded-2xl bg-[#F4F8FC]/80 px-4 py-4 backdrop-blur-xl transition hover:-translate-y-0.5"
                >
                  <Avatar
                    src={user.profileImageUrl}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    username={user.username}
                    className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl"
                    fallbackClassName="bg-gradient-to-br from-[#1A3F75]/10 via-white to-[#44A4CC]/20"
                    textClassName="text-sm font-bold text-[#00002A]"
                  />

                  <div>
                    <p className="font-semibold text-[#00002A]">
                      {user.firstName}{' '}
                      {user.lastName}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      @{user.username}
                    </p>
                  </div>

                </Link>
              ))
            ) : (
              <p className="text-sm text-slate-500">
                No users found.
              </p>
            )}

          </div>
        </div>

        {/* POSTS */}
        <div>

          <h3 className="mb-3 font-semibold text-slate-800">
            Posts
          </h3>

          <div className="space-y-3">

            {results.posts.length ? (
              results.posts.map((post) => (
                <div
                  key={post.id}
                  className="rounded-2xl bg-[#F4F8FC]/80 px-4 py-4 backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={post.profileImageUrl}
                      firstName={post.firstName}
                      lastName={post.lastName}
                      username={post.username}
                      className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl"
                      fallbackClassName="bg-gradient-to-br from-[#1A3F75]/10 via-white to-[#44A4CC]/20"
                      textClassName="text-sm font-bold text-[#00002A]"
                    />

                    <p className="text-sm font-semibold text-[#00002A]">
                      @{post.username}
                    </p>
                  </div>

                  <p className="mt-2 line-clamp-3 text-sm leading-7 text-slate-600">
                    {post.content}
                  </p>

                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">
                No posts found.
              </p>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
