import React from 'react'
import { NavLink, Link } from "react-router-dom"
import { PiHandbagThin } from "react-icons/pi";
import { useAuth } from '../../context/auth';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import ShopEasyLogo from "../../Images/ShopEasyLogo.png"
import { Badge,message } from 'antd';

const Header = () => {

    const [auth, setAuth] = useAuth()

    const categories = useCategory()
    const [cart, setCart] = useCart()


    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: ""
        })

        localStorage.removeItem("authData")
        message.success("Logged out Successfully!!")
    }


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
                <div className="container-fluid">

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">

                        <NavLink to="/" className="navbar-brand logo-link">
                            <img src={ShopEasyLogo} alt="ShopEasyLogo" className="logo" /> Shop Easy
                        </NavLink>

                        <ul className="navbar-nav ms-auto mb-2 ms-2 mb-lg-0 ">
                            <li className="nav-item">
                                <NavLink to="/all-products" className="nav-link" aria-current="page" >All Products</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to="/category/mens" className="nav-link" aria-current="page" >MEN</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to="/category/womens" className="nav-link" aria-current="page" >WOMEN</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to="/category/kids" className="nav-link" aria-current="page" >KIDS</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to="/category/beauty" className="nav-link" aria-current="page" >BEAUTY</NavLink>
                            </li>

                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                >
                                    Category
                                </Link>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link to={`/categories`} className="dropdown-item">All Categories</Link>
                                    </li>
                                    {
                                        categories?.map((c) => {
                                            return (
                                                <li key={c._id}>
                                                    <Link to={`/category/${c.slug}`} className="dropdown-item">{c.name}</Link>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </li>

                        </ul>

                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="me-4">
                                <SearchInput />
                            </li>

                            {!auth.user ? (
                                <>
                                    <li className="nav-item">
                                        <NavLink to="/signup" className="nav-link">Signup</NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to="/login" className="nav-link">Login</NavLink>
                                    </li>
                                </>

                            ) : (
                                <>
                                    <li className="nav-item dropdown">
                                        <NavLink className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ borderBottom: 'none' }}>
                                            {auth.user && auth.user.name}
                                        </NavLink>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item" >Dashboard</NavLink>
                                            </li>

                                            <li className="dropdown-item">
                                                <NavLink onClick={handleLogout} to="/login" className="nav-link">Logout</NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                </>
                            )}

                            <li className="nav-item">
                                <Badge count={cart.length} showZero>
                                    <NavLink to="/cart" className="nav-link" >
                                        <PiHandbagThin style={{ fontSize: '24px', color: 'black' }} />
                                    </NavLink>
                                </Badge>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header
