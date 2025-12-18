import Button from '@/components/common/Button';

const SigninPage = () => {
  return (
    <div className='relative min-h-screen text-white'>
      <h1 className='absolute top-50 left-1/2 -translate-x-1/2 text-3xl font-medium tracking-wide'>
        Create an account
      </h1>

      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center space-y-8'>
        <div className='w-full flex flex-col items-center gap-3'>
          <label className='text-xl tracking-wide'>Name</label>

          <div className='relative'>
            <input
              type='text'
              placeholder='Enter your Username'
              className='w-120 py-2 text-center font-semibold rounded-full bg-[#E1E0E0] text-xl text-gray-800 outline-none'
            />
            <button
              type='button'
              className='absolute left-full ml-3 top-1/2 -translate-y-1/2 text-xl text-bgColor font-semibold bg-[#FF6F4B] hover:brightness-85 cursor-pointer py-2 rounded-full w-25'
            >
              Check
            </button>
          </div>
        </div>

        <Button type='button' className='absolute top-60 text-bgColor rounded-full w-48'>
          Get started
        </Button>
      </div>
    </div>
  );
};

export default SigninPage;
