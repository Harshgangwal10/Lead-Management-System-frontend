import React, { useEffect, useState } from 'react';
import { leadsAPI } from '../services/api';
import { AgGridReact } from 'ag-grid-react';
import { useNavigate } from 'react-router-dom';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './LeadsList.css';


const LeadsList = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginationPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/leads/edit/${id}`);
  };

  const handleDelete = async (id) => {
    
      try {
        await leadsAPI.deleteLead(id);
        fetchLeads(currentPage);
      } catch (error) {
        setError('Failed to delete lead');
      }
    
  };

  const columnDefs = [
    { field: 'first_name', headerName: 'First Name' },
    { field: 'last_name', headerName: 'Last Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'phone', headerName: 'Phone' },
    { field: 'company', headerName: 'Company' },
    { field: 'city', headerName: 'city' },
    { field: 'state', headerName: 'state' },
    { field: 'source', headerName: 'source' },
    { field: 'status', headerName: 'Status' },
    { field: 'score', headerName: 'score' },
    { field: 'created_at', headerName: 'Created At', valueGetter: (params) => new Date(params.data.created_at).toLocaleString() },
    {
      headerName: 'Actions',
      cellRenderer: (params) => (
        <div className="actions-cell">
          <button onClick={() => handleEdit(params.data._id)} className="edit-btn">
            Edit
          </button>
          <button onClick={() => handleDelete(params.data._id)} className="delete-btn">
            Delete
          </button>
        </div>
      )
    }
  ];

  const fetchLeads = async (page) => {
    setLoading(true);
    setError('');
    try {
      const response = await leadsAPI.getLeads({ page, limit: paginationPageSize });
      setLeads(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads(currentPage);
  }, [currentPage]);

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="leads-container">
      <div className="leads-header">
        <h2>Leads List</h2>
        <button onClick={() => navigate('/leads/new')} className="add-lead-btn">
          Add New Lead
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
          <AgGridReact
            rowData={leads}
            columnDefs={columnDefs}
            paginationPageSize={paginationPageSize}
            pagination={true}
            // onGridReady={(params) => params.api.sizeColumnsToFit()}
            suppressPaginationPanel={true}
          />
          <div className="pagination">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsList;
