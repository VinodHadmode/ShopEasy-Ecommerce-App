import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import "../Auth/Signup.css"
import axios from "axios"
import { useNavigate,Link } from "react-router-dom"
import Loginbanner from "../../Images/Login.jpg"
import { message } from 'antd';
import {BASE_URL} from "../../Helpers/helper"


const Signup = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    const navigate = useNavigate()

    //form submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const res = await axios.post(`${BASE_URL}/api/v1/auth/register`, { name, email, password, phone, address })
            if (res.data.success) {
                message.success(res.data.message)
                navigate("/login")
            } else {
                message.success(res.data.message)
            }

        } catch (error) {
            console.log(error);
            message.error(error)
        }
    }

    return (
        <Layout>
            <div className="signup">
                <img src={Loginbanner} className='loginbanner' />

                <form onSubmit={handleSubmit} className="p-3">
                    <h5 className="mb-3">Signup or Login</h5>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            id="exampleInputName"
                            placeholder="Name"
                            required
                        />
                    </div>

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

                    <div className="mb-3">
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                            id="exampleInputPhone"
                            placeholder="Phone"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-control"
                            id="exampleInputAddress"
                            placeholder="Address"
                            required
                        />
                    </div>
                    <div className="mb-3" style={{ color: "grey" }}>
                        <p>By continuing, I agree to <span style={{ color: "#FF6666" }}>terms of use & Policy</span> </p>
                    </div>

                    <div class="d-grid col-6 mx-auto mb-3">
                        <button type="submit" className="btn btn-danger">SIGN UP</button>
                    </div>

                    <div className="mb-3" style={{ color: "grey" }}>
                        <p className='small-text'>Already registered? <Link to={"/login"} style={{ color: "#FF6666", textDecoration: "none" }}>click here to login</Link></p>
                    </div>

                </form>

            </div>
        </Layout>
    )
}

export default Signup
