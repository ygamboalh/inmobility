import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignOut } from 'react-auth-kit';

const Logout = () => {
    const signOut = useSignOut();
    const navigate = useNavigate();
    useEffect(() => {
        signOut();
        navigate('/');
    },[navigate]);
    return null;
};

export default Logout