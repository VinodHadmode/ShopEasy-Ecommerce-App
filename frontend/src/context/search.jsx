import { createContext, useContext, useState } from "react";


const SearchContext = createContext()

const SearchProvider = ({ children }) => {

    const [auth, setAuth] = useState({
        keywords: "",
        results: []
    })

    return (
        <SearchContext.Provider value={[auth, setAuth]}>
            {children}
        </SearchContext.Provider>
    )
}

//custom hook
const useSearch = () => {
    return useContext(SearchContext)
}

export { SearchProvider, useSearch }