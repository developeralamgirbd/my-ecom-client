import React, {useEffect, useState} from 'react';
import {Button, Card, Form, Input} from "antd";
import {getProfileRequest, updateProfileRequest} from "../../APIRequest/userApi";
import {sessionSetAuth} from "../../helpers/sessionHelper";

const ProfileForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form] = Form.useForm();

    useEffect(()=>{
       getProfile();
    }, [])

    const getProfile = ()=>{
        getProfileRequest().then(res => {
            form.setFieldsValue({
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                email: res.data.email,
            })
        })
    }

    const onFinish = () => {
        const values = form.getFieldsValue();
        delete values.email;

        setIsSubmitting(true)
        updateProfileRequest(values).then(result => {
            setIsSubmitting(false)
            if (result){
                getProfileRequest().then(res => {
                    sessionSetAuth(res.data)
                })

            }
        })
    };
    return (
        <Card>
            <Form
                form={form}
                name="basic"
                layout='vertical'
                labelCol={{
                    span: 8,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your First Name!',
                        },
                    ]}
                >
                    <Input size='large' style={{width: '100%'}}/>
                </Form.Item>

                <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your Last Name!',
                        },
                    ]}
                >
                    <Input size='large' style={{width: '100%'}}/>
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                >
                    <Input readOnly size='large' style={{width: '100%'}}/>
                </Form.Item>


                <Form.Item
                >
                    <Button type="primary" htmlType="submit" className='d-block w-100' loading={isSubmitting}>
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </Card>

    );
};

export default ProfileForm;