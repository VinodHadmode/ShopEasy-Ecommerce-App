import React from 'react'
import { NavLink ,Link} from "react-router-dom"
import { RiShoppingBag2Line } from "react-icons/ri";

const Header = () => {
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
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link" aria-current="page" >Home</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to="/category" className="nav-link" aria-current="page">Category</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to="/signup" className="nav-link">Signup</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to="/login" className="nav-link">Login</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to="/cart" className="nav-link" >Cart(0)</NavLink>
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header
