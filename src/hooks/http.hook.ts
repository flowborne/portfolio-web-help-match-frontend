import { useCallback, useState } from 'react';
import { useAuthContext } from '~contexts/auth-context';
import { useSnackbar } from './snackbar.hook';
import { RequestBody, RequestHeaders, UseHTTPReturn } from '~types/httpHook';
import { RegisterData } from '~types/auth';

export const useHTTP = (): UseHTTPReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { access_token, refresh_token, updateTokens } = useAuthContext();
  const { showSnackbar } = useSnackbar();

  const request = useCallback(
    async <T>(
      url: string,
      method: string = 'GET',
      body: RequestBody | RequestBody[]| RegisterData | null = null,
      headers: RequestHeaders = {},
      isBinaryResponse = false,
      disableLoading = false
    ): Promise<T> => {
      if (!disableLoading) setLoading(true);

      try {
        let requestBody: BodyInit | null = null;

        if (body instanceof FormData) {
          requestBody = body;
        } else if (body) {
          requestBody = JSON.stringify(body);
          headers['Content-Type'] = 'application/json';
        }

        if (access_token) {
          headers['Authorization'] = `Bearer ${access_token}`;
        }

        let response = await fetch(url, {
          method,
          body: requestBody,
          headers,
        });

        if (response.ok) {
          const result = isBinaryResponse
            ? await response.blob()
            : await response.json();
          if (!disableLoading) setLoading(false);
          return result as T;
        }

        if (response.status === 401 && refresh_token) {
          const refreshResponse = await fetch('/help/api/auth/refresh', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${refresh_token}`,
            },
          });

          if (refreshResponse.ok) {
            const { accessToken: newToken } = await refreshResponse.json();
            updateTokens?.(newToken, refresh_token);
            headers['Authorization'] = `Bearer ${newToken}`;

            response = await fetch(url, {
              method,
              body: requestBody,
              headers,
            });

            if (response.ok) {
              const retryResult = isBinaryResponse
                ? await response.blob()
                : await response.json();
              if (!disableLoading) setLoading(false);
              return retryResult as T;
            } else {
              throw new Error('Retry after token refresh failed');
            }
          } else {
            throw new Error('Token refresh failed');
          }
        }

        const errorText = await response.text();
        throw new Error(errorText || 'Unknown error');
      } catch (err: any) {
        if (!disableLoading) setLoading(false);
        const message = err.message || 'Unexpected error';
        showSnackbar(message, 'error');
        setError(message);
        throw err;
      }
    },
    [access_token, refresh_token, updateTokens, showSnackbar]
  );

  const clearError = () => setError(null);

  return { loading, request, error, clearError };
};
