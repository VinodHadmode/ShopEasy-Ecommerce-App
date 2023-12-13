import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const ProductDetails = () => {
    const [product, setProduct] = useState({})
    const [relatedProducts, setReleatedProducts] = useState([])

    const params = useParams()
    const navigate = useNavigate()

    //getSingleProduct
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/product/single-product/${params.id}`)
            setProduct(data?.product)
            getrelatedProducts(data?.product?._id, data?.product?.category._id)
        } catch (error) {
            console.log(error);
        }
    }

    //getrelatedProducts
    const getrelatedProducts = async (pid, cid) => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/product/related-products/${pid}/${cid}`)
            setReleatedProducts(data?.similarProducts)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (params?.id) getSingleProduct()
    }, [params?.id])

    return (
        <Layout>
            <h1>ProductDetails</h1>
            <div className="row container mt-3">
                <div className="col-md-6">
                    {product._id && (
                        <img
                            src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                            className="card-img-top"
                            alt={product.name}
                            height={"300px"}
                            width={"200px"}
                        />
                    )}
                </div>
                <div className="col-md-6">
                    <h1 className='text-center'>Product Details</h1>
                    <h6>Product Name : {product.name}</h6>
                    <h6>Product Description : {product.description}</h6>
                    <h6>Product Price : {product.price}</h6>
                    <h6>Product Category : {product.category?.name}</h6>
                    <button type="button" className="btn btn-info">ADD TO CART</button>

                </div>
            </div>
            <hr />
            <div className="row container">
                <h6 className="text-center">Similar Products</h6>
                {relatedProducts.length < 1 && (<p className="text-center">No Similar Product Found..</p>)}
                <div className="d-flex flex-wrap">
                    {
                        relatedProducts?.map((p) => {
                            return (
                                <div className="card m-2" style={{ width: '18rem' }} key={p._id}>
                                    <img
                                        src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                        height={"300px"}
                                        width={"200px"}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">${p.price}</p>
                                        <p className="card-text">{p.description.substring(0, 40)}...</p>

                                        <button type="button" className="btn btn-primary ms-2" onClick={() => navigate(`/product/${p._id}`)}>More Details</button>
                                        <button type="button" className="btn btn-info ms-2">ADD TO CART</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </Layout>
    )
}

export default ProductDetails
