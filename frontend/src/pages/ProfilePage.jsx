import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AppShell from '../components/AppShell';
import Avatar from '../components/Avatar';
import EditProfilePanel from '../components/EditProfilePanel';
import LoadingState from '../components/LoadingState';
import ProfileSummary from '../components/ProfileSummary';
import TrendingPanel from '../components/TrendingPanel';

import { useAuth } from '../hooks/useAuth';

import { getApiErrorMessage } from '../services/errorService';
import { trendingService } from '../services/trendingService';
import { userService } from '../services/userService';

export default function ProfilePage() {
  const { username } = useParams();

  const { user, setUser } = useAuth();

  const [profile, setProfile] =
    useState(null);

  const [trending, setTrending] =
    useState({
      topPosts: [],
      topTags: [],
    });

  const [loading, setLoading] =
    useState(true);

  const [busy, setBusy] =
    useState(false);

  const [editing, setEditing] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [saveMessage, setSaveMessage] =
    useState('');

  const [editForm, setEditForm] =
    useState({
      mobile: '',
      newPassword: '',
      profileImageUrl: '',
    });

  const [error, setError] =
    useState('');

  useEffect(() => {
    document.title = `Profile | ${username}`;

    void Promise.all([
      loadProfile(username),
      loadTrending(),
    ]);
  }, [username]);

  useEffect(() => {
    if (!profile || profile.username !== user?.username) {
      return;
    }

    setEditForm({
      mobile: profile.mobile ?? '',
      newPassword: '',
      profileImageUrl:
        profile.profileImageUrl ?? '',
    });
  }, [profile, user?.username]);

  async function loadProfile(
    targetUsername,
  ) {
    setLoading(true);

    setError('');

    try {
      const { data } =
        await userService.getProfile(
          targetUsername,
        );

      setProfile(data);
    } catch (apiError) {
      setError(
        getApiErrorMessage(
          apiError,
          'Unable to load this profile.',
        ),
      );
    } finally {
      setLoading(false);
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

  async function handleToggleFollow() {
    if (!profile) {
      return;
    }

    setBusy(true);

    setError('');
    setSaveMessage('');

    try {
      if (
        profile.followedByCurrentUser
      ) {
        await userService.unfollow(
          profile.username,
        );
      } else {
        await userService.follow(
          profile.username,
        );
      }

      await loadProfile(
        profile.username,
      );
    } catch (apiError) {
      setError(
        getApiErrorMessage(
          apiError,
          'Unable to update follow status.',
        ),
      );
    } finally {
      setBusy(false);
    }
  }

  function updateEditField(field, value) {
    setEditForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleUpdateProfile(
    event,
  ) {
    event.preventDefault();

    setSaving(true);
    setError('');
    setSaveMessage('');

    try {
      const { data } =
        await userService.updateProfile({
          mobile: editForm.mobile,
          newPassword:
            editForm.newPassword || null,
          profileImageUrl:
            editForm.profileImageUrl.trim() ||
            null,
        });

      setProfile(data);
      setUser((currentUser) =>
        currentUser
          ? {
              ...currentUser,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              username: data.username,
              mobile: data.mobile,
              profileImageUrl:
                data.profileImageUrl,
            }
          : currentUser,
      );
      setEditForm((current) => ({
        ...current,
        mobile: data.mobile ?? '',
        profileImageUrl:
          data.profileImageUrl ?? '',
        newPassword: '',
      }));
      setSaveMessage(
        'Profile updated successfully.',
      );
      setEditing(false);
    } catch (apiError) {
      setError(
        getApiErrorMessage(
          apiError,
          'Unable to update your profile.',
        ),
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <AppShell
      title={`@${username}`}
      subtitle="Explore developer activity, connections, projects and community presence."
      sidebar={
        <TrendingPanel
          data={trending}
        />
      }
    >

      {loading ? (
        <LoadingState label="Loading profile" />
      ) : profile ? (
        <div className="space-y-6">

          <ProfileSummary
            profile={profile}
            currentUsername={user?.username}
            onToggleFollow={handleToggleFollow}
            onEditProfile={() =>
              setEditing((current) => !current)
            }
            busy={busy}
            editing={editing}
          />

          {profile.username ===
          user?.username &&
          editing ? (
            <EditProfilePanel
              form={editForm}
              onChange={updateEditField}
              onSubmit={
                handleUpdateProfile
              }
              saving={saving}
              error={error}
              successMessage={saveMessage}
              firstName={profile.firstName}
              lastName={profile.lastName}
              username={profile.username}
            />
          ) : null}

          {error && !editing ? (
            <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </p>
          ) : null}

          {saveMessage ? (
            <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {saveMessage}
            </p>
          ) : null}

          {/* NETWORK */}
          <section className="grid gap-6 lg:grid-cols-2">

            <NetworkPanel
              title="Followers"
              users={profile.followers}
              emptyLabel="No followers yet."
            />

            <NetworkPanel
              title="Following"
              users={profile.following}
              emptyLabel="Not following anyone yet."
            />

          </section>
        </div>
      ) : (
        <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error || 'Profile not found.'}
        </p>
      )}
    </AppShell>
  );
}

function NetworkPanel({
  title,
  users,
  emptyLabel,
}) {
  return (
    <section className="rounded-[30px] border border-white/20 bg-white/80 p-6 shadow-xl backdrop-blur-xl">

      <h3 className="text-2xl font-bold text-[#00002A]">
        {title}
      </h3>

      <div className="mt-4 space-y-3">

        {users?.length ? (
          users.map((networkUser) => (
            <div
              key={`${title}-${networkUser.id}`}
              className="flex items-center gap-4 rounded-2xl border border-white/20 bg-[#F4F8FC]/80 px-4 py-4 backdrop-blur-xl"
            >
              <Avatar
                src={networkUser.profileImageUrl}
                firstName={networkUser.firstName}
                lastName={networkUser.lastName}
                username={networkUser.username}
                className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl"
                fallbackClassName="bg-gradient-to-br from-[#1A3F75]/10 via-white to-[#44A4CC]/20"
                textClassName="text-sm font-bold text-[#00002A]"
              />

              <div>
                <p className="font-semibold text-[#00002A]">
                  {networkUser.firstName}{' '}
                  {networkUser.lastName}
                </p>

                <p className="text-sm text-slate-500">
                  @{networkUser.username}
                </p>
              </div>

            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500">
            {emptyLabel}
          </p>
        )}
      </div>
    </section>
  );
}
