const Display = (props) => {
  const { children, isMobile } = props;
  const styles = {
    display: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '15px',
      gap: '10px',
      widget: isMobile ? '345px' : '510px',
      height: isMobile ? '250px' : ' 268px',
    },
  };

  return <div style={styles.display}>{children}</div>;
};

export default Display;
