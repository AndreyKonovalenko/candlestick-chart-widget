import theme from '../../theme/theme';
const DisplayHeaderItem = (props) => {
  const { fonts, colors, mobileFonts } = theme;
  const { children, altColor, isMobile } = props;
  const styles = {
    headerItem: {
      height: '22px',
    },
    headerItemText: {
      fontFamily: fonts.main,
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: isMobile ? mobileFonts.display.header : fonts.display.header,
      lineHeight: '115%',
      color: altColor ? colors.display.header.date : colors.display.header.text,
    },
  };
  return (
    <div style={styles.headerItem}>
      <span style={styles.headerItemText}>{children}</span>
    </div>
  );
};
export default DisplayHeaderItem;
