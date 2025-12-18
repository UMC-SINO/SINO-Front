import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Hompage from './pages/Hompage';
import ExamplePage from './pages/ExamplePage';
import SignupPage from './pages/signin/SignupPage';
import LoginPage from './pages/signin/LgoinPage';
import OnBoadingPage from './pages/OnBoardingPage';
import ReportView from './pages/ReportView';
import EmojiPage from './pages/EmojiPage';
import RetrospectWrite from './pages/RetrospectWrite/RestrospectWrite';
import AnalysisPage from './pages/AnalysisPage';
import ConfrimPage from './pages/ConfirmPage';
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
        element: <ConfrimPage />,
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
