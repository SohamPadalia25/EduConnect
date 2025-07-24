// hooks/useAuth.js
import API from '../services/api.jsx'; // adjust path if needed

export const useAuth = () => {
  const login = async (email, password) => {
    try {
      const res = await API.post('/users/login', {
        email,
        password
      });

      const { user, accessToken } = res.data.data;

      // Save to localStorage (optional but common)
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', accessToken);

      return { success: true, user };
    } catch (err) {
      return {
        success: false,
        error: err?.response?.data?.message || 'Login failed',
      };
    }
  };

  return { login };
};
