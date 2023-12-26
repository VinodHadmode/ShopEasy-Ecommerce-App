import React from 'react'
import { useSearch } from '../context/search'
import Layout from '../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import { message } from 'antd';
import { BASE_URL } from '../Helpers/helper';

const Search = () => {
  const [values, setValues] = useSearch()
  const [cart, setCart] = useCart()
  const navigate = useNavigate()

  //handleCart
  const handleCart = (prod) => {
    setCart([...cart, prod])
    localStorage.setItem("cartProduct", JSON.stringify([...cart, prod]))
    message.success(`Item added to cart!!`)
  }

  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>{values?.results.length < 1 ? "No Product Found" : `Found ${values?.results.length}`}</h6>
        </div>

        <div className="row row-cols-1 row-cols-md-4 g-4">
          {
            values?.results?.map((p) => (
              <div className="col" key={p._id}>
                <div className="card" style={{ width: "18rem" }}>
                  <img
                    src={`${BASE_URL}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{ objectFit: 'cover', height: '200px' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="price-text"><span style={{ color: 'green' }}>${p.price}</span></h5>
                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                    <div className="d-flex justify-content-between">
                      <button type="button" className="btn btn-primary" onClick={() => navigate(`/product/${p._id}`)}>
                        More Details
                      </button>
                      <button type="button" className="btn btn-danger" onClick={() => handleCart(p)}>
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>

      </div>
    </Layout>
  )
}

export default Search
