import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function verif(password, confirmPassword) {
    if (password == confirmPassword) {
        document.querySelector("#passwordWarning").style.display = "none"
        return true
    } else {
        document.querySelector("#passwordWarning").style.display = "block"
        document.querySelector("#passwordWarning").style.color = "red"
        document.querySelector("#passwordWarning").innerHTML = "*Passwords don't match"
        return false
    }
}

export default function Register() {
    const [name, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmedPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()

        if (verif(password, confirmPassword)) {
            axios
                .post("http://localhost:8080/register", { name, email, password, confirmPassword })
                .then(navigate("/login"))
                .catch(err => console.log(err))
        }
    }

    return (
        <div className="defaultPage">
            <link rel="stylesheet" href="./defaultPage.css"></link>
            <h1 id="title">COLLABILITY</h1>

            <form id="form" onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    onChange={e => setUsername(e.target.value)}
                ></input>

                <label>Email</label>
                <input
                    type="text"
                    id="email"
                    placeholder="abc@gmail.com"
                    onChange={e => setEmail(e.target.value)}
                ></input>

                <div className="passwordBox">
                    <label>Password</label>
                    <div className="passwordBox">
                        <input
                            type="password"
                            id="password"
                            placeholder="Your password"
                            onChange={e => setPassword(e.target.value)}
                        ></input>
                    </div>

                    <label>Confirm your password</label>
                    <div className="passwordBox">
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirmed password"
                            onChange={e => setConfirmedPassword(e.target.value)}
                        ></input>
                    </div>
                    <label id="passwordWarning" className="warning"></label>
                </div>

                <div id="options">
                    <div id="redirects">
                        <div id="loginRedirect">
                            <a href="./login">Login</a>
                        </div>
                    </div>

                    <div id="rememberMeBox">
                        <label id="rememberMeLabel">Remember Me</label>
                        <input type="checkbox" id="rememberMe"></input>
                    </div>
                </div>

                <input type="submit" value="Register" id="submitButton"></input>
            </form>
        </div>
    )
}
