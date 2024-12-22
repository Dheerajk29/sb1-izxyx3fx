import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export const restaurants = {
  getAll: (params?: any) => api.get('/restaurants', { params }),
  getById: (id: string) => api.get(`/restaurants/${id}`),
  create: (data: any) => api.post('/restaurants', data),
  update: (id: string, data: any) => api.put(`/restaurants/${id}`, data)
};

export const orders = {
  create: (data: any) => api.post('/orders', data),
  getAll: () => api.get('/orders'),
  getById: (id: string) => api.get(`/orders/${id}`),
  updateStatus: (id: string, status: string) => 
    api.put(`/orders/${id}/status`, { status })
};

export default api;