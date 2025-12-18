import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Hompage from './pages/Hompage';
import ExamplePage from './pages/ExamplePage';
import RetrospectWrite from './pages/RetrospectWrite/RestrospectWrite';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Hompage />,
      },
      {
        path: 'example',
        element: <ExamplePage />,
      },
      {
        path: 'retro',
        element: <RetrospectWrite />,
      },
    ],
  },
]);

export default router;
