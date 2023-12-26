import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
    return (
        <div>
            <div className="text-center">
                <div className="list-group">
                    <h4 className="text-center">Dashboard</h4>
                    <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action" aria-current="true">
                        Your Profile
                    </NavLink>
                    <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">
                        Your Orders
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default UserMenu
