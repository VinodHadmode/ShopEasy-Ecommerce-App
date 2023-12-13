import axios from "axios"

const { useState, useEffect } = require("react")


const useCategory = () => {
    const [categories, setCategories] = useState([])

    //getAll categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/category/get-category`)
            setCategories(data?.categories)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllCategory()
    }, [])

    return categories
}

export default useCategory