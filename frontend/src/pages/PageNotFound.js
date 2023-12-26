import React from 'react'
import Layout from '../components/Layout/Layout'
import Pnf from "../Images/Pnf.png"
import {useNavigate} from "react-router-dom"

const PageNotFound = () => {
  const navigate=useNavigate()
  return (
    <Layout>
      <div className="pnf-container text-center mt-5">
        <div className="pnf-content">
          <h1 className="pnf-heading">Oops! Page not found</h1>
          <p className="pnf-description">The page you are looking for might be in another universe.</p>
          
          <div className="mb-3">
            <button type="submit" className='btn btn-warning' onClick={()=>navigate("/")}>Go to Home</button>
          </div>

        </div>
        <div className="pnf-image-container mt-4">
          <img src={Pnf} alt="404 Not Found" className="img-fluid" style={{ width: "400px" }} />
        </div>
      </div>
    </Layout>
  )
}

export default PageNotFound
