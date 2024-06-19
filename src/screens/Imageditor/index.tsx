import { View, Text, Pressable, Dimensions, FlatList } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Gesture, GestureDetector, GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colorPalette from '../../assets/colorPalette/colorPalette';
import { Canvas, Group, Image, Mask, Path, Rect, SkImage, Skia, useCanvasRef } from "@shopify/react-native-skia";
import ImageCropPicker from 'react-native-image-crop-picker';
import { tools } from './tools';
import Tools from '../../components/edting tools';
import styles from './style';

export default function Editor() {
  const [image, setImage] = useState<SkImage | null>(null);
  const [rotate, setRotate] = useState(0);
  const { width, height } = Dimensions.get('screen');

  const getImageFromFile = async () => {
    try {
      const res: any = await ImageCropPicker.openPicker({ mediaType: 'photo', includeBase64: true });
      const data = Skia.Data.fromBase64(res.data);
      const skiaImage = Skia.Image.MakeImageFromEncoded(data);
      setImage(skiaImage);
    } catch (error) {
      console.error(error);
    }
  };

  const rotateImage = () => {
    setRotate(rotate + 90);

  };
  const [paths, setPaths] = useState<any>([]);

  const pan = Gesture.Pan()
    .onStart((g) => {
      console.log(g.x, g.y)
    })
    .onUpdate((g) => {
      const index = paths.length - 1;

    })
    .minDistance(1);


  console.log(rotate)

  const imageRef = useCanvasRef()
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={()=>{
        const imageValue=  imageRef.current?.makeImageSnapshot()
        console.log(imageValue?.encodeToBase64())
        }}>
          <MaterialIcons name='save' color={colorPalette.imageEdior.btnGray} size={40} />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        {!image && (
          <Pressable style={styles.pressableContainer} onPress={getImageFromFile}>
            <MaterialCommunityIcons name='plus-circle-outline' size={200} color={colorPalette.imageEdior.btnGray} />
            <Text style={styles.pressableText}>Tap anywhere to open a photo</Text>
          </Pressable>
        )}
        {image && (
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <GestureHandlerRootView>
              <GestureDetector gesture={pan}>
                <Canvas
                ref={imageRef}
                style={{ width: width - 40, height: width - 40 }}>
                  <Image
                  
                    origin={{ x: 0, y: 0 }}
                    x={0}
                    y={0}
                    image={image}
                    width={width - 40}
                    height={width - 40}
                    transform={[
                      { rotate: (rotate * Math.PI) / 180 }
                    ]}
                    fit={'cover'}

                    
                    
                  >
                  </Image>

                </Canvas>
              </GestureDetector>

            </GestureHandlerRootView>

          </View>
        )}
      </View>
      {image && (
        <View style={styles.footerContainer}>
          <FlatList
            data={tools}
            renderItem={({ item }) => <Tools item={item} rotateImage={rotateImage} setRotate={setRotate} />}
            horizontal={true}
          />
        </View>
      )}
    </View>
  );
}


