import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Connect from './pages/Connect';
import Teams from './pages/Teams';
import Matches from './pages/Matches';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import Premium from './pages/Premium';
import Login from './pages/login';
import Register from './pages/register';
import { useLocalStorage } from './hooks/useLocalStorage';

// PrivateRoute component
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const [token] = useLocalStorage('token', '');
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-blue-900 text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          />
          <Route path="/premium" element={<Premium />} />
        </Routes>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;