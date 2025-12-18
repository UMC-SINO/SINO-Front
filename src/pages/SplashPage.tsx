import Dropdown from '@/components/common/Dropdown';
import Splash01 from '../assets/splash/Splash01.svg?react';
import Slpash02 from '../assets/splash/Splash02.svg?react';

const SplashPage = () => {
  return (
    <div>
      <div>
        <Splash01 />
        <div>
          <p>Making sense of your</p>
          <Dropdown />
          <Dropdown />
        </div>
        <Slpash02 />
      </div>
      <div>
        <Button />
        <Button />
      </div>
    </div>
  );
};

export default SplashPage;
