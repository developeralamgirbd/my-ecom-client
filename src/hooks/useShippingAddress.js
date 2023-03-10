import React, {useEffect, useState} from 'react';

const useShippingAddress = ()=>{
    const [shippingAddress, setShippingAddress] = useState({});

    useEffect(()=> {
      const getAddress = JSON.parse(localStorage.getItem('shippingAddress'));
      if (getAddress){
        setShippingAddress(getAddress);
      }

    }, [])

    return [shippingAddress, setShippingAddress];
}

export default useShippingAddress;