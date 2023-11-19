import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FavouritiesPage from "./pages/FavouritiesPage";
import Navigation from "./components/Navigation";
import { Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    children: [
      { index: true, element: <Navigate to={"home"} /> },
      { path: "favourities", element: <FavouritiesPage /> },
      { path: "home", element: <HomePage /> },
    ],
  },
]);
