export const getDropdownHeight = (dropdownStyle, dataLength) => {
  if (dropdownStyle && dropdownStyle.height) {
    return dropdownStyle.height;
  } else {
    if (dataLength == 0) {
      return 150;
    }
  }
};
