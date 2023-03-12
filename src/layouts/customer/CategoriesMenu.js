import React, { useState} from 'react';
import { Menu} from "antd";
import {DownOutlined} from "@ant-design/icons";
import {useLocation, useNavigate} from "react-router-dom";
import useCategories from "../../hooks/useCategories";



const CategoriesMenu = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const [categories, setCategories] = useCategories();
    const navigate = useNavigate();

    const handleCategory = async (value)=>{
        navigate(`/products/category/${value}`)
    }

    const items = categories.reduce((acc, curr)=> {

        const subCategories = curr.subCategory.reduce((accumulator, currentValue)=>{

            const subChildren = currentValue.children !== undefined && currentValue.children.reduce((subChildAcc, subChildCurr) => {
                return [...subChildAcc, {
                    label:  <span onClick={() => handleCategory(subChildCurr)}>{subChildCurr}</span>,
                    key: subChildCurr + ','+ currentValue._id }]
            }, [])

            return [...accumulator, {
                label: <span onClick={() => handleCategory(currentValue.name)}>{currentValue.name}</span>,
                key: currentValue._id,
                children: subChildren
            }]
        }, [])


        return [...acc, {
            label: <span onClick={() => handleCategory(curr.name)}>{curr.name}</span>,
            key: curr._id,
            children: subCategories
        }]
    }, [])


    return (
        <>
            <div onClick={()=> location.pathname === '/' ? setOpen(true) : setOpen(!open) }
                 className='d-flex justify-content-between' style={{cursor: 'pointer', padding: '15px'}}>
                Categories
                <DownOutlined />
            </div>

            <Menu
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