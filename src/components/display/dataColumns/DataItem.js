const DataItem = (props) => {
  const { header, firstArg, secondArg } = props;
  const styles = {
    dataItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flexStart',
      padding: '0px',
    },
    headerText: {
      fontFamely: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '300',
      fontSize: '18px',
      lineHeight: '115%',
      color: '#8D8D8D',
    },
    valuesText: {
      fontFamely: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '300',
      fontSize: '30px',
      lineHeight: '100%',
      color: '#FFFFFF',
    },
  };
  return (
    <div style={styles.dataItem}>
      <sapn style={styles.headerText}>{header}</sapn>
      <sapn style={styles.valuesText}>{firstArg}</sapn>
      <sapn style={styles.valuesText}>{secondArg}</sapn>
    </div>
  );
};
export default DataItem;
