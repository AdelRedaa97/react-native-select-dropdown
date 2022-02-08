import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Modal,
  I18nManager,
} from "react-native";
import _ from "lodash";
const { width, height } = Dimensions.get("window");

const DROPDOWN_MAX_HEIGHT = height * 0.4;

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
    dropdownBackgroundColor /* string */,
    /////////////////////////////
    rowStyle /* style object for row */,
    rowTextStyle /* style object for row text */,
    renderCustomizedRowChild /* function returns React component for customized row */,
  },
  ref
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
  // Dropdown height calculation
  const calculateDropdownHeight = () => {
    if (dropdownStyle && dropdownStyle.height) {
      return dropdownStyle.height;
    } else {
      if (!data || data.length == 0) {
        return 150;
      } else {
        if (rowStyle && rowStyle.height) {
          const height = rowStyle.height * data.length;
          return height < DROPDOWN_MAX_HEIGHT ? height : DROPDOWN_MAX_HEIGHT;
        } else {
          const height = 50 * data.length;
          return height < DROPDOWN_MAX_HEIGHT ? height : DROPDOWN_MAX_HEIGHT;
        }
      }
    }
  };
  ///////////////////////////////////////////////////////
  const DropdownButton = useRef(); // button ref to get positions
  const [isVisible, setIsVisible] = useState(false); // dropdown visible ?
  const [dropdownPX, setDropdownPX] = useState(0); // position x
  const [dropdownPY, setDropdownPY] = useState(0); // position y
  const [dropdownHEIGHT, setDropdownHEIGHT] = useState(() => {
    return calculateDropdownHeight();
  }); // dropdown height
  const [dropdownWIDTH, setDropdownWIDTH] = useState(0); // dropdown width
  ///////////////////////////////////////////////////////
  const [selectedItem, setSelectedItem] = useState(null); // selected item from dropdown
  const [index, setIndex] = useState(-1); // index of selected item from dropdown
  const dropDownFlatlistRef = useRef(null); // ref to the drop down flatlist
  ///////////////////////////////////////////////////////
  /* ********************* Style ********************* */
  const styles = StyleSheet.create({
    dropdownButton: {
      flexDirection: dropdownIconPosition == "left" ? "row" : "row-reverse",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#EFEFEF",
      width: width / 2,
      height: 50,
      paddingHorizontal: 8,
      overflow: "hidden",
    },
    dropdownButtonText: {
      flex: 1,
      fontSize: 18,
      color: "#000000",
      textAlign: "center",
      marginHorizontal: 8,
    },
    dropdownCustomizedButtonParent: {
      flex: 1,
      // marginHorizontal: 8,
      overflow: "hidden",
    },
    //////////////////////////////////////
    dropdownOverlay: {
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.4)",
    },
    dropdownOverlayView: {
      backgroundColor: "#EFEFEF",
    },
    dropdownOverlayViewForce: {
      position: "absolute",
      top: dropdownPY,
      height: dropdownHEIGHT,
      width: dropdownWIDTH,
      borderTopWidth: 0,
      overflow: "hidden",
    },
    dropdownOverlayViewForceRTL: I18nManager.isRTL
      ? { right: dropdownPX }
      : { left: dropdownPX },
    dropdownActivityIndicatorView: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    //////////////////////////////////////
    dropdownRow: {
      flex: 1,
      height: 50,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderBottomColor: "#C5C5C5",
      borderBottomWidth: 1,
    },
    dropdownRowText: {
      flex: 1,
      fontSize: 18,
      color: "#000000",
      textAlign: "center",
      marginHorizontal: 8,
    },
    dropdownCustomizedRowParent: {
      flex: 1,
      // marginHorizontal: 8,
      overflow: "hidden",
    },
    //////////////////////////////////////
    shadow: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 10,
    },
  });
  ///////////////////////////////////////////////////////
  /* ******************* useEffect ******************* */
  useEffect(() => {
    // data array changes
    if (data.length == 0) {
      reset();
      if (defaultValueByIndex && data && data[defaultValueByIndex]) {
        setDefault(defaultValueByIndex);
      }
      if (defaultValue && data && findIndexInArr(defaultValue, data) >= 0) {
        setDefault(findIndexInArr(defaultValue, data));
      }
    }
  }, [data]);
  useEffect(() => {
    // default value by index added or changed
    if (
      defaultValueByIndex != null &&
      defaultValueByIndex != undefined &&
      data &&
      data[defaultValueByIndex]
    ) {
      setDefault(defaultValueByIndex);
    }
  }, [defaultValueByIndex]);
  useEffect(() => {
    if (defaultValue && data) {
      if (findIndexInArr(defaultValue, data) >= 0) {
        setDefault(findIndexInArr(defaultValue, data));
      }
    }
  }, [defaultValue]);
  useEffect(() => {
    // for height changes
    setDropdownHEIGHT(calculateDropdownHeight());
  }, [dropdownStyle, data]);
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
    });
  };
  const closeDropdown = () => {
    setIsVisible(false);
  };
  const reset = () => {
    setSelectedItem(null);
    setIndex(-1);
  };
  const setDefault = (index) => {
    setSelectedItem(data[index]);
    setIndex(index);
  };
  const findIndexInArr = (obj, arr) => {
    if (typeof obj == "object") {
      var defaultValueIndex = -1;
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if (_.isEqual(element, defaultValue)) {
          defaultValueIndex = index;
        }
        if (index == arr.length - 1) {
          if (defaultValueIndex >= 0) {
            setDefault(defaultValueIndex);
          }
        }
      }
    } else {
      var defaultValueIndex = -1;
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if (element == defaultValue) {
          defaultValueIndex = index;
        }
        if (index == arr.length - 1) {
          if (defaultValueIndex >= 0) {
            setDefault(defaultValueIndex);
          }
        }
      }
    }
  };
  const getItemLayout = (data, index) => ({
    index,
    length: data.length,
    offset: rowStyle && rowStyle.height ? rowStyle.height * index : 50 * index,
  });
  const onLayout = () => {
    if (disableAutoScroll) {
      return;
    }
    if (index >= 3 && dropDownFlatlistRef) {
      dropDownFlatlistRef.current.scrollToOffset({
        offset:
          rowStyle && rowStyle.height ? rowStyle.height * index : 50 * index,
        animated: true,
      });
    }
  };
  ///////////////////////////////////////////////////////
  /* ******************** Render Methods ******************** */
  const renderFlatlistItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[styles.dropdownRow, rowStyle]}
        onPress={() => {
          closeDropdown();
          onSelect(item, index);
          setSelectedItem(item);
          setIndex(index);
        }}
      >
        {renderCustomizedRowChild ? (
          <View style={[styles.dropdownCustomizedRowParent]}>
            {renderCustomizedRowChild(
              rowTextForSelection ? rowTextForSelection(item, index) : item,
              index
            )}
          </View>
        ) : (
          <Text
            numberOfLines={1}
            allowFontScaling={false}
            style={[styles.dropdownRowText, rowTextStyle]}
          >
            {rowTextForSelection ? rowTextForSelection(item, index) : item}
          </Text>
        )}
      </TouchableOpacity>
    );
  };
  const renderDropdown = () => {
    return (
      isVisible && (
        <Modal
          supportedOrientations={["portrait", "landscape"]}
          animationType="none"
          transparent={true}
          statusBarTranslucent={
            statusBarTranslucent ? statusBarTranslucent : false
          }
          visible={isVisible}
          // style={[styles.dropdownOverlay]}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.dropdownOverlay,
              !!dropdownOverlayColor && {
                backgroundColor: dropdownOverlayColor,
              },
            ]}
            onPress={() => closeDropdown()}
          />
          <View
            style={[
              styles.dropdownOverlayView,
              styles.shadow,
              dropdownStyle,
              styles.dropdownOverlayViewForce,
              styles.dropdownOverlayViewForceRTL,
            ]}
          >
            {!data || data.length == 0 ? (
              <View style={[styles.dropdownActivityIndicatorView]}>
                <ActivityIndicator size="small" color={"#999999"} />
              </View>
            ) : (
              <FlatList
                data={data}
                style={[
                  !!dropdownBackgroundColor && {
                    backgroundColor: dropdownBackgroundColor,
                  },
                ]}
                keyExtractor={(item, index) => index.toString()}
                ref={(ref) => (dropDownFlatlistRef.current = ref)}
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
      disabled={disabled}
      ref={DropdownButton}
      activeOpacity={0.5}
      style={[styles.dropdownButton, buttonStyle]}
      onPress={() => openDropdown()}
    >
      {renderDropdown()}
      {renderDropdownIcon && renderDropdownIcon(isVisible)}
      {renderCustomizedButtonChild ? (
        <View style={[styles.dropdownCustomizedButtonParent]}>
          {renderCustomizedButtonChild(selectedItem, index)}
        </View>
      ) : (
        <Text
          numberOfLines={1}
          allowFontScaling={false}
          style={[styles.dropdownButtonText, buttonTextStyle]}
        >
          {selectedItem
            ? buttonTextAfterSelection
              ? buttonTextAfterSelection(selectedItem, index)
              : selectedItem
            : defaultButtonText
            ? defaultButtonText
            : "Select an option."}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default forwardRef((props, ref) => SelectDropdown(props, ref));
