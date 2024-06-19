import { View, Text } from 'react-native'
import React from 'react'
import styles from './style'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'



export default function Tools({ item, rotateImage, setRotate }: any) {



  return (
    <View style={styles.container}>
      {
        item.name === 'rotate' ? <FontAwesome6 name={item.icon} color={'black'} size={30} onPress={() => rotateImage()} />
          : item.name === 'rotateReset' ?
            <FontAwesome6 name={item.icon} color={'black'} size={30} onPress={() => setRotate(0)} />
            :
            <FontAwesome6 name={item.icon} color={'black'} size={30} />

      }

    </View>
  )
}