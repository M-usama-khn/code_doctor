import { getInitials } from '../../utils/constants';
import { getAvatarUrl } from '../../utils/userHelpers';

export default function UserAvatar({ user, className = 's-avatar', size }) {
  const url = getAvatarUrl(user?.avatar);
  const style = size ? { width: size, height: size, fontSize: size * 0.35 } : undefined;

  if (url) {
    return (
      <img
        src={url}
        alt={user?.fullName || 'User'}
        className={`${className} user-avatar-img`}
        style={style}
      />
    );
  }

  return (
    <div className={className} style={style}>
      {getInitials(user?.fullName)}
    </div>
  );
}
