
import Home from './views/home/Home'
import NotFound from './views/notFound/NotFound'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'



function App() {

  const router = createBrowserRouter([
  {
    path: "/:itemId",
    element: (
      <Home />
    ),
    errorElement: <NotFound />,
  }
])

  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App
