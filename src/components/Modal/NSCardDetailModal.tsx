import { X } from 'lucide-react';
import EmotionAnalysisList from '../analysis/EmotionAnalysisList';
import { WRITE_DATA } from '@/data/writeData';

interface NSCardDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NSCardDetailModal({ isOpen, onClose }: NSCardDetailModalProps) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4'>
      <div className='relative w-full max-w-[800px] bg-[#1E1E1E] rounded-4xl p-10 shadow-2xl border border-white/5 text-white'>
        <button
          onClick={onClose}
          className='absolute top-8 right-8 text-gray-400 hover:text-white transition-colors'
        >
          <X size={32} />
        </button>

        {/* 헤더 */}
        <header className='flex items-center gap-2 mb-10'>
          <span className='text-2xl'>⭐</span>
          <h2 className='text-3xl font-bold tracking-tight'>My Signal</h2>
        </header>

        {/* 컨텐츠 영역 */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
          <section className='flex flex-col gap-8'>
            {WRITE_DATA.photos.length > 0 && (
              <div className='flex flex-col gap-2'>
                <span className='text-sm font-medium text-gray-400'>Picture</span>
                <div className='aspect-4/3 w-full bg-[#3A3A3A] rounded-2xl overflow-hidden'>
                  <img
                    src={WRITE_DATA.photos[0]}
                    alt='Selected'
                    className='w-full h-full object-cover'
                  />
                </div>
              </div>
            )}

            <div className='flex flex-col gap-4'>
              <span className='text-sm font-medium text-gray-400'>Emotion</span>
              <EmotionAnalysisList />
            </div>
          </section>

          <section className='flex flex-col gap-2'>
            <span className='text-sm font-medium text-gray-400'>Memo</span>
            <div className='flex-1 bg-white rounded-2xl p-8 min-h-[400px] text-gray-900 shadow-inner overflow-y-auto'>
              <p className='text-sm text-gray-400 font-medium mb-1'>{WRITE_DATA.dateString}</p>
              <h3 className='text-xl font-bold mb-4'>{WRITE_DATA.title}</h3>
              <p className='text-gray-700 leading-relaxed whitespace-pre-wrap'>
                {WRITE_DATA.content}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
