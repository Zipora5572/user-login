import { createBrowserRouter } from 'react-router';
import Login from './Login';
import HomePage from './home';

export const router = createBrowserRouter(
    [
        { path: '/', element: <Login /> },
        { path: '/login', element: <Login /> },
        {
            path: '/home',
            element: <HomePage />
        },
        {
            path: '/login/home',
            element: <HomePage />
        },

])



