import React, { useReducer } from 'react';

const products = [
    { id: 1, name: 'Product-1', price: 100 },
    { id: 2, name: 'Product-2', price: 200 },
    { id: 3, name: 'Product-3', price: 300 },
];

const initialState = {
    cart: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return { ...state, cart: action.payload };
        case 'REMOVE_FROM_CART':
            return { ...state, cart: action.payload };
        case 'DLT_FROM_CART':
            return { ...state, cart: action.payload };
        default:
            return state;
    }
};

const ProductList = ({ addToCart, removeFromCart }) => (
    <div>
        <h2>Product List</h2>
        <ul>
            {products.map(product => (
                <li key={product.id} style={{display:'flex' , justifyContent:'space-evenly', alignItems:'center'}}>
                    {product.name} {product.price}
                    <button onClick={() => addToCart(product)} style={{ padding: '.5rem', margin: '20px' }}>+</button>
                    <button onClick={() => removeFromCart(product)} style={{ padding: '.5rem', margin: '20px' }}>-</button>
                </li>
            ))}
        </ul>
    </div>
);

const Cart = ({ cart, dltFromCart }) => (
    <>
        <div>
            <h2>Cart</h2>
            {cart.length === 0 ? (
                <p>No Product added to the cart</p>
            ) : (
                <ul>
                    {cart.map(item => (
                        <li key={item.id} style={{display:'flex' , justifyContent:'space-evenly' , alignItems:'center'}}>
                            {item.name} {item.price} Qty: {item.quantity}
                            <button onClick={() => dltFromCart(item)} style={{ padding: '.5rem', margin: '20px' }}>Dlt</button>
                        </li>
                    ))}
                </ul>
            )}
            <p style={{fontSize:'20px', fontWeight:'700'}}> Total Price: {cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)}</p>
        </div>
    </>
);

const ShoppingCart = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addToCart = (product) => {
        const existingItem = state.cart.find(item => item.id === product.id);
        if (existingItem) {
            // If the product already exists in the cart, increase its quantity
            const updatedCart = state.cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            dispatch({ type: 'ADD_TO_CART', payload: updatedCart });
        } else {
            // If the product is not in the cart, add it with quantity 1
            const updatedCart = [...state.cart, { ...product, quantity: 1 }];
            dispatch({ type: 'ADD_TO_CART', payload: updatedCart });
        }
    };
    
    const removeFromCart = (product) => {
        const updatedCart = state.cart.map(item =>
            item.id === product.id ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
        );
        dispatch({ type: 'REMOVE_FROM_CART', payload: updatedCart });
    };

    const dltFromCart = (product) => {
        const updatedCart = state.cart.filter(item => item.id !== product.id);
        dispatch({ type: 'DLT_FROM_CART', payload: updatedCart });
    }

    return (
        <div style={{ display: 'flex', justifyContent:'space-evenly', margin: '1rem', alignItems:'center' }}>
            <ProductList addToCart={addToCart} removeFromCart={removeFromCart}  />
            <Cart cart={state.cart} dltFromCart={dltFromCart} />
        </div>
    );
};

export default ShoppingCart;