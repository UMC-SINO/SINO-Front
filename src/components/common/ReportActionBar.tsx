import Button from '@/components/common/Button';

const ActionBar = () => {
  const handleAddSignal = () => {
    console.log('Add signal 버튼 클릭 → signal 추가');
  };

  const handleCreateReport = () => {
    console.log('Create the report 버튼 클릭 → 리포트 생성');
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#111111]'>
      <div className='bg-[#1a1a1a] px-10 py-6 rounded-2xl flex gap-6'>
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
    </div>
  );
};

export default ActionBar;
