import { createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import Cards from "./Cards";
import Register from "./Register";
import Error from "./Error";
import Root from "../layouts/Root";
import ProtectedRoute from "../components/ProtectedRoute";
import Profile from "./Profile";
import UpdateCard from "./UpdateCard";
import CreateCard from "./CreatCard";
import MyCards from "./MyCards";
import FavoriteCards from "./FavoriteCards";
import { About } from "../components/About/About";
import SearchResults from "./SearchResults";
import Card from "./Card";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Cards /> },
      { path: '/register', element: <Register /> },
      { path: "/cards/:id", element: <Card /> },
      { path: '/login', element: <Login /> },
      { path: "/cards", element: <Cards /> },
      { path: "/createCard", element: <CreateCard /> },
      { path: "/favoriteCard", element: <FavoriteCards /> },
      { path: "/about", element: <About /> },
      { path: "/search", element: <SearchResults /> },
      {
        path: "/update/:id",
        element: <UpdateCard />,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-cards",
        element: (
          <ProtectedRoute>
            <MyCards />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
