import { Navigate, Route, Routes } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import HomeFeedPage from './pages/HomeFeedPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';

import { useAuth } from './hooks/useAuth';

function PublicOnlyRoute({ children }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Navigate to="/feed" replace />
  ) : (
    children
  );
}

export default function App() {
  return (
    <Routes>

      {/* PUBLIC LANDING PAGE */}
      <Route
        path="/"
        element={<HomePage />}
      />

      {/* LOGIN */}
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        }
      />

      {/* REGISTER */}
      <Route
        path="/register"
        element={
          <PublicOnlyRoute>
            <RegisterPage />
          </PublicOnlyRoute>
        }
      />

      {/* PROTECTED FEED */}
      <Route
        path="/feed"
        element={
          <ProtectedRoute>
            <HomeFeedPage />
          </ProtectedRoute>
        }
      />

      {/* PROFILE */}
      <Route
        path="/profile/:username"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      {/* FALLBACK */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}
