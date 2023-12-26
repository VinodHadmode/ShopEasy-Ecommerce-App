import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useCart } from '../context/cart'
import { message } from 'antd';
import { BASE_URL } from '../Helpers/helper'

const ProductDetails = () => {
    const [product, setProduct] = useState({})
    const [relatedProducts, setReleatedProducts] = useState([])
    const [cart, setCart] = useCart()

    const params = useParams()
    const navigate = useNavigate()

    //getSingleProduct
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/product/single-product/${params.id}`)
            setProduct(data?.product)
            getrelatedProducts(data?.product?._id, data?.product?.category._id)
        } catch (error) {
            console.log(error);
        }
    }

    //getrelatedProducts
    const getrelatedProducts = async (pid, cid) => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/product/related-products/${pid}/${cid}`)
            setReleatedProducts(data?.similarProducts)

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
        if (params?.id) getSingleProduct()
    }, [params?.id])

    return (
        <Layout>
            <div className="container mt-5 product-section">
                <div className="row g-4" style={{ display: "flex", justifyContent: "space-around" }}>
                    <div className="col-md-6 card product-image">
                        {product._id && (
                            <img
                                src={`${BASE_URL}/api/v1/product/product-photo/${product._id}`}
                                className="card-img-top  mx-auto d-block"
                                alt={product.name}
                                style={{ height: "300px", width: "auto", maxWidth: "100%" }}
                            />
                        )}
                    </div>
                    <div className="col-md-6 card p-4 product-details">
                        <h4>{product.name}</h4>
                        <p>{product.description}</p>
                        <h5><span style={{ color: 'green' }}>${product.price}</span></h5>
                        <p>{product.category?.name} Category</p>
                        <button type="button" className="btn btn-outline-success" onClick={() => handleCart(product)}>ADD TO CART</button>
                    </div>
                </div>
            </div>

            <hr className="mt-5 mb-4" />

            <div className="container">
                <h5>SIMILAR PRODUCTS</h5>
                {relatedProducts.length < 1 && (<h5 className="text-center">No Similar Product Found..</h5>)}
                <div className="row row-cols-1 row-cols-md-4 g-4 mt-3">
                    {
                        relatedProducts?.map((p) => (
                            <div className="col" key={p._id}>
                                <div className="card" style={{ width: "18rem" }}>
                                    <img
                                        src={`${BASE_URL}/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                        style={{ objectFit: 'cover', height: '200px' }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <h5 className="price-text"><span style={{ color: 'green' }}>${p.price}</span></h5>
                                        <p className="card-text">{p.description.substring(0, 40)}...</p>
                                        <div className="d-flex justify-content-between">
                                            <button type="button" className="btn btn-outline-primary" onClick={() => navigate(`/product/${p._id}`)}>
                                                MORE DETAILS
                                            </button>
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

        </Layout>
    )
}

export default ProductDetails
