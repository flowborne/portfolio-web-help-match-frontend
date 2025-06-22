import { useState, useCallback, useEffect } from 'react';

const storageName = 'userData';

export const useAuth = () => {
  const [access_token, setToken] = useState<string | null>(null);
  const [refresh_token, setRefresh] = useState<string | null>(null);

  const [isReady, setIsReady] = useState(false);

  const updateTokens = useCallback((newAccessToken: string, jwtRefreshToken: string) => {
    setToken(newAccessToken);
    localStorage.removeItem(storageName);
    localStorage.setItem(
      storageName,
      JSON.stringify({
        access_token: newAccessToken,
        refresh_token: jwtRefreshToken,
      })
    );
  }, []);

  const login = useCallback((jwtToken: string, jwtRefreshToken: string) => {
    setToken(jwtToken);
    setRefresh(jwtRefreshToken);
    localStorage.setItem(
      storageName,
      JSON.stringify({
        access_token: jwtToken,
        refresh_token: jwtRefreshToken,
      })
    );

    window.location.href = '/';
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setRefresh(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = localStorage.getItem(storageName);
    if (data) {
      const loginData = JSON.parse(data) as {
        access_token: string;
        refresh_token: string;
        userId?: string;
      };
      if (loginData.access_token && loginData.refresh_token) {
        setToken(loginData.access_token);
        setRefresh(loginData.refresh_token);
      }
    }
    setIsReady(true);
  }, []);

  return { access_token, refresh_token, login, logout, updateTokens, isReady };
};
