import theme from '../../theme/theme';
const TimePickerHeader = () => {
  const { switchColors } = theme;
  const styles = {
    timePickerHead: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: '10px 5px 10px 0px',
      gap: '10px',
      color: switchColors.default,
      cursor: 'pointer',
    },
    timePickerHeadText: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '17px',
      inlineHeight: '120%',
    },
  };
  return (
    <div style={styles.timePickerHead}>
      <span style={styles.timePickerHeadText}>Time</span>
    </div>
  );
};

export default TimePickerHeader;
