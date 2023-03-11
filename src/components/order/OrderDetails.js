import React, {useEffect, useState} from 'react';
import Title from "antd/es/typography/Title";
import {Card, Col, Image, List, Row, Skeleton, Table, Tag} from "antd";
import {Link, useParams} from "react-router-dom";
import {getOrderDetailsRequest} from "../../APIRequest/orderApi";
import {getAddressRequest} from "../../APIRequest/userApi";
import {useAuth} from "../../context/AuthProvider";

const OrderDetails = () => {
    const [orderDetails, setOrderDetails] = useState([]);
    const [shipping, setShipping] = useState({});
    const [address, setAddress] = useState({});
    const [subTotal, setSubTotal] = useState(0);
    const [orders, setOrders] = useState({});
    const [loading, setLoading] = useState(false);

    const params = useParams();
    const {auth} = useAuth();



    useEffect(()=>{
        setLoading(true)
        getOrderDetailsRequest(params.id).then(res => {
            setOrderDetails(res?.orderDetails.rows);
            setShipping(res?.shippingAddress[0]);
            setSubTotal(res?.orderDetails.subtotal)
            setOrders(res.orders[0]);
            setLoading(false)
        })

        getAddressRequest().then(res => {
            setAddress(res?.address[0])

        })
    }, [params.id])

    const columns = [
        {
            title: 'Products ',
            dataIndex: '',
            key: 'products',
            render: (_, {products}) => <>
                <div className='d-flex gap-2 align-items-center'>
                    <Image src={products.image} style={{width: '100px'}}></Image>
                    <Title level={4}> <Link to={`/product/${products._id}`} className='text-secondary'>{products.name}</Link> </Title>
                </div>

            </>,
        },
        {
            title: 'Cost  ',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Amount',
            key: 'amount',
            render: (_, {price, quantity}) => <span>${quantity * price}</span>,
        },
    ]

    return (
        <div style={{margin: '50px 0'}}>
            <Title>Order Details </Title>
            <Row gutter={16}>
                <Col span={6}>
                    <Skeleton paragraph={{rows: 4}} active={true} loading={loading}>
                        <Title level={4} className='text-uppercase text-secondary'>id number</Title>
                        <Title className='p-0 m-0  text-uppercase' >ORD-{orders.orderID}</Title>
                        <Title level={4} className='text-secondary text-uppercase'>Status</Title>
                        <Title className='p-0 m-0 text-uppercase'>{orders.status}</Title>
                    </Skeleton>

                </Col>
                <Col span={6}>
                    <Skeleton loading={loading} active={true}>
                        <Card title='Payment Information' style={{minHeight: '350px'}}>
                            <div className='d-flex gap-2 align-items-center'>
                                <p className='p-0 m-0'>Status: </p>
                                <Tag color={` ${orders.paymentStatus === 'paid' ? 'green': 'red'}`}>
                                    {orders.paymentStatus === 'paid' ? 'Paid' : 'Failed'}
                                </Tag>
                            </div>
                            <div className='my-5'>
                                <p className='p-0 m-0'>Paid Amount: {orders.paymentStatus === 'paid' ? '$'+ orders.totalAmount : '$00.00'} </p>
                                <p className='p-0 m-0'>Amount to be Paid: {orders.paymentStatus !== 'paid' ? orders.totalAmount : '$00.00'}</p>
                            </div>
                            <p>Payment Method: Unknown</p>
                        </Card>
                    </Skeleton>

                </Col>
                <Col span={6}>
                    <Skeleton active={true} loading={loading}>
                        <Card title='Shipping Address' style={{minHeight: '350px'}}>
                            <p className='pb-2 m-0 text-capitalize'> {shipping.name} </p>
                            <p className='pb-2 m-0'>Mobile: {shipping.mobile} </p>
                            <p className='pb-2 m-0'>House no: {shipping.address} </p>
                            <p className='pb-2 m-0'>Postcode: {shipping.zipCode} </p>
                            <p className='pb-2 m-0'>City: {shipping.city} </p>
                            <p className='pb-2 m-0'>State: {shipping.state} </p>
                            <p className='pb-2 m-0'> Country: {shipping.country} </p>
                        </Card>
                    </Skeleton>

                </Col>
                <Col span={6}>
                    <Skeleton loading={loading} active={true}>
                        <Card title='Billing Address' style={{minHeight: '350px'}}>
                            <p className='pb-2 m-0 text-capitalize'> {auth.firstName + ' '+ auth.lastName} </p>
                            <p className='pb-2 m-0'>Mobile: {auth.mobile} </p>
                            <p className='pb-2 m-0'>House no: {address.address} </p>
                            <p className='pb-2 m-0'> Postcode: {address.zipCode} </p>
                            <p className='pb-2 m-0'> City: {address.city} </p>
                            <p className='pb-2 m-0'>State: {address.state} </p>
                            <p className='pb-2 m-0'> Country: {address.country} </p>
                        </Card>
                    </Skeleton>

                </Col>
            </Row>

            <Skeleton loading={loading} active={true}>
                <Table pagination={false} columns={columns} dataSource={orderDetails} className='mt-5'/>

            <div className='border'>
                <Row>
                    <Col span={6} offset={16}>

                            <div className='border-bottom d-flex justify-content-between align-items-center py-3'>
                                <span>Subtotal:</span>
                                <span style={{marginRight: '50px'}}>{subTotal}</span>
                            </div>
                    </Col>
                </Row>
            </div>
        </Skeleton>
        </div>
    );
};

export default OrderDetails;