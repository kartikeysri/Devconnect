import api from './api';

export const trendingService = {
  getTrending() {
    return api.get('/api/trending');
  },
};
