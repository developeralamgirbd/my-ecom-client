import React, {useState} from 'react';
import {Button, Card, Col, Form, Input, Row, Tree} from "antd";
import {
    categoryCreateUpdateRequest, getCategoryRequest, subCatChildrenCreateUpdateRequest, subCategoryCreateUpdateRequest,
} from "../../APIRequest/categoryApi";
import Title from "antd/es/typography/Title";
import useCategories from "../../hooks/useCategories";
import {DownOutlined} from "@ant-design/icons";

const CategoryCreateForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [catId, setCatId] = useState('');
    const [catForm, setCatForm] = useState('');
    const [formAction, setFormAction] = useState('');
    const [index, setIndex] = useState(null);

    const [form] = Form.useForm();
    const [categories, setCategories] = useCategories();

    // Category Tree
    const treeData = categories.reduce((rootAcc, rootCurr)=> {

        const subCategories = rootCurr.subCategory.reduce((subAcc, subCurr)=>{

            const subChildren = subCurr.children !== undefined && subCurr.children.reduce((subChildAcc, subChildCurr, index) => {
                return [...subChildAcc, {
                    title: <span onClick={()=> handleSubCategoryChild(subCurr._id, subChildCurr, index)}>{subChildCurr}</span>,
                    key: subChildCurr + ','+ subCurr._id }]
            }, [])

            return [...subAcc, {
                title: <span onClick={()=> handleSubcategory(subCurr._id, subCurr.name, rootCurr._id)}>{subCurr.name}</span>,
                key: subCurr._id,
                children: subChildren
            }]
        }, [])

        return [...rootAcc, {
            title: <span onClick={()=> handleParentCategory(rootCurr._id, rootCurr.name)}>{rootCurr.name}</span>,
            key: rootCurr._id,
            children: subCategories
        }]
    }, [])

    const handleParentCategory = (id, name)=>{
       setCatForm('root')
       setFormAction('update');
       setCatId(id);
        form.setFieldsValue({
            name: name
        })

    }

    const handleSubcategory = (id, name)=>{
        setCatForm('sub')
        setFormAction('update');
        setCatId(id);
        form.setFieldsValue({
            name: name
        })
    }


    const handleSubCategoryChild = (id, name,index)=>{
        setCatForm('subChild')
        setFormAction('createOrUpdate');
        setCatId(id);
        setIndex(index)
        form.setFieldsValue({
            name: name
        })
    }

    // Category Tree End

    const rootCatHandle = ()=>{
        setCatForm('root')
        setCatId('');
        setFormAction('create');
        setIndex(null);
        form.resetFields();
    }

    const subCatHandle = ()=>{

        if (catForm === 'root'){
            setCatForm('sub')
            setIndex(null);
            setFormAction('create');
            form.resetFields();
        }else {
            setCatForm('subChild')
            setIndex(null);
            setFormAction('create');
            form.resetFields();
        }


    }

    const getCategories = ()=>{
        getCategoryRequest().then(res => {
            setCategories(res?.categories)
        })
    }


    const onFinish = () => {
        const values = form.getFieldsValue();
        if (catForm === 'root'){
            categoryCreateUpdateRequest(values.name, catId).then(res => {
                setIsSubmitting(false)
                if (res){
                    getCategories()
                    form.resetFields();
                }
            })
        }else if(catForm === 'sub'){
            setIsSubmitting(true)
            subCategoryCreateUpdateRequest(values.name, catId, formAction).then(res => {
                setIsSubmitting(false)
                if (res){
                    getCategories()
                    form.resetFields();
                }
            })
        }else if(catForm === 'subChild'){
            setIsSubmitting(true)
            subCatChildrenCreateUpdateRequest(values.name, catId, index).then(res => {
                setIsSubmitting(false)
                if (res){
                    getCategories()
                    form.resetFields();
                }
            })
        }
    };

    return (
        <Card>
            <div className='d-flex justify-content-between'>
                <div>
                    <Title level={4}>Category Information</Title>
                </div>
                <div>
                    <Button onClick={rootCatHandle} >New Root Category</Button>
                    <Button onClick={subCatHandle} style={{marginLeft: '10px'}} disabled={catForm === 'subChild'}>New Sub Category</Button>
                </div>
            </div>
            <Row gutter={16}>
                <Col span={8}>
                    {/*<CategoryTree />*/}
                    <Tree
                        showLine
                        defaultExpandAll
                        switcherIcon={<DownOutlined />}
                        treeData={treeData}
                    />
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