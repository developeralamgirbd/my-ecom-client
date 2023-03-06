import React from 'react';
import CategoryCreateForm from "../../components/category/CategoryCreateForm";
import {Col, Row} from "antd";

const CategoryCreatePage = () => {
    return (
        <Row>
            <Col span={6} offset={10}>
                <CategoryCreateForm/>
            </Col>

        </Row>
    );
};

export default CategoryCreatePage;