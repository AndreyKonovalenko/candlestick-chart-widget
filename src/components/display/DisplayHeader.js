const DisplayHeader = (props) => {
  const { children } = props;
  const styles = {
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: '0px',
      gap: '120px',
    },
  };
  return <div style={styles.header}>{children}</div>;
};

export default DisplayHeader;
