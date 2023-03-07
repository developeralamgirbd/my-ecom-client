import React, {useState} from 'react';
import {Menu, Layout} from "antd";
import {Link, NavLink} from "react-router-dom";
import {
    AntDesignOutlined,
    DashboardOutlined, EditOutlined, FormOutlined, OrderedListOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const items = [
    {
        key: 'admin',
        label:  <NavLink to='/admin'>Dashboard</NavLink>,
        icon: <DashboardOutlined />
    },
    {
        key: 'category',
        label:  'Category',
        icon: <AntDesignOutlined />,
        children: [
            {
                key: '/admin/category-create',
                label:  <NavLink to='/admin/category-create'>Create</NavLink>,
                icon: <FormOutlined />,
            },
        ]
    },
    {
        key: 'Product',
        label:  'product',
        icon: <AntDesignOutlined />,
        children: [
            {
                key: '/admin/post-create',
                label:  <NavLink to='/admin/product-create'>Create</NavLink>,
                icon: <FormOutlined />,
            },
            {
                key: '/admin/post-list',
                label:  <NavLink to='/admin/product-list'>List</NavLink>,
                icon: <OrderedListOutlined />,
            }
        ]
    }
]

const SideMenuBar = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider theme='light' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <Menu defaultSelectedKeys={window.location.pathname} items={items} mode="inline" className='mt-2'/>
        </Sider>
    );
};

export default SideMenuBar;