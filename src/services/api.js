import axios from 'axios';

const API_BASE_URL = 'https://leadmanagementbackend-v1un.onrender.com';


const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, 
});


export const authAPI = {
  login: (email, password) => 
    api.post('/api/login', { email, password }),
  
  register: (email, password) => 
    api.post('/api/register', { email, password }),
  
  logout: () => 
    api.post('/api/logout'),
  
  getCurrentUser: () => 
    api.get('/api/me')
};


export const leadsAPI = {
  getLeads: (params = {}) => {
    const queryParams = new URLSearchParams();
    
    
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    
  
    Object.entries(params.filters || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        queryParams.append(key, value);
      }
    });
    
    return api.get(`/api/leads?${queryParams.toString()}`);
  },
  
  getLead: (id) => 
    api.get(`/api/leads/${id}`),
  
  createLead: (leadData) => 
    api.post('/api/leads', leadData),
  
  updateLead: (id, leadData) => 
    api.put(`/api/leads/${id}`, leadData),
  
  deleteLead: (id) => 
    api.delete(`/api/leads/${id}`)
};


export default api;
