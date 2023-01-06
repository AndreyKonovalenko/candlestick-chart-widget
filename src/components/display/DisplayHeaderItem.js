const DisplayHeaderItem = (props) => {
  const { children, color } = props;
  const styles = {
    headerItem: {
      height: '22px',
    },
    headerItemText: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '19px',
      lineHeight: '115%',
      color: color || '#72ED93',
    },
  };
  return (
    <div style={styles.headerItem}>
      <span style={styles.headerItemText}>{children}</span>
    </div>
  );
};
export default DisplayHeaderItem;
