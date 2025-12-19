import Button from '@/components/common/Button';

const ReportActionBar = () => {
  const handleAddSignal = () => {
    console.log('Add signal 버튼 클릭 → signal 추가');
  };

  const handleCreateReport = () => {
    console.log('Create the report 버튼 클릭 → 리포트 생성');
  };

  return (
    <footer className='fixed bottom-0 left-0 right-4 z-30 bg-[#1a1a1a] border-t border-[#1a1a1a]'>
      <div className='max-w-250 mx-auto px-6 py-5 flex justify-center gap-6'>
        <Button
          type='button'
          className='px-8 text-[#FF6F4B] border border-[#FF6F4B] bg-transparent'
          onClick={handleAddSignal}
        >
          Add signal
        </Button>

        <Button type='button' className='px-8 text-black' onClick={handleCreateReport}>
          Create the report
        </Button>
      </div>
    </footer>
  );
};

export default ReportActionBar;
