import React from 'react'
import { useSearch } from '../../context/search'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../Helpers/helper'

const SearchInput = () => {
    const [values, setValues] = useSearch()

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/product/search/${values.keywords}`)
            setValues({ ...values, results: data.result })
            navigate("/search")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={values.keywords}
                    onChange={(e) => setValues({ ...values, keywords: e.target.value })}
                />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>

        </div>
    )
}

export default SearchInput
