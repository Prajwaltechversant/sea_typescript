import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import styles from './style'
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";
// import { LinearGradient, Stop } from 'react-native-svg';
import { ScrollView } from 'react-native';
// import preconnect from 'react-dom'

export default function SampleChart() {

    const data = [{ value: 19 }, { value: 40 }, { value: 26 }, { value: 40 }

        , { value: 20, color: '#ED6665', shiftX: -2, shiftY: -5 }

    ];
    const lineData = [{ value: 0 }, { value: 10 }, { value: 8 }, { value: 58 }, { value: 56 }, { value: 78 }, { value: 74 }, { value: 98 }];
    const lineData2 = [{ value: 0 }, { value: 50 }, { value: 18 }, { value: 40 }, { value: 6 }, { value: 60 }, { value: 54 }, { value: 85 }];


    const {width, height} = Dimensions.get('screen')
    
    const style = styles(width, height)

    return (
       <ScrollView>
         <View style={style.container}>
            <View style={style.subChart}>
                <Text style={style.subscriberHeading}>SubScriber Count</Text>
                <LineChart
                    areaChart
                    curved
                    data={lineData}
                    data2={lineData2}
                    // height={250}
                    showVerticalLines
                    animateOnDataChange
                    spacing={44}
                    initialSpacing={0}
                    color1="skyblue"
                    color2="orange"
                    textColor1="green"
                    hideDataPoints
                    dataPointsColor1="blue"
                    dataPointsColor2="red"
                    startFillColor1="skyblue"
                    startFillColor2="orange"
                    startOpacity={0.8}
                    endOpacity={0.3}
                    isAnimated
                    animationDuration={1200}
                    scrollEventThrottle={60}
                    adjustToWidth
                    focusEnabled
                    
            
                />
            </View>

            <View style={style.subChart}>
                {/* <Text style={styles.subscriberHeading}>SubScriber Count</Text> */}
                <PieChart

                    showText
                    textColor="black"
                    radius={150}
                    textSize={20}
                    focusOnPress
                    showValuesAsLabels
                    showTextBackground
                    textBackgroundRadius={26}
                    data={data}
                    isAnimated
                    animationDuration={3200}
                    
                />
            </View>



        </View>
       </ScrollView>
    )
}