function getInitials(firstName, lastName, username) {
  const firstInitial = firstName?.trim()?.[0] ?? '';
  const lastInitial = lastName?.trim()?.[0] ?? '';

  if (firstInitial || lastInitial) {
    return `${firstInitial}${lastInitial}`.toUpperCase();
  }

  return username?.trim()?.slice(0, 2).toUpperCase() ?? 'U';
}

export default function Avatar({
  src,
  firstName,
  lastName,
  username,
  alt,
  className = '',
  fallbackClassName = '',
  imageClassName = '',
  textClassName = '',
}) {
  const initials = getInitials(
    firstName,
    lastName,
    username,
  );

  const baseClassName =
    className ||
    'flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl';

  if (src) {
    return (
      <div className={baseClassName}>
        <img
          src={src}
          alt={
            alt ||
            `${firstName || username}'s profile`
          }
          className={`h-full w-full object-cover ${imageClassName}`.trim()}
        />
      </div>
    );
  }

  return (
    <div
      className={`${baseClassName} ${fallbackClassName}`.trim()}
      aria-label={
        alt ||
        `${firstName || username}'s initials`
      }
    >
      <span className={textClassName}>
        {initials}
      </span>
    </div>
  );
}
