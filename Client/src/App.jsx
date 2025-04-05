import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import DailyCommissions from "./pages/DailyCommissions.jsx"
import StudyTimer from "./pages/StudyTimer.jsx"
import Board from "./pages/Board.jsx"

const router = createBrowserRouter([
    {
        path: "/",
        children: [
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "daily", element: <DailyCommissions /> },
            { path: "timer", element: <StudyTimer /> },
            { path: "board", element: <Board /> }
        ]
    }
])

createRoot(document.getElementById("root")).render(<RouterProvider router={router} />)
