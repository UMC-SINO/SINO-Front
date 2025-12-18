import { Outlet } from 'react-router-dom';
import NavBar from './components/layouts/NavBar';

function App() {
  return (
    <div className='bg-bgColor min-h-screen'>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
