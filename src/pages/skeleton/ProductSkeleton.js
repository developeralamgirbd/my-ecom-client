import React from 'react';
import {Col, Skeleton} from "antd";

const ProductSkeleton = ({loading}) => {
    return (
        <>

            <Col span={6} style={{marginBottom: '30px'}}>
                <Skeleton loading={loading} title={{width: '100%'}} avatar={{shape: 'square', size: 'large'}} active={true} paragraph={{rows: 2}} >
                </Skeleton>
            </Col>
            <Col span={6} style={{marginBottom: '30px'}}>
                <Skeleton loading={loading} title={{width: '100%'}} avatar={{shape: 'square', size: 'large'}} active={true} paragraph={{rows: 2}} >
                </Skeleton>
            </Col>
            <Col span={6} style={{marginBottom: '30px'}}>
                <Skeleton loading={loading} title={{width: '100%'}} avatar={{shape: 'square', size: 'large'}} active={true} paragraph={{rows: 2}} >
                </Skeleton>
            </Col>
            <Col span={6} style={{marginBottom: '30px'}}>
                <Skeleton loading={loading} title={{width: '100%'}} avatar={{shape: 'square', size: 'large'}} active={true} paragraph={{rows: 2}} >
                </Skeleton>
            </Col>
            <Col span={6} style={{marginBottom: '30px'}}>
                <Skeleton loading={loading} title={{width: '100%'}} avatar={{shape: 'square', size: 'large'}} active={true} paragraph={{rows: 2}} >
                </Skeleton>
            </Col>
            <Col span={6} style={{marginBottom: '30px'}}>
                <Skeleton loading={loading} title={{width: '100%'}} avatar={{shape: 'square', size: 'large'}} active={true} paragraph={{rows: 2}} >
                </Skeleton>
            </Col>
            <Col span={6} style={{marginBottom: '30px'}}>
                <Skeleton loading={loading} title={{width: '100%'}} avatar={{shape: 'square', size: 'large'}} active={true} paragraph={{rows: 2}} >
                </Skeleton>
            </Col>
            <Col span={6} style={{marginBottom: '30px'}}>
                <Skeleton loading={loading} title={{width: '100%'}} avatar={{shape: 'square', size: 'large'}} active={true} paragraph={{rows: 2}} >
                </Skeleton>
            </Col>
        </>
    );
};

export default ProductSkeleton;