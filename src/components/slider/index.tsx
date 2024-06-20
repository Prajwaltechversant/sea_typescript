import { View, Text } from 'react-native'
import React, { useState } from 'react'

import Slider from '@react-native-assets/slider'


interface Props {
    blurValue:number;
    setBlurValue:(n:number)=>void;
    hideModal:any
}
export default function SliderComponent({ blurValue, setBlurValue,hideModal }:Props) {


    return (

        <View>
            <Slider
                value={blurValue}
                minimumValue={0}
                maximumValue={2}
                onValueChange={setBlurValue}
                step={0}
                // onPointerLeave={hideModal}
                onSlidingComplete={hideModal}

            />
        </View>
    )
}