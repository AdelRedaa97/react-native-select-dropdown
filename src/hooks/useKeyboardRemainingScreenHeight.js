import {useEffect, useState} from 'react';
import {Keyboard, Dimensions} from 'react-native';
const {height} = Dimensions.get('window');

export const useKeyboardRemainingScreenHeight = () => {
  const [keyboardRemainingScreenHeight, setKeyboardRemainingScreenHeight] = useState(height);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardRemainingScreenHeight(height - e.endCoordinates.height);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardRemainingScreenHeight(height);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [setKeyboardRemainingScreenHeight]);

  return keyboardRemainingScreenHeight;
};
