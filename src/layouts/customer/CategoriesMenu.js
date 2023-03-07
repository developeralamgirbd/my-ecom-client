import React, {useEffect, useState} from 'react';
import {Button, Menu} from "antd";
import {AppstoreOutlined, DownOutlined, MailOutlined, SettingOutlined} from "@ant-design/icons";
import {useLocation} from "react-router-dom";
import useCategories from "../../hooks/useCategories";
import categoriesTreeHelper from "../../helpers/categoriesTreeHelper";

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem('Navigation One', 'sub1', <MailOutlined />, [
        getItem('Item 1', null, null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
        getItem('Item 2', null, null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
    ]),
    getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
        getItem('Option 5', '5'),
        getItem('Option 6', '6'),
        getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),
    getItem('Navigation Three', 'sub4', <SettingOutlined />, [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
        getItem('Option 11', '11'),
        getItem('Option 12', '12'),
    ]),
];





const CategoriesMenu = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const [categories, setCategories] = useCategories();
    const items = categoriesTreeHelper('label', categories);

    // const handleCategory = (value)=>{
    //     console.log(value)
    // }

    // const items = categories.reduce((acc, curr)=> {
    //
    //     const subCategories = curr.subCategory.reduce((accumulator, currentValue)=>{
    //
    //         const subChildren = currentValue.children !== undefined && currentValue.children.reduce((subChildAcc, subChildCurr) => {
    //             return [...subChildAcc, {
    //                 label:  <span onClick={() => handleCategory(subChildCurr)}>{subChildCurr}</span>,
    //                 key: subChildCurr + ','+ currentValue._id }]
    //         }, [])
    //
    //         return [...accumulator, {
    //             label: <span onClick={() => handleCategory(currentValue.name)}>{currentValue.name}</span>,
    //             key: currentValue._id,
    //             children: subChildren
    //         }]
    //     }, [])
    //
    //
    //     return [...acc, {
    //         label: <span onClick={() => handleCategory(curr.name)}>{curr.name}</span>,
    //         key: curr._id,
    //         children: subCategories
    //     }]
    // }, [])


    const onClick = (e) => {
        console.log('click', e);
    };

    return (
        <>
            <div onClick={()=> location.pathname === '/' ? setOpen(true) : setOpen(!open) }
                 className='d-flex justify-content-between' style={{cursor: 'pointer', padding: '10px'}}>
                Categories
                <DownOutlined />
            </div>

            <Menu
                onClick={onClick}
                style={{
                    width: 256,
                    display: location.pathname === '/' ? 'block' : open ? 'block' : 'none'
                }}
                mode="vertical"
                items={items}
            />
        </>
    );
};

export default CategoriesMenu;