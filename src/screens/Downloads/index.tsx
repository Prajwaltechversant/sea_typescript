import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import styles from './style'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { faker } from '@faker-js/faker'
import ProgressLoader from '../../components/progressLoader'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'

const Downloads: React.FC = () => {
    const { colors } = useTheme()
    const style = styles(colors)

    const [downLoadStatus, setDownLoadStatus] = useState<boolean>(false)
    const [files, setFiles] = useState<string[]>([])
    const [progress, setProgress] = useState<number>(0)
    const [downloadToggle, setDownLoadToggle] = useState(false)

    const opacity = useSharedValue(0)

    const array = useMemo(() => new Array(10).fill(null).map(() => faker.image.avatar()), [])

    const downloadItems = () => {
        setDownLoadToggle(true)
        array.forEach((item, index) => {
            setTimeout(() => {
                setFiles((prev: string[]) => [...prev, item]);
                setProgress((index + 1) / array.length);
            }, 1000 * (index + 1));
        });
    };

    useEffect(() => {
        if (files.length === array.length) {
            setDownLoadStatus(true)
            setDownLoadToggle(false)
        } else {
            setDownLoadStatus(false)
        }
    }, [files, array.length])

    const loadingAnimation = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });
    useEffect(() => {
        opacity.value = withRepeat(withTiming(0.4, {
            duration: 600
            , easing: Easing.linear
        }),
            -1,
            true)
    }, [])


    return (
        <View style={style.container}>
            <View style={style.actionContainer}>
                {!downloadToggle && !downLoadStatus ? (
                    <TouchableOpacity
                        style={[style.downloadBtnContainer, { backgroundColor: colors.primary }]}
                        onPress={()=>downloadItems()}
                    >
                        <Text style={style.btnText}>Download</Text>
                        <MaterialIcons name='download' size={20} color={colors.text} />
                    </TouchableOpacity>
                ) : downloadToggle && !downLoadStatus ? (
                    <Animated.View style={loadingAnimation}>
                        <TouchableOpacity
                            style={[style.downloadBtnContainer, { backgroundColor: 'blue' }]}
                            disabled
                        >
                            <Text style={style.btnText}>Downloading</Text>
                            <MaterialIcons name='downloading' size={20} color={colors.text} />
                        </TouchableOpacity>
                    </Animated.View>
                ) : (
                    <TouchableOpacity
                        style={[style.downloadBtnContainer, { backgroundColor: 'green' }]}
                        disabled
                    >
                        <Text style={style.btnText}>Completed</Text>
                        <MaterialIcons name='file-download-done' size={22} color={colors.text} />
                    </TouchableOpacity>
                )}
            </View>

            <View style={style.resultContainer}>
                <ProgressLoader progress={progress} />
            </View>

            <FlatList
                data={files}
                renderItem={({ item }) => (
                    <View style={{ width: 100, height: 100, backgroundColor: 'red', marginHorizontal: 20 }}>
                        <Image source={{ uri: item }} style={{ width: 100, height: 100 }} />
                    </View>
                )}
                pagingEnabled
                horizontal
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

export default React.memo(Downloads)
