import React from 'react';
import {useAuth} from "../../context/AuthProvider";

const Dashboard = () => {
    const {auth, token} = useAuth();
    return (
        <div>
            Dashboard
        </div>
    );
};

export default Dashboard;