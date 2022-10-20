import {useRef} from 'react';

export const useRefs = () => {
  const dropdownButtonRef = useRef(); // button ref to get positions
  const dropDownFlatlistRef = useRef(null); // ref to the drop down flatlist

  return {
    dropdownButtonRef,
    dropDownFlatlistRef,
  };
};
