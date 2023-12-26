import React from 'react'
import Layout from '../components/Layout/Layout'
import AdminMenu from '../components/Layout/AdminMenu'

const Users = () => {
    return (
        <Layout>
            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col-md-4">
                        <AdminMenu />
                    </div>
                    <div className="col-md-7">
                        <h4 className="text-center mb-4">ALL USERS</h4>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Users
