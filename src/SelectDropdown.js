import React, {useEffect, useState, useRef, forwardRef, useImperativeHandle} from 'react';
import {View, Text, TouchableOpacity, FlatList, Dimensions, ActivityIndicator, Modal, I18nManager} from 'react-native';
import styles from './styles';
import findIndexInArr from './helpers/findIndexInArr';
import calculateDropdownHeight from './helpers/calculateDropdownHeight';
const {height} = Dimensions.get('window');

const SelectDropdown = (
  {
    data /* array */,
    onSelect /* function  */,
    defaultButtonText /* String */,
    buttonTextAfterSelection /* function */,
    rowTextForSelection /* function */,
    defaultValue /* any */,
    defaultValueByIndex /* integer */,
    disabled /* boolean */,
    disableAutoScroll /* boolean */,
    onFocus /* function  */,
    onBlur /* function  */,
    /////////////////////////////
    buttonStyle /* style object for button */,
    buttonTextStyle /* style object for button text */,
    renderCustomizedButtonChild /* function returns React component for customized button */,
    /////////////////////////////
    renderDropdownIcon,
    dropdownIconPosition,
    statusBarTranslucent,
    dropdownStyle,
    dropdownOverlayColor /* string */,
    /////////////////////////////
    rowStyle /* style object for row */,
    rowTextStyle /* style object for row text */,
    renderCustomizedRowChild /* function returns React component for customized row */,
  },
  ref,
) => {
  ///////////////////////////////////////////////////////
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
  }));
  ///////////////////////////////////////////////////////
  const DropdownButton = useRef(); // button ref to get positions
  const [isVisible, setIsVisible] = useState(false); // dropdown visible ?
  const [dropdownPX, setDropdownPX] = useState(0); // position x
  const [dropdownPY, setDropdownPY] = useState(0); // position y
  const [dropdownHEIGHT, setDropdownHEIGHT] = useState(() => {
    return calculateDropdownHeight(dropdownStyle, rowStyle, data?.length || 0);
  }); // dropdown height
  const [dropdownWIDTH, setDropdownWIDTH] = useState(0); // dropdown width
  ///////////////////////////////////////////////////////
  const [selectedItem, setSelectedItem] = useState(null); // selected item from dropdown
  const [index, setIndex] = useState(-1); // index of selected item from dropdown
  const dropDownFlatlistRef = useRef(null); // ref to the drop down flatlist
  ///////////////////////////////////////////////////////
  /* ******************* useEffect ******************* */
  // data array changes
  useEffect(() => {
    if (!data || data.length == 0) {
      reset();
    }
  }, [data]);
  // default value by index added or changed
  useEffect(() => {
    // defaultValueByIndex may be equals zero
    if (defaultValueByIndex != undefined && defaultValueByIndex != null) {
      if (data && data[defaultValueByIndex]) {
        setDefault(defaultValueByIndex);
      }
    }
  }, [defaultValueByIndex]);
  // default value added or changed
  useEffect(() => {
    if (defaultValue && data && findIndexInArr(defaultValue, data) >= 0) {
      setDefault(findIndexInArr(defaultValue, data));
    }
  }, [defaultValue]);
  // for height changes
  useEffect(() => {
    setDropdownHEIGHT(calculateDropdownHeight(dropdownStyle, rowStyle, data?.length || 0));
  }, [dropdownStyle, rowStyle, data]);
  ///////////////////////////////////////////////////////
  /* ******************** Methods ******************** */
  const openDropdown = () => {
    DropdownButton.current.measure((fx, fy, w, h, px, py) => {
      // console.log('position y => ', py, '\nheight', h, '\nposition x => ', px)
      if (height - 18 < py + h + dropdownHEIGHT) {
        setDropdownPX(px);
        setDropdownPY(py - 2 - dropdownHEIGHT);
      } else {
        setDropdownPX(px);
        setDropdownPY(py + h + 2);
      }
      setDropdownWIDTH(dropdownStyle?.width || w);
      setIsVisible(true);
      onFocus && onFocus();
    });
  };
  const closeDropdown = () => {
    setIsVisible(false);
    onBlur && onBlur();
  };
  const reset = () => {
    setSelectedItem(null);
    setIndex(-1);
  };
  const setDefault = index => {
    setSelectedItem(data[index]);
    setIndex(index);
  };
  const getItemLayout = (data, index) => ({
    index,
    length: data?.length || 0,
    offset: rowStyle && rowStyle.height ? rowStyle.height * index : 50 * index,
  });
  const onLayout = () => {
    if (disableAutoScroll) {
      return;
    }
    if (index >= 3 && dropDownFlatlistRef) {
      dropDownFlatlistRef.current.scrollToOffset({
        offset: rowStyle && rowStyle.height ? rowStyle.height * index : 50 * index,
        animated: true,
      });
    }
  };
  const onSelectItem = (item, index) => {
    closeDropdown();
    onSelect(item, index);
    setSelectedItem(item);
    setIndex(index);
  };
  ///////////////////////////////////////////////////////
  /* ******************** Render Methods ******************** */
  const renderFlatlistItem = ({item, index}) => {
    return (
      <TouchableOpacity style={{...styles.dropdownRow, ...rowStyle}} onPress={() => onSelectItem(item, index)}>
        {renderCustomizedRowChild ? (
          <View style={styles.dropdownCustomizedRowParent}>{renderCustomizedRowChild(item, index)}</View>
        ) : (
          <Text numberOfLines={1} allowFontScaling={false} style={[styles.dropdownRowText, rowTextStyle]}>
            {rowTextForSelection ? rowTextForSelection(item, index) : item.toString()}
          </Text>
        )}
      </TouchableOpacity>
    );
  };
  const renderDropdown = () => {
    return (
      isVisible && (
        <Modal
          supportedOrientations={['portrait', 'landscape']}
          animationType="none"
          transparent={true}
          statusBarTranslucent={statusBarTranslucent || false}
          visible={isVisible}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => closeDropdown()}
            style={{
              ...styles.dropdownOverlay,
              ...(dropdownOverlayColor && {
                backgroundColor: dropdownOverlayColor,
              }),
            }}
          />
          <View
            style={{
              ...styles.dropdownOverlayView,
              ...styles.shadow,
              ...dropdownStyle,
              ...{
                position: 'absolute',
                top: dropdownPY,
                height: dropdownHEIGHT,
                width: dropdownWIDTH,
                borderTopWidth: 0,
                overflow: 'hidden',
              },
              ...(I18nManager.isRTL
                ? {right: dropdownStyle?.right || dropdownPX}
                : {left: dropdownStyle?.left || dropdownPX}),
            }}>
            {!data || data.length == 0 ? (
              <View style={styles.dropdownActivityIndicatorView}>
                <ActivityIndicator size="small" color={'#999999'} />
              </View>
            ) : (
              <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                ref={ref => (dropDownFlatlistRef.current = ref)}
                renderItem={renderFlatlistItem}
                getItemLayout={getItemLayout}
                onLayout={onLayout}
              />
            )}
          </View>
        </Modal>
      )
    );
  };
  ///////////////////////////////////////////////////////
  return (
    <TouchableOpacity
      ref={DropdownButton}
      disabled={disabled}
      activeOpacity={0.5}
      style={{
        ...styles.dropdownButton,
        ...(dropdownIconPosition == 'left' ? {flexDirection: 'row'} : {flexDirection: 'row-reverse'}),
        ...buttonStyle,
      }}
      onPress={() => openDropdown()}>
      {renderDropdown()}
      {renderDropdownIcon && renderDropdownIcon(isVisible)}
      {renderCustomizedButtonChild ? (
        <View style={styles.dropdownCustomizedButtonParent}>{renderCustomizedButtonChild(selectedItem, index)}</View>
      ) : (
        <Text numberOfLines={1} allowFontScaling={false} style={{...styles.dropdownButtonText, ...buttonTextStyle}}>
          {selectedItem
            ? buttonTextAfterSelection
              ? buttonTextAfterSelection(selectedItem, index)
              : selectedItem.toString()
            : defaultButtonText || 'Select an option.'}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default forwardRef((props, ref) => SelectDropdown(props, ref));
