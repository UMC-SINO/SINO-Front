import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Hompage from './pages/Hompage';
import ExamplePage from './pages/ExamplePage';
import SignupPage from './pages/signin/SignupPage';
import LoginPage from './pages/signin/LgoinPage';
import OnBoadingPage from './pages/OnBoardingPage';
import ReportView from './pages/ReportView';

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
    ],
  },
]);

export default router;
