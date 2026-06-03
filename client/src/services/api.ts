import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

interface AuthResponse {
  user: {
    id: number;
    username: string;
    email: string;
  };
  token: string;
}

interface Service {
  id: number;
  title: string;
  description: string;
  category: string;
  price_per_hour: number;
  username: string;
  rating: number;
}

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data: { username: string; email: string; password: string; firstName?: string; lastName?: string }) =>
    api.post<AuthResponse>('/auth/register', data),
  login: (data: { email: string; password: string }) => api.post<AuthResponse>('/auth/login', data),
};

// Services API
export const servicesAPI = {
  getAll: (search?: string, category?: string) =>
    api.get<Service[]>('/services', { params: { search, category } }),
  getById: (id: number) => api.get<Service>(`/services/${id}`),
  create: (data: any) => api.post('/services', data),
  update: (id: number, data: any) => api.put(`/services/${id}`, data),
  delete: (id: number) => api.delete(`/services/${id}`),
  getUserServices: (userId: number) => api.get(`/services/user/${userId}`),
};

// Messages API
export const messagesAPI = {
  getAll: () => api.get('/messages'),
  getConversation: (userId: number) => api.get(`/messages/conversation/${userId}`),
  send: (data: any) => api.post('/messages', data),
  markAsRead: (messageId: number) => api.patch(`/messages/${messageId}/read`),
};

// Reviews API
export const reviewsAPI = {
  getUserReviews: (userId: number) => api.get(`/reviews/user/${userId}`),
  getServiceReviews: (serviceId: number) => api.get(`/reviews/service/${serviceId}`),
  create: (data: any) => api.post('/reviews', data),
};

// Users API
export const usersAPI = {
  getProfile: (userId: number) => api.get(`/users/${userId}`),
  updateProfile: (userId: number, data: any) => api.put(`/users/${userId}`, data),
  getCurrentProfile: () => api.get('/users'),
};

export default api;