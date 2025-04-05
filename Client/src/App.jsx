import Register from "./components/defaultPage/Register.jsx";
import Login from "./components/defaultPage/Login.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return(   
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register/>} />
                <Route path="/login" element={<Login/>} />
            </Routes>
        </BrowserRouter>
    </>
  );
}
