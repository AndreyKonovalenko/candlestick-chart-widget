const DataColumns = (props) => {
  const { children, isMobile } = props;
  const styles = {
    dataColumns: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: '0px',
      gap: isMobile ? '10px' : '20px',
      width: isMobile ? '309px' : '436px',
      height: isMobile ? '65px' : '81px',
    },
  };
  return <div style={styles.dataColumns}>{children}</div>;
};

export default DataColumns;
