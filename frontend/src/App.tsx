// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Workers from '@/pages/workers';
import Machines from '@/pages/machines';
import Login from '@/pages/login';
import Sidebar from '@/components/ui/SideBar';

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/workers" element={<Workers />} />
            <Route path="/machines" element={<Machines />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
