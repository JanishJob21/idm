import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CrudApp from './components/CrudApp';
import ItemForm from './components/ItemForm';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Navigate to="/items" replace />} />
          <Route path="/items" element={<CrudApp />} />
          <Route path="/items/new" element={<ItemForm />} />
          <Route path="/items/edit/:id" element={<ItemForm />} />
          <Route path="*" element={<Navigate to="/items" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
