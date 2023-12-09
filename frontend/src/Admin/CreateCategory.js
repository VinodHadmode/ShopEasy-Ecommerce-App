import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import AdminMenu from '../components/Layout/AdminMenu'
import axios from "axios"
import CategoryForm from '../components/Form/CategoryForm'
import { useAuth } from '../context/auth'
import { Modal, Button } from 'antd';

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
                `http://localhost:8080/api/v1/category/create-category`,
                { name },
                {
                    headers: {
                        Authorization: `Bearer ${auth?.token}`
                    }
                }
            );
            // console.log("res.data", res.data);

            if (res.data?.success) {
                alert(`${res.data.message}`);
                getAllCategory();
            } else {
                // Handle the case where the category already exists
                alert(`${res.data.message}`);
            }
        } catch (error) {
            console.log(error);
            alert(`Something Went Wrong while creating category!!`);
        }

        setName("")
    }

    //getAll categories
    const getAllCategory = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/category/get-category`)

            if (res.data) {
                setCategories(res.data.categories)
                // console.log(res.data);
            }

        } catch (error) {
            console.log(error);
            alert(error)
        }
    }

    useEffect(() => {
        getAllCategory()
    }, [])

    //edit button working start
    //handleEditCategory
    const handleEditCategory = (category) => {
        // { setVisible(true); setUpdatedName(category.name) }
        setVisible(true)
        setUpdatedName(category.name)
        setSelected(category._id)
    }

    //handleUpdateSubmit
    const handleUpdateSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`http://localhost:8080/api/v1/category/update-category/${selected}`, { name: updatedName },
                {
                    headers: {
                        Authorization: `Bearer ${auth?.token}`
                    }
                })

            // console.log("res from update API call", data);

            if (data.success) {
                alert(data.message)
                setSelected(null)
                setUpdatedName("")
                setVisible(false)
                getAllCategory()
            }

        } catch (error) {
            console.log(error);
            alert("Something Went Wrong while Updating Category!!")
        }
    }

    //handleDeleteCategory
    const handleDeleteCategory = async (pID) => {
        try {
            const { data } = await axios.delete(`http://localhost:8080/api/v1/category/delete-category/${pID}`, {
                headers: {
                    Authorization: `Bearer ${auth?.token}`
                }
            })

            if (data?.success) {
                console.log(data.message);
                alert(data.message)
                getAllCategory()
            }


        } catch (error) {
            console.log(error);
            alert("Something Went Wrong while Deleting Category!!")
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
                        <div className="p-3 w-50">
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        </div>
                        <h3 className="mb-4">All Category</h3>
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
                                                <button className="btn btn-primary ms-2" onClick={() => handleEditCategory(category)}>Edit</button>
                                                <button className="btn btn-danger ms-2" onClick={() => { handleDeleteCategory(category._id) }}>Delete</button>
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
