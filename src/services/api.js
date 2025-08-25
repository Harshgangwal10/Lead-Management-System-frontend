import axios from 'axios';

const isDevelopment = import.meta.env.MODE === 'development';
const API_BASE_URL = isDevelopment 
  ? 'http://localhost:4000/api' 
  : 'https://lead-management-system-81b6.onrender.com/api';


const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, 

});


export const authAPI = {
  login: (email, password) => 
    api.post('/auth/login', { email, password }),
  
  register: (email, password) => 
    api.post('/auth/register', { email, password }),
  
  logout: () => 
    api.post('/auth/logout'),
  
  getCurrentUser: () => 
    api.get('/auth/me')
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
    
    return api.get(`/leads?${queryParams.toString()}`);
  },
  
  getLead: (id) => 
    api.get(`/leads/${id}`),
  
  createLead: (leadData) => 
    api.post('/leads', leadData),
  
  updateLead: (id, leadData) => 
    api.put(`/leads/${id}`, leadData),
  
  deleteLead: (id) => 
    api.delete(`/leads/${id}`)
};


export default api;
