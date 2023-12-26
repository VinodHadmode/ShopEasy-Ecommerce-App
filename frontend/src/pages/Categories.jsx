import React from 'react'
import Layout from '../components/Layout/Layout'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom'
import "./Categories.css"


const Categories = () => {
    const categories = useCategory()
    console.log("categories",categories);
    return (
        <Layout>
            <div className="container">
                <div className="row">
                    {
                        categories.map((c) => {
                            return (
                                <div className="col-md-4 mt-5 mb-3 gx-2 gy-2" key={c._id}>
                                    <Link to={`/category/${c.slug}`} className="btn button-56">
                                        {c.name}
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Categories
