const TimePicker = (props) => {
  const { children, onClick, isActive } = props;
  const styles = {
    timePicker: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: '10px 5px',
      gap: '10px',
      color: !isActive ? '#898989' : '#FFFFFF',
      cursor: 'pointer',
    },
    timePickerText: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '17px',
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
