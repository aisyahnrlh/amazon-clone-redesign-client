import React from 'react';
import { Link } from "react-router-dom";

function Header1() {
    return (
        <nav className="nav f jcc">
            <Link to="/">
                <img className="nav__logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1000px-Amazon_logo.svg.png" alt="Amazon Logo"></img>
            </Link>
        </nav>
    )
}

export default Header1
