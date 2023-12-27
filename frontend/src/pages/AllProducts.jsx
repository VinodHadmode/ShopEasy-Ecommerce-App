import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from "axios"
import { Checkbox, Radio } from "antd"
import { Prices } from '../components/Prices'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart'
import { message } from 'antd';
import { BASE_URL } from '../Helpers/helper'


const AllProducts = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const [cart, setCart] = useCart()


  //getAll categories
  const getAllCategory = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/category/get-category`)

      if (res.data) {
        setCategories(res.data.categories)
      }

    } catch (error) {
      console.log(error);
      message.error(error)
    }
  }

  //gettAllProducts
  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${BASE_URL}/api/v1/product/product-list/${page}`)

      if (data?.success) {
        setProducts(data.products)
        setLoading(false)

      } else {
        console.log(data.message);
      }

    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  //getFilteredProducts
  const getFilteredProducts = async () => {
    try {
      console.log("Checked:", checked);
      console.log("Radio:", radio);

      const { data } = await axios.post(`${BASE_URL}/api/v1/product/filter-product`, { checked, radio })

      if (data?.success) {
        setProducts(data.filteredProducts)
      }
    } catch (error) {
      console.log(error);
    }
  }

  //getTotal product count
  const getTotalProductCount = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/product/count-product`)
      if (data?.success) {
        setTotal(data.totalCount)
      }

    } catch (error) {
      console.log(error);

    }
  }

  //load more products
  const loadMoreProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${BASE_URL}/api/v1/product/product-list/${page}`)

      if (data?.success) {
        setProducts([...products, ...data?.products])
        setLoading(false)

      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  //filter by category
  const handleFilter = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    } else {
      all = all.filter((c) => c !== id)
    }
    setChecked(all)
  };

  //handleLoadMore
  const handleLoadMore = (e) => {
    e.preventDefault()
    setPage(page + 1)
  }

  //handleCart
  const handleCart = (prod) => {
    setCart([...cart, prod])
    localStorage.setItem("cartProduct", JSON.stringify([...cart, prod]))
    message.success(`Item added to cart!!`)
  }

  //all useEffect hooks
  useEffect(() => {
    getAllCategory()
    getTotalProductCount()
  }, [])

  useEffect(() => {
    if (page === 1) return
    loadMoreProducts()
  }, [page])

  useEffect(() => {
    if (!checked.length || !radio.length) {
      getAllProducts();
    }
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) {
      getFilteredProducts();
    }
  }, [checked, radio]);

  return (
    <Layout>
      <div className="row mt-3">
        <div className="col-md-3" style={{ borderRight: "1px solid #ccc" }}>
          <div></div>
          <h5 className="text-center mt-3">Filter by Category</h5>
          <div className="d-flex flex-column">
            {
              categories?.map((category) => {
                return (
                  <Checkbox key={category._id} onChange={(e) => handleFilter(e.target.checked, category._id)}>{category.name}</Checkbox>
                )
              })
            }
          </div>
          <h5 className="text-center mt-4">Filter by Price</h5>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {
                Prices.map((p) => {
                  return (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  )
                })
              }
            </Radio.Group>
          </div>

          <div className="d-flex flex-column mt-3">
            <button className="btn btn-outline-danger" onClick={() => window.location.reload()}>RESET FILTERS</button>
          </div>

        </div>

        <div className="col-md-9">
          <h3 className="text-center">All Products</h3>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {
              products?.map((p) => (
                <div className="col" key={p._id}>
                  <div className="card h-100">
                    <img
                      src={`${BASE_URL}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top p-3"
                      alt={p.name}
                      style={{ objectFit: 'cover', height: '200px' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <h5 className="price-text"><span style={{ color: 'green' }}>${p.price}</span></h5>
                      <p className="card-text">{p.description.substring(0, 30)}...</p>
                      <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => navigate(`/product/${p._id}`)}>
                          MORE DETAILS
                        </button>
                        <div style={{ width: '10px' }}></div>
                        <button type="button" className="btn btn-outline-success btn-sm" onClick={() => handleCart(p)}>
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>

          <div className="m-2 p-3 text-center">
            {products && products.length > 0 && checked.length === 0 && radio.length === 0 ? (
              <button className="btn btn-warning" onClick={handleLoadMore}>
                {loading ? (
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : 'Load More'}
              </button>
            ) : (
              checked.length === 0 && radio.length === 0 && (
                <h5 className="text-center m-5">No products found.</h5>
              )
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AllProducts
