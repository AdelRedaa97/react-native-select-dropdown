import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  rowRevese: {
    flexDirection: 'row-reverse',
  },
  dropdownButton: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    width: width / 2,
    height: 50,
    paddingHorizontal: 8,
    overflow: 'hidden',
  },
  dropdownButtonText: {
    flex: 1,
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
    marginHorizontal: 8,
  },
  dropdownCustomizedButtonParent: {
    flex: 1,
    overflow: 'hidden',
  },
  //////////////////////////////////////
  dropdownRow: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#C5C5C5',
    borderBottomWidth: 1,
  },
  dropdownRowText: {
    flex: 1,
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
    marginHorizontal: 8,
  },
  dropdownCustomizedRowParent: {
    flex: 1,
    overflow: 'hidden',
  },
});

export default styles;
