import React from 'react'
import Layout from '../components/Layout/Layout'
import UserMenu from '../components/Layout/UserMenu'
import { useAuth } from '../context/auth'

const Dashboard = () => {
  const [auth, setAuth] = useAuth()

  return (
    <Layout>
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-4 mt-3">
            <UserMenu />
          </div>
          <div className="col-md-7">
            <h4 className="mb-4 text-center">User Details</h4>
            <div className="card p-4">
              <h5>Name - {auth?.user?.name}</h5>
              <h5>Email - {auth?.user?.email}</h5>
              <h5>Address - {auth?.user?.address}</h5>
              <h5>Contact - {auth?.user?.phone}</h5>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
