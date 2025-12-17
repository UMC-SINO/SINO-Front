import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

interface DropdownProps {
  items: string[];
  className?: string;
}

type Slot = string | null;

const Dropdown = ({ items, className }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(4);

  const getVisibleSlots = (items: string[], index: number): Slot[] => {
    return [items[index - 1] ?? null, items[index] ?? null, items[index + 1] ?? null];
  };

  const visibleSlots = getVisibleSlots(items, startIndex);

  return (
    <div className='flex items-center justify-center'>
      <div className={clsx('relative min-w-40', className)}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className='relative w-full bg-[#E1E0E0] text-black py-2 rounded-full text-lg font-semibold cursor-pointer'
        >
          <span className='block text-center'>{items[startIndex]}</span>
          <div className='absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1'>
            <ChevronDown
              size={20}
              className={clsx('transition-transform duration-300', open && 'rotate-180')}
            />
          </div>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className='absolute w-full mt-2 bg-[#E1E0E0] rounded-[20px] overflow-hidden'
            >
              <div className='relative h-[140px] overflow-hidden flex items-center'>
                <div className='absolute left-2 right-2 h-10 bg-white rounded-xl top-1/2 -translate-y-1/2 pointer-events-none' />

                <ul className='w-full flex flex-col text-center relative z-10'>
                  {visibleSlots.map((item, slotIndex) => {
                    if (!item) {
                      return (
                        <li key={slotIndex} className='py-2 text-lg'>
                          &nbsp;
                        </li>
                      );
                    }

                    const realIndex = items.indexOf(item);
                    const isSelected = slotIndex === 1;

                    return (
                      <li
                        key={item}
                        onClick={() => setStartIndex(realIndex)}
                        className={clsx(
                          'py-2 text-lg cursor-pointer transition-colors',
                          isSelected
                            ? 'text-black font-semibold'
                            : 'text-black/50 hover:text-black',
                        )}
                      >
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dropdown;
