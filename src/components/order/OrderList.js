import React, {useEffect, useState} from 'react';
import {Avatar, Button, List, Skeleton, Space, Table, Tag} from "antd";
import Moment from "react-moment";
import {Link} from "react-router-dom";

const OrderList = ({orders, loading}) => {



/*
    const loadMore =
        !initLoading && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore}>loading more</Button>
            </div>
        ) : null;*/

    const columns = [
        {
            title: 'Invoice No ',
            dataIndex: 'orderID',
            key: 'orderID',
        },
        {
            title: 'Order Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => <Moment format="YYYY/MM/DD">${text}</Moment>,
        },
        {
            title: 'Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (text) => <span>${text}</span>,
        },
        {
            title: 'Payment Status',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            render: (_, {paymentStatus} ) =>

            {
                let color = paymentStatus === 'paid' ? '#52c41a' : '#cf1322';
                return (
                    <Tag color={color} key={paymentStatus}>
                        {paymentStatus.toUpperCase()}
                    </Tag>
                );
            }
        },

        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (_, {status} ) =>

                    {
                        let color = status === 'onhold' ? '#C9820A' : '#C9820A';
                        if (status === 'processing') {
                            color = '#fadb14';
                        }else if (status === 'delivered'){
                            color = '#52c41a';
                        }else if (status === 'cancelled'){
                            color = '#cf1322';
                        }
                        return (
                            <Tag color={color} key={status}>
                                {status.toUpperCase()}
                            </Tag>
                        );
                    }
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, {_id}) => (
                <Space size="middle">
                    <Button>
                        <Link to={`/customer/orders/details/${_id}`}>View</Link>
                    </Button>
                </Space>
            ),
        },
    ];


    return (
        <>
            <Skeleton paragraph={{rows: 8}} active={true} loading={loading}>
                <Table columns={columns} dataSource={orders} />;
            </Skeleton>
        </>
    );
};

export default OrderList;