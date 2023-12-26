import React, { useEffect, useState } from 'react'
import AdminMenu from '../components/Layout/AdminMenu'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'
import axios from 'axios'
import moment from "moment"
import { Select } from 'antd';
import { Option } from 'antd/es/mentions'
import {BASE_URL} from "../Helpers/helper"


const AdminOrders = () => {
    const [status, setStatus] = useState(["Not Process", "Processing", "Shipped", "Delivered", "Cancel"])
    const [changeStatus, setChangeStatus] = useState("")
    const [orders, setOrders] = useState([])
    const [auth, setAuth] = useAuth()

    //getAllOrders
    const getAllOrders = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/auth/all-orders`,
                {
                    headers: {
                        Authorization: `Bearer ${auth?.token}`
                    }
                })
            if (data?.success) {
                setOrders(data?.orders)
            }
        } catch (error) {
            console.log(error);
        }
    }
    // handleOrderStatus
    const handleOrderStatus = async (orderId, value) => {
        try {
            const { data } = await axios.put(`${BASE_URL}/api/v1/auth/order-status/${orderId}`, { status: value }, {
                headers: {
                    Authorization: `Bearer ${auth?.token}`
                }
            })
            getAllOrders()
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (auth?.token) {
            getAllOrders()
        }
    }, [auth?.token])

    return (
        <Layout>
            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col-md-4">
                        <AdminMenu />
                    </div>
                    <div className="col-md-7">
                        <h4 className="text-center mb-4">ALL ORDERS</h4>
                        {
                            orders?.map((o, i) => {
                                return (
                                    <div className="border shadow" key={o._id}>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Sr No.</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Buyer</th>
                                                    <th scope="col">Orders</th>
                                                    <th scope="col">Payment</th>
                                                    <th scope="col">Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td scope="row">{i + 1}</td>
                                                    <td>
                                                        <Select
                                                            bordered={false}
                                                            defaultValue={o?.status}
                                                            style={{ width: 120 }}
                                                            onChange={(value) => handleOrderStatus(o._id, value)}
                                                        >
                                                            {
                                                                status?.map((s, i) => {
                                                                    return <Option key={i} value={s}>
                                                                        {s}
                                                                    </Option>
                                                                })
                                                            }
                                                        </Select>
                                                    </td>
                                                    <td>{o?.buyer?.name}</td>
                                                    <td>{moment(o?.crearedAt).fromNow()}</td>
                                                    <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                                                    <td>{o?.products?.length}</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <div className="container">
                                            {
                                                o?.products?.map((p) => {
                                                    return (
                                                        <div className="row mb-2 p-3 card flex-row" key={p._id}>
                                                            <div className="col-md-4">
                                                                <img
                                                                    src={`${BASE_URL}/api/v1/product/product-photo/${p._id}`}
                                                                    className="card-img-top"
                                                                    alt={p.name}
                                                                />
                                                            </div>
                                                            <div className="col-md-8">
                                                                <p className="card-title">{p.name}</p>
                                                                <p className="card-text">{p.description.substring(0, 40)}...</p>
                                                                <p className="card-text">Price : ${p.price}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>


        </Layout>
    )
}

export default AdminOrders
