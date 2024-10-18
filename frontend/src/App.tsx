// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Workers from '@/pages/workers'
import Machines from '@/pages/machines'
import Login from '@/pages/login'
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/workers" element={<Workers />} />
        <Route path="/machines" element={<Machines />} />

      </Routes>
    </Router>
  );
};

export default App;
