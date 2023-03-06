import React, {useEffect} from 'react';
import {Col, Row} from "antd";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";

const ForgotPasswordPage = () => {
    useEffect(()=>{
        document.title = 'Send OTP'
    }, [])
    return (
        <Row >
            <Col span={6} offset={10} className='d-flex justify-content-center align-items-center vh-100'>
                <div>
                    <div className='text-center'>
                        <h1 className=''>Your Email Address?</h1>
                        <p className='lead'>You will receive 6 digit verification code</p>
                    </div>
                    <ForgotPasswordForm/>
                </div>

            </Col>
        </Row>
    );
};

export default ForgotPasswordPage;