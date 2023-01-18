import theme from '../../theme/theme';
const TimeSwitch = (props) => {
  const { children } = props;
  const { colors } = theme;
  const styles = {
    timeSwitch: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: '0px 15px',
      height: '40px',
      background: colors.switch.background,
      borderRadius: '0px 0px 10px 10px',
      alignSelf: 'stretch',
    },
  };

  return <div style={styles.timeSwitch}>{children}</div>;
};
export default TimeSwitch;
