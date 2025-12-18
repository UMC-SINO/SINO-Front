import { motion } from 'framer-motion';

const sliderItem = Array.from({ length: 8 });

const OnBoadingPage = () => {
  return (
    <div className='relative h-dvh bg-black flex justify-between overflow-hidden px-10'>
      <div className='pointer-events-none absolute inset-0 z-10'>
        <div className='absolute top-0 h-40 w-full bg-linear-to-b from-black to-transparent' />
        <div className='absolute bottom-0 h-40 w-full bg-linear-to-t from-black to-transparent' />
      </div>

      <div className='h-full overflow-hidden blur-sm'>
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
            <div key={`left-${i}`} className='my-4 h-70 w-70 shrink-0 bg-[#FF6F4B]' />
          ))}
        </motion.div>
      </div>

      <div className='absolute inset-0 z-20 flex items-center justify-center pointer-events-none'>
        <h1 className='text-white text-7xl font-semibold tracking-tight'>SINO</h1>
      </div>

      <div className='h-full overflow-hidden blur-sm'>
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
            <div key={`right-${i}`} className='my-4 h-70 w-70 shrink-0 bg-[#FF6F4B]' />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default OnBoadingPage;
