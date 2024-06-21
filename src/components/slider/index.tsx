import { View, Text } from 'react-native'
import React, { useState } from 'react'

import Slider from '@react-native-assets/slider'


interface Props {
    blurValue?: number;
    setBlurValue?: (n: number) => void;
    hideModal?: any;
    textPosition?: any;
    setTextPosition?: (value: { x: number, y: number }) => void
}
export default function SliderComponent({ blurValue, setBlurValue, hideModal, textPosition, setTextPosition }: Props) {

    return (

        <View>
            {!textPosition ? <Slider
                value={blurValue}
                minimumValue={0}
                maximumValue={2}
                onValueChange={setBlurValue}
                step={0}
                onSlidingComplete={hideModal}

            />
                :
                <>
                  <View style={{backgroundColor:'yellow'}}>
                  <Slider
                        value={blurValue}
                        minimumValue={0}
                        maximumValue={2}
                        onValueChange={setBlurValue}
                        step={0}
                        onSlidingComplete={hideModal}

                    />
                    <Slider
                        value={blurValue}
                        minimumValue={0}
                        maximumValue={2}
                        onValueChange={()=>console.log('ekjfdjoeguiegdeiogyud')}
                        step={0}
                        onSlidingComplete={hideModal}

                    />
                  </View>
                </>
            }
        </View>
    )
}