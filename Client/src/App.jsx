import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import DailyCommissions from "./pages/DailyCommissions.jsx"
// import Calendar from "./components/Calendar.jsx"
import StudyTimer from "./pages/StudyTimer.jsx"

const router = createBrowserRouter([
    {
        path: "/",
        children: [
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> }
        ]
    }
])

createRoot(document.getElementById("root")).render(<RouterProvider router={router} />)
