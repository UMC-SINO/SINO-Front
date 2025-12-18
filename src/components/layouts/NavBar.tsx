import { BurgerIcon, Logo } from '@/assets';

const NavBar = () => {
  return (
    <header className='fixed top-0 left-0 right-0 z-50 p-8 px-10'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <div className='flex items-center'>
            <Logo height={20} width={70} />
          </div>
          <span className='font-semibold text-[#FAFAFA]'>SINO</span>
        </div>
        <BurgerIcon />
      </div>
    </header>
  );
};

export default NavBar;
