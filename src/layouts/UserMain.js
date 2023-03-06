import React from 'react';
import {Breadcrumb, Layout} from "antd";
import SideMenuBar from "./admin/SideMenuBar";
import AppHeader from "./admin/AppHeader";
import {Outlet} from "react-router-dom";
import AppFooter from "./admin/AppFooter";
import {Content} from "antd/es/layout/layout";

const UserMain = () => {
    return (
        <>
            <Layout
                style={{
                    minHeight: '100vh',
                }}
            >
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

export default UserMain;