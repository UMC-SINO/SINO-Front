import Button from '@/components/common/Button';

type Props = {
  writeAction: 'continue' | 'save';
  onBack?: () => void;
  onPrimary?: () => void;
};

export const ActionButtons = ({ writeAction, onBack, onPrimary }: Props) => {
  return (
    <div className='w-full flex justify-center gap-6 mt-20'>
      <Button
        type='button'
        onClick={onBack}
        className='w-44 py-2 bg-[#E1E0E0]! text-[#4A4A4A] font-bold hover:brightness-95'
      >
        Back
      </Button>

      <Button type='button' onClick={onPrimary} className='w-44 py-2 text-[#1A1A1A] font-bold'>
        {writeAction === 'continue' ? 'Continue' : 'Save'}
      </Button>
    </div>
  );
};
