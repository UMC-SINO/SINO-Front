import Button from '@/components/common/Button';

type Props = {
  title: string;
  content: string;
  className?: string;
};

const ReportCard = ({ title, content }: Props) => {
  const handleDownload = () => {
    console.log('Download 버튼 클릭');
  };

  const handleShare = () => {
    console.log('Share 버튼 클릭');
  };

  return (
    <div className='flex flex-col gap-8'>
      <div className='bg-white rounded-2xl p-8 min-h-180 text-black'>
        <h3 className='font-semibold mb-3 text-base'>{title}</h3>
        <p className='text-sm text-gray-500'>{content}</p>
      </div>

      <div className='flex gap-6'>
        <Button type='button' className='w-full h-11 text-black' onClick={handleDownload}>
          Download
        </Button>

        <Button type='button' className='w-full h-11 text-black' onClick={handleShare}>
          Share
        </Button>
      </div>
    </div>
  );
};

export default ReportCard;
