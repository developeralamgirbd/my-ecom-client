import React, {useEffect} from 'react';
import {Col, Row} from "antd";
import RegisterForm from "../../components/auth/RegisterForm";

const RegisterPage = () => {
    useEffect(()=>{
        document.title = 'Registration'
    }, [])
    return (
        <Row >
            <Col span={6} offset={10} className='d-flex justify-content-center align-items-center vh-100'>
               <div>
                   <h1 className='text-center'>Register</h1>
                   <RegisterForm/>
               </div>

            </Col>
        </Row>
    );
};

export default RegisterPage;