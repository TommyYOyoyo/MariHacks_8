import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import DailyCommissions from "./pages/DailyCommissions.jsx"
import StudyTimer from "./pages/StudyTimer.jsx"
import Container from "./components/Container.jsx"
import Home from "./pages/Home.jsx"
import Calendar from "./pages/Calendar.jsx"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "mission", element: <DailyCommissions /> },
            { path: "timer", element: <StudyTimer /> },
            { path: "whiteboard", element: <Container /> },
            { path: "calendar", element: <Calendar /> }
        ]
    }
])

createRoot(document.getElementById("root")).render(<RouterProvider router={router} />)
