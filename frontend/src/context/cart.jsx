import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext()

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    useEffect(() => {
        const existingCartItem = localStorage.getItem("cartProduct")
        if (existingCartItem) {
            setCart(JSON.parse(existingCartItem))
        }
    }, [])

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    )
}

//custom hook
const useCart = () => {
    return useContext(CartContext)
}

export { useCart, CartProvider }