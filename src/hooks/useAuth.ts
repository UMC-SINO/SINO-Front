const KEY = 'userId';

export const useAuth = () => {
  const setLoggedIn = () => {
    localStorage.setItem(KEY, '1');
  };

  const setLoggedOut = () => {
    localStorage.removeItem(KEY);
  };

  const isLoggedIn = () => {
    return localStorage.getItem(KEY) !== null;
  };

  return {
    setLoggedIn,
    setLoggedOut,
    isLoggedIn,
  };
};
