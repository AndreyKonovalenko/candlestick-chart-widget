import theme from '../../theme/theme';
const DisplayHeaderItem = (props) => {
  const { font, colors, mobileFont } = theme;
  const { children, altColor, isMobile } = props;
  const styles = {
    headerItem: {
      height: '22px',
    },
    headerItemText: {
      fontFamily: font.display.fontFace,
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: isMobile
        ? font.display.header.fontSize
        : mobileFont.display.header.fontSize,
      lineHeight: '115%',
      color: altColor ? colors.display.header.date : colors.display.text,
    },
  };
  return (
    <div style={styles.headerItem}>
      <span style={styles.headerItemText}>{children}</span>
    </div>
  );
};
export default DisplayHeaderItem;
