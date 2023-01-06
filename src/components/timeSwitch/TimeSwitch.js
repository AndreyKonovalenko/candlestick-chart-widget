const TimeSwitch = (props) => {
  const { children } = props;
  const styles = {
    timeSwitch: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: '0px 15px',
      height: '40px',
      background: '#141414',
      borderRadius: '0px 0px 10px 10px',
      flex: 'none',
      order: '1',
      alignSelf: 'stretch',
      flexGrow: '0',
    },
  };

  return <div style={styles.timeSwitch}>{children}</div>;
};
export default TimeSwitch;