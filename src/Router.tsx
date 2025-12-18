import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Hompage from './pages/Hompage';
import ExamplePage from './pages/ExamplePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LgoinPage';
import RetrospectWrite from './pages/RetrospectWrite/RestrospectWrite';
import AnalysisPage from './pages/AnalysisPage';

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
        path: 'signup',
        element: <SignupPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'example',
        element: <ExamplePage />,
      },
      {
        path: 'retro',
        element: <RetrospectWrite />,
      },
      {
        path: 'analysis',
        element: <AnalysisPage />,
      },
    ],
  },
]);

export default router;
