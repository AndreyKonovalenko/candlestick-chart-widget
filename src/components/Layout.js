const Layout = (props) => {
  const { isMobile, children } = props;
  const styles = {
    layout: {
      // position: 'fixed',
      // top: '-50%',
      // left: '-50%',
      // width: '200%',
      // height: '200%',
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
      gap: '2px',
    },
    link: {
      fontFamily: 'Raleway',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: '19px',
      lineHeight: '130%',
      color: '#FFFFFF',
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.layout}>
      {children}
      {/* //   <img style={styles.backgroundImage} src='img/Medium.jpg' alt='' /> */}
      <div style={styles.linkContainer}>
        <a style={styles.link} href='https://github.com/AndreyKonovalenko'>
          Carated by Andrey Konovalenko
        </a>
        <a style={styles.link} href='https://casetech.ru/candlestick-chart'>
          Based on "KeйсТех" free candlestick chart case
        </a>
      </div>
    </div>
  );
};
export default Layout;
