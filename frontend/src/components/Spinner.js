import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Layout from './Layout/Layout'

const Spinner = () => {
    const [count, setCount] = useState(3)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => prev - 1)
        }, 1000)

        count === 0 && navigate("/login", {
            state: location.pathname
        })

        return () => clearInterval(interval)
    }, [count, navigate, location])

    return (
        <Layout>
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>

                <h3 className='Text-center'>Redirecting to you in {count} seconds</h3>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </Layout>
    )
}

export default Spinner
