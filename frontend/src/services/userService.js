import api from './api';

export const userService = {
  getProfile(username) {
    return api.get(`/api/users/${username}`);
  },
  follow(username) {
    return api.post('/api/users/follow', { username });
  },
  unfollow(username) {
    return api.post('/api/users/unfollow', { username });
  },
  updateProfile(payload) {
    return api.put('/api/users/profile', payload);
  },
};
