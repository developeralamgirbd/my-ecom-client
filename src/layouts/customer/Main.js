import React from 'react';
import {Link, NavLink, Outlet} from "react-router-dom";
import {Avatar, Badge, Dropdown, Space} from "antd";
import useCategories from "../../hooks/useCategories";
import Search from "../../components/Search";
import {useCart} from "../../context/cart";
import {useAuth} from "../../context/AuthProvider";
import {sessionRemove} from "../../helpers/sessionHelper";
import {DownOutlined, KeyOutlined, UploadOutlined, UserOutlined} from "@ant-design/icons";
import SiteHeader from "./SiteHeader";



const Main = () => {
    const [cart, setCart] =useCart();
    const {auth, token} = useAuth();
    // const [categories, setCategories] = useCategories();


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

    return (
        <>
           <header>
                <SiteHeader/>
           </header>

            <section>
                <div className="container">
                    <div className="categories my-3">
                    </div>
                </div>


            </section>
            <div className="container">
                <Outlet/>
            </div>
        </>
    );
};

export default Main;