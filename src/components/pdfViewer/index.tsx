import React from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {Modal, Portal, Text, Button} from 'react-native-paper';
import Pdf from 'react-native-pdf';
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from './style';
import { useTheme } from '@react-navigation/native';
type Props = {
  url: string;
};

export default function PdfViewer({url}: Props) {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const {colors} = useTheme()

  const containerStyle = {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
  };

  const source = {
    uri: url, 
    cache: true,
  };

  return (
    <>
      <Button
        style={{marginTop: 30, backgroundColor: colors.btnGray, height: 50,borderRadius:10, justifyContent:'center'}}
        onPress={showModal}>
        View PDF
      </Button>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          {/* <Button
            style={{marginTop: 30, backgroundColor: 'yellow', height: 50}}
            onPress={hideModal}>
            Show PDF
          </Button> */}
          <TouchableOpacity style={styles.backBtn} onPress={hideModal}>
            <Ionicons  name='arrow-back-circle-outline' size={40} color={'black'} />
          </TouchableOpacity>
          <Pdf
            style={{
              flex: 1,
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
            }}
            source={source}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
              console.log(`File path: ${filePath}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={error => {
              console.log(`Error while loading PDF: ${error}`);
            }}
            onPressLink={uri => {
              console.log(`Link pressed: ${uri}`);
            }}
   
          />
        </Modal>
      </Portal>
    </>
  );
}
