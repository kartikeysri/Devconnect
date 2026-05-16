import { Link } from 'react-router-dom';
import Avatar from './Avatar';

export default function ProfileSummary({
  profile,
  currentUsername,
  onToggleFollow,
  onEditProfile,
  busy,
  editing,
}) {
  const isOwnProfile =
    profile.username === currentUsername;

  return (
    <section className="overflow-hidden rounded-[32px] border border-white/20 bg-white/80 shadow-xl backdrop-blur-xl">

      {/* BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#00002A] via-[#1A3F75] to-[#44A4CC] px-6 py-10 text-white">

        {/* GLOW */}
        <div className="absolute left-[-80px] top-[-80px] h-64 w-64 rounded-full bg-[#44A4CC]/20 blur-3xl" />

        <div className="absolute bottom-[-100px] right-[-100px] h-72 w-72 rounded-full bg-[#44E6A9]/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          {/* PROFILE */}
          <div className="flex items-center gap-5">

            {/* AVATAR */}
            <Avatar
              src={profile.profileImageUrl}
              firstName={profile.firstName}
              lastName={profile.lastName}
              username={profile.username}
              className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-[28px] shadow-xl ring-1 ring-white/20"
              fallbackClassName="bg-white/15 backdrop-blur-xl"
              textClassName="text-3xl font-bold text-white"
            />

            {/* INFO */}
            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#44E6A9]">
                Developer Profile
              </p>

              <h2 className="mt-3 text-4xl font-bold tracking-tight">
                {profile.firstName}{' '}
                {profile.lastName}
              </h2>

              <p className="mt-2 text-lg text-slate-200">
                @{profile.username}
              </p>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-200">
                Passionate developer sharing
                technical insights, projects,
                and learning experiences with
                the DevConnect community.
              </p>

              {/* TAGS */}
              <div className="mt-5 flex flex-wrap gap-2">

                {[
                  'React',
                  'Spring Boot',
                  'Java',
                  'Docker',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-xl"
                  >
                    #{tag}
                  </span>
                ))}

              </div>
            </div>
          </div>

          {/* ACTION */}
          <div>

            {!isOwnProfile ? (
              <button
                type="button"
                onClick={onToggleFollow}
                className="rounded-2xl bg-white px-6 py-4 text-sm font-semibold text-[#1A3F75] shadow-xl transition hover:-translate-y-0.5 hover:bg-slate-100"
                disabled={busy}
              >
                {profile.followedByCurrentUser
                  ? 'Unfollow'
                  : 'Follow'}
              </button>
            ) : (
              <div className="flex flex-wrap justify-end gap-3">
                <button
                  type="button"
                  onClick={onEditProfile}
                  className="rounded-2xl bg-white px-6 py-4 text-sm font-semibold text-[#1A3F75] shadow-xl transition hover:-translate-y-0.5 hover:bg-slate-100"
                >
                  {editing
                    ? 'Close Editor'
                    : 'Edit Profile'}
                </button>

                <Link
                  to="/feed"
                  className="inline-flex rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-sm font-semibold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-white/15"
                >
                  Back to Feed
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid gap-4 px-6 py-6 sm:grid-cols-3">

        <div className="rounded-3xl bg-[#F4F8FC]/80 px-5 py-5 backdrop-blur-xl">

          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
            Followers
          </p>

          <p className="mt-3 text-4xl font-bold text-[#00002A]">
            {profile.followersCount}
          </p>

        </div>

        <div className="rounded-3xl bg-[#F4F8FC]/80 px-5 py-5 backdrop-blur-xl">

          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
            Following
          </p>

          <p className="mt-3 text-4xl font-bold text-[#00002A]">
            {profile.followingCount}
          </p>

        </div>

        <div className="rounded-3xl bg-gradient-to-br from-[#1A3F75] to-[#44A4CC] px-5 py-5 text-white shadow-xl">

          <p className="text-xs uppercase tracking-[0.22em] text-slate-200">
            Community Rank
          </p>

          <p className="mt-3 text-4xl font-bold">
            Top 5%
          </p>

        </div>
      </div>
    </section>
  );
}
