import { Outlet } from 'react-router-dom';
import NavBar from './components/layouts/NavBar';

function App() {
  return (
    <div className='bg-bgColor mb-100'>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
