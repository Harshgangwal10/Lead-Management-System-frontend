import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import LeadsList from "./components/LeadsList";
import LeadForm from "./components/LeadForm";
import Navigation from "./components/Navigation";

const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isAuthenticated && <Navigation />}
      <Routes>
       
        <Route
          path="/login"
          element={
            !isAuthenticated ? <Login /> : <Navigate to="/leads" />
          }
        />
        <Route
          path="/register"
          element={
            !isAuthenticated ? <Register /> : <Navigate to="/leads" />
          }
        />

        <Route
          path="/leads"
          element={
            isAuthenticated ? <LeadsList /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/leads/new"
          element={
            isAuthenticated ? <LeadForm /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/leads/edit/:id"
          element={
            isAuthenticated ? <LeadForm /> : <Navigate to="/login" />
          }
        />

        <Route path="/" element={<Navigate to="/login" />} />
        
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
