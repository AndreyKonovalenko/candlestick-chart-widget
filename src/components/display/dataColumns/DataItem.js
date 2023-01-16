import theme from "../../../theme/theme";
const DataItem = (props) => {
  const { colors, fonts, mobileFonts } = theme;
  const { header, firstArg, secondArg, isMobile } = props;
  const styles = {
    dataItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: "0px",
    },
    valueContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      padding: "0px",
    },
    headerText: {
      fontFamely: fonts.display.fontFace,
      fontStyle: "normal",
      fontWeight: "300",
      fontSize: isMobile ? fonts.display.data : mobileFonts.display.data,
      lineHeight: "115%",
      color: colors.display.data.header,
    },
    valuesText: {
      fontFamely: fonts.display.fontFace,
      fontStyle: "normal",
      fontWeight: "300",
      fontSize: isMobile ? fonts.display.value : mobileFonts.display.value,
      lineHeight: "100%",
      color: colors.display.data.value,
    },
  };
  return (
    <div style={styles.dataItem}>
      <span style={styles.headerText}>{header}</span>
      <div style={styles.valueContainer}>
        <span style={styles.valuesText}>{firstArg}</span>
        <span style={styles.valuesText}>{secondArg}</span>
      </div>
    </div>
  );
};
export default DataItem;
