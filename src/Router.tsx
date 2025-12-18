import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Hompage from './pages/Hompage';
import ExamplePage from './pages/ExamplePage';

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
        path: 'example',
        element: <ExamplePage />,
      },
      {
        path: '/dateSelect',
        element: <DateSelectPage />,
      },
    ],
  },
]);

export default router;
