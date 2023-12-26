import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth';
import { useCart } from '../context/cart';
import { useNavigate } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';
import axios from 'axios';
import { message } from 'antd';
import { BASE_URL } from '../Helpers/helper';


const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const [clientToken, setClientToken] = useState('');
    const [instance, setInstance] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    //5555555555554444	Mastercard
    // 2223000048400011	Mastercard

    //removeCartItem
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem('cartProduct', JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };

    // updateCartItemQuantity
    const updateCartItemQuantity = (pid, quantity) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            if (index !== -1) {
                myCart[index].quantity = quantity;
                setCart(myCart);
                localStorage.setItem('cartProduct', JSON.stringify(myCart));
            }
        } catch (error) {
            console.log(error);
        }
    };

    // total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.forEach((item) => {
                total += item.price * item.quantity;
            });
            return total;
        } catch (error) {
            console.log(error);
        }
    };

    // getClientToken
    const getClientToken = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/product/braintree/token`);
            setClientToken(data?.response?.clientToken);
        } catch (error) {
            console.log(error);
        }
    };

    // handlePayment
    const handlePayment = async () => {
        console.log('handlePayment invoked');
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post(
                `${BASE_URL}/api/v1/product/braintree/payment`,
                { nonce, cart },
                {
                    headers: {
                        Authorization: `Bearer ${auth?.token}`,
                    },
                }
            );
            if (data?.success) {
                setLoading(false);
                console.log('data in handlePayment ', data);
                localStorage.removeItem('cartProduct');
                setCart([]);
                message.success('Payment Completed Successfully!!');
            } else {
                console.log('Something went wrong!!');
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    useEffect(() => {
        getClientToken();
    }, [auth?.token]);

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h4 className="text-center p-3 mb-1">
                            {`Hello, ${auth?.token && auth?.user?.name}`}
                        </h4>
                        <h5 className="text-center mb-5">
                            {cart.length > 0
                                ? `You have ${cart.length} item${cart.length > 1 ? 's' : ''} in your cart 
                                ${auth?.token ? '' : '- Please Login to checkout!!'}`
                                : 'Your Cart is empty!!'}
                        </h5>
                    </div>
                </div>
                <div className="row" style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div className="col-md-7">
                        {cart?.map((p) => {
                            return (
                                <div className="row mb-2 p-3 card flex-row" key={p._id}>
                                    <div className="col-md-4 border rounded">
                                        <img
                                            src={`${BASE_URL}/api/v1/product/product-photo/${p._id}`}
                                            className="card-img-top"
                                            alt={p.name}
                                        />
                                    </div>

                                    <div className="col-md-8">
                                        <p className="card-title">{p.name}</p>
                                        <p className="card-text">{p.description.substring(0, 40)}...</p>
                                        <p className="card-text">Price : ${p.price}</p>
                                        <div className="d-flex">
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary btn-sm"
                                                onClick={() => updateCartItemQuantity(p._id, p.quantity - 1)}
                                                disabled={p.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <p className="text-center m-2">{p.quantity}</p>
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary btn-sm"
                                                onClick={() => updateCartItemQuantity(p._id, p.quantity + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger mt-3"
                                            onClick={() => removeCartItem(p._id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="col-md-4 text-center card p-4">
                        <h2>Cart Summary</h2>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h5>Total : ${totalPrice()} </h5>
                        {auth?.user?.address ? (
                            <>
                                <div className="mb-3">
                                    <p>Current Address : {auth?.user?.address}</p>
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() => navigate('/dashboard/user/profile')}
                                    >
                                        Update Address
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="mb-3">
                                    {auth?.token ? (
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={() => navigate('/dashboard/user/profile')}
                                        >
                                            Update Address
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={() => navigate('/login', { state: '/cart' })}
                                        >
                                            Please Login to checkout
                                        </button>
                                    )}
                                </div>
                            </>
                        )}

                        <div className="mt-2">
                            {!clientToken || !cart.length ? (
                                ''
                            ) : (
                                <>
                                    <DropIn
                                        options={{ authorization: clientToken, paypal: { flow: 'vault' } }}
                                        onInstance={(instance) => setInstance(instance)}
                                    />
                                    <button
                                        className="btn btn-success"
                                        onClick={handlePayment}
                                        disabled={!instance || !auth?.user?.address}
                                    >
                                        {loading ? 'Processing..' : 'Make Payment'}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;
