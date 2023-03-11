import React, {useEffect, useState} from 'react';
import {Card} from "antd";
import OrderList from "./OrderList";
import {getOrdersRequest} from "../../APIRequest/orderApi";

const OrderComponent = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true)
        getOrdersRequest().then(res => {
            setOrders(res.orders);
            setLoading(false)
        })
    }, [])

    return (
        <div>
            <Card>
                <OrderList orders={orders} loading={loading}/>
            </Card>
        </div>
    );
};

export default OrderComponent;