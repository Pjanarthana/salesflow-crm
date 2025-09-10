import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AdminDashboard from './pages/admin-dashboard';
import LoginPage from './pages/login';
import OpportunitiesManagement from './pages/opportunities-management';
import SalesManagerDashboard from './pages/sales-manager-dashboard';
import SalesRepDashboard from './pages/sales-rep-dashboard';
import Register from './pages/register';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/opportunities-management" element={<OpportunitiesManagement />} />
        <Route path="/sales-manager-dashboard" element={<SalesManagerDashboard />} />
        <Route path="/sales-rep-dashboard" element={<SalesRepDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
