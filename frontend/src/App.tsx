import Home from './views/home/Home';
import NotFound from './views/notFound/NotFound';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
console.log(import.meta.env.VITE_API_URL)

  const router = createBrowserRouter([
    {
      path: "/:itemId",
      element: <Home />,
    },
    {
      path: "/",
      element: <Home />, // optional: default home
    },
    {
      path: "*",
      element: <NotFound />,
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;