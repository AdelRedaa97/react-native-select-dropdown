import React from 'react';
import {View, StyleSheet} from 'react-native';

const DropdownWindow = ({layoutStyle, children}) => {
  return <View style={{...styles.dropdownOverlayView, ...styles.shadow, ...layoutStyle}}>{children}</View>;
};

export default DropdownWindow;

const styles = StyleSheet.create({
  dropdownOverlayView: {
    backgroundColor: '#EFEFEF',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
});
