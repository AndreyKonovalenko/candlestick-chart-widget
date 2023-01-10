const ChartContainer = (props) => {
  const { children } = props;
  const styles = {
    chartContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '480px',
      height: '115px',
      flex: 'none',
      order: '1',
      flexGrow: '0',
    },
  };
  return <div style={styles.chartContainer}>{children}</div>;
};
export default ChartContainer;
