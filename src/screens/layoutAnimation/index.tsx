import { View, Text, FlatList, Dimensions, Platform, UIManager, LayoutAnimation } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useScreenContext } from '../../context/ScreenContextProvider'
import { useTheme } from '@react-navigation/native'
import styles from './styles'
import { List } from 'react-native-paper';
import { da, faker } from '@faker-js/faker'
import { screenWidth } from 'react-native-gifted-charts/src/utils'
import Animated from 'react-native-reanimated'
import * as Animatable from 'react-native-animatable'
import { useOrientationChange } from 'react-native-orientation-locker'

const { width } = Dimensions.get('screen')

const LayoutAnimations: React.FC = () => {
    const { colors } = useTheme()
    const [expanded, setExpanded] = React.useState(false);


    const handlePress = () => {
        setExpanded(!expanded)
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    };
    const [data, setData] = useState<string[]>([])


    useEffect(() => {
        for (let i = 0; i <= 20; i++) {
            setData((prev: string[]) => [...prev, `${i}-sample`]);
        }
    }, [])

    const screenContext = useScreenContext()

    const screenStyles = styles(screenContext, width,
        // screenContext[screenContext.windowisPortrait ? 'windoWidth' : 'windoHeight'],
        screenContext[screenContext.windowisPortrait ? 'windowHeight' : 'windowWidth'], colors
    )


    useOrientationChange((o)=>{
        LayoutAnimation.configureNext({
            duration: 500,
            create: {type: 'linear', property: 'scaleXY'},
            update: {type: 'spring', springDamping:90},
            delete: {type: 'linear', property: 'opacity'},
          });    })


    return (
        <View style={screenStyles.container}>
            <Animatable.Text style={screenStyles.headingText} animation={'slideInUp'}>Sample Lists</Animatable.Text>
            <>
                <List.Section style={screenStyles.listContainer}>

                    <List.Accordion
                        style={screenStyles.dropDownContainer}
                        title="Out"
                        left={props => <List.Icon {...props} icon="folder" />}
                        expanded={expanded}
                        onPress={handlePress}>
                        <FlatList
                            data={data}
                            renderItem={({ item ,}) => <List.Item  title={item} onPress={()=>setExpanded(!expanded)}  />}
                            initialNumToRender={10}
                        />
                    </List.Accordion>
                </List.Section>
            </>
        </View>
    )
}

export default LayoutAnimations