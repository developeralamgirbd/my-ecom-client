import React, {useRef} from 'react';
import {Link} from "react-router-dom";
import {Button, Image} from "antd";
import toast from "react-hot-toast";
import {useCart} from "../../context/cart";
import { Typography } from 'antd';
const { Title } = Typography;

const ProductCard = ({product}) => {

    const [cart, setCart] = useCart();
    const cartRef = useRef();

    const handleCart = ()=>{
        product.count = 1;

        let cartarr = [];
        cartarr= JSON.parse(localStorage.getItem('cart')) || [];

        const isProductExit = cartarr.find(item => item._id === product._id);

        if (isProductExit){
            cartarr.map((item, i) => {
                if (item._id === product._id){
                    if ( cartarr[i].count !== product.quantity){
                        cartarr[i].count += 1;
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

    return (
        <>
            <div>

                <Link to={`/product/${product._id}`}>

                    <Image
                        width='100%'
                        height={300}
                        src="error"
                        preview={{visible: false}}
                        fallback={product.image}

                    />
                </Link>

                <div className='text-center'>
                    <h1>
                        <Link to={`/product/${product._id}`}>
                            <Title level={5}> {product.name} </Title>
                        </Link>
                    </h1>
                    <p>Price: {product.price}</p>
                    <div className='d-flex gap-2 justify-content-center'>
                        <Button type="primary"
                                style={{background: '#faad14', color: '#141414', fontWeight: 'bold', padding: '0 20px'}}
                                size='small' onClick={handleCart} block>Add to cart</Button>
                        {/*<Button type="primary"*/}
                        {/*        style={{fontWeight: 'bold', padding: '0 20px'}}*/}
                        {/*        danger size='large' className='ml-2'>Buy now</Button>*/}
                    </div>

                </div>

            </div>



        </>
    );
};

export default ProductCard;