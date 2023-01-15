import { ReactComponent as Vector } from './assets/vetor.svg';
import theme from '../theme/theme';
const Layout = (props) => {
  const { isMobile, children } = props;
  const { linkStyle } = theme;
  const styles = {
    layout: {
      backgroundImage: `url(img/${isMobile ? 'Medium' : 'Large'}.jpg)`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100vw',
      height: '100vh',
    },
    linkContainer: {
      position: 'absolute',
      right: '0px',
      bottom: '0px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '15px 10px',
    },
    link: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: '2px',
      textDecoration: 'none',
    },
    text: {
      fontFamily: linkStyle.fontFace,
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: '19px',
      lineHeight: '130%',
      color: linkStyle.textColor,
    },
    vectorContainer: {
      display: 'flex',
      width: '24px',
      height: '24px',
      alignItems: 'center',
    },
    vector: {
      height: '58%',
    },
  };

  return (
    <div style={styles.layout}>
      {children}
      <div style={styles.linkContainer}>
        <a style={styles.link} href='https://github.com/AndreyKonovalenko'>
          <span style={styles.text}>Carated by Andrey Konovalenko</span>
          <div style={styles.vectorContainer}>
            <Vector style={styles.vector} />
          </div>
        </a>
        <a style={styles.link} href='https://casetech.ru/candlestick-chart'>
          <span style={styles.text}>
            Based on "KeйсТех" free candlestick chart case
          </span>
          <div style={styles.vectorContainer}>
            <Vector style={styles.vector} />
          </div>
        </a>
      </div>
    </div>
  );
};
export default Layout;
