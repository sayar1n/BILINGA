import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth.service';

const LogoutHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    
    navigate('/auth/login');
  }, [navigate]);

  return null;
};

export default LogoutHandler; 