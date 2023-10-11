import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { REACT_APP_API_URL } from '../utils/apiConfig';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (name, email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${REACT_APP_API_URL}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.message);
      setIsLoading(false);
    }

    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json));
      dispatch({ type: 'LOGIN', payload: json });
      setIsLoading(false);
    }
  };
  return { error, isLoading, signup };
};
