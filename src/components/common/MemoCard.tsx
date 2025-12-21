/* eslint-disable no-unused-vars */

type Props = {
  dateString: string;
  title: string;
  content: string;
  readOnly?: boolean;
  onTitleChange?: (title: string) => void;
  onContentChange?: (content: string) => void;
};

export const MemoCard = ({
  dateString,
  title,
  content,
  readOnly = false,
  onTitleChange,
  onContentChange,
}: Props) => {
  const date = new Date(dateString);
  const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  const formatted = kstDate.toISOString().slice(0, 10);

  return (
    <div className='w-full h-full'>
      <h5 className='text-sm font-medium text-white mb-2'>Memo</h5>

      <div className='bg-white rounded-2xl p-5 h-full flex flex-col'>
        <p className='text-sm mb-1 text-black'>{formatted}</p>

        <input
          value={title}
          disabled={readOnly}
          onChange={(e) => !readOnly && onTitleChange?.(e.target.value)}
          placeholder={readOnly ? '제목 없음' : '제목'}
          className='w-full outline-none bg-transparent text-lg font-extrabold text-gray-900 placeholder-[#AFADAC] mb-3 disabled:cursor-default'
        />

        <textarea
          value={content}
          disabled={readOnly}
          onChange={(e) => !readOnly && onContentChange?.(e.target.value)}
          maxLength={500}
          placeholder={readOnly ? '작성된 내용이 없습니다.' : '최대 500자 작성이 가능합니다.'}
          className='flex-1 resize-none outline-none bg-transparent text-sm text-gray-800 placeholder-[#AFADAC] disabled:cursor-default'
        />
      </div>
    </div>
  );
};
