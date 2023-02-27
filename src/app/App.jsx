import React from 'react';
import "./App.css";

import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import ProjectManager from "./components/ProjectManager/ProjectManager";

export default function App() {

    const router = createMemoryRouter([
        {
            path: "/",
            element: <ProjectManager />,
        },
    ]);
    return (
        <RouterProvider router={router} />
    );
}