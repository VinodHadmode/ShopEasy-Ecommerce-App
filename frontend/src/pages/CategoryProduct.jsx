import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useCart } from '../context/cart'
import { message } from 'antd';
import { BASE_URL } from '../Helpers/helper'

const CategoryProduct = () => {
    const [catWiseProduct, setCatWiseProduct] = useState([])
    const [category, setCategory] = useState([])

    const [cart, setCart] = useCart()
    const params = useParams()
    const navigate = useNavigate()

    //getCatWiseProduct
    const getCatWiseProduct = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/product/product-category/${params.slug}`)
            setCatWiseProduct(data?.products)
            setCategory(data?.category)
        } catch (error) {
            console.log(error);
        }
    }

    //handleCart
    const handleCart = (prod) => {
        setCart([...cart, prod])
        localStorage.setItem("cartProduct", JSON.stringify([...cart, prod]))
        message.success(`Item added to cart!!`)
    }

    useEffect(() => {
        if (params?.slug) getCatWiseProduct()
    }, [params?.slug])

    return (
        <Layout>
            <div className="container mt-3">
                <h5 className="text-center">Category : {category?.name}</h5>
                <h5 className="text-center">Results found : {catWiseProduct?.length} </h5>

                <div className="container mt-4">
                    <div className="row row-cols-1 row-cols-md-4 g-4">
                        {
                            catWiseProduct?.map((p) => (
                                <div className="col" key={p._id}>
                                    <div className="card" style={{width: "18rem"}}>
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
                                            <div className="d-flex justify-content-between">
                                                <button type="button" className="btn btn-outline-primary" onClick={() => navigate(`/product/${p._id}`)}>
                                                MORE DETAILS
                                                </button>
                                                <div style={{ width: '10px' }}></div> 
                                                <button type="button" className="btn btn-outline-success" onClick={() => handleCart(p)}>
                                                    CART
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CategoryProduct
