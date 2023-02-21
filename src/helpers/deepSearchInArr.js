const decycle = (obj, stack = []) => {
  if (!obj || typeof obj !== 'object') return obj;
  if (stack.includes(obj)) return null;
  if (obj._raw) {
    return obj._raw;
  }
  let s = stack.concat([obj]);

  return Array.isArray(obj)
    ? obj.map(x => decycle(x, s))
    : Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, decycle(v, s)]));
};
const contains = (item, searchTxt, searchKey) => {
  // item is an object
  if (typeof item == 'object' && item != null) {
    for (let key in item) {
      if (searchKey ? searchKey.includes(key) : true) {
        const value = item[key];
        if (contains(value, searchTxt)) {
          return true;
        }
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

export const deepSearchInArr = (query, arr, searchKey) => {
  let array = [];
  for (let i = 0; i <= arr.length - 1; i++) {
    if (contains(arr[i], query, searchKey)) {
      array.push(arr[i]);
    } else {
      array.push(null);
    }
    if (i == arr.length - 1) {
      return array;
    }
  }
};
