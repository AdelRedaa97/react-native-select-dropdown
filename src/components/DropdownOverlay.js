import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

const DropdownOverlay = ({onPress, backgroundColor}) => {
  const defaults = {
    backgroundColor: backgroundColor || 'rgba(0,0,0,0.4)',
  };
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={{
        ...styles.dropdownOverlay,
        ...{
          backgroundColor: defaults.backgroundColor,
        },
      }}
    />
  );
};

export default DropdownOverlay;

const styles = StyleSheet.create({
  dropdownOverlay: {
    width: '100%',
    height: '100%',
  },
});
