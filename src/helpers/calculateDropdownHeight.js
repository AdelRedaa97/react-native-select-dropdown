import {Dimensions} from 'react-native';
const {height} = Dimensions.get('window');
const DROPDOWN_MAX_HEIGHT = height * 0.4;

export const calculateDropdownHeight = (dropdownStyle, rowStyle, dataLength, search) => {
  if (dropdownStyle && dropdownStyle.height) {
    return dropdownStyle.height;
  } else {
    if (dataLength == 0) {
      return 150;
    } else {
      const count = search ? dataLength + 1 : dataLength;
      if (rowStyle && rowStyle.height) {
        const height = rowStyle.height * count;
        return height < DROPDOWN_MAX_HEIGHT ? height : DROPDOWN_MAX_HEIGHT;
      } else {
        const height = 50 * count;
        return height < DROPDOWN_MAX_HEIGHT ? height : DROPDOWN_MAX_HEIGHT;
      }
    }
  }
};
