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
