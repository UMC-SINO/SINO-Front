import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Hompage from './pages/Hompage';
import ExamplePage from './pages/ExamplePage';
import EmojiPage from './pages/EmojiPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LgoinPage';

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
        path: 'emoji',
        element: <EmojiPage />,
      },
    ],
  },
]);

export default router;
