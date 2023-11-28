import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <Layout>
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h1 className="pnf-heading">Oops ! Page not found</h1>
        <Link to="/" className="pnf-btn">Go to Home </Link>
      </div>

    </Layout>
  )
}

export default PageNotFound
