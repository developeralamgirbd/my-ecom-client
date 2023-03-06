import React, {useEffect, useState} from 'react';
import axios from "axios";
import {getCategoryRequest} from "../APIRequest/categoryApi";


const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const loadCategories = async ()=>{
        try {
            getCategoryRequest().then(res => {
                setCategories(res.data[0].categories)
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