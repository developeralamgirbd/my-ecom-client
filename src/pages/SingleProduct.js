import React, {useEffect, useRef, useState} from 'react';
import { getSingleProductRequest} from "../APIRequest/productApi";
import {useParams} from "react-router-dom";
import ReactImageMagnify from 'react-image-magnify'
import {Col, Row, Card, Typography, Input, Button, Segmented} from 'antd';
import toast from "react-hot-toast";
import {useCart} from "../context/cart";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
const { Meta } = Card;
const { Title } = Typography;


const SingleProduct = () => {
    const [cart, setCart] = useCart();
    const [isHovered, setIsHovered] = useState(false);
    const [product, setProduct] = useState({});
    const params = useParams();
    const [count, setCount] = useState(1)
    const [openDesc, setOpenDesc] = useState(true);
    const [openSpec, setOpenSpec] = useState(false);

    useEffect(()=>{
        getSingleProductRequest(params.id).then(res => {
            document.title = res.product.name
            setProduct(res?.product);
        })
    }, [])



    const handleCart = ()=>{

        if (product.quantity === 0){
            toast.error('Product is out of stock');
            return

        }

            product.count = count;

            let cartarr = [];
            cartarr= JSON.parse(localStorage.getItem('cart')) || [];

            const isProductExit = cartarr.find(item => item._id === product._id);

            if (isProductExit){
                cartarr.map((item, i) => {
                    if (item._id === product._id){
                        if ( cartarr[i].count !== product.quantity){
                            cartarr[i].count += count;
                            cartarr[i].price = product.price
                        }
                    }
                })
            }else {
                cartarr.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cartarr));
            setCart(cartarr);
            toast.success('Added to cart success')



    }

    const increase = ()=>{
        if (count >= product.quantity) return
        setCount(prevState => prevState + 1)
    }
    const decrease = ()=>{
        if (count === 1) return;
        setCount(prevState => prevState - 1)
    }

    const handleSegment = (value)=>{
        if (value === 1){
            setOpenDesc(true)
            setOpenSpec(false)
        }else if(value === 2){
            setOpenSpec(true)
            setOpenDesc(false)
        }
    }

    return (
        <>
            <Row gutter={16}>
                <Col span={16}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card
                            >
                                <ReactImageMagnify {...{
                                    smallImage: {
                                        alt: 'Wristwatch by Ted Baker London',
                                        isFluidWidth: true,
                                        src: product.image
                                    },
                                    largeImage: {
                                        src: product.image,
                                        width: 1200,
                                        height: 1800,
                                        zIndex: 1000
                                    },
                                    enlargedImagePosition: 'over',
                                }} />
                            </Card>
                        </Col>

                        <Col span={12}>

                            <div className='d-flex gap-2'>
                                <div className='p-1' style={{background: '#fafafa', color: '#595959'}}>Category: { product?.category ? product?.category[0] : ''}</div>
                                <div className='p-1' style={{background: '#fafafa', color: '#595959'}}>Brand: {product?.brand ? product?.brand[0]?.name : ''}</div>
                            </div>
                            <Title>{product.name}</Title>
                            <Title>${product.price}</Title>
                            <div className='d-flex gap-2 align-items-center'>
                                <div style={{background: '#eaff8f', color: '#5b8c00', borderRadius: '5px', padding: '10px'}}>{ product.quantity > 0 ? 'In stock' : 'out of stock'}</div>
                                <p style={{padding: '10px', margin: 0}}>{product.quantity} items remaining</p>
                            </div>
                            <Row className='mt-4' gutter={16}>
                                <Col span={8}>
                                    <Input
                                        addonBefore={<MinusOutlined onClick={decrease}/>}
                                        addonAfter={<PlusOutlined onClick={increase} />}
                                        value={product.quantity > 0 ? count : 0} readOnly size='large' />

                                </Col>
                                <Col span={16}>
                                    <Button type="primary"
                                            style={{background: '#faad14', color: '#141414', fontWeight: 'bold', padding: '0 40px'}}
                                            size='large' onClick={handleCart}>Add to cart</Button>
                                </Col>

                            </Row>
                        </Col>
                    </Row>
                    <Segmented block onChange={handleSegment} options={[
                        {
                            label: 'Description',
                            value: 1
                        },
                        {
                            label: 'Specification',
                            value: 2
                        }
                    ]} />

                    <div style={{display: openDesc ? 'block': 'none'}} className='py-4'>
                        {product?.description}
                    </div>
                    <div style={{display: openSpec ? 'block': 'none'}}>Specification</div>

                </Col>
                <Col span={8}>
                    Right Side Bar
                </Col>
            </Row>

        </>
    );
};

export default SingleProduct;