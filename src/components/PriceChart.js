const PriceChart = (props) => {
  const { children, isMobile } = props;
  const styles = {
    priceChart: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '0px',
      position: 'absolute',
      width: isMobile ? '345px' : '510px',
      height: isMobile ? '290px' : '308px',
      left: '26px',
      top: '26px',
      background: 'rgba(0, 0, 0, 0.7)',
      borderRadius: '10px',
      fontFamily: 'Roboto, sans-serif',
    },
  };

  return <div style={styles.priceChart}>{children}</div>;
};

export default PriceChart;
