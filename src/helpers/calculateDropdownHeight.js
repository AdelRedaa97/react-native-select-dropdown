import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
const DROPDOWN_MAX_HEIGHT = height * 0.4;

export default calculateDropdownHeight = (
  dropdownStyle,
  rowStyle,
  dataLength
) => {
  if (dropdownStyle && dropdownStyle.height) {
    return dropdownStyle.height;
  } else {
    if (dataLength == 0) {
      return 150;
    } else {
      if (rowStyle && rowStyle.height) {
        const height = rowStyle.height * dataLength;
        return height < DROPDOWN_MAX_HEIGHT ? height : DROPDOWN_MAX_HEIGHT;
      } else {
        const height = 50 * dataLength;
        return height < DROPDOWN_MAX_HEIGHT ? height : DROPDOWN_MAX_HEIGHT;
      }
    }
  }
};
