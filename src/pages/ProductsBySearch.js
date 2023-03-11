import React, {useEffect, useState} from 'react';
import {useSearch} from "../context/search";
import {Button, Col, Row} from "antd";
import PostCard from "../components/card/ProductCard";
import {getPostsByKeywordRequest, getProductsRequest} from "../APIRequest/productApi";
import ProductCard from "../components/card/ProductCard";
import ProductSkeleton from "./skeleton/ProductSkeleton";

const ProductsBySearch = () => {
    const {products, setProducts, keyword, total, searchProductLoading, setSearchProductLoading} = useSearch();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const loadMore = async ()=>{
        try {
            setLoading(true);
            getProductsRequest(page).then(res => {
                setProducts([...products, ...res?.products?.rows])
            })
            setLoading(false);
        }catch (e) {
            console.log(e);
        }

    }

    useEffect(()=> {
        if (page === 1) {
            return;
        }
        loadMore().catch()
    }, [page])

    useEffect(()=>{
        document.title = keyword
    },[keyword])


    return (
        <>
            <h3>Search by - {keyword}</h3>
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
                        <ProductSkeleton loading={searchProductLoading || loading}/>
                    </Row>
                    : <h3 className='text-center d-block'>Product Not found</h3>
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

export default ProductsBySearch;