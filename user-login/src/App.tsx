import React, { useReducer } from 'react';
import './App.css';
import UserReducer, { initialState, UserContext } from './User';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {router} from './components/AppRoutes';

const App: React.FC = () => {
  const [user, userDispatch] = useReducer(UserReducer, initialState);
  return (
    <UserContext.Provider value={{ user, userDispatch }}>
      <RouterProvider router={router} /> 
    </UserContext.Provider>
  );
}
export default App;
