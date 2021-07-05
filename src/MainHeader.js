import React, { useState, useRef, useEffect } from 'react';
import Axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { amazonDepartmentList } from './data';

function Header() {
    const [{ cart, user }, dispatch] = useStateValue()
    const [headerDepartment, setHeaderDepartment] = useState(false)
    const [userDropdown, setUserDropdown] = useState(false)
    const refDepts = useRef(null)
    const refUsers = useRef(null)
    const toggleButton = useRef(null)
    const userToggleButton = useRef(null)
    const [dept, setDept] = useState('')
    const [subDepts, setSubDepts] = useState(false)
    const history = useHistory()

    const oldDeptLists = amazonDepartmentList.map(item => item.departments)
    const newDeptLists = [...new Set(oldDeptLists)]
    const subDeptList = amazonDepartmentList.filter(item => item.departments === dept)

    Axios.defaults.withCredentials = true

    useEffect(() => {
        document.addEventListener("mousedown", handleDeptClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleDeptClickOutside);
        }
    })

    useEffect(() => {
        document.addEventListener("mousedown", handleUserClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleUserClickOutside);
        }
    })

    const handleDeptClickOutside = (event) => {
        if ((refDepts.current && !refDepts.current.contains(event.target))) {
            setHeaderDepartment(false)
            setSubDepts(false)
        }

        if (toggleButton.current.contains(event.target)) {
            setHeaderDepartment(!headerDepartment)
        }
    };

    const handleUserClickOutside = (event) => {
        if ((refUsers.current && !refUsers.current.contains(event.target))) {
            setUserDropdown(false)
        }

        if (userToggleButton.current.contains(event.target)) {
            setUserDropdown(!userDropdown)
        }
    };

    const handleDept = (dept) => {
        setDept(dept)
        setSubDepts(true)
    }

    const userLogOut = () => {
        Axios.get('http://localhost:3001/logout').then(response => {
            if (response.data.loggedIn === false) {
                dispatch({
                    type: "USER_LOGOUT"
                })
                setUserDropdown(false)
            }
        })
    }

    return (
        <header>
            <div className="nav__top lato f jcsb">
                <ul className="nav__top-left">
                    <li>Amazon's response to COVID-19</li>
                </ul>

                <ul className="nav__top-right f">
                    <li className="f aic">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-map-pin" width="13" height="13" viewBox="0 0 24 24" strokeWidth="2" stroke="#4C4B4D" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <circle cx="12" cy="11" r="3"></circle>
                            <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                        </svg>
                        <p>Indonesia</p>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down" width="13" height="13" viewBox="0 0 24 24" strokeWidth="2" stroke="#4C4B4D" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </li>
                    <li className="f aic">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-world" width="13" height="13" viewBox="0 0 24 24" strokeWidth="2" stroke="#4C4B4D" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <circle cx="12" cy="12" r="9"></circle>
                            <line x1="3.6" y1="9" x2="20.4" y2="9"></line>
                            <line x1="3.6" y1="15" x2="20.4" y2="15"></line>
                            <path d="M11.5 3a17 17 0 0 0 0 18"></path>
                            <path d="M12.5 3a17 17 0 0 1 0 18"></path>
                        </svg>
                        <p>ENG</p>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down" width="13" height="13" viewBox="0 0 24 24" strokeWidth="2" stroke="#4C4B4D" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </li>
                    <li className="f aic">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-cash" width="13" height="13" viewBox="0 0 24 24" strokeWidth="2" stroke="#4C4B4D" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <rect x="7" y="9" width="14" height="10" rx="2"></rect>
                            <circle cx="14" cy="14" r="2"></circle>
                            <path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2"></path>
                        </svg>
                        <p>USD</p>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down" width="13" height="13" viewBox="0 0 24 24" strokeWidth="2" stroke="#4C4B4D" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </li>
                    <li className="f aic">Costumer Service</li>
                    <li className="f aic">Sell on Amazon</li>
                </ul>
            </div>

            <nav className="nav f jcsb aic">
                <div className="relative">
                    <ul className="nav__links f aic">
                        <Link to="/" className="nav__link lato td-none">
                            <li>
                                <img className="nav__logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1000px-Amazon_logo.svg.png" alt="Amazon Logo" />
                            </li>
                        </Link>

                        <li className="nav__link nav__all lato f jcc aic" ref={toggleButton}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-border-all" width="25" height="25" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <rect x="4" y="4" width="16" height="16" rx="2" />
                                <line x1="4" y1="12" x2="20" y2="12" />
                                <line x1="12" y1="4" x2="12" y2="20" />
                            </svg>
                            ALL
                        </li>

                        <li className="nav__link lato">
                            Today's Deals
                        </li>

                        <li className="nav__link lato">
                            Gift Cards
                        </li>

                        <li className="nav__link lato">
                            Registry & Gifting
                        </li>
                    </ul>
                    <div className="allDropdowns" ref={refDepts}>
                        <div className={headerDepartment === true ? 'allDropdown active absolute' : 'allDropdown absolute'}>
                            <div className='allDropdown__left lato'>
                                <div className="allDropdown__text f jcsb aic">
                                    <p>Digital Content & Devices</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down" width="15" height="15" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </div>
                                <div className="allDropdown__text f jcsb aic">
                                    <p>All Departments</p>
                                </div>
                                {
                                    newDeptLists.map((item, index) => (
                                        <div className="allDropdown__text f jcsb aic" onClick={() => handleDept(item)} key={index}>
                                            <p>{item}</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-right" width="15" height="15" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <polyline points="9 6 15 12 9 18" />
                                            </svg>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className={subDepts === true ? 'allDropdown__right active lato' : 'allDropdown__right lato'}>
                                {
                                    subDeptList.map((item, index) => {
                                        return (
                                            <div className="allDropdown__right-subdept" key={index}>
                                                <div className="allDropdown__right-title">{item.subdepartment}</div>
                                                {
                                                    item.products.filter((item, index) => index < 5).map((item, index) => <div className="allDropdown__right-text" key={index}>{item}</div>)
                                                }
                                                <div className="allDropdown__right-view f aic">
                                                    <p>View more</p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-right" width="46" height="24" viewBox="0 0 46 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                                        <line x1="15" y1="16" x2="19" y2="12"></line>
                                                        <line x1="15" y1="8" x2="19" y2="12"></line>
                                                    </svg>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <ul className="nav__links f aic">
                        <Link to="/" className="nav__link lato">
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="25" height="25" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <circle cx="10" cy="10" r="7" />
                                    <line x1="21" y1="21" x2="15" y2="15" />
                                </svg>
                            </li>
                        </Link>
                        <li className="nav__link lato" ref={userToggleButton}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user" width="25" height="25" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <circle cx="12" cy="7" r="4" />
                                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                            </svg>
                        </li>
                        <Link to="/" className="nav__link lato">
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-heart" width="25" height="25" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                                </svg>
                            </li>
                        </Link>
                        <Link to="/checkout" className="nav__link lato relative">
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart" width="25" height="25" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <circle cx="6" cy="19" r="2" />
                                    <circle cx="17" cy="19" r="2" />
                                    <path d="M17 17h-11v-14h-2" />
                                    <path d="M6 5l14 1l-1 7h-13" />
                                </svg>

                                {
                                    cart.length === 0
                                        ? ''
                                        : <div className="cart__total lato f jcc aic absolute">
                                            {cart.reduce((total, item) => total += item.quantity, 0) > 9 ? '9+' : cart.reduce((total, item) => total += item.quantity, 0)}
                                        </div>
                                }

                            </li>
                        </Link>
                    </ul>
                    {
                        userDropdown && user !== null
                            ?
                            <div className="user__dropdown-signed lato absolute" ref={refUsers}>
                                <p>Your Account</p>
                                <p>Your Amazon Shop</p>
                                <p>Orders</p>
                                <p>Subscriptions</p>
                                <p>Content and Devices</p>
                                <p>Amazon Music</p>
                                <p onClick={userLogOut}>Sign Out</p>
                            </div>
                            : ''
                    }

                    {
                        userDropdown && user === null
                            ? <div className="user__dropdown-unsigned lato absolute" ref={refUsers}>
                                <Link to="/login" className="td-none link-black">Sign In</Link>
                            </div>
                            : ''
                    }
                </div>
            </nav>
        </header>
    )
}

export default Header
