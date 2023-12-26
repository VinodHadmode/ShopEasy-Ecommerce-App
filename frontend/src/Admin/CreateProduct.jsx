import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import AdminMenu from '../components/Layout/AdminMenu'
import axios from 'axios'
import { Select,message } from "antd"
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../Helpers/helper'

const CreateProduct = () => {
    const [auth, setAuth] = useAuth();
    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [photo, setPhoto] = useState("")
    const [quantity, setQuantity] = useState("")
    const [category, setCategory] = useState("")
    const [shipping, setShipping] = useState("")


    const { Option } = Select
    const navigate = useNavigate()
    //getAll Categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/category/get-category`)

            if (data?.success) {
                setCategories(data.categories)
            }

        } catch (error) {
            console.log(error);
            message.error(error)
        }
    }

    useEffect(() => {
        getAllCategory()
    }, [])

    //handleCreateProduct
    const handleCreateProduct = async (e) => {
        e.preventDefault()
        const form = e.target.closest('form');

        // Check form validity
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        try {
            const productData = new FormData()
            productData.append("name", name)
            productData.append("description", description)
            productData.append("price", price)
            productData.append("photo", photo)
            productData.append("quantity", quantity)
            productData.append("category", category)


            console.log("productData", productData);

            const { data } = await axios.post(`${BASE_URL}/api/v1/product/create-product`, productData,
                {
                    headers: {
                        Authorization: `Bearer ${auth?.token}`
                    }
                })
            if (data?.success) {
                console.log(data.message);
                message.success(data.message);
                navigate("/dashboard/admin/products")

            } else {
                message.error(data.error || "Something Went Wrong While Creating New Product!!");
            }

        } catch (error) {
            console.log(error);
            message.error("Something Went Wrong While Creating New Product!!")
        }

        //form empty
        setName("")
        setDescription("")
        setPrice("")
        setPhoto("")
        setCategory("")
        setQuantity("")
    }

    return (
        <Layout>
            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col-md-4">
                        <AdminMenu />
                    </div>
                    <div className="col-md-7">
                        <h4 className="mb-4 text-center">CREATE NEW PRODUCT</h4>
                        <form>
                            <div className="m-1 w-70">
                                <Select
                                    bordered={false}
                                    placeholder="Select Category"
                                    size='large'
                                    showSearch
                                    className='form-select mb-3'
                                    onChange={(value) => { setCategory(value) }}
                                >
                                    {
                                        categories?.map((c) => {
                                            return <Option key={c._id} value={c._id}>{c.name}</Option>
                                        })
                                    }

                                </Select>

                                <div className="mb-3">
                                    <label className='btn btn-outline-success col-md-12'>
                                        {photo ? photo.name : "Upload Product Image"}
                                        <input
                                            type="file"
                                            name='photo'
                                            accept="image/*"
                                            hidden
                                            required
                                            onChange={(e) => { setPhoto(e.target.files[0]) }}
                                        />
                                    </label>
                                </div>
                                <div className="mb-3 text-center">
                                    {photo && (
                                        <img
                                            src={URL.createObjectURL(photo)}
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
                                        onChange={(value) => { setShipping(value) }}
                                    >
                                        <Option value="0">Yes</Option>
                                        <Option value="1">No</Option>
                                    </Select>
                                </div>

                                <div className="mb-3">
                                    <button type="submit" className='btn btn-primary' onClick={handleCreateProduct}>Create new Product</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default CreateProduct
