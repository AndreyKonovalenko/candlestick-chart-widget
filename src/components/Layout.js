import { ReactComponent as Vector } from '../assets/vetor.svg';
import theme from '../theme/theme';
const Layout = (props) => {
  const { isMobile, isRetina, isLandscape, children } = props;
  const { colors, fonts, mobileFonts } = theme;
  const styles = {
    layout: {
      backgroundImage: `url(img/${isRetina ? 'retina' : 'default'}.jpg)`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100vw',
      height: '100vh',
    },
    linkContainer: {
      position: 'absolute',
      right: '0px',
      bottom: isMobile ? '40px' : '0px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '15px 10px',
      gap: isMobile ? '2px' : '5px',
    },
    link: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '2px',
      textDecoration: 'none',
    },
    text: {
      fontFamily: fonts.secondary,
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: isMobile ? mobileFonts.link : fonts.link,
      lineHeight: '130%',
      color: colors.link,
    },
    vectorContainer: {
      display: 'flex',
      width: '24px',
      height: '24px',
      alignItems: 'center',
    },
    vector: {
      height: isMobile ? '40%' : '58%',
    },
  };

  const links = (
    <div style={styles.linkContainer}>
      <a style={styles.link} href='https://github.com/AndreyKonovalenko'>
        <span style={styles.text}>Carated by Andrey Konovalenko</span>
        <div style={styles.vectorContainer}>
          <Vector style={styles.vector} />
        </div>
      </a>
      <a style={styles.link} href='https://casetech.ru/candlestick-chart'>
        <span style={styles.text}>
          Based on "KeйсТех" candlestick chart case
        </span>
        <div style={styles.vectorContainer}>
          <Vector style={styles.vector} />
        </div>
      </a>
    </div>
  );
  return (
    <div style={styles.layout}>
      {children}
      {isLandscape ? null : links}
    </div>
  );
};
export default Layout;
