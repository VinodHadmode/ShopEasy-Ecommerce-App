import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const CategoryProduct = () => {
    const [catWiseProduct, setCatWiseProduct] = useState([])
    const [category, setCategory] = useState([])

    const params = useParams()
    const navigate=useNavigate()

    //getCatWiseProduct
    const getCatWiseProduct = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-category/${params.slug}`)
            setCatWiseProduct(data?.products)
            setCategory(data?.category)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (params?.slug) getCatWiseProduct()
    }, [params?.slug])

    return (
        <Layout>
            <div className="container mt-3">
                <h4 className="text-center">Category : {category?.name}</h4>
                <h6 className="text-center">{catWiseProduct?.length} result found</h6>

                <div className="d-flex flex-wrap">
                    {
                        catWiseProduct?.map((p) => {
                            return (
                                <div className="card m-2" style={{ width: '18rem' }} key={p._id}>
                                    <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
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
                {/* <div className="m-2 p-3">
                    {catWiseProduct && catWiseProduct.length < total && (
                        <button className="btn btn-warning" onClick={handleLoadMore}>
                            {loading ? "Loading" : "Load More"}
                        </button>
                    )}
                </div> */}
            </div>
        </Layout>
    )
}

export default CategoryProduct
