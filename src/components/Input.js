import React from 'react';
import {forwardRef} from 'react';
import {View, TextInput, StyleSheet, I18nManager} from 'react-native';

const voidFunction = () => {};

const Input = (
  {
    searchViewWidth,
    inputStyle,
    inputTextStyle,
    value,
    valueColor,
    placeholder,
    placeholderTextColor,
    textAlign,
    onChangeText,
    onEndEditing,
    onSubmitEditing,
    renderLeft,
    renderRight,
    testID,
  },
  ref,
) => {
  const defaults = {
    inputStyle: inputStyle,
    inputTextStyle: inputTextStyle,
    value: value ?? '',
    valueColor: valueColor ?? '#000000',
    placeholder: placeholder ?? '',
    placeholderTextColor: placeholderTextColor ?? '#CACACA',
    textAlign: textAlign || (I18nManager.isRTL ? 'right' : 'left'),
    onChangeText: onChangeText ?? voidFunction,
    onEndEditing: onEndEditing ?? voidFunction,
    onSubmitEditing: onSubmitEditing ?? voidFunction,
    renderLeft: renderLeft,
    renderRight: renderRight,
    testID: testID,
  };

  const onChangeTextValidator = txt => {
    if (txt.length == 1 && txt == ' ') {
      return;
    }
    if (txt.length > 1 && txt.slice(-2) == '  ') {
      return;
    }
    defaults.onChangeText(txt);
  };

  return (
    <View style={{...styles.searchViewStyle, ...{width: searchViewWidth}}}>
      <View
        style={{
          ...styles.defaultInputStyle,
          ...defaults.inputStyle,
        }}>
        {defaults.renderLeft && <View style={styles.pressableLeft}>{defaults.renderLeft()}</View>}
        <TextInput
          testID={defaults.testID}
          ref={ref}
          value={defaults.value}
          placeholder={defaults.placeholder}
          placeholderTextColor={defaults.placeholderTextColor}
          textAlign={defaults.textAlign}
          onChangeText={onChangeTextValidator}
          onEndEditing={defaults.onEndEditing}
          onSubmitEditing={defaults.onSubmitEditing}
          //
          style={{...styles.inputField, color: defaults.valueColor, ...defaults.inputTextStyle}}
          returnKeyType={'done'}
          textContentType={'oneTimeCode'}
          allowFontScaling={false}
          autoComplete={'off'}
          autoCorrect={false}
          autoCapitalize={'none'}
          autoFocus={true}
        />
        {defaults.renderRight && <View style={styles.pressableRight}>{defaults.renderRight()}</View>}
      </View>
    </View>
  );
};

export default forwardRef((props, ref) => Input(props, ref));

const styles = StyleSheet.create({
  searchViewStyle: {
    height: 50,
    paddingHorizontal: 0,
  },
  defaultInputStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: '4%',
  },
  inputField: {
    flex: 1,
    height: '100%',
    backgroundColor: '#0000',
    textAlignVertical: 'center',
    paddingVertical: 0,
  },
  pressableLeft: {
    height: '100%',
    marginRight: '4%',
    justifyContent: 'center',
  },
  pressableRight: {
    height: '100%',
    marginLeft: '4%',
    justifyContent: 'center',
  },
});
