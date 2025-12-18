import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Hompage from './pages/Hompage';
import ExamplePage from './pages/ExamplePage';
import EmojiPage from './pages/EmojiPage';
import RetrospectWrite from './pages/RetrospectWrite/RestrospectWrite';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LgoinPage';
import OnBoadingPage from './pages/OnBoardingPage';
import DateSelectPage from './pages/DateSelectPage';

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
        path: 'onboarding',
        element: <OnBoadingPage />,
      },
      {
        path: 'example',
        element: <ExamplePage />,
      },
      {
        path: 'emoji',
        element: <EmojiPage />,
      },
      {
        path: 'retro',
        element: <RetrospectWrite />,
      },
      {
        path: '/dateSelect',
        element: <DateSelectPage />,
      },
    ],
  },
]);

export default router;
