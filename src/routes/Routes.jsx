import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/layout/Layout";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import AllProducts from "../pages/allProdects/AllProdects";
import Cart from "../pages/cart/Cart";
import MyProfile from "../pages/myProfile/MyProfile";
import DeleteAccount from "../pages/deleteAccount/DeleteAccount";
import { Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

export let myRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/allproducts",
        element: (
          <PrivateRoute>
            <AllProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "/editProfile/:id",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/accountDelete",
        element: (
          <PrivateRoute>
            <DeleteAccount />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
