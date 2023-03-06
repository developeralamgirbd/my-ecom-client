import React, {useEffect, useState} from 'react';
import {Button, Card, Form, Input} from "antd";
import {
    categoryCreateUpdateRequest,
    getSingleCategoryRequest
} from "../../APIRequest/categoryApi";
import {useLocation, useNavigate} from "react-router-dom";

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
                    <Button type="primary" htmlType="submit" loading={isSubmitting}>
                        {categoryID ? 'Update' : 'Create'}
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default CategoryCreateForm;