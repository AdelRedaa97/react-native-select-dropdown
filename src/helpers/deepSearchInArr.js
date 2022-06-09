const contains = (query, item) => {
  if (item) {
    // string, number or boolean
    if (typeof item != 'object') {
      const str = item.toString().toLowerCase();
      if (str.includes(query.toString().toLowerCase())) {
        return true;
      }
    } else {
      // item is an object
      for (let key in item) {
        if (item[key]) {
          if (typeof item[key] == 'object') {
            return contains(query, item[key]);
          } else {
            const str = item[key].toString().toLowerCase();
            if (str.includes(query.toString().toLowerCase())) {
              return true;
            }
          }
        }
      }
    }
  }
  return false;
};

export const deepSearchInArr = (query, arr) => {
  let array = [];
  for (let i = 0; i <= arr.length - 1; i++) {
    if (contains(query, arr[i])) {
      array.push(arr[i]);
    } else {
      array.push(null);
    }
    if (i == arr.length - 1) {
      return array;
    }
  }
};
