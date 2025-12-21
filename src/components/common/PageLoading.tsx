const PageLoading = () => {
  return (
    <main className='flex flex-col items-center justify-center min-h-screen gap-5'>
      <div className='w-24 h-24 border-8 border-gray-700 border-t-transparent rounded-full animate-spin' />
      <p className='text-[#6D7280] font-medium text-lg'>Loading...</p>
    </main>
  );
};

export default PageLoading;
