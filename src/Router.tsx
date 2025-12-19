import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from './pages/Hompage';
import ExamplePage from './pages/ExamplePage';
import SignupPage from './pages/signin/SignupPage';
import LoginPage from './pages/signin/LoginPage';
import OnBoardingPage from './pages/OnBoardingPage';
import ReportView from './pages/ReportView';
import EmojiPage from './pages/EmojiPage';
import RetrospectWrite from './pages/RetrospectWrite/RestrospectWritePage';
import ConfirmPage from './pages/ConfirmPage';
import DateSelectPage from './pages/DateSelectPage';
import SplashPage from './pages/SplashPage';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
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
        element: <OnBoardingPage />,
      },
      {
        path: 'report-view',
        element: <ReportView />,
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
        path: 'confirm',
        element: <ConfirmPage />,
      },
      {
        path: 'emoji',
        element: <EmojiPage />,
      },
      {
        path: 'date-select',
        element: <DateSelectPage />,
      },
      {
        path: 'splash',
        element: <SplashPage />,
      },
    ],
  },
]);

export default router;
