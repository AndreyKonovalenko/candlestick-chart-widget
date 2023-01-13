import theme from "../../theme/theme";
const TimePicker = (props) => {
  const { fontFace, switchColors } = theme;
  const { children, onClick, isActive } = props;
  const styles = {
    timePicker: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      padding: "10px 5px",
      gap: "10px",
      color: !isActive ? switchColors.default : switchColors.selected,
      cursor: "pointer",
    },
    timePickerText: {
      fontFamily: fontFace,
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "17px",
      inlineHeight: "120%",
    },
  };
  return (
    <div style={styles.timePicker} onClick={onClick}>
      <span style={styles.timePickerText}>{children}</span>
    </div>
  );
};

export default TimePicker;
