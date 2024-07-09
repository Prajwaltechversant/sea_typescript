import React, {useRef, useState} from 'react';
import {View, TouchableOpacity, Text, ToastAndroid} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Modal, Portal} from 'react-native-paper';
import {
  Canvas,
  Group,
  Path,
  Skia,
  SkPath,
  useCanvasRef,
  useTouchHandler,
} from '@shopify/react-native-skia';
import styles from './style';
import {useScreenContext} from '../../context/ScreenContextProvider';
import {useTheme} from '@react-navigation/native';
import RNFS from 'react-native-fs';
import {Form} from '../../screens/forms';

type Props = {
  setFormData: (value: any) => void;
  formData: Form;
};
export default function AddSign({setFormData, formData}: Props) {
  const [visible, setVisible] = useState(false);
  const pathRef = useRef<SkPath | null>(Skia.Path.Make());
  const [path, setPath] = useState(Skia.Path.Make());

  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
    pathRef.current = Skia.Path.Make();
  };

  const reset = () => {
    pathRef.current?.reset();
  };

  const canvasRef = useCanvasRef();

  const {colors} = useTheme();
  const screenContext = useScreenContext();

  const isPortrait = screenContext.windowWidth > screenContext.windowHeight;
  const screenStyles = styles(
    screenContext,
    screenContext[isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[isPortrait ? 'windowHeight' : 'windowWidth'],
    colors,
  );
  const touch = useTouchHandler({
    onStart(touchInfo) {
      const {x, y} = touchInfo;

      pathRef.current?.moveTo(x, y);
    },
    onActive(touchInfo) {
      const {x, y} = touchInfo;
      pathRef.current?.lineTo(x, y);
    },
    onEnd(touchInfo) {},
  });

  const saveSign = async () => {
    if (pathRef.current) {
      const res = canvasRef.current?.makeImageSnapshot().encodeToBase64() as string
      const date = new Date();
      const fileName = `${date.getTime()}_sample.jpeg`;
      try {
        const path = `${RNFS.PicturesDirectoryPath}/${fileName}`;
        await RNFS.writeFile(path, res, 'base64');
        setFormData({...formData, signature: path});
        hideModal();
      } catch (error) {
        console.log(error, 'failed');
      }
    }
    else{
        ToastAndroid.showWithGravity("Please Sign",100,3)
    }
  };

  return (
    <View>
      <TouchableOpacity style={screenStyles.openBtn} onPress={showModal}>
        <Text>Add Signature</Text>
        <FontAwesome5 name="signature" size={30} />
      </TouchableOpacity>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          style={screenStyles.container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: colors.primary,
              padding: 5,
            }}>
            <TouchableOpacity
              onPress={reset}
              style={{backgroundColor: 'transparent'}}>
              <FontAwesome5 name="trash" color={colors.text} size={30} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={hideModal}
              style={{backgroundColor: 'transparent'}}>
              <FontAwesome5 name="window-close" color={colors.text} size={30} />
            </TouchableOpacity>
          </View>
          <View style={screenStyles.canvas}>
            {/* <GestureHandlerRootView>
              <GestureDetector gesture={pan}> */}
            <Canvas style={screenStyles.canvas} onTouch={touch} ref={canvasRef}>
              <Group>
                {pathRef.current && (
                  <Path
                    path={pathRef.current}
                    color="lightblue"
                    style={'stroke'}
                    strokeWidth={2}
                  />
                )}
              </Group>
            </Canvas>
            {/* </GestureDetector>
            </GestureHandlerRootView> */}
          </View>
          <TouchableOpacity style={screenStyles.saveBtn} onPress={saveSign}>
            <Text
              style={{color: colors.text, fontSize: 20, marginHorizontal: 10}}>
              Save
            </Text>
            <FontAwesome5 name="save" color={'white'} size={20} />
          </TouchableOpacity>
        </Modal>
      </Portal>
    </View>
  );
}
