import { Logo } from '@/assets';
import Button from '@/components/common/Button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const sliderItem = Array.from({ length: 9 });
const colors = ['#FFB7A5', '#FF6F4B', '#FF8C6F'];

const OnBoadingPage = () => {
  const navigate = useNavigate();

  return (
    <div className='relative h-dvh flex justify-between overflow-hidden'>
      <div className='pointer-events-none absolute inset-0 z-10'>
        <div className='absolute top-0 h-40 w-full bg-linear-to-b from-black to-transparent' />
        <div className='absolute bottom-0 h-40 w-full bg-linear-to-t from-black to-transparent' />
      </div>

      <div className='h-full overflow-hidden blur-xs'>
        <motion.div
          className='flex flex-col'
          animate={{ y: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
            duration: 15,
          }}
        >
          {[...sliderItem, ...sliderItem].map((_, i) => (
            <div
              key={`left-${i}`}
              className='my-4 h-70 w-80 shrink-0'
              style={{ backgroundColor: colors[i % colors.length] }}
            />
          ))}
        </motion.div>
      </div>

      <div className='absolute inset-0 z-20 flex flex-col items-center justify-center'>
        <div className='pointer-events-auto flex flex-col items-center'>
          <Logo height={40} width={140} />
          <h1 className='text-white text-3xl font-semibold mt-8'>SINO</h1>
          <p className='text-white mt-22 mb-6'>Save signal of your life</p>
          <Button type='button' onClick={() => navigate('/login')} className='w-50 mb-7'>
            Log In
          </Button>
          <button
            onClick={() => navigate('/signup')}
            className='mt-4 text-[#C8C6C6] hover:text-white transition-colors cursor-pointer'
          >
            Create an account
          </button>
        </div>
      </div>

      <div className='h-full overflow-hidden blur-xs'>
        <motion.div
          className='flex flex-col'
          animate={{ y: ['-50%', '0%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
            duration: 15,
          }}
        >
          {[...sliderItem, ...sliderItem].map((_, i) => (
            <div
              key={`right-${i}`}
              className='my-4 h-70 w-80 shrink-0'
              style={{ backgroundColor: colors[i % colors.length] }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default OnBoadingPage;
