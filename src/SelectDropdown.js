import React, {forwardRef, useImperativeHandle, useCallback} from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import {isExist} from './helpers/isExist';
import Input from './components/Input';
import DropdownOverlay from './components/DropdownOverlay';
import DropdownModal from './components/DropdownModal';
import DropdownWindow from './components/DropdownWindow';
import {useSelectDropdown} from './hooks/useSelectDropdown';
import {useLayoutDropdown} from './hooks/useLayoutDropdown';
import {useRefs} from './hooks/useRefs';
import {findIndexInArr} from './helpers/findIndexInArr';

const SelectDropdown = (
  {
    data /* array */,
    onSelect /* function  */,
    renderButton /* function returns React component for the dropdown button */,
    renderItem /* function returns React component for each dropdown Item */,
    defaultValue /* any */,
    defaultValueByIndex /* integer */,
    disabled /* boolean */,
    disabledIndexes /* array of disabled items index */,
    disableAutoScroll /* boolean */,
    testID /* dropdown menu testID */,
    onFocus /* function  */,
    onBlur /* function  */,
    onScrollEndReached /* function  */,
    /////////////////////////////
    statusBarTranslucent /* boolean */,
    dropdownStyle /* style object for search input */,
    dropdownOverlayColor /* string */,
    showsVerticalScrollIndicator /* boolean */,
    /////////////////////////////
    search /* boolean */,
    searchInputStyle /* style object for search input */,
    searchInputTxtColor /* text color for search input */,
    searchInputTxtStyle /* text style for search input */,
    searchPlaceHolder /* placeholder text for search input */,
    searchPlaceHolderColor /* text color for search input placeholder */,
    renderSearchInputLeftIcon /* function returns React component for search input icon */,
    renderSearchInputRightIcon /* function returns React component for search input icon */,
    onChangeSearchInputText /* function callback when the search input text changes, this will automatically disable the dropdown's interna search to be implemented manually outside the component  */,
  },
  ref,
) => {
  const disabledInternalSearch = !!onChangeSearchInputText;
  /* ******************* hooks ******************* */
  const {dropdownButtonRef, dropDownFlatlistRef} = useRefs();
  const {
    dataArr, //
    selectedItem,
    selectItem,
    reset,
    searchTxt,
    setSearchTxt,
  } = useSelectDropdown(data, defaultValueByIndex, defaultValue, disabledInternalSearch);
  const {
    isVisible, //
    setIsVisible,
    buttonLayout,
    onDropdownButtonLayout,
    dropdownWindowStyle,
    onRequestClose,
  } = useLayoutDropdown(data, dropdownStyle);
  useImperativeHandle(ref, () => ({
    reset: () => {
      reset();
    },
    openDropdown: () => {
      openDropdown();
    },
    closeDropdown: () => {
      closeDropdown();
    },
    selectIndex: index => {
      selectItem(index);
    },
  }));
  /* ******************* Methods ******************* */
  const openDropdown = () => {
    dropdownButtonRef.current.measure((fx, fy, w, h, px, py) => {
      onDropdownButtonLayout(w, h, px, py);
      setIsVisible(true);
      onFocus && onFocus();
      scrollToSelectedItem();
    });
  };
  const closeDropdown = () => {
    setIsVisible(false);
    setSearchTxt('');
    onBlur && onBlur();
  };
  const scrollToSelectedItem = () => {
    const indexInCurrArr = findIndexInArr(selectedItem, dataArr);
    setTimeout(() => {
      if (disableAutoScroll) {
        return;
      }
      if (indexInCurrArr > 1) {
        dropDownFlatlistRef?.current?.scrollToIndex({
          index: search ? indexInCurrArr - 1 : indexInCurrArr,
          animated: true,
        });
      }
    }, 200);
  };
  const onSelectItem = (item, index) => {
    const indexInOriginalArr = findIndexInArr(item, data);
    closeDropdown();
    onSelect && onSelect(item, indexInOriginalArr);
    selectItem(indexInOriginalArr);
  };
  const onScrollToIndexFailed = error => {
    dropDownFlatlistRef.current.scrollToOffset({
      offset: error.averageItemLength * error.index,
      animated: true,
    });
    setTimeout(() => {
      if (dataArr.length !== 0 && dropDownFlatlistRef) {
        dropDownFlatlistRef.current.scrollToIndex({index: error.index, animated: true});
      }
    }, 100);
  };
  /* ******************** Render Methods ******************** */
  const renderSearchView = () => {
    return (
      search && (
        <Input
          searchViewWidth={buttonLayout.w}
          value={searchTxt}
          valueColor={searchInputTxtColor}
          placeholder={searchPlaceHolder}
          placeholderTextColor={searchPlaceHolderColor}
          onChangeText={txt => {
            setSearchTxt(txt);
            disabledInternalSearch && onChangeSearchInputText(txt);
          }}
          inputStyle={searchInputStyle}
          inputTextStyle={searchInputTxtStyle}
          renderLeft={renderSearchInputLeftIcon}
          renderRight={renderSearchInputRightIcon}
        />
      )
    );
  };
  const renderFlatlistItem = ({item, index}) => {
    const indexInCurrArr = findIndexInArr(selectedItem, dataArr);
    const isSelected = index == indexInCurrArr;

    let clonedElement = renderItem ? renderItem(item, index, isSelected) : <View />;
    let props = {...clonedElement.props};
    return (
      isExist(item) && (
        <TouchableOpacity
          {...props}
          disabled={disabledIndexes?.includes(index)}
          activeOpacity={0.8}
          onPress={() => onSelectItem(item, index)}>
          {props?.children}
        </TouchableOpacity>
      )
    );
  };
  const renderDropdown = () => {
    return (
      isVisible && (
        <DropdownModal statusBarTranslucent={statusBarTranslucent} visible={isVisible} onRequestClose={onRequestClose}>
          <DropdownOverlay onPress={closeDropdown} backgroundColor={dropdownOverlayColor} />
          <DropdownWindow layoutStyle={dropdownWindowStyle}>
            <FlatList
              testID={testID}
              data={dataArr}
              keyExtractor={(item, index) => index.toString()}
              ref={dropDownFlatlistRef}
              renderItem={renderFlatlistItem}
              ListHeaderComponent={renderSearchView()}
              stickyHeaderIndices={search && [0]}
              keyboardShouldPersistTaps="always"
              onEndReached={() => onScrollEndReached && onScrollEndReached()}
              onEndReachedThreshold={0.5}
              showsVerticalScrollIndicator={showsVerticalScrollIndicator}
              onScrollToIndexFailed={onScrollToIndexFailed}
            />
          </DropdownWindow>
        </DropdownModal>
      )
    );
  };
  ///////////////////////////////////////////////////////
  let clonedElement = renderButton ? renderButton(selectedItem, isVisible) : <View />;
  let props = {...clonedElement.props};
  return (
    <TouchableOpacity {...props} activeOpacity={0.8} ref={dropdownButtonRef} disabled={disabled} onPress={openDropdown}>
      {renderDropdown()}
      {props?.children}
    </TouchableOpacity>
  );
};

export default forwardRef((props, ref) => SelectDropdown(props, ref));
