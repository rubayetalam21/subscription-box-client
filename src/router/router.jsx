import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from "../Pages/ErrorPage";
import HomeLayout from '../layouts/HomeLayout';
import Home from '../Pages/Home';
import AllGroup from '../Pages/AllGroup';
import MyGroup from '../Pages/MyGroup';
import CreateGroup from '../Pages/CreateGroup';
import AuthLayout from '../layouts/AuthLayout';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import ForgetPassword from '../Pages/ForgetPassword';
import PrivateRoute from '../Provider/PrivateRoute';


const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout></HomeLayout>,
        children: [
            {
                path: '',
                element: <Home></Home>,
            },
            {
                path: 'allGroup',
                element: <AllGroup></AllGroup>,
            },
            {
                path: 'myGroup',
                element: <PrivateRoute><MyGroup></MyGroup></PrivateRoute>,
            },
            {
                path: 'createGroup',
                element: <PrivateRoute><CreateGroup></CreateGroup></PrivateRoute>,
            },
        ],
    },
    {
        path: '/auth',
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: "/auth/login",
                element: <Login></Login>,
            },
            {
                path: "/auth/register",
                element: <Register></Register>,
            },
            {
                path: "/auth/password",
                element: <ForgetPassword></ForgetPassword>,
            },
        ],
    },
    {
        path: '/*',
        element: <ErrorPage></ErrorPage>,
    },
]);

export default router;