
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BlankPageTemplate from '@/components/shared/BlankPageTemplate';

const IntegrityModulePage: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the Integrity page
    navigate('/monitor/integrity');
  }, [navigate]);
  
  return <BlankPageTemplate title="Integrity Module" subtitle="Redirecting to Integrity Management..." />;
};

export default IntegrityModulePage;
