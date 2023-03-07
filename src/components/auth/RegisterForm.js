import React, {useState} from 'react';
import {Button, Form, Input, InputNumber} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {registerRequest} from "../../APIRequest/userApi";
import {setVerifyEmail} from "../../helpers/sessionHelper";

const RegisterForm = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const passwordValidator = [

        { required: true, message: 'Please enter your password' },
        { max: 40, message: 'Password cannot be more than 40 characters long' },

        { pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
            message: 'Password must contain at least 8 characters long, one uppercase letter, one lowercase letter, one digit and one special character'
        }
    ]

    const onFinish = (values) => {
        setIsSubmitting(true)
        registerRequest(values).then(result => {
            setIsSubmitting(false)
            if (result){
                setVerifyEmail(values.email);
                navigate('/verify-otp', {
                    state: {
                        path: '/login'
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
                label="Mobile"
                name="mobile"
                rules={[
                    {
                        required: true,
                        message: 'Please enter your mobile!',
                    },
                ]}
            >
                <Input size='large' style={{width: '100%'}}/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={passwordValidator}
            >
                <Input.Password size='large'/>
            </Form.Item>

            <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={['password']}
                rules={[
                    {
                        required: true,
                        message: 'Please enter confirm password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Confirm password do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password size='large'/>
            </Form.Item>


            <Form.Item
            >
                <Button type="primary" htmlType="submit" className='d-block w-100' loading={isSubmitting}>
                    Register
                </Button>
            </Form.Item>
            <div>Already have an account?<Link to='/login' className='' > Login</Link></div>
        </Form>
    );
};

export default RegisterForm;