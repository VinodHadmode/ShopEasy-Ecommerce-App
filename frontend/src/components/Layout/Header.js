import React from 'react'
import { NavLink, Link } from "react-router-dom"
import { RiShoppingBag2Line } from "react-icons/ri";
import { useAuth } from '../../context/auth';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';


const Header = () => {

    const [auth, setAuth] = useAuth()

    const categories = useCategory()
    const [cart, setCart] = useCart()


    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: ""
        })

        localStorage.removeItem("authData")
        alert("Logged out Successfully!!")
    }


    return (
        < >
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">

                        <Link to="/" className="navbar-brand">
                            <RiShoppingBag2Line /> EShop
                        </Link>

                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <SearchInput />
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link" aria-current="page" >Home</NavLink>
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
                                //adding dropdown menu
                                <>
                                    <li className="nav-item dropdown">
                                        <NavLink className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
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
                                <NavLink to="/cart" className="nav-link" >Cart({cart.length})</NavLink>
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header
