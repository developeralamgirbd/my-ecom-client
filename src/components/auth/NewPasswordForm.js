import React, {useState} from 'react';
import {Button, Form, Input} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {resetPasswordRequest} from "../../APIRequest/userApi";
import {getOtp, getVerifyEmail, setOtp, setVerifyEmail} from "../../helpers/sessionHelper";

const NewPasswordForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const onFinish = (values) => {
        setIsSubmitting(true)
        const email = getVerifyEmail();
        const otp = getOtp();

        resetPasswordRequest(email, otp, values.password, values.confirmPassword).then(res => {
            setIsSubmitting(false)
            if (res){
                navigate('/login');
                localStorage.removeItem('otp-email')
                localStorage.removeItem('otp')
            }
        })
    };



    const passwordValidator = [

        { required: true, message: 'Please enter your password' },
        { max: 40, message: 'Password cannot be more than 40 characters long' },

        { pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
            message: 'Password must contain at least 8 characters long, one uppercase letter, one lowercase letter, one digit and one special character'
        }
    ]
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
                    Reset
                </Button>
            </Form.Item>
            <div>Do you have remember password?<Link to='/login' className='' > Login</Link></div>
        </Form>
    );
};

export default NewPasswordForm;