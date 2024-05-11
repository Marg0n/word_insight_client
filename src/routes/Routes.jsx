import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";

import Root from './../layouts/Root';
import Home from './../pages/Home';
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import AddBlog from "../pages/AddBlog";
import PrivateRoute from './../components/PrivateRoute';
import EditBlog from "../pages/EditBlog";
import AllBlogs from "../pages/AllBlogs";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
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
                path: "/registration",
                element: <Register />,
            },
            {
                path: "/allBlogs",
                element: <AllBlogs />,
                loader: () => fetch(`${import.meta.env.VITE_SERVER}/allBlogs`),
        
              },
            {
                path: "/addBlog",
                element:<PrivateRoute><AddBlog /></PrivateRoute> ,
            },
            {
                path: "/myBlogs",
                element:<PrivateRoute><AddBlog /></PrivateRoute> ,
            },
            {
                path: "/myBlogs/edit/:id",
                element:<PrivateRoute><EditBlog /></PrivateRoute> ,
            },

        ],
    },
]);