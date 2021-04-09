import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Modal,
  I18nManager,
} from "react-native";
const { width, height } = Dimensions.get("window");

const SelectDropdown = ({
  data /* array */ /* array of data that will be represented in dropdown 'can be array of objects' */,
  onSelect /* function  */ /* callback function recieves selected item and its index in data array */,
  defaultButtonText /* String */ /* default button text when no item is selected */,
  buttonTextAfterSelection /* function */ /* callback function recieves selected item and its index, this function should return a string that will be represented in button after item is selected  */,
  rowTextForSelection /* function */ /* callback function recieves item and index for each row in dropdown, this function shoud return a string that will be represented in each row in dropdown */,
  defaultValueByIndex /* integer */ /* default selected item index */,
  /////////////////////////////
  buttonStyle /* object */ /* style object for button */,
  buttonTextStyle /* object */ /* style object for button text */,
  renderCustomizedButtonChild /* function */ /* callback function recieves selected item and its index, this function should return a React component as a child for dropdown button */,
  /////////////////////////////
  renderDropdownIcon /* function */ /* function that should return a React component for dropdown icon */,
  dropdownIconPosition /* string */ /* dropdown icon position "left" || "right" */,
  statusBarTranslucent /* boolean */ /* required to set true when statusbar is translucent (android only) */,
  dropdownStyle /* object */ /* style object for dropdown view */,
  /////////////////////////////
  rowStyle /* object */ /* style object for row */,
  rowTextStyle /* object */ /* style object for row text */,
  renderCustomizedRowChild /* function */ /* callback function recieves item and its index, this function should return React component as a child for customized row */,
}) => {
  ///////////////////////////////////////////////////////
  const DropdownButton = useRef(); // button ref to get positions
  const [isVisible, setIsVisible] = useState(false); // dropdown visible ?
  const [dropdownPX, setDropdownPX] = useState(0); // position x
  const [dropdownPY, setDropdownPY] = useState(0); // position y
  const [dropdownHEIGHT, setDropdownHEIGHT] = useState(
    dropdownStyle && dropdownStyle.height ? dropdownStyle.height : 150
  ); // dropdown height
  const [dropdownWIDTH, setDropdownWIDTH] = useState(0); // dropdown width
  ///////////////////////////////////////////////////////
  const [selectedItem, setSelectedItem] = useState(null); // selected item from dropdown
  const [index, setIndex] = useState(-1); // index of selected item from dropdown
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
      marginHorizontal: 8,
      overflow: "hidden",
    },
    //////////////////////////////////////
    dropdownOverlay: {
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.3)",
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
      marginHorizontal: 8,
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
    if (data) {
      reset();
      if (defaultValueByIndex && data && data[defaultValueByIndex]) {
        setDefault(defaultValueByIndex);
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
    // for height changes
    if (dropdownStyle && dropdownStyle.height) {
      setDropdownHEIGHT(dropdownStyle.height);
    } else {
      setDropdownHEIGHT(150);
    }
  }, [dropdownStyle]);
  ///////////////////////////////////////////////////////
  /* ******************** Methods ******************** */
  const openDropdown = () => {
    DropdownButton.current.measure((fx, fy, w, h, px, py) => {
      // console.log('position y => ', py, '\nheight', h, '\nposition x => ', px)
      if (height - 18 < py + h + dropdownHEIGHT) {
        setDropdownPX(px);
        setDropdownPY(py - 2 - dropdownHEIGHT);
        setDropdownWIDTH(w);
      } else {
        setDropdownPX(px);
        setDropdownPY(py + h + 2);
        setDropdownWIDTH(w);
      }
    });
    setIsVisible(true);
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
  ///////////////////////////////////////////////////////
  const renderDropdown = () => {
    return (
      isVisible && (
        <Modal
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
            style={[styles.dropdownOverlay]}
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
              <ScrollView>
                {data.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index.toString()}
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
                            rowTextForSelection
                              ? rowTextForSelection(item, index)
                              : item,
                            index
                          )}
                        </View>
                      ) : (
                        <Text
                          numberOfLines={1}
                          allowFontScaling={false}
                          style={[styles.dropdownRowText, rowTextStyle]}
                        >
                          {rowTextForSelection
                            ? rowTextForSelection(item, index)
                            : item}
                        </Text>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
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
      activeOpacity={0.5}
      style={[styles.dropdownButton, buttonStyle]}
      onPress={() => openDropdown()}
    >
      {renderDropdown()}
      {renderDropdownIcon && renderDropdownIcon()}
      {renderCustomizedButtonChild ? (
        <View style={[styles.dropdownCustomizedButtonParent]}>
          {renderCustomizedButtonChild(
            selectedItem
              ? buttonTextAfterSelection
                ? buttonTextAfterSelection(selectedItem, index)
                : selectedItem
              : null,
            index
          )}
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

export default SelectDropdown;
