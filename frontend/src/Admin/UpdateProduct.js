import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import AdminMenu from '../components/Layout/AdminMenu'
import axios from 'axios'
import { Select } from "antd"
import { useAuth } from '../context/auth'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateProduct = () => {
    const [auth, setAuth] = useAuth();
    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [photo, setPhoto] = useState("")
    const [quantity, setQuantity] = useState("")
    const [category, setCategory] = useState("")
    const [shipping, setShipping] = useState("")
    const [id, setId] = useState("")

    const { Option } = Select
    const navigate = useNavigate()
    const params = useParams()

    //get simgle product
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/product/single-product/${params.id}`)

            if (data?.success) {
                setName(data.product.name)
                setDescription(data.product.description)
                setId(data.product._id)
                setPrice(data.product.price)
                setQuantity(data.product.quantity)
                setCategory(data.product.category._id)
                setShipping(data.product.shipping)
            }
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getSingleProduct()
    }, [])

    //getAll Categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/category/get-category`)

            if (data?.success) {
                setCategories(data.categories)
                // console.log(data);
            }
        } catch (error) {
            console.log(error);
            alert(error)
        }
    }

    useEffect(() => {
        getAllCategory()
    }, [])

    //handleCreateProduct
    const handleUpdateProduct = async (e) => {
        e.preventDefault()

        try {
            const productData = new FormData()
            productData.append("name", name)
            productData.append("description", description)
            productData.append("price", price)
            photo && productData.append("photo", photo)
            productData.append("quantity", quantity)
            productData.append("category", category)

            const { data } = await axios.put(`http://localhost:8080/api/v1/product//update-product/${id}`, productData,
                {
                    headers: {
                        Authorization: `Bearer ${auth?.token}`
                    }
                })
            if (data?.success) {
                console.log(data.message);
                alert(data.message);
                navigate("/dashboard/admin/products")
            } else {
                alert(data.error || "Something Went Wrong While Updating New Product!!");
            }

        } catch (error) {
            console.log(error);
            alert("Something Went Wrong While Updating New Product!!")
        }

    }

    //handleDeleteProduct
    const handleDeleteProduct = async () => {
        try {
            const { data } = await axios.delete(`http://localhost:8080/api/v1/product//delete-product/${id}`)

            if (data?.success) {
                alert(data.message)
                navigate("/dashboard/admin/products")
            } else {
                alert(data.message)
            }

        } catch (error) {
            console.log(error);
            alert("Something Went Wrong while Deleting Product!!")

        }
    }


    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h3>Update Product</h3>

                        <form>
                            <div className="m-1 w-70">
                                <Select
                                    bordered={false}
                                    placeholder="Select Category"
                                    size='large'
                                    showSearch
                                    className='form-select mb-3'
                                    value={category}
                                    onChange={(value) => { setCategory(value) }}
                                >
                                    {
                                        categories?.map((c) => {
                                            return <Option key={c._id} value={c._id}>{c.name}</Option>
                                        })
                                    }

                                </Select>

                                <div className="mb-3">
                                    <label className='btn btn-outline-secondary col-md-12'>
                                        {photo ? photo.name : "Upload Product Image"}
                                        <input
                                            type="file"

                                            accept="image/*"
                                            hidden
                                            required
                                            onChange={(e) => { setPhoto(e.target.files[0]) }}
                                        />
                                    </label>
                                </div>
                                <div className="mb-3 text-center">
                                    {photo ? (
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt='Product Image'
                                            height={"200px"}
                                            className='img img-responsive'
                                        />
                                    ) : (
                                        <img
                                            src={`http://localhost:8080/api/v1/product/product-photo/${id}`}
                                            alt='Product Image'
                                            height={"200px"}
                                            className='img img-responsive'
                                        />
                                    )}
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="text"
                                        placeholder='Enter Product Name'
                                        className='form-control'
                                        required
                                        value={name}
                                        onChange={(e) => { setName(e.target.value) }}
                                    />
                                </div>

                                <div className="mb-3">
                                    <textarea
                                        type="text"
                                        placeholder='Enter Product Description'
                                        className='form-control'
                                        required
                                        value={description}
                                        onChange={(e) => { setDescription(e.target.value) }}
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="number"
                                        placeholder='Enter Product Price'
                                        className='form-control'
                                        required
                                        value={price}
                                        onChange={(e) => { setPrice(e.target.value) }}
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="number"
                                        placeholder='Enter Product Quantity'
                                        className='form-control'
                                        required
                                        value={quantity}
                                        onChange={(e) => { setQuantity(e.target.value) }}
                                    />
                                </div>

                                <div className="mb-3">
                                    <Select
                                        bordered={false}
                                        placeholder="Enter Product Shipping"
                                        size='large'
                                        showSearch
                                        className='form-control mb-3'
                                        onChange={(value) => { setShipping(value === "0" ? true : false) }}
                                        value={shipping ? "0" : "1"}
                                    >
                                        <Option value="0">Yes</Option>
                                        <Option value="1">No</Option>
                                    </Select>
                                </div>

                                <div className="mb-3">
                                    <button type="submit" className='btn btn-primary' onClick={handleUpdateProduct}>Update Product</button>
                                </div>

                                <div className="mb-3">
                                    <button type="submit" className='btn btn-danger' onClick={handleDeleteProduct}>Delete Product</button>
                                </div>

                            </div>
                        </form>

                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default UpdateProduct
