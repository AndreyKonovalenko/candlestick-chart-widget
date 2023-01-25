import { useState, useEffect } from 'react';

const getIsMobile = () => window.innerWidth <= 600;
const getIsRetina = () => window.matchMedia('(min-resolution: 2dppx)').matches;
const getIsMobileLandscape = () => window.innerHeight <= 400;

const useDeviceDetect = () => {
  const [isMobile, setIsMobile] = useState(getIsMobile());
  const [isRetina, setIsRetina] = useState(getIsRetina());
  const [isLandscape, setIsLandscape] = useState(getIsMobileLandscape());
  // null is default state for period when calculation not done
  // useEffect(() => {
  //   // const userAgent =
  //   //   typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
  //   // const mobile = Boolean(
  //   //   userAgent.match(
  //   //     /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  //   //   )
  //   // );
  //   setMobile(window.innerWidth < 600 ? true : false);
  // }, []);
  useEffect(() => {
    const onResize = () => {
      setIsMobile(getIsMobile());
      setIsRetina(getIsRetina());
      setIsLandscape(getIsMobileLandscape());
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return { isMobile, isRetina, isLandscape };
};
export default useDeviceDetect;
