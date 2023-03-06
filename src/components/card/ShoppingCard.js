import React, {useEffect, useRef, useState} from 'react';
import {Button, Card, Col, Divider, InputNumber, Row} from "antd";
import {useCart} from "../../context/cart";
import toast from "react-hot-toast";
import {useAuth} from "../../context/AuthProvider";
import {checkoutRequest, getPaymentTokenRequest, getSingleProductRequest} from "../../APIRequest/productApi";
// import DropIn from "braintree-web-drop-in-react";
import DropIn from "braintree-web-drop-in";
import {useNavigate} from "react-router-dom";

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


    return (
        <>
            {
                loading ? <div>Loading...</div> :
                    <div>
                        <Row>
                            <Col
                                span={18}
                                xs={{                        order: 1,                    }}
                                sm={{                        order: 2,                    }}
                                md={{                        order: 3,                    }}
                                lg={{                        order: 4,                    }}
                            >
                                <Card>
                                    {
                                        cart.map(product => (
                                            <>
                                                <div>
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
                                                <Divider></Divider>
                                            </>
                                        ))
                                    }

                                    <div className='d-flex justify-content-between'>
                                        <p></p>
                                        <div><p>Total Amount</p><p>${parseFloat(totalPrice).toFixed(2)}</p></div>
                                    </div>

                                </Card>
                            </Col>
                            <Col
                                span={6}
                                xs={{    order: 1, }}
                                sm={{     order: 2,      }}
                                md={{                        order: 3,             }}
                                lg={{                        order: 4,                    }}
                            >
                                {
                                    !clientToken || !cart.length ? (
                                        ""
                                    ) : <>

                                {/*   <DropIn*/}
                                {/*    options={*/}
                                {/*    {*/}
                                {/*        authorization: clientToken,*/}
                                {/*        paypal: {*/}
                                {/*            flow: 'vault'*/}
                                {/*        }*/}
                                {/*    }*/}
                                {/*    }*/}
                                {/*    onInstance={(instance) => (setInstance(instance))}*/}
                                {/*/>*/}
                                {/*<div>*/}
                                {/*    <Button type='primary' disabled={!instance} className='d-block buy-button' onClick={buy}>Buy</Button>*/}
                                {/*</div>*/}

                                        <div id='dropin-container'></div>
                                        <div>
                                            <Button type='primary' id='#submit-button' disabled={!instance} className='d-block buy-button' onClick={buy}>Buy</Button>
                                        </div>

                                    </>
                                }

                            </Col>
                        </Row>
                    </div>
            }

        </>

    );
};

export default ShoppingCard;