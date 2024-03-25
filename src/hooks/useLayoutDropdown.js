import {useEffect, useState, useMemo} from 'react';
import {I18nManager, Dimensions} from 'react-native';
import {getDropdownHeight} from '../helpers/getDropdownHeight';
import {useKeyboardHeight} from './useKeyboardHeight';
const {height} = Dimensions.get('window');
const DROPDOWN_MAX_HEIGHT = height * 0.4;

export const useLayoutDropdown = (data, dropdownStyle) => {
  const [isVisible, setIsVisible] = useState(false); // dropdown visible ?
  const [buttonLayout, setButtonLayout] = useState(null);
  const [dropdownCalculatedStyle, setDropdownCalculatedStyle] = useState({});

  const [dropdownHEIGHT, setDropdownHEIGHT] = useState(() => {
    return getDropdownHeight(dropdownStyle, data?.length || 0);
  }); // dropdown height

  const {keyboardHeight} = useKeyboardHeight();

  useEffect(() => {
    setDropdownHEIGHT(getDropdownHeight(dropdownStyle, data?.length || 0));
  }, [JSON.stringify(dropdownStyle), JSON.stringify(data)]);

  const onDropdownButtonLayout = (w, h, px, py) => {
    setButtonLayout({w, h, px, py});

    const remainingHeight = dropdownStyle?.height || height / 4;

    if (py + h > height - remainingHeight) {
      return setDropdownCalculatedStyle({
        bottom: height - (py + h) + h,
        width: dropdownStyle?.width || w,
        ...(I18nManager.isRTL ? {right: dropdownStyle?.right || px} : {left: dropdownStyle?.left || px}),
      });
    }

    return setDropdownCalculatedStyle({
      top: py + h + 2,
      width: dropdownStyle?.width || w,
      ...(I18nManager.isRTL ? {right: dropdownStyle?.right || px} : {left: dropdownStyle?.left || px}),
    });
  };

  const dropdownWindowStyle = useMemo(() => {
    // minimum dropdownheight to show while keyboard is opened
    const minDropdownHeight = 200;
    const getPositionIfKeyboardIsOpened = () => {
      if (keyboardHeight) {
        if (dropdownCalculatedStyle.top && height - dropdownCalculatedStyle.top < keyboardHeight + minDropdownHeight) {
          return {top: height - (keyboardHeight + minDropdownHeight), minHeight: minDropdownHeight};
        }
        if (dropdownCalculatedStyle.bottom && dropdownCalculatedStyle.bottom < keyboardHeight - minDropdownHeight) {
          return {top: height - (keyboardHeight + minDropdownHeight), bottom: undefined, minHeight: minDropdownHeight};
        }
        return {minHeight: minDropdownHeight};
      }
      return {};
    };

    return {
      ...{
        borderTopWidth: 0,
        overflow: 'hidden',
      },
      ...dropdownStyle,
      ...dropdownCalculatedStyle,
      ...{
        position: 'absolute',
        height: dropdownHEIGHT,
        maxHeight: DROPDOWN_MAX_HEIGHT,
      },
      ...getPositionIfKeyboardIsOpened(),
    };
  }, [JSON.stringify(dropdownStyle), JSON.stringify(dropdownCalculatedStyle), keyboardHeight, dropdownHEIGHT]);

  const onRequestClose = () => {
    setIsVisible(false);
  };

  return {
    isVisible,
    setIsVisible,
    buttonLayout,
    onDropdownButtonLayout,
    dropdownWindowStyle,
    onRequestClose,
  };
};
