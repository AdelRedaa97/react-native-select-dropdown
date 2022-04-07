# react-native-select-dropdown

react-native-select-dropdown is a highly customized dropdown | select | picker | menu for react native that works for andriod and iOS platforms.

## Installation

#### # Using npm

```bash
npm install react-native-select-dropdown
```

#### # Using yarn

```bash
yarn add react-native-select-dropdown
```

## Demo

#### Code provided in Examples folder.

[![Simulator-Screen-Recording-i-Phone-13-Pro-2022-03-28-at-21-35-46.gif](https://i.postimg.cc/4yYR8V3L/Simulator-Screen-Recording-i-Phone-13-Pro-2022-03-28-at-21-35-46.gif)](https://postimg.cc/64xPq7nn)
[![Simulator-Screen-Recording-i-Phone-13-Pro-2022-03-28-at-21-43-59.gif](https://i.postimg.cc/m2fkJgQX/Simulator-Screen-Recording-i-Phone-13-Pro-2022-03-28-at-21-43-59.gif)](https://postimg.cc/grsG6dt8)

## Usage

```
import SelectDropdown from 'react-native-select-dropdown'
...
const countries = ["Egypt", "Canada", "Australia", "Ireland"]
...
<SelectDropdown
	data={countries}
	onSelect={(selectedItem, index) => {
		console.log(selectedItem, index)
	}}
	buttonTextAfterSelection={(selectedItem, index) => {
		// text represented after item is selected
		// if data array is an array of objects then return selectedItem.property to render after item is selected
		return selectedItem
	}}
	rowTextForSelection={(item, index) => {
		// text represented for each item in dropdown
		// if data array is an array of objects then return item.property to represent item in dropdown
		return item
	}}
/>
```

### Props

- [`data`](#data)

- [`onSelect`](#onSelect)

- [`defaultButtonText`](#defaultButtonText)

- [`buttonTextAfterSelection`](#buttonTextAfterSelection)

- [`rowTextForSelection`](#rowTextForSelection)

- [`defaultValue`](#defaultValue)

- [`defaultValueByIndex`](#defaultValueByIndex)

- [`disabled`](#disabled)

- [`disableAutoScroll`](#disableAutoScroll)

- [`onFocus`](#onFocus)

- [`onBlur`](#onBlur)

- [`buttonStyle`](#buttonStyle)

- [`buttonTextStyle`](#buttonTextStyle)

- [`renderCustomizedButtonChild`](#renderCustomizedButtonChild)

- [`renderDropdownIcon`](#renderDropdownIcon)

- [`dropdownIconPosition`](#dropdownIconPosition)

- [`statusBarTranslucent`](#statusBarTranslucent)

- [`dropdownStyle`](#dropdownStyle)

- [`dropdownOverlayColor`](#dropdownOverlayColor)

- [`dropdownBackgroundColor`](#dropdownBackgroundColor)

- [`rowStyle`](#rowStyle)

- [`rowTextStyle`](#rowTextStyle)

- [`renderCustomizedRowChild`](#renderCustomizedRowChild)

### Methods

- [`reset`](#License)
- [`openDropdown`](#License)
- [`closeDropdown`](#License)

---

### data

array of data that will be represented in dropdown 'can be array of objects

| Type  | Required |
| ----- | -------- |
| array | Yes      |

---

### onSelect

function recieves selected item and its index in data array

| Type     | Required |
| -------- | -------- |
| function | Yes      |

---

### defaultButtonText

default button text when no item is selected

| Type   | Required |
| ------ | -------- |
| String | No       |

---

### buttonTextAfterSelection

function recieves selected item and its index, this function should return a string that will be represented in button after item is selected

| Type     | Required                                                             |
| -------- | -------------------------------------------------------------------- |
| function | Yes "unless you customized button using renderCustomizedButtonChild" |

---

### rowTextForSelection

function recieves item and index for each row in dropdown, this function shoud return a string that will be represented in each row in dropdown

| Type     | Required                                                          |
| -------- | ----------------------------------------------------------------- |
| function | Yes "unless you customized button using renderCustomizedRowChild" |

---

### defaultValue

default selected item in dropdown ( check examples in Demo1)

| Type | Required |
| ---- | -------- |
| any  | No       |

---

### defaultValueByIndex

default selected item index

| Type    | Required |
| ------- | -------- |
| integer | No       |

---

### disabled

disable dropdown

| Type    | Required |
| ------- | -------- |
| boolean | No       |

---

### disableAutoScroll

disable auto scroll to selected value

| Type    | Required |
| ------- | -------- |
| boolean | No       |

---

### onFocus

function fires when dropdown is opened

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### onBlur

function fires when dropdown is closed

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### buttonStyle

style object for button

| Type   | Required |
| ------ | -------- |
| object | Yes      |

---

### buttonTextStyle

style object for button text

| Type   | Required |
| ------ | -------- |
| object | No       |

---

### renderCustomizedButtonChild

function recieves selected item and its index, this function should return a React component as a child for dropdown button `buttonStyle` should be used for parent button view style.

#### # check examples folder to make things clear

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### renderDropdownIcon

function that should return a React component for dropdown icon

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### dropdownIconPosition

dropdown icon position "left" || "right"

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### statusBarTranslucent

required to set true when statusbar is translucent `(android only)`

| Type    | Required |
| ------- | -------- |
| boolean | No       |

---

### dropdownStyle

style object for dropdown view

| Type   | Required |
| ------ | -------- |
| object | No       |

---

### dropdownOverlayColor

backdrop color when dropdown is opened

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### dropdownBackgroundColor

background color behind list items when dropdown is opened

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### rowStyle

style object for row

| Type   | Required |
| ------ | -------- |
| object | Yes      |

---

### rowTextStyle

style object for row text

| Type   | Required |
| ------ | -------- |
| object | No       |

---

### renderCustomizedRowChild

function recieves item and its index, this function should return React component as a child for customized row `rowStyle` should be used for parent row view style.

#### # check examples folder to make things clear

| Type     | Required |
| -------- | -------- |
| function | No       |

---

| Method            | Description                                                                                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `reset()`         | Remove selection & reset it to display `defaultButtonText` check https://github.com/AdelRedaa97/react-native-select-dropdown/pull/1#issuecomment-818307624. |
| `openDropdown()`  | Open the dropdown.                                                                                                                                          |
| `closeDropdown()` | Close the dropdown.                                                                                                                                         |

---

## License

[MIT](https://choosealicense.com/licenses/mit/)
