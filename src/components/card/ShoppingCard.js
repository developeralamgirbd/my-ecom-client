import React, {useEffect, useRef, useState} from 'react';
import {
    Button,
    Card,
    Col,
    Divider,
    InputNumber,
    Row,
    Steps,
    theme,
    message,
    Image,
    Segmented,
    Form,
    Input,
    Select
} from "antd";
import {useCart} from "../../context/cart";
import toast from "react-hot-toast";
import {useAuth} from "../../context/AuthProvider";
import {checkoutRequest, getPaymentTokenRequest} from "../../APIRequest/orderApi";
// import DropIn from "braintree-web-drop-in-react";
import DropIn from "braintree-web-drop-in";
import {Link, useNavigate} from "react-router-dom";
import Title from "antd/es/typography/Title";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {getAddressRequest} from "../../APIRequest/userApi";
import useShippingAddress from "../../hooks/useShippingAddress";
import axios from "axios";
const { Option } = Select;

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

    const cartItemDeleteHandler = (id)=>{
        const cartArr = JSON.parse(localStorage.getItem('cart'));

        const index = cartArr.findIndex(product => product._id === id);

        cartArr.splice(index, 1);
       localStorage.setItem('cart', JSON.stringify(cartArr));
       setCart(cartArr);
    }

return (
    <>

            {
                cart.map(product => (
                    <>
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
                                    <Button onClick={() => cartItemDeleteHandler(product?._id)}>Delete</Button>
                                </div>
                            </div>
                        </Card>

                    </>
                ))
            }

    </>
)
}

const ShippingInfo = ({auth})=>{
    const [shippingAddress, setShippingAddress] = useShippingAddress();
    const [openDesc, setOpenDesc] = useState(true);
    const [openSpec, setOpenSpec] = useState(false);
    const [address, setAddress] = useState({});

    const [form] = Form.useForm();

    useEffect(()=>{
        getAddressRequest().then(res => {
            setAddress(res?.address[0]);
            localStorage.setItem('shippingAddress', JSON.stringify(res?.address[0]))
        })
    },[])


    const handleSegment = (value)=>{
        if (value === 1){
            setOpenDesc(true)
            setOpenSpec(false)
            localStorage.setItem('shippingAddress', JSON.stringify(address));
            setShippingAddress(address)
        }else if(value === 2){
            setOpenSpec(true)
            setOpenDesc(false)
            localStorage.removeItem('shippingAddress');
            setShippingAddress({})
        }
    }
     const onFinish = () => {
        const values = form.getFieldsValue();
        values.address = values.address1 + ' ' + values.address2;
          localStorage.setItem('shippingAddress', JSON.stringify(values));
          setShippingAddress()
         toast.success('Address save successfully');
          form.resetFields();

    };


    return (
        <>
            <Segmented block onChange={handleSegment} options={[
                {
                    label: 'Your Address',
                    value: 1
                },
                {
                    label: 'New Address',
                    value: 2
                }
            ]} />

            <div style={{display: openDesc ? 'block': 'none'}} className='py-4'>
                  <Row>
                       <Col span={24}>
                           <Card title='Address' style={{textAlign: 'left'}}>
                               <div className='d-flex gap-5'>
                                   <div >
                                       <p>{auth.email}</p>
                                       <p>{auth.mobile}</p>

                                   </div>
                                   <div >
                                      <p>{address.country}</p>
                                      <p>{address.city}</p>
                                      <p>{address.state}</p>
                                      <p>{address.address}</p>
                                      <p>{address.zipCode}</p>

                                   </div>
                               </div>

                           </Card>
                       </Col>
                   </Row>
            </div>
            <div style={{display: openSpec ? 'block': 'none'}}>
                <Card style={{textAlign: 'left'}}>
                <Form
                    form={form}
                    onFinish={onFinish}
                    layout='vertical'
                >
                    <Form.Item
                        label="Full Name"
                        name="name"
                        rules={[{ required: true, message: 'Please enter your full name' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Mobile"
                        name="mobile"
                        rules={[{ required: true, message: 'Please enter your mobile number' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Address Line 1"
                        name="address1"
                        rules={[{ required: true, message: 'Please enter your address' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Address Line 2"
                        name="address2"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="City"
                        name="city"
                        rules={[{ required: true, message: 'Please enter your city' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="State/Province"
                        name="state"
                        rules={[{ required: true, message: 'Please enter your state/province' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Postal Code"
                        name="postalCode"
                        rules={[{ required: true, message: 'Please enter your postal code' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Country"
                        name="country"
                        rules={[{ required: true, message: 'Please select your country' }]}
                    >
                        <Select>
                            <Option value="USA">United States</Option>
                            <Option value="CAN">Canada</Option>
                            <Option value="GBR">United Kingdom</Option>
                            <Option value="AUS">Australia</Option>
                            <Option value="NZL">New Zealand</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">Save</Button>
                    </Form.Item>
                </Form>
                </Card>
            </div>
        </>
    )
}

const Payment = ()=>{
    const [cart, setCart] = useCart();
    const {auth, token} = useAuth();
    const [loading, setLoading] = useState(false);
    const [shippingAddress, setShippingAddress]  = useShippingAddress();
    const [clientToken, setClientToken] = useState('');
    const [instance, setInstance] = useState(null);
    const navigate = useNavigate();

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
        const res = await checkoutRequest(nonce, cart, shippingAddress);
        setLoading(false);
        if (!res){
            toast.error('Something went wrong');
        } else if(res.success || res.success === false){
            navigate('/customer/orders')
            localStorage.removeItem('cart');
            localStorage.removeItem('shippingAddress');
            setCart([])
            toast.success('Payment Successfully');
        }
        // dropInContainer().catch(e => {})
    }


    return (
        <>
            {
                !clientToken || !cart.length ? (
                    ""
                ) : <>

                    {/*<DropIn
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
                            */}
                    {/*<div>*/}
                    {/*    <Button type='primary' disabled={!instance} className='d-block buy-button' onClick={buy}>Buy</Button>*/}
                    {/*</div>*/}
                    <Row>
                        <Col span={12} offset={6}>
                            <div id='dropin-container'></div>

                            <div className='mb-4'>
                                <Button type='primary' id='#submit-button' disabled={!instance ||loading} className='d-block buy-button' onClick={buy} block>
                                    {loading ? 'Processing' : 'Buy'}
                                </Button>
                            </div>
                        </Col>
                    </Row>



                </>
            }
        </>
    )
}


const ShoppingCard = () => {
    const [cart, setCart] = useCart();
    const {auth, token} = useAuth();


    const [loading, setLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [address, setAddress] = useState({});
    const { token: themeToken } = theme.useToken();
    const [current, setCurrent] = useState(0);
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


    // Checkout Step process
    const steps = [
        {
            title: 'MY CART',
            content: <CartItem/>,
        },
        {
            title: 'CHECKOUT',
            content: <ShippingInfo auth={auth}/>,
        },
        {
            title: 'PAYMENT',
            content: <Payment/>,
        }
    ];

    const next = () => {
        if (!token){
            navigate('/login');
        }

        const getAddress = JSON.parse(localStorage.getItem('shippingAddress'));

        if (current === 0 && cart.length > 0){
            setCurrent(current + 1);
        }
        if (current === 1 && getAddress){
            setCurrent(current + 1);
        }else if (current === 1 && !getAddress) {
            toast.error('Please provide a shipping address')
        }
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
                            {/*Segment Content*/}
                            {cart.length > 0 ?
                                <div style={contentStyle}>{steps[current].content}</div>
                                :
                                <div className='my-5'>
                                <Title level={3}>Please add to cart to buy</Title>
                                <Title level={4} className='text-center'>Empty!</Title>
                                <Title level={5} > <Link to='/' className='text-secondary'> <ArrowLeftOutlined /> <span style={{paddingBottom: '-2px'}}>Continue to shopping</span> </Link></Title>
                            </div> }


                        </Col>

                            {/*Order Summary*/}
                            <Col
                                span={6}
                            >

                                <>
                                    <Card title='Order Summary' style={{marginTop: '15px', display: current === 2 ? 'none': "block"}}>
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
                                                <Button type="primary"  block onClick={() => next()}>
                                                    {current === 0 ? 'Proceed to checkout' : 'Make Payment'}
                                                </Button>
                                            )}

                                            {current === steps.length - 1 && (
                                                <Button type="primary" onClick={() => message.success('Processing complete!')}>
                                                    Done
                                                </Button>
                                            )}


                                        </div>
                                    </Card>
                                </>

                            </Col>
                        </Row>
                       {/* {current > 0 && (
                            <Button
                                style={{
                                    margin: '0 8px',
                                }}
                                onClick={() => prev()}
                            >
                                Back to cart
                            </Button>
                        )}*/}
                    </div>
            }

        </>

    );
};



export default ShoppingCard;