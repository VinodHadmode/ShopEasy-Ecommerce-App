import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import "../Auth/Login.css"
import axios from "axios"
import { useLocation, useNavigate, Link } from "react-router-dom"
import { useAuth } from '../../context/auth'
import Loginbanner from "../../Images/Login.jpg"
import { message } from 'antd';
import {BASE_URL} from "../../Helpers/helper"


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [auth, setAuth] = useAuth()

    const navigate = useNavigate()
    const location = useLocation()

    //form submit function
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const res = await axios.post(`${BASE_URL}/api/v1/auth/login`, { email, password })
            if (res.data.success) {
                message.success(res.data.message || "login succes")
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })

                localStorage.setItem("authData", JSON.stringify(res.data))
                navigate(location.state || "/")
            } else {
                console.log(res.data.message);
                message.error("Login failed, Enter correct credentials!!")
            }

        } catch (error) {
            console.log(error);
            message.error("Login failed, Enter correct credentials!!")
        }
    }
    return (
        <Layout>
            <div className="login">
                <img src={Loginbanner} className='loginbanner' />

                <form onSubmit={handleSubmit} className="p-3">
                    <h5 className="mb-3">Login or Signup </h5>
                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail"
                            placeholder="Email"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div className="mb-3" style={{ color: "grey" }}>
                        <p>By continuing, I agree to <span style={{ color: "#FF6666" }}>terms of use & Policy</span> </p>
                    </div>
                    <div class="d-grid col-6 mx-auto mb-3">
                        <button type="submit" class="btn btn-danger">LOG IN</button>
                    </div>
                    <div className="mb-3" style={{ color: "grey" }}>
                        <p className='small-text'>Not Signed up? <Link to={"/signup"} style={{ color: "#FF6666", textDecoration: "none" }}>click here</Link></p>
                    </div>
                </form>

            </div>
        </Layout>
    )
}

export default Login
