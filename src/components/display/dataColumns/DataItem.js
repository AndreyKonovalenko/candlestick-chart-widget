import theme from "../../../theme/theme";
const DataItem = (props) => {
  const { displayColors, fontFamely } = theme;
  const { header, firstArg, secondArg } = props;
  const styles = {
    dataItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flexStart",
      padding: "0px",
    },
    headerText: {
      fontFamely: fontFamely,
      fontStyle: "normal",
      fontWeight: "300",
      fontSize: "18px",
      lineHeight: "115%",
      color: displayColors.dataHeader,
    },
    valuesText: {
      fontFamely: fontFamely,
      fontStyle: "normal",
      fontWeight: "300",
      fontSize: "30px",
      lineHeight: "100%",
      color: displayColors.data,
    },
  };
  return (
    <div style={styles.dataItem}>
      <span style={styles.headerText}>{header}</span>
      <span style={styles.valuesText}>{firstArg}</span>
      <span style={styles.valuesText}>{secondArg}</span>
    </div>
  );
};
export default DataItem;
