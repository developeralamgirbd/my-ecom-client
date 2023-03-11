import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getPostsByCategoryRequest, getPostsRequest, getProductsByCategoryRequest} from "../APIRequest/productApi";
import {Button, Col, Row} from "antd";
import ProductCard from "../components/card/ProductCard";
import ProductSkeleton from "./skeleton/ProductSkeleton";

const ProductsByCategory = () => {

    const params = useParams();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [products, setProducts] = useState([])

    const loadProducts = async ()=> {
        try {
            setLoading(true)
           const res =  await getProductsByCategoryRequest(params.name, page);
            setLoading(false)
            setProducts(res?.products[0]?.rows);
            setTotal(res?.products[0]?.totalProduct[0]?.count)

        }catch (e) {
            console.log(e)
        }
    }

    const loadMore = async ()=>{
        try {
            setLoading(true);
            getPostsByCategoryRequest(params.name, page).then(res => {
                setProducts([...products, ...res?.products[0]?.rows])
            })
            setLoading(false);
        }catch (e) {
            console.log(e);
        }

    }

    useEffect(()=> {
        if (page === 1) return;
        loadMore().catch(e => console.log(e));

    }, [page])

    useEffect(()=> {
        document.title = params.name
        loadProducts().catch(e => console.log(e));
    }, [params.name])

    return (
        <>
            {
                products?.length > 0 ?
                    <Row gutter={16}>

                        {
                            products.map(product => (
                                <Col span={8}>
                                    <ProductCard product={product}/>
                                </Col>
                            ))

                        }

                    </Row>
                    :  <>
                    <Row>
                        <ProductSkeleton loading={loading}/>
                    </Row>
                        <h3 className={`text-center ${loading ? 'd-none' : 'd-block'}`}>Product Not found</h3>
                    </>
            }

            {products && products.length < total && (

                <div className='d-flex justify-content-center my-5 mb-5'>
                    <Button type="primary" className='mb-5'
                            loading={loading}
                            disabled={loading}
                            onClick={event => {
                                event.preventDefault();
                                setPage(page + 1);
                            }}
                    >
                        Load More
                    </Button>
                </div>
            )}

        </>
    );
};

export default ProductsByCategory;