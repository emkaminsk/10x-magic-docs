import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import GithubActionsPage from "./components/docs/github-actions/GithubActionsPage";
import PyTorchPage from "./components/docs/pytorch/PyTorchPage";
import AstroPage from "./components/docs/astro/AstroPage";

/* Each page should be wrapped in the Layout component */
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: "/docs/github-actions",
    element: (
      <Layout>
        <GithubActionsPage />
      </Layout>
    ),
  },
  {
    path: "/docs/pytorch",
    element: (
      <Layout>
        <PyTorchPage />
      </Layout>
    ),
  },
  {
    path: "/docs/astro",
    element: (
      <Layout>
        <AstroPage />
      </Layout>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
