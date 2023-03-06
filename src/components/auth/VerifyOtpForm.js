import React, {useEffect, useState} from 'react';
import {Button, Form, InputNumber} from "antd";
import {Link, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {sendOtpRequest, verifyEmailRequest} from "../../APIRequest/userApi";
import {getVerifyEmail} from "../../helpers/sessionHelper";

const VerifyOtpForm = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [isSubmitting, setIsSubmitting] = useState(false);

    function formatter(value) {
        return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '');
    }

    const onFinish = (values) => {
        setIsSubmitting(true)
        const email = getVerifyEmail();
        verifyEmailRequest(email,values.otp).then(res => {
            setIsSubmitting(false)
           if (res){
               navigate(location.state?.path)
           }
        })

    };

    const resendOtpHandle = ()=>{
        const email = getVerifyEmail();
        sendOtpRequest(email).then(res => {

        })
    }

    return (
        <Form
            className='shadow-sm rounded p-4'
            name="basic"
            layout='horizontal'
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
                name='otp'
                rules={[
                    {
                        required: true,
                        message: 'Please provide otp code'
                    }
                ]}
                className='p-0 m-0'
            >
                <InputNumber
                    style={{ width: '100%' }}
                    maxLength={6}
                    step={1}
                    precision={0}
                    formatter={formatter}
                    size='large'
                />
            </Form.Item>

            <Button onClick={resendOtpHandle} className='my-2'>Resend OTP</Button>

            <Form.Item
            >
                <Button type="primary" htmlType="submit" className='d-block w-100' loading={isSubmitting}>
                    Confirm
                </Button>
            </Form.Item>
            <div>Can you remember your password ?<Link to='/login' className='' > Login</Link></div>
        </Form>
    );
};

export default VerifyOtpForm;