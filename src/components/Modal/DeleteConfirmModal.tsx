import { useEffect } from 'react';
import Button from '@/components/common/Button';
// import { useNavigate } from 'react-router-dom';
import { useModalStore } from '@/stores/modalStore';
import { useDeletePost } from '@/hooks/useDeletePost';

type Props = {
  postId?: number;
  title?: string;
  description?: string;
};

export default function DeleteConfirmModal({
  title = 'Are you sure you want to ',
  description = 'Deleted posts cannot be recovered.',
}: Props) {
  // const navigate = useNavigate();
  const { activeModal, closeModal, payload } = useModalStore();
  const { mutate: deleteMutate, isPending } = useDeletePost();

  const isOpen = activeModal === 'delete';
  const postId = payload?.postId;

  const close = () => {
    closeModal();
    // navigate('/');
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

  const handleDelete = () => {
    console.log('DELETE 클릭, postId=', 101); // ✅ 이거 찍혀야 함

    if (typeof postId !== 'number') {
      alert('postId가 없어서 삭제 요청을 못 보냄!');
      return;
    }

    deleteMutate(101, {
      onSuccess: (res) => {
        console.log('삭제 성공 응답:', res);
        close();
      },
      onError: (err) => {
        console.error('삭제 실패:', err);
        alert('삭제 실패! 콘솔/네트워크 확인');
      },
    });
  };

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
            onClick={handleDelete}
            className='w-25 rounded-full'
            disabled={isPending}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
