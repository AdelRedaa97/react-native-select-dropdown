import { StyleSheet, Dimensions, I18nManager } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  dropdownButton: {
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


  //// CUSTOM TEXTINPUT/SEARCH FIELD //////////////////////////////////
  label: {
    fontSize: 14,
    marginBottom: 10,
    marginTop: 10,
    color: "#000"
  },
  input: {
    // backgroundColor: 'red',
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    borderBottomColor: '#000000',
    borderBottomWidth: 2,
    height: 50,
    width: "100%"
  },
  inputContainer: {
    // borderWidth: 1,
    borderColor: "#000",
    height: 50,
    opacity: 0.5,
    color: "#000",
  },
  selectedElement: {
    backgroundColor: '#CCC'
  },
});

export default styles;
