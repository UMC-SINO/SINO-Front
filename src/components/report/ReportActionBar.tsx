import Button from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';

const ReportActionBar = () => {
  const navigate = useNavigate();

  const handleAddSignal = () => {
    navigate('/retro');
  };

  const handleCreateReport = () => {
    console.log('저장중');
    navigate('/');
  };

  return (
    <footer className='fixed bottom-0 left-0 right-4 z-30 bg-bgColor border]'>
      <div className='max-w-250 mx-auto px-6 py-5 flex justify-center gap-6'>
        <Button
          type='button'
          className='text-[#FF6F4B] bg-bgColor border-2 border-[#FF6F4B] rounded-full w-[228px]'
          onClick={handleAddSignal}
        >
          Add signal
        </Button>

        <Button
          type='button'
          className='text-bgColor bg-[#FF6F4B] border-2 border-[#FF6F4B] rounded-full w-[228px] py-2'
          onClick={handleCreateReport}
        >
          Create the report
        </Button>
      </div>
    </footer>
  );
};

export default ReportActionBar;
