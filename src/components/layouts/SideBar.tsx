import { BurgerIcon, HomeIcon, ReportIcon } from '@/assets';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import userImage from '@/assets/userImage.png';

interface SideBarProps {
  open: boolean;
  onClose: () => void;
}

const SideBar = ({ open, onClose }: SideBarProps) => {
  const navigate = useNavigate();

  const moveHome = () => {
    navigate('/');
    onClose();
  };

  const moveReportPage = () => {
    navigate('/report-view');
    onClose();
  };

  return (
    <>
      <div
        onClick={onClose}
        className={clsx(
          'fixed inset-0 z-40 bg-black/30 transition-opacity',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
      />

      <aside
        className={clsx(
          'fixed top-0 right-0 h-full w-70 bg-[#494746] z-50',
          'transform transition-transform duration-300 ease-out',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className='flex flex-col h-full text-white p-6'>
          <button
            type='button'
            onClick={onClose}
            className='self-start p-2 rounded-full hover:bg-[#333232] transition'
          >
            <BurgerIcon />
          </button>

          <div className='flex flex-col items-center mt-10'>
            <img
              src={userImage}
              alt='user profile'
              className='w-24 h-24 rounded-full object-cover bg-white'
            />
            <span className='mt-2 font-medium text-3xl'>name</span>
          </div>

          <nav className='mt-15 space-y-2'>
            <button
              type='button'
              onClick={moveHome}
              className='flex items-center gap-3 w-full px-4 py-2 rounded-md hover:bg-[#333232] transition pl-12 cursor-pointer'
            >
              <HomeIcon />
              <span>Home</span>
            </button>

            <button
              type='button'
              onClick={moveReportPage}
              className='flex items-center gap-3 w-full px-4 py-2 rounded-md hover:bg-[#333232] transition pl-12 cursor-pointer'
            >
              <ReportIcon />
              <span>Report library</span>
            </button>
          </nav>

          <div className='mt-auto mb-3 flex justify-center'>
            <button className='px-4 py-1.5 bg-white text-[#969392] border-2 border-[#969392] rounded-full text-xl font-medium hover:opacity-80 transition cursor-pointer'>
              Log out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
