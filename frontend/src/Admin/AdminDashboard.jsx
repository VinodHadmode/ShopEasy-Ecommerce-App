import React from 'react'
import Layout from '../components/Layout/Layout'
import AdminMenu from '../components/Layout/AdminMenu'
import { useAuth } from '../context/auth'

const AdminDashboard = () => {
  const [auth, setAuth] = useAuth()

  return (
    <Layout>
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-4">
            <AdminMenu />
          </div>
          <div className="col-md-7">
            <h4 className="mb-4 text-center">ADMIN DETAILS</h4>
            <div className="card p-4">
              <h5 className="mb-3">Admin Name - {auth?.user?.name}</h5>
              <h5 className="mb-3">Admin Email - {auth?.user?.email}</h5>
              <h5 className="mb-3">Admin Address - {auth?.user?.address}</h5>
              <h5 className="mb-3">Admin Contact - {auth?.user?.phone}</h5>
            </div>
          </div>

        </div>

      </div>
    </Layout>
  )
}

export default AdminDashboard
