const ChartContainer = (props) => {
  const { childern } = props;
  const styles = {
    chartContainer: {
      width: '480px',
      height: '115px',
      flex: 'none',
      order: '1',
      flexGrow: '0',
    },
  };
  return <div style={styles.chartContainer}>{childern}</div>;
};
export default ChartContainer;
