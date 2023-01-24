import { useState, useEffect } from "react";

const getIsMobile = () => window.innerWidth <= 600;
const getIsRetina = () => window.matchMedia("(min-resolution: 2dppx)").matches;

const useDeviceDetect = () => {
  console.log(window.matchMedia("(min-resolution: 2dppx)").matches);
  const [isMobile, setIsMobile] = useState(getIsMobile());
  const [isRetina, setIsRetina] = useState(getIsRetina());
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
      setIsRetina(getIsRetina());
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return { isMobile, isRetina };
};
export default useDeviceDetect;
