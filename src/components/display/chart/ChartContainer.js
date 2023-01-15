const ChartContainer = (props) => {
  const { children, isMobile } = props;
  const styles = {
    chartContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: isMobile ? '315px' : '480px',
      height: '115px',
      flex: 'none',
      order: '1',
      flexGrow: '0',
    },
  };
  return <div style={styles.chartContainer}>{children}</div>;
};
export default ChartContainer;
