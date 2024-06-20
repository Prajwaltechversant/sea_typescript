import { View, Text } from 'react-native'
import React, { useState } from 'react'
import styles from './style'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { Slider } from '@rneui/themed';
import { Button, Modal, PaperProvider, Portal } from 'react-native-paper'



interface Props {
  item: any;
  rotateImage: () => void;
  setRotate: (rotate: number) => void;
  setBlurValue: (blur: number) => void;
  showModal:()=>void
  hideModal:()=>void
  setDraw:(t:Boolean)=>void
  draw:Boolean
}

export default function Tools({ item, rotateImage, setRotate, setBlurValue, showModal, hideModal,setDraw ,draw}: Props) {

  const [value, setValue] = useState(0)
  const [slider, setSlider] = useState(false)




  return (
    <View style={styles.container}>
      {
        item.name === 'rotate' ? <FontAwesome6 name={item.icon} color={'black'} size={30} onPress={() => rotateImage()} />
          : item.name === 'rotateReset' ?
            <FontAwesome6 name={item.icon} color={'black'} size={30} onPress={() => setRotate(0)} />
            : item.name === 'blur' ?
              <>
                <FontAwesome6 name={item.icon} color={'black'} size={30}  onPress={showModal} />
     
              </>
              :
              <FontAwesome6 name={item.icon} color={'black'} size={30} onPress={()=>setDraw(!draw)}  />

      }

    </View>
  )
}