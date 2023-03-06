import React from 'react';

import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet} from "react-router-dom";
import SideMenuBar from "./SideMenuBar";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
const {Content, Footer } = Layout;



const AdminMain = () => {

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <>
            <Layout
                style={{
                    minHeight: '100vh',
                }}
            >
             <SideMenuBar />
                <Layout className="site-layout">
                    <AppHeader/>
                    <Content
                        style={{
                            margin: '0 16px',
                        }}

                    >
                        <Breadcrumb
                            style={{
                                margin: '16px 0',
                            }}
                        >
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                           <Outlet />
                    </Content>
                    <AppFooter/>
                </Layout>
            </Layout>
        </>
    );
};

export default AdminMain;