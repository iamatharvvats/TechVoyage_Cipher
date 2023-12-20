import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from "../src/App"
import Leaderboard from './Components/Leaderboard/Leaderboard';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/leaderboard",
    element: <Leaderboard/>,
  },
  {
    path: "/about",
    element: "About Page",
  },
  {
    path: "/rules",
    element: "Rules and Regulations",
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
