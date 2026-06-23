export function getRoleLabel(role) {
  const labels = {
    Developer: 'Student / Developer',
    Reviewer: 'Reviewer',
    Administrator: 'Administrator',
  };
  return labels[role] || role;
}

export function getAvatarUrl(avatar) {
  if (!avatar) return null;
  if (avatar.startsWith('http')) return avatar;
  return avatar.startsWith('/') ? avatar : `/${avatar}`;
}
