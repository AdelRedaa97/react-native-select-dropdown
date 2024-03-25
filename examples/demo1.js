import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Demo1 = () => {
  const emojis = [
    'happy',
    'cool',
    'lol',
    'sad',
    'cry',
    'angry',
    'confused',
    'excited',
    'kiss',
    'devil',
    'dead',
    'wink',
    'sick',
    'frown',
  ];
  const emojisWithIcons = [
    {title: 'happy', icon: 'emoticon-happy-outline'},
    {title: 'cool', icon: 'emoticon-cool-outline'},
    {title: 'lol', icon: 'emoticon-lol-outline'},
    {title: 'sad', icon: 'emoticon-sad-outline'},
    {title: 'cry', icon: 'emoticon-cry-outline'},
    {title: 'angry', icon: 'emoticon-angry-outline'},
    {title: 'confused', icon: 'emoticon-confused-outline'},
    {title: 'excited', icon: 'emoticon-excited-outline'},
    {title: 'kiss', icon: 'emoticon-kiss-outline'},
    {title: 'devil', icon: 'emoticon-devil-outline'},
    {title: 'dead', icon: 'emoticon-dead-outline'},
    {title: 'wink', icon: 'emoticon-wink-outline'},
    {title: 'sick', icon: 'emoticon-sick-outline'},
    {title: 'frown', icon: 'emoticon-frown-outline'},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTxt}>Demo 1</Text>
      </View>
      <SelectDropdown
        data={emojis}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        // defaultValueByIndex={8} // use default value by index or default value
        // defaultValue={'kiss'} // use default value by index or default value
        renderButton={(selectedItem, isOpen) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>{selectedItem || 'Select your mood'}</Text>
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View
              style={{
                ...styles.dropdownItemStyle,
                ...(isSelected && {backgroundColor: '#D2D9DF'}),
              }}>
              <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
            </View>
          );
        }}
        dropdownStyle={styles.dropdownMenuStyle}
      />

      <SelectDropdown
        data={emojisWithIcons}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        // defaultValueByIndex={8} // use default value by index or default value
        // defaultValue={{title: 'kiss', icon: 'emoticon-kiss-outline'}} // use default value by index or default value
        renderButton={(selectedItem, isOpen) => {
          return (
            <View style={styles.dropdown1ButtonStyle}>
              <Icon name={selectedItem ? selectedItem.icon : 'emoticon'} style={styles.dropdown1ButtonIconStyle} />
              <Text style={styles.dropdown1ButtonTxtStyle}>
                {(selectedItem && selectedItem.title) || 'Select your mood'}
              </Text>
              <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} style={styles.dropdown1ButtonArrowStyle} />
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View
              style={{
                ...styles.dropdown1ItemStyle,
                ...(isSelected && {backgroundColor: 'grey'}),
              }}>
              <Icon name={item.icon} style={styles.dropdown1ItemIconStyle} />
              <Text style={styles.dropdown1ItemTxtStyle}>{item.title}</Text>
            </View>
          );
        }}
        dropdownStyle={styles.dropdown1MenuStyle}
        showsVerticalScrollIndicator={false}
      />

      <SelectDropdown
        data={emojisWithIcons}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        // defaultValueByIndex={8} // use default value by index or default value
        // defaultValue={{title: 'kiss', icon: 'emoticon-kiss-outline'}} // use default value by index or default value
        renderButton={(selectedItem, isOpen) => {
          return (
            <View style={styles.dropdown2ButtonStyle}>
              {selectedItem && <Icon name={selectedItem.icon} style={styles.dropdown2ButtonIconStyle} />}
              <Text style={styles.dropdown2ButtonTxtStyle}>
                {(selectedItem && selectedItem.title) || 'Select your mood'}
              </Text>
              <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} style={styles.dropdown2ButtonArrowStyle} />
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View
              style={{
                ...styles.dropdown2ItemStyle,
                ...(isSelected && {backgroundColor: '#D2D9DF'}),
              }}>
              <Icon name={item.icon} style={styles.dropdown2ItemIconStyle} />
              <Text style={styles.dropdown2ItemTxtStyle}>{item.title}</Text>
            </View>
          );
        }}
        dropdownStyle={styles.dropdown2MenuStyle}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Demo1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 116,
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 90,
    backgroundColor: '#E9ECEF',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 16,
  },
  headerTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#151E26',
  },
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
    textAlign: 'center',
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
    height: 150,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#B1BDC8',
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
    textAlign: 'center',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  ////////////// dropdown1
  dropdown1ButtonStyle: {
    width: '80%',
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#444444',
  },
  dropdown1ButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  dropdown1ButtonArrowStyle: {
    fontSize: 28,
    color: '#FFFFFF',
  },
  dropdown1ButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
    color: '#FFFFFF',
  },
  dropdown1MenuStyle: {
    backgroundColor: '#444444',
    borderRadius: 8,
  },
  dropdown1ItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#B1BDC8',
  },
  dropdown1ItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  dropdown1ItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
    color: '#FFFFFF',
  },
  ////////////// dropdown2
  dropdown2ButtonStyle: {
    width: '80%',
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#B1BDC8',
  },
  dropdown2ButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdown2ButtonArrowStyle: {
    fontSize: 28,
  },
  dropdown2ButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdown2MenuStyle: {
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  dropdown2ItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#B1BDC8',
  },
  dropdown2ItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdown2ItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
