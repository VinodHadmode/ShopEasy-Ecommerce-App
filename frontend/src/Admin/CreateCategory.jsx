import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import AdminMenu from '../components/Layout/AdminMenu'
import axios from "axios"
import CategoryForm from '../components/Form/CategoryForm'
import { useAuth } from '../context/auth'
import { Modal, message } from 'antd';
import { BASE_URL } from '../Helpers/helper'

const CreateCategory = () => {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const [auth, setAuth] = useAuth();
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    const [updatedName, setUpdatedName] = useState("")

    //handleSUbmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${BASE_URL}/api/v1/category/create-category`,
                { name },
                {
                    headers: {
                        Authorization: `Bearer ${auth?.token}`
                    }
                }
            );
            if (res.data?.success) {
                message.success(`${res.data.message}`);
                getAllCategory();
            } else {
                message.error(`${res.data.message}`);
            }
        } catch (error) {
            console.log(error);
            message.error(`Something Went Wrong while creating category!!`);
        }

        setName("")
    }

    //getAll categories
    const getAllCategory = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/v1/category/get-category`)

            if (res.data) {
                setCategories(res.data.categories)
            }

        } catch (error) {
            console.log(error);
            message.error(error)
        }
    }

    useEffect(() => {
        getAllCategory()
    }, [])

    //handleEditCategory
    const handleEditCategory = (category) => {
        setVisible(true)
        setUpdatedName(category.name)
        setSelected(category._id)
    }

    //handleUpdateSubmit
    const handleUpdateSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`${BASE_URL}/api/v1/category/update-category/${selected}`, { name: updatedName },
                {
                    headers: {
                        Authorization: `Bearer ${auth?.token}`
                    }
                })
            if (data.success) {
                message.success(data.message)
                setSelected(null)
                setUpdatedName("")
                setVisible(false)
                getAllCategory()
            }

        } catch (error) {
            console.log(error);
            message.error("Something Went Wrong while Updating Category!!")
        }
    }

    //handleDeleteCategory
    const handleDeleteCategory = async (pID) => {
        try {
            const { data } = await axios.delete(`${BASE_URL}/api/v1/category/delete-category/${pID}`, {
                headers: {
                    Authorization: `Bearer ${auth?.token}`
                }
            })

            if (data?.success) {
                console.log(data.message);
                message.success(data.message)
                getAllCategory()
            }

        } catch (error) {
            console.log(error);
            message.error("Something Went Wrong while Deleting Category!!")
        }
    }

    return (
        <Layout>
            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col-md-4">
                        <AdminMenu />
                    </div>
                    <div className="col-md-7">
                        <div className="p-3 w-50">
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        </div>
                        <h4 className="text-center mb-4">ALL CATEGORIES</h4>
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((category) => (
                                        <tr key={category._id}>
                                            <td>{category.name}</td>
                                            <td>
                                                <button className="btn btn-outline-primary ms-2" onClick={() => handleEditCategory(category)}>Edit</button>
                                                <button className="btn btn-outline-danger ms-2" onClick={() => { handleDeleteCategory(category._id) }}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                    {categories && categories.length === 0 && (
                                        <tr>
                                            <td colSpan="2" className="text-center">
                                                No categories found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <Modal onCancel={() => (setVisible(false))} footer={null} open={visible}>
                            <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdateSubmit} />
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory
