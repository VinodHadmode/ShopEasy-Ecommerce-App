import React, { useEffect, useState } from 'react'
import AdminMenu from '../components/Layout/AdminMenu'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { Link } from "react-router-dom"

const Products = () => {
    const [products, setProducts] = useState([])

    //getAllProducts API
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/product/get-product`)

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
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>

                <div className="col-md-9">
                    <h2 className="text-center">All Products</h2>
                    <div className="d-flex">
                        {
                            products?.map((p) => {
                                return <Link
                                    key={p._id}
                                    to={`/dashboard/admin/product/${p._id}`}
                                    className='product-link'
                                >
                                    <div className="card m-2" style={{ width: '18rem' }} >
                                        <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">{p.description}</p>
                                        </div>
                                    </div>
                                </Link>


                            })
                        }
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default Products
