import { createContext, useContext, useEffect, useState } from 'react';
import API from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await API.post('/v1/users/login', { email, password });
      const { user, accessToken } = res.data.data;

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', accessToken);

      setUser(user);
      setIsAuthenticated(true);
      return { success: true, user };
    } catch (err) {
      return {
        success: false,
        error: err?.response?.data?.message || 'Login failed',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ THIS is your useAuth hook – inside the same file!
export const useAuth = () => useContext(AuthContext);
