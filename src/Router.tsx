import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Hompage from './pages/Hompage';
import ExamplePage from './pages/ExamplePage';
import SigninPage from './pages/SigninPage';

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
        path: 'signin',
        element: <SigninPage />,
      },
      {
        path: 'example',
        element: <ExamplePage />,
      },
    ],
  },
]);

export default router;
