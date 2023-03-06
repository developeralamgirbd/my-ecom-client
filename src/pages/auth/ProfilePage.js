import React, {useEffect} from 'react';
import ProfileForm from "../../components/auth/ProfileForm";
import {Col, Row} from "antd";

const ProfilePage = () => {

    useEffect(()=>{
        document.title = 'Profile'
    }, [])

    return (
        <Row>
            <Col span={6} offset={10}>

                    <ProfileForm/>

            </Col>

        </Row>
    );
};

export default ProfilePage;