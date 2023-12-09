import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import "../Auth/Signup.css"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from '../../context/auth'

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

            const res = await axios.post(`http://localhost:8080/api/v1/auth/login`, { email, password })
            if (res.data.success) {
                alert(res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })

                localStorage.setItem("authData", JSON.stringify(res.data))
                // console.log("location state",location.state);

                navigate(location.state || "/")
            } else {
                console.log(res.data.message);
                alert("Login failed, Enter correct credentials!!")
            }

        } catch (error) {
            console.log(error);
            alert("Login failed, Enter correct credentials!!")
        }
    }
    return (
        <Layout>
            <div className="signup">
                <h1>LOGIN FORM</h1> <br />

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail"
                            placeholder="Enter Your Email"
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
                            placeholder="Enter Your Password"
                            required
                        />
                    </div>



                    <button type="submit" className="btn btn-primary">Login</button>
                </form>

            </div>
        </Layout>
    )
}

export default Login
