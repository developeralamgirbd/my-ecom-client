import React, {useEffect, useRef, useState} from 'react';
import {Button, Card, Cascader, Col, Form, Input, InputNumber, Row, Segmented, Select, Upload, message} from "antd";
import {useLocation, useNavigate} from "react-router-dom";
import useCategories from "../../hooks/useCategories";
import {getSinglePostRequest, postCreateUpdateRequest, productCreateUpdateRequest} from "../../APIRequest/productApi";
import {LoadingOutlined, PlusOutlined, UploadOutlined} from "@ant-design/icons";
import useBrands from "../../hooks/useBrands";
const { Option } = Select;
const { TextArea } = Input;


const ProductCreateForm = () => {
    const [categories, setCategories] = useCategories();
    const [brands, setBrands] = useBrands();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const location = useLocation();
    const productID = location.state?.id;
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    let imageRef = useRef();
    let imageView= useRef();

    const [segment, setSegment] = useState('general');
    const [inventory, setInventory] = useState(false);
    const [openSpec, setOpenSpec] = useState(false);

    useEffect(()=>{
        document.title = 'Post Create';
        // if (postID){
        //     getSinglePostRequest(postID).then(res => {
        //         form.setFieldsValue({
        //             title: res.data.title,
        //             categoryID: res.data.categoryID,
        //             description: res.data.description,
        //         })
        //     })
        // }
    }, [])

    // Category Tree
    const options = categories.reduce((rootAcc, rootCurr)=> {

        const subCategories = rootCurr.subCategory.reduce((subAcc, subCurr)=>{

            const subChildren = subCurr.children !== undefined && subCurr.children.reduce((subChildAcc, subChildCurr, index) => {
                return [...subChildAcc, {
                    value: subChildCurr,
                    label: subChildCurr }]
            }, [])

            return [...subAcc, {
                value: subCurr.name,
                label: subCurr.name,
                children: subChildren
            }]
        }, [])

        return [...rootAcc, {
            value: rootCurr.name,
            label: rootCurr.name,
            children: subCategories
        }]
    }, [])


    const onChange = (value)=>{
        form.setFieldValue('category', value)
    }


    const handleSegment = (value)=>{
        // if (value === 'general'){
        //     setGeneral(true)
        //     setInventory(false)
        // }else if(value === 2){
        //     setOpenSpec(true)
        //     setOpenDesc(false)
        // }
        setSegment(value)
    }

    const getBase64 = (file)=> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    const PreviewImage = () => {
        let ImgFile = imageRef.files[0];
        form.setFieldValue('image', ImgFile)
        getBase64(ImgFile).then((base64Img)=>{
            imageView.src = base64Img;
            form.setFieldValue('image', base64Img)
        })

    }


    const onFinish = () => {

        const values = form.getFieldsValue();
        setIsSubmitting(true)
        productCreateUpdateRequest(values, productID).then(res => {
            setIsSubmitting(false)
            if (res){
                // navigate('/dashboard/product-list')
                form.resetFields();
            }
        })

    };




    return (

            <Form

                form={form}
                name="basic"
                layout='vertical'
                onFinish={onFinish}
                autoComplete="off"
                encType='multipart/form-data'
            >
                <Row gutter={18}>
                    <Col span={18}>
                        <Card title='Product'>
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter product name',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label='Category'
                                name='category'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select category',
                                    },
                                ]}
                            >
                                <Cascader options={options} onChange={onChange} placeholder="Please select" />
                            </Form.Item>

                        </Card>
                        {/*Product Description*/}
                        <Card className='my-3' title='Add Product Details'>
                            <Form.Item
                                label="Description"
                                name="description"
                            >
                                <TextArea />
                            </Form.Item>
                        </Card>
                        {/*Product Data*/}
                        <Card className='my-3' title='Product Data'>
                            <Segmented block onChange={handleSegment} options={[
                                {
                                    label: 'General',
                                    value: 'general'
                                },
                                {
                                    label: 'Inventory',
                                    value: 'inventory'
                                },
                                {
                                    label: 'Shipping & Delivery',
                                    value: 'shipping&delivery'
                                },
                                {
                                    label: 'Service',
                                    value: 'service'
                                },
                                {
                                    label: 'Attributes',
                                    value: 'attributes'
                                }
                            ]} />

                            <div style={{display: segment === 'general' ? 'block': 'none'}} className='py-4'>
                                <Form.Item
                                    label="Regular Price"
                                    name="price"
                                >
                                    <InputNumber />
                                </Form.Item>
                            </div>

                            <div style={{display: segment === 'inventory' ? 'block': 'none'}} className='py-4'>
                                <Form.Item
                                    label="Quantity"
                                    name="quantity"
                                >
                                    <InputNumber />
                                </Form.Item>

                            </div>
                            <div style={{display: segment === 'shipping&delivery' ? 'block': 'none'}}>
                                <p className='text-center p-4'> Product Shipping & Delivery </p>
                            </div>
                            <div style={{display: segment === 'service' ? 'block': 'none'}}>
                                <p className='text-center p-4'> Product Service</p>
                            </div>
                            <div style={{display: segment === 'attributes' ? 'block': 'none'}}>
                                <p className='text-center p-4'> Product Attributes</p>
                            </div>


                        </Card>
                    {/*Product Photos*/}
                        <Card className='my-3' title='Product Photos'>
                            <img ref={(input) => imageView = input} className="my-4" style={{ display: imageView.src === '' ? 'none': 'block', width: '300px', height: '200px'}} src={imageView} alt=""/>

                            <input onChange={PreviewImage}  ref={(input)=> imageRef = input} placeholder="User Email" className="form-control animated fadeInUp" type="file"/>
                            <Form.Item
                                label=""
                                name="image"
                            >
                            </Form.Item>
                          {/*  <Form.Item label="Image" name='image'>
                                <Upload>
                                    <Button icon={<UploadOutlined />}>Select Image</Button>
                                </Upload>
                            </Form.Item>*/}

                        </Card>

                    </Col>
                    {/*Form Right Side*/}

                    <Col span={6}>
                        <Card title='Additional Info'>
                            <Form.Item

                                label='Brand'
                                name='brandID'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select a brand',
                                    },
                                ]}
                            >
                                <Select placeholder="Select Brand">
                                    {
                                        brands.map(brand => (
                                            <Option key={brand._id} value={brand._id}>{brand.name}</Option>
                                        ))
                                    }
                                </Select>


                            </Form.Item>
                        </Card>
                        <Form.Item
                        >
                            <Button type="primary" htmlType="submit" loading={isSubmitting} className='my-4'>
                                {productID ? 'Update' : 'Create'}
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>

            </Form>
    );
};

export default ProductCreateForm;
