import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Search from './Search'; 

function App() {
  return (
   
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/search" element={<Search />} />
      </Routes>

  );
}

export default App;
