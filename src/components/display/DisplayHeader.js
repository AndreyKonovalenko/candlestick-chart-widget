const DisplayHeader = (props) => {
  const { children, isMobile } = props;
  const styles = {
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: '0px',
      gap: isMobile ? '35px' : '120px',
    },
  };
  return <div style={styles.header}>{children}</div>;
};

export default DisplayHeader;
