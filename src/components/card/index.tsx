// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Dimensions, Text } from "react-native";
// import Animated, { Extrapolate, Extrapolation, interpolate, useAnimatedStyle } from "react-native-reanimated";

// const colors = ["#fda282", "#fdba4e", "#800015"];
// const PAGE_WIDTH = Dimensions.get("window").width;
// const PAGE_HEIGHT = PAGE_WIDTH * 1.2;

// type Props = {
//     index: number;
//     animationValue: any;
// }

// const SampleCard: React.FC<Props> = ({ index, animationValue }) => {
//     const WIDTH = PAGE_WIDTH / 1.5;
//     const HEIGHT = PAGE_HEIGHT / 1.5;
//     const [images, setImages] = useState<string[]>([]);

//     useEffect(() => {
//         const getData = async () => {
//             try {
//                 const response = await axios.get('https://api.pexels.com/v1/popular?per_page=5', {
//                     headers: {
//                         Authorization: 'YOUR_PEXELS_API_KEY',
//                     },
//                 });

//                 if (response.status === 200) {
//                     setImages(response.data.photos.map((photo: any) => photo.src.medium));
//                 }
//             } catch (err) {
//                 console.error(err);
//             }
//         };

//         getData();
//     }, []);

//     const cardStyle = useAnimatedStyle(() => {
//         const scale = interpolate(
//             animationValue.value,
//             [-0.1, 0, 1],
//             [0.95, 1, 1],
//             Extrapolation.CLAMP,
//         );

//         const translateX = interpolate(
//             animationValue.value,
//             [-1, -0.2, 0, 1],
//             [0, WIDTH * 0.3, 0, 0],
//         );

//         const transform = {
//             transform: [
//                 { scale },
//                 { translateX },
//                 { perspective: 200 },
//                 {
//                     rotateY: `${interpolate(
//                         animationValue.value,
//                         [-1, 0, 0.4, 1],
//                         [30, 0, -25, -25],
//                         Extrapolate.CLAMP,
//                     )}deg`,
//                 },
//             ],
//         };

//         return {
//             ...transform,
//             anchorX: 0.5 * WIDTH,
//             anchorY: 0.5 * HEIGHT,
//         };
//     }, [index]);

//     const blockStyle = useAnimatedStyle(() => {
//         const translateX = interpolate(
//             animationValue.value,
//             [-1, 0, 1],
//             [0, 60, 60],
//         );

//         const translateY = interpolate(
//             animationValue.value,
//             [-1, 0, 1],
//             [0, -40, -40],
//         );

//         const rotateZ = interpolate(
//             animationValue.value,
//             [-1, 0, 1],
//             [0, 0, -25],
//         );

//         return {
//             transform: [
//                 { translateX },
//                 { translateY },
//                 { rotateZ: `${rotateZ}deg` },
//             ],
//         };
//     }, [index]);

//     return (
//         <Animated.View
//             style={{
//                 flex: 1,
//                 justifyContent: "center",
//                 alignItems: "center",
//             }}
//         >
//             <Animated.View
//                 style={[
//                     {
//                         // backgroundColor: colors[index],
//                         alignSelf: "center",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         borderRadius: 20,
//                         width: WIDTH,
//                         height: HEIGHT,
//                         shadowColor: "#000",
//                         shadowOffset: {
//                             width: 0,
//                             height: 8,
//                         },
//                         shadowOpacity: 0.44,
//                         shadowRadius: 10.32,
//                         elevation: 16,
//                     },
//                     cardStyle,
//                 ]}
//             />

//             {images.length > 0 ? (
//                 <Animated.Image
//                     source={{ uri: images[index % images.length] }}
//                     style={[
//                         {
//                             width: WIDTH * 0.8,
//                             borderRadius: 16,
//                             justifyContent: "center",
//                             alignItems: "center",
//                             position: "absolute",
//                             zIndex: 999,
//                         },
//                         blockStyle,
//                     ]}
//                     resizeMode={"contain"}
//                 />
//             )
//         :
//         <Text>No data</Text>
//         }
//         </Animated.View>
//     );
// };

// export default SampleCard;




import React from 'react';
import {useSharedValue} from 'react-native-reanimated';
import CardS from './Card';

const CardContainer = ({data, maxVisibleItems}) => {
  const animatedValue = useSharedValue(0);
  const currentIndex = useSharedValue(0);
  const prevIndex = useSharedValue(0);
  return (
    <>
      {data.map((item, index) => {
        return (
          <CardS
            maxVisibleItems={maxVisibleItems}
            item={item}
            index={index}
            dataLength={data.length}
            animatedValue={animatedValue}
            currentIndex={currentIndex}
            prevIndex={prevIndex}
            key={index}
          />
        );
      })}
    </>
  );
};

export default CardContainer;