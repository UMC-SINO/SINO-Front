// 드롭다운 펼쳐지면 리스트 영역이 세로 스크롤 가능
// 피그마랑 색상 맞췄어요
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

interface DropdownProps {
  items: string[];
  className?: string;
  // eslint-disable-next-line no-unused-vars
  onSelect?: (value: string) => void;
}

const ITEM_H = 40;

// 여기서 ref + useScroll을 소유해야 에러가 안 남
function ScrollPanel({
  items,
  startIndex,
  setStartIndex,
  onSelect,
  close,
}: {
  items: string[];
  startIndex: number;
  // eslint-disable-next-line no-unused-vars
  setStartIndex: (idx: number) => void;
  // eslint-disable-next-line no-unused-vars
  onSelect?: (value: string) => void;
  close: () => void;
}) {
  // 스크롤 컨테이너 ref (이 컴포넌트가 렌더될 때 ul이 존재함)
  const scrollRef = useRef<HTMLUListElement | null>(null);

  // 특정 요소의 스크롤 추적 (진행바 용)
  const { scrollYProgress } = useScroll({
    container: scrollRef,
  });

  // 패널 열릴 때 현재 선택 위치로 스크롤
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const targetTop = Math.max(0, startIndex * ITEM_H - ITEM_H);
    el.scrollTo({ top: targetTop });
  }, [startIndex]);

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className='absolute w-full mt-2 bg-[#FAFAFA] rounded-[20px] overflow-hidden'
    >
      {/* 진행바 */}
      <motion.div style={{ scaleX: scrollYProgress, transformOrigin: '0% 50%' }} />

      <div className='relative h-33 overflow-hidden'>
        {/* 실제 스크롤 컨테이너 */}
        <ul
          ref={scrollRef}
          className='relative z-10 w-full max-h-40 overflow-y-auto thin-scrollbar text-center py-2 bg-[#AFADAC]'
        >
          {items.map((item, idx) => {
            const isSelected = idx === startIndex;
            return (
              <li
                key={`${item}-${idx}`}
                onClick={() => {
                  setStartIndex(idx);
                  onSelect?.(item);
                  close();
                }}
                className={clsx(
                  // 기본 레이아웃
                  'relative h-10 cursor-pointer text-lg flex items-center justify-center',
                  'transition-all duration-150',

                  // 기본 텍스트(선택값은 조금 진하게만)
                  isSelected ? 'text-black font-medium' : 'text-black/50',

                  // 호버 시: 텍스트 진해지고 + 배경이 살짝 하얗게(피그마 느낌)
                  'hover:text-black hover:font-semibold',
                  'hover:bg-[#E1E0E0] hover:backdrop-blur-[1px]',

                  // pill 느낌: 좌우 여백 + 라운드
                  'mx-2 rounded-full',
                )}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
}

// Dropdown 본체
const Dropdown = ({ items, className, onSelect }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const selectedLabel = items[startIndex];

  const isPlaceholder = selectedLabel === 'Text' || selectedLabel === '';

  return (
    <div className='flex z-50 items-center justify-center'>
      <div className={clsx('relative min-w-40', className)}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={clsx(
            'relative w-full bg-[#E1E0E0] py-2 rounded-full text-lg font-semibold cursor-pointer',
            isPlaceholder ? 'text-[#C8C6C6]' : 'text-black',
          )}
        >
          <span className='block text-center'>{selectedLabel}</span>
          <div className='absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1'>
            <ChevronDown
              size={20}
              className={clsx('transition-transform duration-300', open && 'rotate-180')}
            />
          </div>
        </button>

        <AnimatePresence>
          {open && (
            <ScrollPanel
              items={items}
              startIndex={startIndex}
              setStartIndex={setStartIndex}
              onSelect={onSelect}
              close={() => setOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dropdown;
