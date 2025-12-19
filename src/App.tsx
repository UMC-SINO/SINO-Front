import { Outlet, useLocation } from 'react-router-dom';
import NavBar from './components/layouts/NavBar';

function App() {
  const location = useLocation();
  const isOnboarding = location.pathname === '/onboarding';
  const isSplash = location.pathname === '/splash';

  return (
    <div className='bg-bgColor min-h-screen'>
      {!isOnboarding && !isSplash && <NavBar />}
      <Outlet />
    </div>
  );
}

export default App;
