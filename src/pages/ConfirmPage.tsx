import Button from '@/components/common/Button';
import { MemoCard } from '@/components/common/MemoCard';
import { useNavigate } from 'react-router-dom';

const ConfirmPage = () => {
  const navigate = useNavigate();
  const DUMMY_DATA = {
    dateString: '2025/12',
    title: '이번 달 회고 제목',
    content: `이번 달은 감정의 변화가 많았다. 그래도 나름 잘 버텼고, 앞으로 더 나아가고 싶다.`,
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-black p-6'>
      <div className='flex flex-row items-center justify-center gap-16'>
        <div className='w-[290px] h-[391px] shrink-0 shadow-2xl'>
          <MemoCard
            dateString={DUMMY_DATA.dateString}
            title={DUMMY_DATA.title}
            content={DUMMY_DATA.content}
            readOnly={true}
          />
        </div>

        <div className='flex-1 max-w-[480px] flex flex-col items-start justify-start'>
          <h1
            className='text-2xl text-white leading-loose text-center mx-auto'
            style={{ width: '335px' }}
          >
            is your <span className='text-5xl'>Signal</span> or
            <br />
            <span className='text-5xl ml-32'>Noise?</span>
          </h1>
        </div>
      </div>

      <div className='mt-20 flex flex-col items-center gap-6'>
        <p className='text-gray-500 text-sm italic opacity-80'>
          <br />
        </p>
        <Button
          type='button'
          className='px-12 py-4 rounded-full text-lg font-bold'
          onClick={() => navigate('/analysis')}
        >
          Analyze
        </Button>
      </div>
    </div>
  );
};

export default ConfirmPage;
