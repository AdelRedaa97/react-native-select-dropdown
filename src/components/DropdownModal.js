import React from 'react';
import {Modal} from 'react-native';

const DropdownModal = ({visible, statusBarTranslucent, children}) => {
  const defaults = {
    statusBarTranslucent: statusBarTranslucent || false,
  };
  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      animationType="none"
      transparent={true}
      statusBarTranslucent={defaults.statusBarTranslucent}
      visible={visible}>
      {children}
    </Modal>
  );
};

export default DropdownModal;
