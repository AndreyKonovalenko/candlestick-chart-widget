import theme from "../../theme/theme";
const DisplayHeaderItem = (props) => {
  const { fontFace, displayColors } = theme;
  const { children, altColor } = props;
  const styles = {
    headerItem: {
      height: "22px",
    },
    headerItemText: {
      fontFamily: fontFace,
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "19px",
      lineHeight: "115%",
      color: altColor ? displayColors.headerDate : displayColors.headerText,
    },
  };
  return (
    <div style={styles.headerItem}>
      <span style={styles.headerItemText}>{children}</span>
    </div>
  );
};
export default DisplayHeaderItem;
