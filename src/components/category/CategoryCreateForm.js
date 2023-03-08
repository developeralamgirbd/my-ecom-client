import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Form, Input, Row} from "antd";
import {
    categoryCreateUpdateRequest,
} from "../../APIRequest/categoryApi";
import {useLocation, useNavigate, useNavigation} from "react-router-dom";
import Title from "antd/es/typography/Title";
import CategoryTree from "./CategoryTree";

const CategoryCreateForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [catForm, setCatForm] = useState('root');
    const [catAction, setCatAction] = useState('');
    const [catId, setCatId] = useState('');
    const [index, setIndex] = useState(0);

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const navigation =  useNavigation();


    const categoryID = location.state?.id;
    const categoryName = location.state?.name;
    const categoryForm = location.state?.form;
    const formAction = location.state?.action;
    const subCatChildIndex = location.state?.index;

    useEffect(()=>{
        document.title = 'Category Create';
        if (categoryID){
            setCatForm(categoryForm);
            setCatAction(formAction);
            setCatId(categoryID);
            setIndex(subCatChildIndex);

            form.setFieldsValue({
                name: categoryName
            })
        }

    }, [categoryID, categoryName, categoryForm])



    const rootCatHandle = ()=>{
        setCatForm('root')
        setCatId('');
        setCatAction('create');
        form.resetFields();
    }

    const subCatHandle = ()=>{
        if (catForm === 'sub'){
            setCatForm('sub')
            setCatAction('childcreate');
            setCatId(categoryID)
            setIndex(subCatChildIndex)
            form.resetFields();
        }else {
            setCatForm('sub')
            setCatAction('create');
            setCatId(categoryID)
            form.resetFields();
        }
    }

    const onFinish = () => {
        const values = form.getFieldsValue();
        setIsSubmitting(true)

        categoryCreateUpdateRequest(values.name, catId, catForm, catAction, index).then(res => {
            setIsSubmitting(false)
            if (res){
                // navigate('/admin/category-create')
                window.location.reload();
                // form.resetFields();
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
                    <Button onClick={rootCatHandle} >New Root Category</Button>
                    <Button onClick={subCatHandle} style={{marginLeft: '10px'}}>New Sub Category</Button>
                </div>
            </div>
            <Row>
                <Col span={8}>
                    <CategoryTree />
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