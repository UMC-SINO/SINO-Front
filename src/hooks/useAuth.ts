const KEY = 'userId';

export const useAuth = () => {
  const setLoggedIn = (userId: number) => {
    localStorage.setItem(KEY, String(userId));
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
