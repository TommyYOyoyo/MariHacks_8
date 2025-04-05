import "../../styles/defaultPage.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8080/login", { email, password })
        .then(res => {
            if (res.data == "Incorrect password") {
                document.querySelector("#loginWarning").style.display = "block";
                document.querySelector("#loginWarning").style.color = "red";
                document.querySelector("#loginWarning").innerHTML = "*Incorrect password";
            } else if (res.data == "User not found") {
                document.querySelector("#loginWarning").style.display = "block";
                document.querySelector("#loginWarning").style.color = "red";
                document.querySelector("#loginWarning").innerHTML = "*User not found";
            } else {
                localStorage.setItem("sessionData", JSON.stringify(res.data));
                navigate("/homePage");
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="defaultPage">
            <link rel="stylesheet" href="./defaultPage.css"></link>
            <h1 id="title">COLLABILITY</h1>

            <form id="form" onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                    type="text"
                    id="email"
                    placeholder="abc@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                ></input>

                <div className="passwordBox">
                    <label>Password</label>
                    <div className="passwordBox">
                        <input
                            type="password"
                            id="password"
                            placeholder="Your password"
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                    </div>
                    <label id="loginWarning" className="warning"></label>
                </div>

                <div id="options">
                    <div id="redirects">
                        <div id="registerRedirect">
                            <a href="./register">Register</a>
                        </div>
                    </div>

                    <div id="rememberMeBox">
                        <label id="rememberMeLabel">Remember Me</label>
                        <input type="checkbox" id="rememberMe"></input>
                    </div>
                </div>

                <input type="submit" value="Login" id="submitButton"></input>
            </form>
        </div>
    );
}

export default Login;
