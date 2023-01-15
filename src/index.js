import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import { Editor } from './components/simulation/Editor'
import './index.css'
import { routes as r } from './config/routes'
import { Reachability } from './components/analysis/reachability/Reachability'
import { Boundedness } from './components/analysis//boundedness/Boundedness'
import { Liveness } from './components/analysis/liveness/Liveness'
import { Reversibility } from './components/analysis/reversibility/Reversibility'
import { IncidenceMatrix } from './components/analysis/incidence_matrix/IncidenceMatrix'
import { TInvariants } from './components/analysis/invariants/TInvariants'
import { SInvariants } from './components/analysis/invariants/SInvariants'
import { SiphonsTraps } from './components/analysis/siphons_traps/SiphonsTraps'

const container = document.getElementById('root');
const root = createRoot(container);
const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to={r.dashboard.slug} replace />,
    },
    {
        path: r.dashboard.uri,
        element: <App />,
        children: [
            {
                path: r.simulation.children[0].slug,
                element: <Editor />,
            },
            {
                path: r.analysis.children[0].slug,
                element: <Reachability />,
            },
            {
                path: r.analysis.children[1].slug,
                element: <Boundedness />,
            },
            {
                path: r.analysis.children[2].slug,
                element: <Liveness />,
            },
            {
                path: r.analysis.children[3].slug,
                element: <Reversibility />,
            },
            {
                path: r.analysis.children[4].slug,
                element: <IncidenceMatrix />,
            },
            {
                path: r.analysis.children[5].slug,
                element: <TInvariants />,
            },
            {
                path: r.analysis.children[6].slug,
                element: <SInvariants />,
            },
            {
                path: r.analysis.children[7].slug,
                element: <SiphonsTraps />,
            },
        ]
    }
])

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
