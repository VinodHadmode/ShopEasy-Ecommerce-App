import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from "axios"
import { Button, Checkbox, Radio } from "antd"
import { Prices } from '../components/Prices'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart'

const Home = () => {
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
      const res = await axios.get(`http://localhost:8080/api/v1/category/get-category`)

      if (res.data) {
        setCategories(res.data.categories)
      }

    } catch (error) {
      console.log(error);
      alert(error)
    }
  }



  //gettAllProducts
  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`)

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

      const { data } = await axios.post(`http://localhost:8080/api/v1/product/filter-product`, { checked, radio })

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
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/count-product`)
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
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`)

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
    localStorage.setItem("cartProduct",JSON.stringify([...cart,prod]))
    alert(`Item added to cart!!`)
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
        <div className="col-md-3">
          <h3 className="text-center">Filter by Category</h3>
          <div className="d-flex flex-column">
            {
              categories?.map((category) => {
                return (
                  <Checkbox key={category._id} onChange={(e) => handleFilter(e.target.checked, category._id)}>{category.name}</Checkbox>
                )
              })
            }
          </div>
          {/* fileter by price  */}
          <h3 className="text-center mt-4">Filter by Price</h3>
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

          <div className="d-flex flex-column">
            <Button className="btn btn-danger" onClick={() => window.location.reload()}>RESET FILTERS</Button>
          </div>

        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {
              products?.map((p) => {
                return (
                  <div className="card m-2" style={{ width: '18rem' }} key={p._id}>
                    <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">${p.price}</p>
                      <p className="card-text">{p.description.substring(0, 40)}...</p>

                      <button type="button" className="btn btn-primary ms-2" onClick={() => navigate(`/product/${p._id}`)}>More Details</button>
                      <button type="button" className="btn btn-info ms-2" onClick={() => handleCart(p)}>ADD TO CART</button>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button className="btn btn-warning" onClick={handleLoadMore}>
                {loading ? "Loading" : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
