import { Outlet } from 'react-router-dom';
import NavBar from './components/layouts/NavBar';

function App() {
  return (
    <div className='bg-bgColor'>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
