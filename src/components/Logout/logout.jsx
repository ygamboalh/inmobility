import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../../utils/helpers';
import { useSignOut } from 'react-auth-kit';

const Logout = () => {
    const signOut = useSignOut();
    const navigate = useNavigate();
    useEffect(() => {
        // removeToken();
        signOut();
        navigate('/');
    },[navigate]);
    return null;
};

export default Logout