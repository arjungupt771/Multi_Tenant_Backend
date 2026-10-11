
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => readSession());

  const refreshAuth = useCallback(() => {
    setSession(readSession());
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('organization');
    setSession(null);
  }, []);

  useEffect(() => {
    window.addEventListener('storage', refreshAuth);

    return () => {
      window.removeEventListener('storage', refreshAuth);
    };
  }, [refreshAuth]);

  return (
    <AuthContext.Provider
      value={{
        token: session?.token ?? null,
        user: session?.user ?? null,
        organization: session?.organization ?? null,
        isAuthenticated: Boolean(session?.token),
        refreshAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function readSession() {
  const token = localStorage.getItem('token');

  if (!token) return null;

  try {
    return {
      token,
      user: JSON.parse(localStorage.getItem('user') || 'null'),
      organization: JSON.parse(
        localStorage.getItem('organization') || 'null'
      ),
    };
  } catch {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('organization');
    return null;
  }
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
