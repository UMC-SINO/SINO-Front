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
  return (
    <div className='w-full h-full'>
      <h5 className='text-sm font-medium text-gray-400 mb-2'>Memo</h5>

      <div className='bg-white rounded-2xl p-5 h-full flex flex-col'>
        <p className='text-sm mb-1 text-black'>{dateString}</p>

        <input
          value={title}
          disabled={readOnly}
          onChange={(e) => !readOnly && onTitleChange?.(e.target.value)}
          placeholder={readOnly ? '제목 없음' : '제목'}
          className='w-full outline-none bg-transparent text-lg font-extrabold text-gray-900 placeholder-black mb-3 disabled:cursor-default'
        />

        <textarea
          value={content}
          disabled={readOnly}
          onChange={(e) => !readOnly && onContentChange?.(e.target.value)}
          placeholder={readOnly ? '작성된 내용이 없습니다.' : '최대 500자 작성이 가능합니다.'}
          className='flex-1 resize-none outline-none bg-transparent text-sm text-gray-800 placeholder-[#AFADAC] disabled:cursor-default'
        />
      </div>
    </div>
  );
};
