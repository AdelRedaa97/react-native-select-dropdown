import {useRef} from 'react';

export const useRefs = () => {
  const dropdownButtonRef = useRef(); // button ref to get positions
  const dropDownFlatlistRef = useRef(null); // ref to the drop down flatlist
  const dropdownSearchInputRef = useRef(null); // ref to the search input

  return {
    dropdownButtonRef,
    dropDownFlatlistRef,
    dropdownSearchInputRef,
  };
};
