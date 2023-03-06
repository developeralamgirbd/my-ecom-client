import React, {useEffect} from 'react';
import {Col, Row} from "antd";
import NewPasswordForm from "../../components/auth/NewPasswordForm";

const NewPasswordPage = () => {
    useEffect(()=>{
        document.title = 'New Password Create'
    }, [])
    return (
        <Row >
            <Col span={6} offset={10} className='d-flex justify-content-center align-items-center vh-100'>
                <div>
                    <h1 className='text-center'>Create a new password</h1>
                    <NewPasswordForm/>
                </div>

            </Col>
        </Row>
    );
};

export default NewPasswordPage;