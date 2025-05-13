
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the RMS Dashboard page
    navigate('/monitor/rms-dashboard');
  }, [navigate]);

  return null;
};

export default Index;
