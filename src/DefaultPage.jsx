import './defaultPage.css';
import eyeImg from './assets/eye.png';

function DefaultPage() {
    return (
        <div class="defaultPage">
            <link rel="stylesheet" href="./defaultPage.css"></link>
            <h1 id="title">COLLABILITY</h1>
            <form id="form">

                <label>Email</label>
                <input type="text" id="email" placeholder="abc@gmail.com"></input>
                <label id="emailWarning" class="warning"></label>

                    <div class="passwordBox">
                        <label>Password</label>
                        <div class="passwordBox">
                            <input type="password" id="password" placeholder="Your password"></input>
                            <img src={eyeImg} id="seePassword"></img>
                        </div>
                        <label id="passwordWarning" class="warning"></label>

                        <label>Confirm your password</label>
                        <div class="passwordBox">
                            <input type="password" id="confirmPassword" placeholder="Confirmed password"></input>
                            <img src={eyeImg} id="seeConfirmedPassword"></img>
                        </div>
                        <label id="confirmPasswordWarning" class="warning"></label>
                    </div>

                <div id="options">
                    <div id="redirects">
                        <div id="loginRedirect">
                            <a href="./login.html">Login directly</a>
                        </div>

                        <div id="forgetPassword">
                            <button>Forgot your password?</button>
                        </div>
                    </div>

                    <div id="rememberMeBox">
                        <label id="rememberMeLabel">Remember Me</label>
                        <input type="checkbox" id="rememberMe"></input>
                    </div>
                </div>

                <input type="submit" value="CONNECTER" id="submitButton"></input>
            </form>
        </div>
    );
}

export default DefaultPage
