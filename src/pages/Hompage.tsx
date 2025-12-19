import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 컴포넌트가 마운트되면 바로 /onboarding으로 이동
    navigate('/onboarding', { replace: true });
  }, [navigate]);

  return (
    <div className='text-4xl min-h-dvh flex items-center justify-center font-semibold'>
      안녕하세요
    </div>
  );
};

export default HomePage;
