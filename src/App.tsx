import { Outlet, useLocation } from 'react-router-dom';
import NavBar from './components/layouts/NavBar';

function App() {
  const location = useLocation();
  const isOnboarding = location.pathname === '/onboarding';

  return (
    <div className='bg-bgColor min-h-screen'>
      {!isOnboarding && <NavBar />}
      <Outlet />
    </div>
  );
}

export default App;
