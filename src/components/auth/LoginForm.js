import React from 'react';
import {Button, Checkbox, Form, Input} from "antd";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {loginRequest} from "../../APIRequest/userApi";
import {sessionSetAuth, sessionSetToken} from "../../helpers/sessionHelper";
import {useAuth} from "../../context/AuthProvider";


const LoginForm = () => {
    const {setAuth, setToken} = useAuth();
    const location = useLocation();
    const [form] = Form.useForm();

    const onFinish = () => {
        const values = form.getFieldsValue(true);
        loginRequest(values.email, values.password).then(res => {

            sessionSetAuth(res.data.user);
            sessionSetToken(res.data.token);
            setAuth(res.data.user);
            setToken(res.data.token)

            window.location.pathname =  location.state || `/${res?.data?.user?.role === 'superadmin' ? "admin" : ""}`
        })
    };

    const adminLogin = ()=>{
      form.setFieldsValue({
            email: 'prgalamgir@gmail.com',
            password: 'Mrt@123456',
        });
    }

    return (

            <Form
                form={form}
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
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input size='large' style={{width: '100%'}}/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    className='p-0 m-0'
                >
                    <Input.Password size='large'/>
                </Form.Item>
                <div className='d-flex justify-content-between'>
                    <p></p>
                    <Link to='/send-otp' className=''>Forgot password</Link>
                </div>


                <Form.Item
                >
                    <Button type="primary" htmlType="submit" className='d-block w-100 mt-4'>
                        Login
                    </Button>
                </Form.Item>
                <div>Not registered?<Link to='/register' className='' > Create an Account</Link></div>
                <Button block onClick={adminLogin}>Admin Login</Button>
            </Form>

    );
};

export default LoginForm;