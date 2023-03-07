import React, {useState} from 'react';
import {Avatar, Dropdown, Space, theme, Layout, Row, Col, Button} from "antd";
import {DownOutlined, KeyOutlined, SmileOutlined, UploadOutlined, UserOutlined} from "@ant-design/icons";
import {sessionRemove} from "../../helpers/sessionHelper";
import {useAuth} from "../../context/AuthProvider";
import {Link} from "react-router-dom";
import Title from "antd/es/typography/Title";

const {Header} = Layout;

const logout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('auth');
}

const items = [
    {
        key: '1',
        label: (
            <Link to='/admin/profile'>
                Profile
            </Link>
        ),
        icon: <UserOutlined />
    },
    {
        key: '2',
        label: (
            <Link to='/admin/change-password'>
               Change Password
            </Link>
        ),
        icon: <KeyOutlined rotate={-130} />
    },
    {
        key: '3',
        label: (
            <a href='/' onClick={logout} >
               Log Out
            </a>
        ),
        icon: <UploadOutlined rotate={90} />
    }
];

const UserList = ['U', 'Lucy', 'Tom', 'Edward'];
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
const GapList = [4, 3, 2, 1];

const AppHeader = () => {

    const {auth} = useAuth();

    const [user, setUser] = useState(UserList[0]);
    const [color, setColor] = useState(ColorList[0]);
    const [gap, setGap] = useState(GapList[0]);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <>
            <Header
                style={{
                    padding: 0,
                    background: colorBgContainer,
                }}
            >
                <Row>
                    <Col span={22}>
                        <Link to='/' className='pl-2'>Visit Site</Link>

                    </Col>
                    <Col span={2}>
                        <Avatar
                            style={{
                                backgroundColor: color,
                                verticalAlign: 'middle',
                                marginRight: '10px'
                            }}
                            size="large"
                            gap={gap}
                        >
                            {user}
                        </Avatar>
                        <Dropdown
                            menu={{
                                items,
                            }}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    {auth?.firstName}
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    </Col>
                </Row>
            </Header>
        </>
    );
};

export default AppHeader;