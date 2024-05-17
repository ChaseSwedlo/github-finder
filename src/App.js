import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import User from './pages/User';
import { AnimatePresence } from 'framer-motion';

function App() {
  const location = useLocation();
  return (
    <main>
      <div className="container">
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/user/:slug" element={<User />} />
          </Routes>
        </AnimatePresence>
      </div>
    </main>
  );
}

export default App;
