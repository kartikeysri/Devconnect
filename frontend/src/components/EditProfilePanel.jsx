import Avatar from './Avatar';

export default function EditProfilePanel({
  form,
  onChange,
  onSubmit,
  saving,
  error,
  successMessage,
  firstName,
  lastName,
  username,
}) {
  return (
    <section className="rounded-[30px] border border-white/20 bg-white/80 p-6 shadow-xl backdrop-blur-xl">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1A3F75]">
            PROFILE SETTINGS
          </p>

          <h3 className="mt-2 text-2xl font-bold text-[#00002A]">
            Edit your profile
          </h3>

          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
            Update your mobile number, change your password, and use a profile picture URL for your avatar across the app.
          </p>
        </div>

        <Avatar
          src={form.profileImageUrl}
          firstName={firstName}
          lastName={lastName}
          username={username}
          className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-[28px] ring-1 ring-white/30"
          fallbackClassName="bg-gradient-to-br from-[#1A3F75]/10 via-white to-[#44A4CC]/20"
          textClassName="text-3xl font-bold text-[#00002A]"
        />
      </div>

      <form
        onSubmit={onSubmit}
        className="mt-6 grid gap-4 md:grid-cols-2"
      >

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Mobile Number
          </span>

          <input
            value={form.mobile}
            onChange={(event) =>
              onChange(
                'mobile',
                event.target.value.replace(
                  /\D/g,
                  '',
                ),
              )
            }
            className="field"
            placeholder="9876543210"
            maxLength={15}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            New Password
          </span>

          <input
            type="password"
            value={form.newPassword}
            onChange={(event) =>
              onChange(
                'newPassword',
                event.target.value,
              )
            }
            className="field"
            placeholder="Leave blank to keep current password"
          />
        </label>

        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Profile Picture URL
          </span>

          <input
            value={form.profileImageUrl}
            onChange={(event) =>
              onChange(
                'profileImageUrl',
                event.target.value,
              )
            }
            className="field"
            placeholder="https://example.com/avatar.jpg"
          />
        </label>

        {error ? (
          <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700 md:col-span-2">
            {error}
          </p>
        ) : null}

        {successMessage ? (
          <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 md:col-span-2">
            {successMessage}
          </p>
        ) : null}

        <div className="md:col-span-2">
          <button
            type="submit"
            className="rounded-2xl bg-[#1A3F75] px-6 py-4 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#00002A]"
            disabled={saving}
          >
            {saving
              ? 'Saving changes...'
              : 'Save Profile'}
          </button>
        </div>
      </form>
    </section>
  );
}
