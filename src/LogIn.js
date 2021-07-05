import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from './StateProvider';
import Axios from 'axios';

function SignIn() {
    const [{ user, cart }, dispatch] = useStateValue()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory();

    Axios.defaults.withCredentials = true

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        Axios.post('http://localhost:3001/login', {
            user_email: email,
            user_password: password
        })
            .then((response) => {
                if (response.data.message) {
                    console.log(response.data.message);
                } else {
                    dispatch({
                        type: "USER_LOGIN",
                        payload: {
                            user: response.data[0].user_email
                        }
                    })
                    history.replace('/')
                }
            })
            .catch((error) => console.log(error));
    }

    return (
        <div className="signup">
            <h1 className="signup-title">Sign-In</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-control f fdc lato">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" className="lato" value={email} onChange={handleEmail} required />
                </div>

                <div className="form-control f fdc lato">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" className="lato" value={password} onChange={handlePassword} required />
                </div>
                <div className="form-control f jcsb lato">
                    <label htmlFor="keepSignedIn">
                        <input type="checkbox" />
                        Keep me signed in
                    </label>
                    <Link to="/" className="td-none">Forgot password?</Link>
                </div>
                <button type="submit" className="form-control-button lato">Sign-In</button>
            </form>
            <p>New to Amazon?</p>
            <Link to="/signup" className="td-none">Create your Amazon account</Link>
        </div>
    )
}

export default SignIn
