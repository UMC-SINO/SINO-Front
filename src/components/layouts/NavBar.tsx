import { BurgerIcon, Logo } from '@/assets';
import { useState } from 'react';
import SideBar from './SideBar';

const NavBar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <>
      <header className='fixed top-0 left-0 right-0 z-40 p-6 px-12'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='flex items-center'>
              <Logo height={20} width={70} />
            </div>
            <span className='font-semibold text-[#FAFAFA]'>SINO</span>
          </div>
          <button
            type='button'
            onClick={() => setIsSideBarOpen(true)}
            className='bg-bgColor p-2 hover:bg-gray-600 transition rounded-full cursor-pointer'
          >
            <BurgerIcon />
          </button>
        </div>
      </header>

      <SideBar open={isSideBarOpen} onClose={() => setIsSideBarOpen(false)} />
    </>
  );
};

export default NavBar;
