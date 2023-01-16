import theme from '../../theme/theme';
const TimePickerHeader = (props) => {
  const { isMobile } = props;
  const { colors, fonts, mobileFonts } = theme;
  const styles = {
    timePickerHead: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: '10px 5px 10px 0px',
      gap: '10px',
      color: colors.switch.selected,
      cursor: 'pointer',
    },
    timePickerHeadText: {
      fontFamily: fonts.main,
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: isMobile ? mobileFonts.switch : fonts.switch,
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
