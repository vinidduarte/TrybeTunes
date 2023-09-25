import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Search from './Search';

function App() {
  return (

    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/search" element={ <Search /> } />
    </Routes>

  );
}

export default App;
