
import { createBrowserRouter } from 'react-router-dom';
import EditProfile from './EditProfile';
import About from './About'; 
import AppLayout from './AppLayout';
import HomePage from './Home';

export const router = createBrowserRouter([
    {
        path: '/', element: <AppLayout />,
        errorElement: <h1>error</h1>,
        children: [
            { path: 'home', element: <HomePage /> },
            { path: 'about', element: <About /> },
            ]
    },
    {
                path: '/editProfile',
                element: <EditProfile />
            },
          
])