import React, { useState, useEffect } from 'react';
import { leadsAPI } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { STATUS_OPTIONS, SOURCE_OPTIONS } from '../utils/constants';
import './LeadForm.css';   

const LeadForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    city: '',
    state: '',
    source: '',
    status: 'new',
    score: 0,
    lead_value: 0,
    is_qualified: false
  });

  useEffect(() => {
    if (id) {
      fetchLead();
    }
  }, [id]);

  const fetchLead = async () => {
    try {
      const response = await leadsAPI.getLead(id);
      setFormData(response.data.data);
    } catch (error) {
      setError('Failed to fetch lead');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (id) {
        await leadsAPI.updateLead(id, formData);
      } else {
        await leadsAPI.createLead(formData);
      }
      navigate('/leads');
    } catch (error) {
      setError( 'Failed to save lead');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lead-form-container">
      <h2>{id ? 'Edit Lead' : 'Create New Lead'}</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="lead-form">
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="first-name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="last-name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label>Company:</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label>State:</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label>Source:</label>
          <select
            name="source"
            value={formData.source}
            onChange={handleChange}
          >
            <option value="">Select Source</option>
            {SOURCE_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            {STATUS_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label>Score (0-100):</label>
          <input
            type="number"
            name="score"
            value={formData.score}
            onChange={handleChange}
            min="0"
            max="100"
          />
        </div>
        
        <div>
          <label>Lead Value:</label>
          <input
            type="number"
            name="lead_value"
            value={formData.lead_value}
            onChange={handleChange}
            min="0"
            step="0.01"
          />
        </div>
        

        <div className="form-actions">
          <button 
            type="submit" 
            disabled={loading}
            className="button-primary"
          >
            {loading ? 'Saving...' : (id ? 'Update Lead' : 'Create Lead')}
          </button>
          
          <button 
            type="button" 
            onClick={() => navigate('/leads')}
            className="button-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeadForm;
