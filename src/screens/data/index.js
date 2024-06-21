import { View, Text } from 'react-native'
import React, { useRef } from 'react'
import Slider from '@react-native-assets/slider'
import SliderComponent from '../../components/slider'

export default function Data() {

  const ref = useRef(null)
  console.log(ref.current)
  return (
    <View>
      <Slider
        value={10}
        minimumValue={1}
        maximumValue={10}
        ref={ref}
        // onValueChange={()=>console.log(ref.current)}

      />
      <SliderComponent />
    </View>
  )
}