import React, { useState, useEffect } from "react";
import axios from "axios";

import {Checkbox, Col, Radio, Row, Skeleton} from "antd";
import { prices } from "../prices";
import useCategories from "../hooks/useCategories";
import {getProductsRequest} from "../APIRequest/productApi";
import ProductCard from "../components/card/ProductCard";
import ProductSkeleton from "./skeleton/ProductSkeleton";

const ShopPage = ()=> {
    const [categories, setCategories, catLoading, setCatLoading] = useCategories();
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);


    const loadProducts = async ()=>{
        try {
            setLoading(true);
            const res = await getProductsRequest(page);
            setLoading(false);
            setProducts(res?.products?.rows);
            setTotal(res?.products?.total)

        }catch (e) {
            console.log(e)
        }
    }

    const loadFilterProducts = async ()=>{
        try {
            setLoading(true);
            const {data} = await axios.post('/products/filtered', {
                checked: checked,
                radio: radio
            });
            setLoading(false);
            setProducts(data?.products?.rows);
            setTotal(data?.products?.total)

        }catch (e) {
            console.log(e.response.data.error);
        }
    }


    const loadMore = async ()=>{
        try {
            setLoading(true);
            const res = await getProductsRequest(page);
            setProducts([...products, ...res?.products?.rows]);
            setLoading(false)
        }catch (e) {
            console.log(e)

        }
    }


    const handleCheck = (value, id)=>{
        let all = [...checked];

        if (value){
            all.push(id);
        }else {
            all = all.filter(cId => cId !== id);
        }
        setChecked(all)

    }


    useEffect(()=> {
        if (page === 1) return;
        loadMore().catch()
    }, [page])

    useEffect(()=> {
        if (!checked.length && !radio.length) {
            loadProducts();
        }
    }, [radio, checked]);


    useEffect(()=>{
        if (checked.length || radio.length) {
            setPage(1);
            loadFilterProducts().catch()
        }
    }, [checked, radio])


    // useEffect(()=>{
    //     getTotal().catch();
    // }, [])


    return (
        <>
            {/*<Jumbotron title="Hello World" subTitle="Welcome to React E-commerce" />*/}

            {/* <pre>{JSON.stringify({ checked, radio }, null, 4)}</pre> */}

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
                            Filter by Categories
                        </h2>

                        <div className="p-5">
                            {categories !== undefined ? categories?.map((c) => (
                                <Checkbox
                                    key={c.name}
                                    onChange={(e) => handleCheck(e.target.checked, c.name)}
                                >
                                    {c.name}
                                </Checkbox>
                            )): ''}
                            <Skeleton active={true} loading={catLoading} paragraph={{rows: 4}} />
                        </div>

                        <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
                            Filter by Price
                        </h2>

                        <div className="row p-5">
                            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                                {prices?.map((p, i) => (
                                    <div key={i} style={{ marginLeft: "8px" }}>
                                        <Radio value={p.array}>{p.name}</Radio>
                                    </div>
                                ))}
                            </Radio.Group>
                        </div>

                        <div className="p-5 pt-0">
                            <button
                                className="btn btn-outline-secondary col-12"
                                onClick={() => window.location.reload()}
                            >
                                Reset
                            </button>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
                            {checked.length > 0 || radio.length > 0 ? total : products?.length} Products
                        </h2>

                        <Row
                            gutter={16}
                        >

                            {products?.map((product, i) => (
                                <Col span={8} key={i} style={{marginBottom: '20px'}}>
                                    <ProductCard product={product} />
                                </Col>
                            ))}

                            <ProductSkeleton loading={loading}/>

                            <div className="container text-center p-5">
                                {products && products.length < total && (
                                    <button
                                        className="btn btn-warning btn-lg col-md-6"
                                        disabled={loading}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setPage(page + 1);
                                        }}
                                    >
                                        {loading ? "Loading..." : "Load more"}
                                    </button>
                                )}
                            </div>

                        </Row>



                    </div>



                </div>
            </div>
        </>
    );
}

export default ShopPage;