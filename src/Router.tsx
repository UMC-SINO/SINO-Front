import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ExamplePage from './pages/ExamplePage';
import SignupPage from './pages/signin/SignupPage';
import LoginPage from './pages/signin/LoginPage';
import OnBoardingPage from './pages/OnBoardingPage';
import ReportView from './pages/ReportView';
import EmojiPage from './pages/EmojiPage';
import RetrospectWrite from './pages/RetrospectWrite/RestrospectWritePage';
import AnalysisPage from './pages/AnalysisPage';
import ConfirmPage from './pages/ConfirmPage';
import DateSelectPage from './pages/DateSelectPage';
import SplashPage from './pages/SplashPage';
import Homepage from './pages/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Homepage />,
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
        path: 'analysis',
        element: <AnalysisPage />,
      },
      {
        path: 'emoji',
        element: <EmojiPage />,
      },
      {
        path: 'dateSelect',
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
