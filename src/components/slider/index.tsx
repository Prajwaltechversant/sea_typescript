import { View, Text } from 'react-native'
import React, { useState } from 'react'

import Slider from '@react-native-assets/slider'


interface Props {
    blurValue?: number;
    setBlurValue?: (n: number) => void;
    hideModal?: any;
    progress?: number;
    duration?: number;
}
export default function SliderComponent({ blurValue, setBlurValue, hideModal, progress, duration }: Props) {
    // console.log(progress)


    const durationMinutes = duration / 60
    console.log(duration?.toFixed(2))

    return (

        <View>
            <Slider
                value={progress !== undefined ? progress : blurValue}
                minimumValue={0}
                maximumValue={progress !== undefined ? duration : 2}
                onValueChange={setBlurValue}
                // step={10}
                // onPointerLeave={hideModal}
                onSlidingComplete={hideModal}

            />
            {(progress !== undefined && duration) ?
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>{Math.round(progress)}</Text>
                    <Text>{(duration/60).toFixed(2)}</Text>

                </View>
                :

                <>
                    <Text>No data</Text>
                </>
            }



        </View>
    )
}