import _ from "lodash";

export default findIndexInArr = (obj, arr) => {
  var defaultValueIndex = -1;
  if (typeof obj == "object") {
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      if (_.isEqual(element, obj)) {
        defaultValueIndex = index;
      }
      if (index == arr.length - 1) {
        return defaultValueIndex;
      }
    }
  } else {
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      if (element == obj) {
        defaultValueIndex = index;
      }
      if (index == arr.length - 1) {
        if (index == arr.length - 1) {
          return defaultValueIndex;
        }
      }
    }
  }
};
