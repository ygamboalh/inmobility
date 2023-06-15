import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../../utils/helpers';

const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        removeToken();
        navigate('/')
    },[navigate]);
    return null;
};

export default Logout