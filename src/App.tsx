import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import Search from './components/Search';
import Album from './components/Album';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route element={ <Layout /> }>
        <Route path="/search" element={ <Search /> } />
        <Route path="/album/:id" element={ <Album /> } />
        {/* Outras rotas protegidas podem ser adicionadas aqui */}
      </Route>
    </Routes>
  );
}

export default App;
