import theme from '../../theme/theme';
const TimePicker = (props) => {
  const { colors, fonts, mobileFonts } = theme;
  const { children, onClick, isActive, isMobile } = props;
  const styles = {
    timePicker: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: '10px 5px',
      gap: '10px',
      color: !isActive ? colors.switch.default : colors.switch.selected,
      cursor: 'pointer',
    },
    timePickerText: {
      fontFamily: fonts.main,
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: isMobile ? mobileFonts.switch : fonts.switch,
      inlineHeight: '120%',
    },
  };
  return (
    <div style={styles.timePicker} onClick={onClick}>
      <span style={styles.timePickerText}>{children}</span>
    </div>
  );
};

export default TimePicker;
