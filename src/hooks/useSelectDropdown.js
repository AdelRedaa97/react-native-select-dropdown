import {useState, useEffect, useMemo} from 'react';
import {deepSearchInArr} from '../helpers/deepSearchInArr';
import {findIndexInArr} from '../helpers/findIndexInArr';
import {isExist} from '../helpers/isExist';

export const useSelectDropdown = (
  data,
  defaultValueByIndex,
  defaultValue,
  disabledInternalSearch,
  multipleSelect,
  searchKey,
) => {
  const [selectedItem, setSelectedItem] = useState(multipleSelect ? [] : null); // selected item from dropdown
  const [selectedIndex, setSelectedIndex] = useState(multipleSelect ? [-1] : -1); // index of selected item from dropdown
  const [selectAll, setSelectAll] = useState(false); // index of selected item from dropdown
  const [searchTxt, setSearchTxt] = useState('');

  // data array changes
  useEffect(() => {
    if (!data || data.length == 0) {
      reset();
    }
  }, [data]);

  // default value by index added or changed
  useEffect(() => {
    // defaultValueByIndex may be equals zero
    if (isExist(defaultValueByIndex)) {
      if (multipleSelect) {
        let tmp = [];

        defaultValueByIndex.map((d, i) => {
          let exist = isExist(data[d]);
          if (data && exist) {
            let index = findIndexInArr(data[d], data);
            tmp.push({item: data[index], index});
          }
        });
        setSelectedItem(tmp);
        setSelectedIndex(tmp.map(d => d.index));
        return;
      }

      if (data && isExist(data[defaultValueByIndex])) {
        selectItem(defaultValueByIndex);
      }
    }
  }, [defaultValueByIndex]);
  // default value added or changed
  useEffect(() => {
    // defaultValue may be equals zero
    if (isExist(defaultValue)) {
      if (multipleSelect) {
        let tmp = [];

        defaultValue.map((d, i) => {
          let index = findIndexInArr(d, data);
          if (data && index >= 0) {
            tmp.push({item: data[index], index});
          }
        });
        setSelectedItem(tmp);
        setSelectedIndex(tmp.map(d => d.index));
        return;
      }

      if (data && findIndexInArr(defaultValue, data) >= 0) {
        selectItem(findIndexInArr(defaultValue, data));
      }
    }
  }, [defaultValue]);

  const dataArr = useMemo(() => {
    if (disabledInternalSearch) {
      return data;
    }
    return searchTxt ? deepSearchInArr(searchTxt, data, searchKey) : data;
  }, [data, searchTxt]);

  const selectItem = index => {
    if (multipleSelect) {
      let tmp = selectedItem;
      tmp =
        tmp.filter(d => d?.index == index).length > 0
          ? tmp.filter(d => d.index !== index)
          : [...tmp, {item: data[index], index}];
      setSelectedItem(tmp);
      setSelectedIndex(tmp.map(d => d.index));
      return;
    }

    setSelectedItem(data[index]);
    setSelectedIndex(index);
  };

  const reset = () => {
    setSelectedItem(multipleSelect ? [] : null);
    setSelectedIndex(multipleSelect ? [-1] : -1);
  };

  const toggleSeletAll = (cond = true) => {
    if (cond) {
      if (!selectAll) {
        let tmp = [];
        data.map((d, i) => {
          tmp.push({item: d, index: i});
        });
        setSelectedItem(tmp);
        setSelectedIndex(tmp.map(d => d.index));
      } else {
        setSelectedItem([]);
        setSelectedIndex([-1]);
      }
      setSelectAll(!selectAll);
      return;
    }
    setSelectAll(false);
  };

  return {
    dataArr,
    selectedItem,
    selectedIndex,
    selectItem,
    reset,
    searchTxt,
    setSearchTxt,
    selectAll,
    toggleSeletAll,
  };
};
