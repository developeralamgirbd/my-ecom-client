import React, {useEffect} from 'react';
import {Col, Row} from "antd";
import VerifyOtpForm from "../../components/auth/VerifyOtpForm";

const VerifyOtpPage = () => {

    useEffect(()=>{
        document.title = 'OTP Verify'
    }, [])

    return (
        <Row >
            <Col span={6} offset={10} className='d-flex justify-content-center align-items-center vh-100'>
                <div>
                    <div className='text-center'>
                        <h1 className=''> OTP Code Verification</h1>
                        <p className='lead'>Verification code has been sent to your email address.</p>
                    </div>
                    <VerifyOtpForm/>
                </div>

            </Col>
        </Row>
    );
};

export default VerifyOtpPage;