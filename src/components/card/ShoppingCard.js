import React, {useEffect, useRef, useState} from 'react';
import {Button, Card, Col, Divider, InputNumber, Row, Steps, theme, message, Image} from "antd";
import {useCart} from "../../context/cart";
import toast from "react-hot-toast";
import {useAuth} from "../../context/AuthProvider";
import {checkoutRequest, getPaymentTokenRequest, getSingleProductRequest} from "../../APIRequest/productApi";
// import DropIn from "braintree-web-drop-in-react";
import DropIn from "braintree-web-drop-in";
import {useNavigate} from "react-router-dom";
import Title from "antd/es/typography/Title";


const CartItem = ()=>{
    const [cart, setCart] = useCart();
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(()=>{
        let total = cart.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.count * currentValue.price
        },0)
        total.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
        setTotalPrice(total)


    },[cart])


    return (
        <>

                {
                    cart.map(product => (
                        <>
                            {/*<div>
                                <h1>{product?.name}</h1>
                                <Row>
                                    <Col flex={2}><p>{product?.price}</p></Col>
                                    <Col flex={3}>
                                        <InputNumber min={1} max={product.quantity} defaultValue={product.count} onChange={(value)=>{

                                            let cartarr = [];
                                            cartarr = JSON.parse(localStorage.getItem('cart'));

                                            cartarr.map((item, i) => {
                                                if (item._id === product._id){
                                                    cartarr[i].count =  value
                                                }
                                            })

                                            localStorage.setItem('cart', JSON.stringify(cartarr));
                                            setCart(cartarr);
                                        }} />
                                    </Col>
                                </Row>
                            </div>
                            <Divider></Divider>*/}

                            <Card>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='d-flex justify-content-between align-items-center gap-2'>
                                        <div style={{width: '100px'}}>
                                            <Image src={product?.image} ></Image>
                                        </div>

                                        <div>
                                            <p>{product.name}</p>
                                            <p>{product.price}</p>
                                        </div>
                                    </div>


                                    <div>
                                        <InputNumber min={1} max={product.quantity} defaultValue={product.count} onChange={(value)=>{

                                            let cartarr = [];
                                            cartarr = JSON.parse(localStorage.getItem('cart'));

                                            cartarr.map((item, i) => {
                                                if (item._id === product._id){
                                                    cartarr[i].count =  value
                                                }
                                            })

                                            localStorage.setItem('cart', JSON.stringify(cartarr));
                                            setCart(cartarr);
                                        }} />
                                    </div>
                                    <div>
                                        <Button>Delete</Button>
                                    </div>
                                </div>
                            </Card>

                        </>
                    ))
                }

        </>
    )
}

const steps = [
    {
        title: 'MY CART',
        content: <CartItem/>,
    },
    {
        title: 'CHECKOUT',
        content: 'Second-content',
    },
    {
        title: 'PAYMENT',
        content: 'Last-content',
    },
    {
        title: 'ORDER COMPLETE',
        content: 'Last-content',
    },
];

const ShoppingCard = () => {

    const [cart, setCart] = useCart();
    const {auth, token} = useAuth();
    const [clientToken, setClientToken] = useState('');
    const [instance, setInstance] = useState(null);
    const [loading, setLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    const navigate = useNavigate();



    useEffect(()=>{
        let total = cart.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.count * currentValue.price
        },0)
        total.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
        setTotalPrice(total)


    },[cart])

    useEffect(()=>{
        if (token){
            getClientToken();
        }
    },[token])

    const getClientToken = ()=>{
        getPaymentTokenRequest().then(res => {
            setClientToken(res.clientToken)
        })
    }

    useEffect(()=>{
        if (clientToken){
            dropInContainer().catch(e => {})
        }
    },[clientToken, loading])

   const dropInContainer = async ()=>{
      const dropInInstance =  await DropIn.create({
           authorization: clientToken,
           container:'#dropin-container'
       });
       setInstance(dropInInstance)
   }

    const buy = async ()=> {
        // Send the nonce to your server

        const { nonce } = await instance.requestPaymentMethod();
        setLoading(true)
        const res = await checkoutRequest(nonce, cart);
        setLoading(false);
        console.log(res);
        if (!res){
            toast.error('Something went worng');
        } else if(res.success || res.success === false){
            navigate('/customer/orders')
            localStorage.removeItem('cart');
            setCart([])
            toast.success('Payment Successfully');
        }
        // dropInContainer().catch(e => {})           
    }


    // Checkout process


    const { token: themeToken } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));
    const contentStyle = {
        lineHeight: '260px',
        textAlign: 'center',
        color: themeToken.colorTextTertiary,
        backgroundColor: themeToken.colorFillAlter,
        borderRadius: themeToken.borderRadiusLG,
        border: `1px dashed ${themeToken.colorBorder}`,
        marginTop: 16,
    };

    return (
        <>

            <Steps current={current} items={items} />


            {
                loading ? <div>Loading...</div> :
                    <div>
                        <Row gutter={16}>
                        <Col span={18}>
                            {cart.length > 0 ? <div style={contentStyle}>{steps[current].content}</div> : <div className='my-5'>
                                Select the items you want to buy
                            </div> }


                        </Col>

                            <Col
                                span={6}
                            >

                                <>
                                    <Card title='Order Summary' style={{marginTop: '15px'}}>
                                        <div className='d-flex justify-content-between align-items-center border-bottom'>
                                            <p>Subtotal </p>
                                            <p>${parseFloat(totalPrice).toFixed(2)} </p>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center border-bottom'>
                                            <p>Tax </p>
                                            <p>$00.00</p>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <p>Total Amount </p>
                                            <p>${parseFloat(totalPrice).toFixed(2)}</p>
                                        </div>

                                        <div
                                            style={{
                                                marginTop: 24,
                                            }}
                                        >
                                            {current < steps.length - 1 && (
                                                <Button type="primary" block onClick={() => next()}>
                                                    {current === 0 ? 'Proceed to checkout' : 'Make Payment'}
                                                </Button>
                                            )}
                                            {current === steps.length - 1 && (
                                                <Button type="primary" onClick={() => message.success('Processing complete!')}>
                                                    Done
                                                </Button>
                                            )}

                                            {current > 0 && (
                                                <Button
                                                    style={{
                                                        margin: '0 8px',
                                                    }}
                                                    onClick={() => prev()}
                                                >
                                                    Back to cart
                                                </Button>
                                            )}
                                        </div>
                                    </Card>
                                </>




                                {/*{
                                    !clientToken || !cart.length ? (
                                        ""
                                    ) : <>

                                   <DropIn
                                    options={
                                    {
                                        authorization: clientToken,
                                        paypal: {
                                            flow: 'vault'
                                        }
                                    }
                                    }
                                    onInstance={(instance) => (setInstance(instance))}
                                />
                                <div>
                                    <Button type='primary' disabled={!instance} className='d-block buy-button' onClick={buy}>Buy</Button>
                                </div>

                                        <div id='dropin-container'></div>
                                        <div>
                                            <Button type='primary' id='#submit-button' disabled={!instance} className='d-block buy-button' onClick={buy}>Buy</Button>
                                        </div>

                                    </>
                                }*/}

                            </Col>
                        </Row>
                    </div>
            }

        </>

    );
};

export default ShoppingCard;