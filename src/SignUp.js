import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';

function SignUp() {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordReenter, setPasswordReenter] = useState("")

    const REGEX_EMAIL = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    const REGEX_PASSWORD = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)

    const history = useHistory();

    Axios.defaults.withCredentials = true

    const handleFullName = (event) => {
        setFullName(event.target.value)
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handlePasswordReenter = (event) => {
        setPasswordReenter(event.target.value)
    }

    const validateEmail = () => {
        return REGEX_EMAIL.test(email)
    }

    const validatePassword = () => {
        return REGEX_PASSWORD.test(password)
    }

    const validatePasswordReenter = () => {
        return password === passwordReenter
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateEmail() && validatePassword() && validatePasswordReenter()) {

            Axios.post('http://localhost:3001/register', {
                user_fullname: fullName,
                user_email: email,
                user_password: password
            })
                .then((response) => {
                    console.log(response)
                    if (!response.data.message) {
                        history.replace('/login')
                    }
                })
                .catch((error) => console.log(error));

        }

        if (validateEmail() === false) {
            console.log("email's wrong")
        }

        if (validatePassword() === false) {
            console.log("password's wrong")
        }

        if (validatePasswordReenter() === false) {
            console.log("password's not match")
        }
    }

    return (
        <div className="signup">
            <h1 className="signup-title">Create account</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-control f fdc lato">
                    <label htmlFor="name">Your Name</label>
                    <input type="text" name="fullname" className="lato" value={fullName} onChange={handleFullName} required />
                </div>

                <div className="form-control f fdc lato">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" className="lato" value={email} onChange={handleEmail} required />
                </div>

                <div className="form-control f fdc lato">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" className="lato" value={password} onChange={handlePassword} required />
                </div>

                <div className="form-control f fdc lato">
                    <label htmlFor="re-password">Re-enter Password</label>
                    <input type="password" name="re-password" className="lato" value={passwordReenter} onChange={handlePasswordReenter} required />
                </div>

                <button type="submit" className="form-control-button lato">Create your Amazon account</button>
            </form>

            <p>
                Already have an account?
            </p>
            <Link to="/login" className="td-none">Sign-In</Link>
        </div>
    )
}

export default SignUp
