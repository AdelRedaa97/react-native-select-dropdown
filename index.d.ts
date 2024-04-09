import type * as React from 'react';
import {StyleProp, ViewStyle, TextStyle} from 'react-native';

declare module 'react-native-select-dropdown' {
  export type SelectDropdownProps = {
    /**
     * array of data that will be represented in dropdown, can be array of objects
     */
    data: Array<any>;
    /**
     * function recieves selected item and its index in data array
     */
    onSelect: (selectedItem: any, index: number) => void;
    /**
     * function returns React component for the dropdown button
     */
    renderButton: (selectedItem: any, isOpened: boolean) => React.ReactNode;
    /**
     * function returns React component for each dropdown item
     */
    renderItem: (selectedItem: any, index: number, isSelected: boolean) => React.ReactNode;
    /**
     * default selected item in dropdown
     */
    defaultValue?: any;
    /**
     * default selected item index
     */
    defaultValueByIndex?: number;
    /**
     * disable dropdown
     */
    disabled?: boolean;
    /**
     * array of disabled items index
     */
    disabledIndexes?: number[];
    /**
     * disable auto scroll to selected value
     */
    disableAutoScroll?: boolean;
    /**
     * dropdown menu testID
     */
    testID?: string;
    /**
     * function fires when dropdown is opened
     */
    onFocus?: () => void;
    /**
     * function fires when dropdown is closed
     */
    onBlur?: () => void;
    /**
     * function fires when dropdown reaches the end
     */
    onScrollEndReached?: () => void;
    /**
     * required to set true when statusbar is translucent (android only)
     */
    statusBarTranslucent?: boolean;
    /**
     * style object for dropdown view
     */
    dropdownStyle?: StyleProp<ViewStyle>;
    /**
     * backdrop color when dropdown is opened
     */
    dropdownOverlayColor?: string;
    /**
     * When true, shows a vertical scroll indicator in the dropdown.
     */
    showsVerticalScrollIndicator?: boolean;
    /**
     * enable search functionality
     */
    search?: boolean;
    /**
     * style object for search input
     */
    searchInputStyle?: StyleProp<ViewStyle>;
    /**
     * text color for search input
     */
    searchInputTxtColor?: string;
    /**
     * text style for search input
     */
    searchInputTxtStyle?: StyleProp<TextStyle>;
    /**
     * placeholder text for search input
     */
    searchPlaceHolder?: string;
    /**
     * text color for search input placeholder
     */
    searchPlaceHolderColor?: string;
    /**
     * function callback when the search input text changes, this will automatically disable the dropdown's internal search to be implemented manually outside the component
     */
    onChangeSearchInputText?: (searchText: string) => void;
    /**
     * function returns React component for search input icon
     */
    renderSearchInputLeftIcon?: (selectedItem: any, index: number) => React.ReactNode;
    /**
     * function returns React component for search input icon
     */
    renderSearchInputRightIcon?: (selectedItem: any, index: number) => React.ReactNode;
  };

  export default class SelectDropdown extends React.Component<SelectDropdownProps> {
    /**
     * Remove selection & reset it
     */
    reset(): void;
    /**
     * Open the dropdown.
     */
    openDropdown(): void;
    /**
     * Close the dropdown.
     */
    closeDropdown(): void;
    /**
     * Select index.
     */
    selectIndex(index: number): void;
  }
}
