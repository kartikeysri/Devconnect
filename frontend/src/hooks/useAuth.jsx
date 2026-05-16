import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/authService';
import { clearStoredAuth, getStoredToken, getStoredUser, setStoredToken, setStoredUser } from '../services/authStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getStoredToken());
  const [user, setUser] = useState(() => getStoredUser());
  const [loading, setLoading] = useState(false);
  const [sessionMessage, setSessionMessage] = useState('');

  useEffect(() => {
    setStoredToken(token);
  }, [token]);

  useEffect(() => {
    setStoredUser(user);
  }, [user]);

  useEffect(() => {
    function handleUnauthorized(event) {
      setSessionMessage(event.detail?.message || 'Your session has expired. Please sign in again.');
      setToken(null);
      setUser(null);
    }

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, []);

  async function login(credentials) {
    setLoading(true);
    setSessionMessage('');
    try {
      const { data } = await authService.login(credentials);
      setToken(data.token);
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  }

  async function register(payload) {
    setLoading(true);
    setSessionMessage('');
    try {
      const { data } = await authService.register(payload);
      setToken(data.token);
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    clearStoredAuth();
    setToken(null);
    setUser(null);
    setSessionMessage('');
  }

  function clearSessionMessage() {
    setSessionMessage('');
  }

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      sessionMessage,
      isAuthenticated: Boolean(token),
      login,
      register,
      logout,
      setUser,
      clearSessionMessage,
    }),
    [loading, sessionMessage, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
