import { useEffect, useState } from 'react';

const getIsMobile = () => window.innerWidth <= 600;

const useDeviceDetect = () => {
  const [isMobile, setIsMobile] = useState(getIsMobile());
  // null is default state for period when calculation not done
  // useEffect(() => {
  //   // const userAgent =
  //   //   typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
  //   // const mobile = Boolean(
  //   //   userAgent.match(
  //   //     /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  //   //   )
  //   // );
  //   console.log(window.innerWidth);
  //   setMobile(window.innerWidth < 600 ? true : false);
  // }, []);
  useEffect(() => {
    const onResize = () => {
      setIsMobile(getIsMobile());
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return isMobile;
};
export default useDeviceDetect;
