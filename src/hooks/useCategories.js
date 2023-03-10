import React, {useEffect, useState} from 'react';

import {getCategoryRequest} from "../APIRequest/categoryApi";


const useCategories = () => {
    const [categories, setCategories] = useState([]);

    const loadCategories = async ()=>{
        try {
            getCategoryRequest().then(res => {
                setCategories(res?.categories)
                console.log(res)
            })
        }catch (e) {
            console.log(e)
        }

    }

    useEffect(()=> {
        loadCategories().catch(e => console.log(e));
    }, [])

    return [categories, setCategories];
};

export default useCategories;