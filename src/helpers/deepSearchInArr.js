const contains = (item, searchTxt) => {
  // item is an object
  if (typeof item == 'object' && item != null) {
    for (let key in item) {
      const value = item[key];
      if (contains(value, searchTxt)) {
        return true;
      }
    }
  }
  // string, number or boolean
  if (typeof item != 'object' && item != null && item != undefined) {
    const itemStringfied = item.toString().toLowerCase();
    const searchTxtStringfied = searchTxt.toString().toLowerCase();
    if (itemStringfied.includes(searchTxtStringfied)) {
      return true;
    }
  }
  return false;
};

export const deepSearchInArr = (query, arr) => {
  let array = [];
  for (let i = 0; i <= arr.length - 1; i++) {
    if (contains(arr[i], query)) {
      array.push(arr[i]);
    } else {
      array.push(null);
    }
    if (i == arr.length - 1) {
      return array;
    }
  }
};
