import React, {useEffect, useState} from 'react';

import {getCategoryRequest} from "../APIRequest/categoryApi";


const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [catLoading, setCatLoading] = useState(false);

    const loadCategories = async ()=>{
        try {
            setCatLoading(true)
            getCategoryRequest().then(res => {
                setCatLoading(false)
                setCategories(res?.categories)
            })
        }catch (e) {
            console.log(e)
        }

    }

    useEffect(()=> {
        loadCategories().catch(e => console.log(e));
    }, [])

    return [categories, setCategories, catLoading, setCatLoading];
};

export default useCategories;