const DataColumns = (props) => {
  const { children } = props;
  const styles = {
    dataColumns: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: '0px',
      gap: '20px',
      width: '436px',
      height: '81px',
      flex: 'none',
      order: '2',
      flexGrow: '0',
    },
  };
  return <div style={styles.dataColumns}>{children}</div>;
};

export default DataColumns;
