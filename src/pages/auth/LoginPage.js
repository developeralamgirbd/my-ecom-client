import React, {useEffect} from 'react';
import LoginForm from "../../components/auth/LoginForm";
import {Col, Row} from "antd";


const LoginPage = () => {
    useEffect(()=>{
        document.title = 'Login'
    }, [])
    return (
       <>
           <Row >
               <Col span={6} offset={10} className='d-flex justify-content-center align-items-center vh-100'>
                   <LoginForm/>
               </Col>
           </Row>

       </>
    );
};

export default LoginPage;