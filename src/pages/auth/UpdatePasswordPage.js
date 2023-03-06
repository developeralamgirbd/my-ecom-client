import React, {useEffect} from 'react';
import {Col, Row} from "antd";
import UpdatePassword from "../../components/auth/UpdatePassword";

const UpdatePasswordPage = () => {

    useEffect(()=>{
        document.title = 'Change Password'
    }, [])
    return (
        <Row>
            <Col span={6} offset={10}>
                <UpdatePassword/>
            </Col>

        </Row>
    );
};

export default UpdatePasswordPage;