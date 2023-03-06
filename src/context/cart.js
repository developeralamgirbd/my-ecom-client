import React, {createContext, useContext, useEffect, useState} from 'react';

const CartContext = createContext();
const CartProvider = ({children}) => {

    const [cart, setCart] = useState([]);

    useEffect(()=>{
        const localCart = JSON.parse(localStorage.getItem('cart'));
        if (localCart?.length > 0){
            setCart(localCart)
        }
    }, [])
    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    );
};


export const useCart = ()=> useContext(CartContext)

export default CartProvider;