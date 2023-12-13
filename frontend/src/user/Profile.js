import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import UserMenu from '../components/Layout/UserMenu'
import { useAuth } from '../context/auth'
import axios from 'axios'

const Profile = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    const [auth, setAuth] = useAuth()

    //form submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`http://localhost:8080/api/v1/auth/profile`,
                { name, email, password, phone, address },
                {
                    headers: {
                        Authorization: `Bearer ${auth?.token}`
                    }
                })

            if (data?.success) {
                setAuth({ ...auth, user: data?.updatedUser })
                let ls = localStorage.getItem("authData")
                ls = JSON.parse(ls)
                ls.user = data?.updatedUser
                localStorage.setItem("authData", JSON.stringify(ls))
                alert("Profile Updated Successfully!!")

            } else {
                alert(data?.error)
            }
        } catch (error) {
            console.log(error);
            alert(error)
        }
    }

    //get Initial user Data
    useEffect(() => {
        const { name, email, phone, address } = auth?.user
        setName(name)
        setEmail(email)
        setPhone(phone)
        setAddress(address)
    }, [auth?.user])

    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Profile</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="form-control"
                                    id="exampleInputName"
                                    placeholder="Enter Your Name"
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-control"
                                    id="exampleInputEmail"
                                    placeholder="Enter Your Email"
                                    disabled
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

                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="form-control"
                                    id="exampleInputPhone"
                                    placeholder="Enter Your Phone"

                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="form-control"
                                    id="exampleInputAddress"
                                    placeholder="Enter Your Address"

                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile
