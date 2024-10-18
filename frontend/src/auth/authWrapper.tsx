import { useState, useEffect } from 'react';

interface User {
  token: string | null
  username: string | null;
  role: string | null;
}

interface UseAuthReturn extends User {
  logout: () => void;
  updateUser: (username: string, role: string, token:string) => void;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User>({
    username: null,
    role: null,
    token: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    const storedRole = localStorage.getItem('role');

    if (token && storedUsername) {
      setUser({
        username: storedUsername,
        role: storedRole,
        token : token
      });
    }
  }, []);

  const updateUser = (username: string, role: string, token : string) => {
    localStorage.setItem('username', username);
    localStorage.setItem('role', role);
    localStorage.setItem('token', token);

    setUser({
      username,
      role,
      token,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');

    setUser({
      username: null,
      role: null,
      token: null,
    });

    window.location.href = '/';
  };

  return {
    ...user,
    logout,
    updateUser,
  };
};