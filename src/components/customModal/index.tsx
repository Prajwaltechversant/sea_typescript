import {View} from 'react-native';
import React from 'react';
import {Modal, Portal, Text, Button, PaperProvider} from 'react-native-paper';

const CustomModal = () => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20,width:200, };
  return (
    <PaperProvider>
      <Portal>
        <View style={{justifyContent:'center', alignItems:'center',}}>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        </Modal>
        </View>
      </Portal>
      <Button style={{marginTop: 30}} onPress={showModal}>
        Show
      </Button>
    </PaperProvider>
  );
};

export default CustomModal;
