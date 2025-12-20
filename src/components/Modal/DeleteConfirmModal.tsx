import { useEffect } from 'react';
import Button from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';
import { useModalStore } from '@/stores/modalStore';

type Props = {
  title?: string;
  description?: string;
};

export default function DeleteConfirmModal({
  title = 'Are you sure you want to ',
  description = 'Deleted posts cannot be recovered.',
}: Props) {
  const navigate = useNavigate();
  const { activeModal, closeModal } = useModalStore();

  const isOpen = activeModal === 'delete';

  const close = () => {
    closeModal();
    navigate('/');
  };

  // ESC 닫기
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs'>
      <div
        className='relative w-130 max-w-[92vw] rounded-4xl bg-[#2B2B2B] px-12 py-10 shadow-[0_30px_80px_rgba(0,0,0,0.55)]'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='text-center'>
          <p className='text-white text-[18px] font-semibold'>
            {title}
            <span className='text-[#FF6F4B]'>delete</span> it?
          </p>
          <p className='mt-2 text-white/45 text-[12px]'>{description}</p>
        </div>

        <div className='mt-8 flex justify-center gap-8'>
          <Button
            type='button'
            className='bg-transparent text-[#FF6F4B] border-2 w-25'
            onClick={close}
          >
            Back
          </Button>

          <Button
            type='button'
            onClick={() => {
              // TODO: 실제 삭제 API
              close();
            }}
            className='w-25 rounded-full'
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
