const Display = (props) => {
  const { children } = props;
  const styles = {
    display: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '15px',
      gap: '10px',
      widget: '510px',
      height: ' 268px',
    },
  };

  return <div style={styles.display}>{children}</div>;
};

export default Display;
