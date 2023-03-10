import React, {useEffect, useState} from 'react';
import {getBrandsRequest} from "../APIRequest/brandApi";

const useBrands = () => {
    const [brands, setBrands] = useState([]);

    const loadBrands = async ()=>{
        try {
            getBrandsRequest().then(res => {
                setBrands(res?.brands)
                console.log('brands',res)
            })
        }catch (e) {
            console.log(e)
        }

    }

    useEffect(()=> {
        loadBrands().catch(e => console.log(e));
    }, [])

    return [brands, setBrands];
};

export default useBrands;