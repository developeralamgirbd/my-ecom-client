import React from 'react';
import {Badge, Carousel, Col, Dropdown, Row, Space} from "antd";
import {Link, NavLink, useLocation} from "react-router-dom";
import {DownOutlined, KeyOutlined, ShoppingCartOutlined, UploadOutlined, UserOutlined} from "@ant-design/icons";
import Search from "../../components/Search";
import {useCart} from "../../context/cart";
import {useAuth} from "../../context/AuthProvider";
import {sessionRemove} from "../../helpers/sessionHelper";
import CategoriesMenu from "./CategoriesMenu";

const SiteHeader = () => {

    const [cart, setCart] =useCart();
    const {auth, token} = useAuth();
    // const [categories, setCategories] = useCategories();
    const location = useLocation();

    const logout = ()=>{
        sessionRemove();
    }

    const items = [
        {
            key: '1',
            label: (
                <Link to='/customer/profile'>
                    Profile
                </Link>
            ),
            icon: <UserOutlined />
        },
        {
            key: '2',
            label: (
                <Link to='/customer/orders'>
                    Orders
                </Link>
            ),
            icon: <UserOutlined />
        },
        {
            key: '3',
            label: (
                <Link to='/customer/change-password'>
                    Change Password
                </Link>
            ),
            icon: <KeyOutlined rotate={-130} />
        },
        {
            key: '4',
            label: (
                <a href='/' onClick={logout} >
                    Log Out
                </a>
            ),
            icon: <UploadOutlined rotate={90} />
        }
    ];
    const contentStyle = {
        height: '425px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };
    return (
        <>
            <div className='container py-4'>
                <Row gutter={16}>
                    <Col className="gutter-row" span={6}>
                        <div >
                            <Link to='/'>Site Logo</Link>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <div >
                            <Search/>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div >
                            <nav className="navbar navbar-expand-lg">
                                <div className="container">

                                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                            aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                                        <ul className="navbar-nav">
                                            <li className="nav-item">
                                                <NavLink className="nav-link" aria-current="page" to="/cart">
                                                    <Badge count={cart.length} offset={[0,-4]} color='#faad14' style={{color: 'black'}}>
                                                        <ShoppingCartOutlined style={{ fontSize: '26px', color: '#FF7875' }} />
                                                    </Badge>
                                                </NavLink>
                                            </li>

                                            {
                                                token ? <>
                                                    <li className="nav-item">

                                                        <Dropdown
                                                            menu={{
                                                                items,
                                                            }}
                                                            className="nav-link"
                                                        >
                                                            <a onClick={(e) => e.preventDefault()}>
                                                                <Space>
                                                                    <UserOutlined />
                                                                    Account
                                                                    <DownOutlined />
                                                                </Space>
                                                            </a>
                                                        </Dropdown>


                                                    </li>


                                                </> : <>
                                                    <li className="nav-item">
                                                        <NavLink className="nav-link" aria-current="page" to="/login">Login</NavLink>
                                                    </li>

                                                    <li className="nav-item">
                                                        <NavLink className="nav-link" aria-current="page" to="/register">Register</NavLink>
                                                    </li>
                                                </>
                                            }

                                        </ul>

                                    </div>
                                </div>
                            </nav>
                        </div>
                    </Col>
                </Row>

            </div>
            <div className='' >
                <div className='container' >
                    <Row style={{height: '100%'}}>
                        <Col span={5}>
                            <div className='border' style={{height: location.pathname === '/' ? '100%': 'auto'}}>
                                <CategoriesMenu/>
                            </div>
                        </Col>
                        <Col span={18}>
                            <div className='border-top border-end border-start border' >
                                <nav className="navbar navbar-expand-lg">
                                    <div className="container">
                                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                                aria-expanded="false" aria-label="Toggle navigation">
                                            <span className="navbar-toggler-icon"></span>
                                        </button>
                                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                            <ul className="navbar-nav">
                                                <li className="nav-item">
                                                    <NavLink className="nav-link" aria-current="page" to="/cart">
                                                        Home
                                                    </NavLink>
                                                </li>
                                                <li className="nav-item">
                                                    <NavLink className="nav-link" aria-current="page" to="/cart">
                                                        Shop
                                                    </NavLink>
                                                </li>
                                                <li className="nav-item">
                                                    <NavLink className="nav-link" aria-current="page" to="/cart">
                                                        Blog
                                                    </NavLink>
                                                </li>
                                            </ul>

                                        </div>
                                    </div>
                                </nav>
                            </div>
                            {/*Feature Prodcuts*/}
                            <div style={{paddingLeft: '15px', paddingTop: '15px', height: '100%', display: location.pathname === '/' ? 'block': 'none' }}>
                                <Carousel autoplay>
                                    <div style={{height: '100%'}}>
                                        <h3 style={contentStyle}>1</h3>
                                    </div>
                                    <div style={{height: '100%'}}>
                                        <h3 style={contentStyle}>2</h3>
                                    </div>
                                    <div style={{height: '100%'}}>
                                        <h3 style={contentStyle}>3</h3>
                                    </div>
                                    <div style={{height: '100%'}}>
                                        <h3 style={contentStyle}>4</h3>
                                    </div>
                                </Carousel>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>

        </>

    );
};

export default SiteHeader;