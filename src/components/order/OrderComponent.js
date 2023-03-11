import React from 'react';
import {Card} from "antd";
import OrderList from "./OrderList";

const OrderComponent = () => {

    return (
        <div>
            <Card>
                <OrderList/>
            </Card>
        </div>
    );
};

export default OrderComponent;