import { useMediaQuery } from "react-responsive";

export const xsMobile = '(max-width: 20rem)'; // 320px
export const smMobile = '(max-width: 24em)'; // 384px
export const mobile = '(max-width: 30em)'; // 480px
export const tablet = '(max-width: 48em)'; // 768px
export const tabletL = '(max-width: 55rem)'; //880px
export const smDesktop = '(max-width: 67.5rem)'; //1080px
export const laptop = '(max-width: 76.875em)'; // 1230px
export const desktop = '(max-width: 87.5rem)'; // 1400px
export const desktopLg = '(min-width: 112.5rem)'; // 1800px

export const useQuery = () => ({
  isXsMobile: useMediaQuery({ query: xsMobile }),
  isMobile: useMediaQuery({ query: mobile }),
  isSmMobile: useMediaQuery({ query: smMobile }),
  isTablet: useMediaQuery({ query: tablet }),
  isLaptop: useMediaQuery({ query: laptop }),
  isTabletL: useMediaQuery({ query: tabletL }),
  isSmDesktop: useMediaQuery({ query: smDesktop }),
  isDesktop: useMediaQuery({ query: desktop }),
  isDesktopLg: useMediaQuery({ query: desktopLg }),
});
