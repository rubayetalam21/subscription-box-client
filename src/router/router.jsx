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
import UpdateGroup from '../Pages/UpdateGroup';
import GroupDetails from '../Pages/GroupDetails';
import FeaturedGroups from '../Pages/FeaturedGroups';


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
            {
                path: 'updateGroup/:id',
                // loader: ({ params }) => fetch(`https://b11a10-server-side-rubayetalam21.vercel.app/hobbies/${params.id}`),
                element: <PrivateRoute><UpdateGroup></UpdateGroup></PrivateRoute>
            },
            {
                path: 'groupDetails/:id',
                element: <PrivateRoute><GroupDetails></GroupDetails></PrivateRoute>
            }
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
        path: 'featuredGroup',
        element: <FeaturedGroups></FeaturedGroups>
    },
    {
        path: '/*',
        element: <ErrorPage></ErrorPage>,
    },
]);

export default router;