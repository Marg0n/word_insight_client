import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";

import AddBlog from "../pages/AddBlog";
import AllBlogs from "../pages/AllBlogs";
import EditBlog from "../pages/EditBlog";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import PrivateRoute from './../components/PrivateRoute';
import Root from './../layouts/Root';
import Home from './../pages/Home';
import BlogDetails from "../pages/BlogDetails";
import Wishlist from "../pages/Wishlist";


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
                path: "/allBlogs/:id",
                element: <PrivateRoute> <BlogDetails/> </PrivateRoute>,
            },
            {
                path: "/addBlog",
                element: <PrivateRoute><AddBlog /></PrivateRoute>,
            },
            {
                path: "/myBlogs",
                element: <PrivateRoute>  </PrivateRoute>,
            },
            {
                path: "/myBlogs/edit/:id",
                element: <PrivateRoute><EditBlog /></PrivateRoute>,
            },
            {
                path: "/wishlist",
                element: <PrivateRoute><Wishlist /></PrivateRoute>,
            },
            {
                path: "/wishlist/:id",
                element: <PrivateRoute><Wishlist /></PrivateRoute>,
            },

        ],
    },
]);