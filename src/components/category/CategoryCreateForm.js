import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Form, Input, Row} from "antd";
import {
    categoryCreateUpdateRequest,
    getSingleCategoryRequest
} from "../../APIRequest/categoryApi";
import {useLocation, useNavigate} from "react-router-dom";
import Title from "antd/es/typography/Title";
import CategoryTree from "../../pages/admin/category/CategoryTree";

const CategoryCreateForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const categoryID = location.state?.id;

    useEffect(()=>{
        document.title = 'Category Create';
        if (categoryID){
            getSingleCategoryRequest(categoryID).then(res => {
                form.setFieldsValue({
                    name: res.data.name
                })
            })
        }


    }, [])

    const onFinish = () => {
        const values = form.getFieldsValue();
        setIsSubmitting(true)
        categoryCreateUpdateRequest(values.name, categoryID).then(res => {
            setIsSubmitting(false)
           if (res){
               navigate('/dashboard/category-list')
           }
        })
    };


    return (
        <Card>
            <div className='d-flex justify-content-between'>
                <div>
                    <Title level={4}>Category Information</Title>
                </div>
                <div>
                    <Button >New Root Category</Button>
                    <Button style={{marginLeft: '10px'}}>New Sub Category</Button>
                </div>
            </div>
            <Row>
                <Col span={8}>
                    <CategoryTree/>
                </Col>
                <Col span={16}>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        layout='vertical'
                        style={{
                            maxWidth: 600,
                        }}
                        form={form}
                        onFinish={onFinish}
                        autoComplete="off"
                    >

                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter category name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                        >
                            <Button htmlType="submit" loading={isSubmitting}>
                                Save
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>

        </Card>
    );
};

export default CategoryCreateForm;