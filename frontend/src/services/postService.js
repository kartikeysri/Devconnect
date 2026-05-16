import api from './api';

export const postService = {
  getFeed(page = 0, size = 10) {
    return api.get('/api/posts', {
      params: { page, size },
    });
  },
  createPost(payload) {
    return api.post('/api/posts', payload);
  },
  likePost(postId) {
    return api.post(`/api/posts/${postId}/likes`);
  },
  addComment(postId, payload) {
    return api.post(`/api/posts/${postId}/comments`, payload);
  },
};
