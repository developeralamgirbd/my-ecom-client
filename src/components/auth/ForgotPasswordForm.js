import React, {useState} from 'react';
import {Button, Form, Input} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {sendOtpRequest} from "../../APIRequest/userApi";
import {setVerifyEmail} from "../../helpers/sessionHelper";

const ForgotPasswordForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log('Success:', values);
        setIsSubmitting(true)

        sendOtpRequest(values.email).then(res => {
            setIsSubmitting(false);
            if (res){
                setVerifyEmail(values.email);
                navigate('/verify-otp', {
                    state: {
                        path: '/reset-password'
                    }
                })
            }
        })
    };


    return (
        <Form
            className='shadow-sm rounded p-4'
            name="basic"
            layout='vertical'
            labelCol={{
                span: 8,
            }}
            style={{
                width: '600px',
                backgroundColor: '#f5f5f5'
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
        >

            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        type: "email",
                        message: '${label} is not a valid email!'
                    },
                    {
                        required: true,
                        message: 'Please enter your email!',
                    },
                ]}
            >
                <Input size='large' style={{width: '100%'}}/>
            </Form.Item>

            <Form.Item
            >
                <Button type="primary" htmlType="submit" className='d-block w-100' loading={isSubmitting}>
                    Next
                </Button>
            </Form.Item>
            <div>Can you remember your password ?<Link to='/login' className='' > Login</Link></div>
        </Form>
    );
};

export default ForgotPasswordForm;