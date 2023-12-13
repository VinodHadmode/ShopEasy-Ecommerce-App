import React from 'react'
import { useSearch } from '../context/search'
import Layout from '../components/Layout/Layout';

const Search = () => {
    const [values, setValues] = useSearch()

    return (
        <Layout>
            <div className="container">
                <div className="text-center">
                    <h1>Search Results</h1>
                    <h6>{values?.results.length < 1 ? "No Product Found" : `Found ${values?.results.length}`}</h6>
                </div>

                <div className="d-flex flex-wrap">
            {/* <h2 className="text-center">Products</h2> */}
            {
              values?.results?.map((p) => {
                return (
                  <div className="card m-2" style={{ width: '18rem' }} key={p._id}>
                    <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">${p.price}</p>
                      <p className="card-text">{p.description.substring(0, 40)}...</p>

                      <button type="button" className="btn btn-primary ms-2">More Details</button>
                      <button type="button" className="btn btn-info ms-2">ADD TO CART</button>
                    </div>
                  </div>
                )
              })
            }
          </div>
            </div>
        </Layout>
    )
}

export default Search
