const PriceChart = (props) => {
  const { children } = props;
  const styles = {
    priceChart: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '0px',
      position: 'absolute',
      width: '510px',
      height: '308px',
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
