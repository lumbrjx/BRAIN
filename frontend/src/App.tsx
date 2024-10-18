import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import Workers from '@/pages/workers';
import Machines from '@/pages/machines';
import Login from '@/pages/login';
import Sidebar from '@/components/ui/SideBar';
import ProtectedRoute from '@/components/protectedRoute';

const App: React.FC = () => {
  return (  
    <>
      <Router>
        <AppContent />
      </Router>
    </>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  
  const noSidebarRoutes = ['/login'];

  const shouldShowSidebar = !noSidebarRoutes.includes(location.pathname);

  return (
    <div style={{ display: 'flex' }}>
      {shouldShowSidebar && <Sidebar />}
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/machines" element={<Machines />} />
          <Route path="/" element={<Machines />} />
          <Route
            path="/workers"
            element={
              <ProtectedRoute requiredRole="SUPERUSER">
                <Workers />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
