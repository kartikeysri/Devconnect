import api from './api';

export const searchService = {
  searchUsers(keyword, page = 0, size = 6) {
    return api.get('/api/search/users', {
      params: { keyword, page, size },
    });
  },
  searchPosts(keyword, page = 0, size = 6) {
    return api.get('/api/search/posts', {
      params: { keyword, page, size },
    });
  },
};
