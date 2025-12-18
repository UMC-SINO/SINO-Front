import EmojiSlide from '@/components/EmojiSlide';
import { useLocation } from 'react-router-dom';

const EmojiPage = () => {
  const { state } = useLocation();
  const { year = 2025, month = 12 } = state || {};

  return (
    <div className='flex flex-col gap-10 items-center justify-center bg-black'>
      {/* 임의 헤더 */}
      <header className='pt-16 pb-10 flex justify-center'></header>
      <div className='text-left text-white font-pretendard text-[28px] font-bold leading-tight'>
        How are you <br />
        feeling{' '}
        <span className='text-[#FF8C6F]'>
          {year}/{month}
        </span>{' '}
        day?
      </div>

      <div className='flex flex-col items-center justify-center'>
        <EmojiSlide />
      </div>
      {/* 이모지 선택 바, save 버튼 자리 */}
      <div className='pt-20 pb-10 flex justify-center'></div>
      {/* back, continue 버튼 자리 */}
      <footer className='pt-16 pb-10 flex justify-center'></footer>
    </div>
  );
};

export default EmojiPage;
