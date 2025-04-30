import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Form from '../pages/Form';
import Home from '../pages/home';
import PropertySearchPage from '../pages/PropertySearchPage';
import EncumbrancePage from '../pages/EncumbrancePage';
import AboutUs from '../pages/AboutUs';
import Services from '../pages/Services';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ProtectedRoute from '../components/ProtectedRoute';
import DocumentVerification from '../pages/DocumentVerification';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route 
        path="/formdata" 
        element={
          <ProtectedRoute>
            <Form />
          </ProtectedRoute>
        } 
      />
      <Route path="/property-search" element={<PropertySearchPage />} />
      <Route path="/encumbrance" element={<EncumbrancePage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/document-verification" element={<DocumentVerification />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;