import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Dimensions, StatusBar, Animated, FlatList, Image, StyleSheet, useWindowDimensions } from 'react-native';
import axios from 'axios';
import styles from './style';
import { useOrientationChange } from 'react-native-orientation-locker';

const ParallaxScroll: React.FC = () => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));
    // const {width, height} = useWindowDimensions()
    const imageW = dimensions.width * 0.7;
    const imageH = dimensions.height * 1.54;
    const scrollX = useRef(new Animated.Value(0)).current;
    const style = styles(dimensions.width, dimensions.height, imageH, imageW);
    const [allImage, setAllImages] = useState<string[]>([]);

    const getData = async () => {
        try {
            const response = await axios.get('https://api.pexels.com/v1/search?query=city&orientation=portrait&size=small&per_page=20', {
                headers: {
                    Authorization: '7w5m55V3kEjfM539FbdiooTn5omqFe5TTI99Wauwysgz29Tmfr5Qors9',
                },
            });

            const { data } = response;
            if (response.status === 200) {
                setAllImages(data.photos.map((photo: any) => photo.src.large));
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    useOrientationChange((e)=>{
        const handleChange = ({ window }: { window: any }) => {
            setDimensions(window);
        };

     const subscription = Dimensions.addEventListener('change', handleChange);

        return () => {
            subscription.remove()
        };
    })

    return (
        <View style={style.container}>
            <StatusBar hidden />
            <View style={StyleSheet.absoluteFillObject}>
                {allImage.map((item: string, index: number) => {
                    const inputRange = [
                        (index - 1) * dimensions.width,
                        index * dimensions.width,
                        (index + 1) * dimensions.width,
                    ];
                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0, 1, 0],
                    });

                    return (
                        <Animated.Image
                            key={`image-${index}`}
                            source={{ uri: item }}
                            style={[
                                StyleSheet.absoluteFillObject,
                                { opacity },
                            ]}
                            blurRadius={10}
                        />
                    );
                })}
            </View>
            <Animated.FlatList
                data={allImage}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                pagingEnabled
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                renderItem={({ item }) => (
                    <View style={style.cardContainer}>
                        <Image
                            source={{ uri: item }}
                            style={style.cardImage}
                        />
                    </View>
                )}
            />
        </View>
    );
};

export default ParallaxScroll;
