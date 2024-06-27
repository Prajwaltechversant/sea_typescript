import { useTheme } from '@react-navigation/native';
import * as React from 'react';
import {
  Animated,
  Dimensions,
  Image,
  FlatList,
  Text,
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';
import styles from './style';
import axios from 'axios';
import { ActivityIndicator } from 'react-native-paper';
import { faker } from '@faker-js/faker';

export default function App() {

  const { width, height } = Dimensions.get('screen');
  const ITEM_WIDTH = width * 0.76;
  const ITEM_HEIGHT = ITEM_WIDTH * 1.47;
  const [allImage, setAllImages] = React.useState<any>([])
  const { colors } = useTheme()
  const style = styles(colors, width, height, ITEM_WIDTH, ITEM_HEIGHT)

  const scrollX = React.useRef(new Animated.Value(0)).current;


  const getData = async () => {
    try {
      const response = await axios.get('https://api.pexels.com/v1/curated?per_page=10', {
        headers: {
          Authorization: '7w5m55V3kEjfM539FbdiooTn5omqFe5TTI99Wauwysgz29Tmfr5Qors9',
        },
      });
      const { data } = response
      if (response.status === 200) {
        setAllImages(data.photos.map((photo: any) => photo.src.large));
      }
    }
    catch (err) {
      console.log(err)
    }
  }


  React.useEffect(() => {
    getData()
  }, [])


  const data = allImage.map((url: string, index: number) => ({
    key: String(index),
    photo: url,
    avatar_url: `https://randomuser.me/api/portraits/women/${Math.floor(
      Math.random() * 40
    )}.jpg`,
  }));


  return (
    <View style={style.container}>
      <StatusBar backgroundColor={colors.background} />
      <Animated.FlatList
        data={data}
        keyExtractor={item => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width
          ]
          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width * 0.7, 0, width * 0.7]
          })
          return (
            <View style={style.container}>
              <View style={style.mainWrapper}>
                <View
                  style={style.innerWrapper}
                >
                  <Animated.Image
                    source={{ uri: item.photo }}
                    style={{
                      width: ITEM_WIDTH,
                      height: ITEM_HEIGHT,
                      resizeMode: 'stretch',
                      transform:
                        [{
                          translateX
                        }
                        ]


                    }}
                  />
                  <Image
                    source={{ uri: item.avatar_url }}
                    style={style.profileContainer}
                  />
                </View>

              </View>
            </View>
          )
        }}

      />
    </View>
  )
}

