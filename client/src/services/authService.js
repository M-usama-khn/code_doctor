import api from './api';

export async function login(email, password) {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
}

export async function register(userData) {
  const { data } = await api.post('/auth/register', userData);
  return data;
}

export async function getProfile() {
  const { data } = await api.get('/user/profile');
  return data.user;
}

export async function updateProfile(fullName, email) {
  const { data } = await api.put('/user/profile', { fullName, email });
  return data;
}

export async function changePassword(currentPassword, newPassword, confirmPassword) {
  const { data } = await api.put('/user/password', { currentPassword, newPassword, confirmPassword });
  return data;
}

export async function uploadAvatar(file) {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  formData.append('avatar', file, file.name || 'avatar.jpg');

  const response = await fetch('/api/user/avatar', {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || 'Failed to upload photo');
    error.response = { data, status: response.status };
    throw error;
  }
  return data;
}
