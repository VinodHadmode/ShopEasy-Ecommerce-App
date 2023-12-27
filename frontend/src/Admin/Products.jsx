import React, { useEffect, useState } from 'react'
import AdminMenu from '../components/Layout/AdminMenu'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import { BASE_URL } from '../Helpers/helper'

const Products = () => {
    const [products, setProducts] = useState([])

    const navigate = useNavigate()

    //getAllProducts API
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/product/get-product`)

            if (data?.success) {
                setProducts(data.products)
            } else {
                console.log(data.message);
                alert(data.message)
            }

        } catch (error) {
            console.log(error);
            alert("Something Went Wrong !!")
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])
    return (
        <Layout>
            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col-md-4">
                        <AdminMenu />
                    </div>

                    <div className="col-md-7">
                        <h4 className="text-center mb-4">ALL PRODUCTS</h4>
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            {
                                products?.map((p) => (
                                    <Link
                                        key={p._id}
                                        to={`/dashboard/admin/product/${p._id}`}
                                        className='product-link'
                                    >
                                        <div className="col">
                                            <div className="card h-100">
                                                <img
                                                    src={`${BASE_URL}/api/v1/product/product-photo/${p._id}`}
                                                    className="card-img-top p-3"
                                                    alt={p.name}
                                                    style={{ objectFit: 'cover', height: '200px' }}
                                                />
                                                <div className="card-body">
                                                    <h5 className="card-title">{p.name}</h5>
                                                    <h5 className="price-text"><span style={{ color: 'green' }}>${p.price}</span></h5>
                                                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products
