import React, { useEffect, useState } from "react";
import axios from "axios";
import {useAuth} from "../context/AuthProvider";
import Loading from "../components/Loading";

const PrivateRoute = ({children}) => {

    const {token} = useAuth();

    const [ok, setOk] = useState(false);
    useEffect(() => {
        const authCheck = async () => {
            const { data } = await axios.get(`/auth-check`);
            console.log(data)
            if (data.ok) {
                setOk(true);
            } else {
                setOk(false);
            }
        };

        if (token) authCheck();
    }, [token]);


    return ok ? children : <Loading />;

}

export default PrivateRoute;