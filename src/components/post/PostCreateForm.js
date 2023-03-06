/*
import React, {useEffect, useState} from 'react';
import {Button, Card, Form, Input, Select} from "antd";
import {useLocation, useNavigate} from "react-router-dom";
import useCategories from "../../hooks/useCategories";
import {getSinglePostRequest, postCreateUpdateRequest} from "../../APIRequest/productApi";
const { Option } = Select;
const { TextArea } = Input;


const ProductCreateForm = () => {
    const [categories, setCategories] = useCategories();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const location = useLocation();
    const postID = location.state?.id;

    useEffect(()=>{
        document.title = 'Post Create';
        if (postID){
            getSinglePostRequest(postID).then(res => {
                form.setFieldsValue({
                    title: res.data.title,
                    categoryID: res.data.categoryID,
                    description: res.data.description,
                })
            })
        }
    }, [])



    const onFinish = () => {
        const values = form.getFieldsValue();
        setIsSubmitting(true)
        postCreateUpdateRequest(values, postID).then(res => {
            setIsSubmitting(false)
            if (res){
                navigate('/dashboard/post-list')
            }
        })
    };


    return (
        <Card>
            <Form
                form={form}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                layout='vertical'
                style={{
                    maxWidth: 600,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Title"
                    name="title"
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
                    label='Category'
                    name='categoryID'
                    rules={[
                        {
                            required: true,
                            message: 'Please select a category!',
                        },
                    ]}
                >
                    <Select placeholder="Select Category">
                        {
                            categories.map(category => (
                                <Option key={category._id} value={category._id}>{category.name}</Option>
                            ))
                        }
                    </Select>


                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter post description!',
                        },
                    ]}
                >
                    <TextArea rows={4} />
                </Form.Item>


                <Form.Item
                >
                    <Button type="primary" htmlType="submit" loading={isSubmitting}>
                        {postID ? 'Update' : 'Create'}
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default PostCreateForm;*/
