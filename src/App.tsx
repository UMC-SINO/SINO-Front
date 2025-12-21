import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import NavBar from './components/layouts/NavBar';

function App() {
  const location = useLocation();
  const isOnboarding = location.pathname === '/onboarding';
  const isSplash = location.pathname === '/splash';

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');

    if (!hasVisited) {
      localStorage.clear();
      sessionStorage.setItem('hasVisited', 'true');
    }
  }, []);

  return (
    <div className='bg-bgColor min-h-screen'>
      {!isOnboarding && !isSplash && <NavBar />}
      <Outlet />
    </div>
  );
}

export default App;
