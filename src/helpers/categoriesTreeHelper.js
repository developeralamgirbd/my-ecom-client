import React from 'react';
import useCategories from "../hooks/useCategories";



const categoriesTreeHelper = (name, categories) => {

    const tree = categories.reduce((acc, curr)=> {

        const subCategories = curr.subCategory.reduce((accumulator, currentValue)=>{

            const subChildren = currentValue.children !== undefined && currentValue.children.reduce((subChildAcc, subChildCurr) => {
                return [...subChildAcc, {[name]: subChildCurr, key: subChildCurr + ','+ currentValue._id }]
            }, [])

            return [...accumulator, {
                [name]: currentValue.name,
                key: currentValue._id,
                children: subChildren
            }]
        }, [])


        return [...acc, {
            [name]: curr.name,
            key: curr._id,
            children: subCategories
        }]
    }, [])

    return tree
};

export default categoriesTreeHelper;