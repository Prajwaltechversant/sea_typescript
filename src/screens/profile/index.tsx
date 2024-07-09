import {StyleSheet, Text, View, Image, StatusBar} from 'react-native';
import React from 'react';
import styles from './style';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {useScreenContext} from '../../context/ScreenContextProvider';
import {useTheme} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import PdfViewer from '../../components/pdfViewer';

export default function Profile({navigation}) {
  const {colors} = useTheme();
  const screenContext = useScreenContext();
  const isPortrait = screenContext.windowWidth < screenContext.windowHeight;
  const screenStyles = styles(
    screenContext,
    screenContext[
      screenContext.windowisPortrait ? 'windowWidth' : 'windowHeight'
    ],
    screenContext[
      screenContext.windowisPortrait ? 'windowHeight' : 'windowWidth'
    ],
    colors,
  );
  const data = useSelector(state => state.data);




  return (
    <View style={screenStyles.container}>
      <StatusBar backgroundColor={colors.primary} />
      <View style={screenStyles.profileContainer}>
        <Image
          source={{
            uri: data.profile ? data.profiile : 'https://th.bing.com/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgAAAA?rs=1&pid=ImgDetMain',
          }}
          alt="Profile Picture"
          style={screenStyles.profileImage}
        />
        <Text style={screenStyles.text}>
          {data.name ? data.name : 'name'}
        </Text>
      </View>

      <View style={screenStyles.contentContainer}>
        <View style={screenStyles.infoContainer}>
          <View style={screenStyles.infoBox}>
            <Entypo name="email" />
            <Text style={screenStyles.text}>
              {data.email ? data.email : 'email'}
            </Text>
          </View>
          <View style={screenStyles.infoBox}>
            <Entypo name="mobile" />
            <Text style={screenStyles.text}>
              {data.mobile ? data.mobile : 'mobile'}
            </Text>
          </View>
          <View style={screenStyles.infoBox}>
            <Entypo name="address" />
            <Text style={screenStyles.text}>
              {data.city ? data.state : 'city'}
            </Text>
          </View>
          <View style={screenStyles.infoBox}>
            <Entypo name="address" />
            <Text style={screenStyles.text}>
              {data.state ? data.state : 'state'}
            </Text>
          </View>
          <View style={screenStyles.infoBox}>
            <Entypo name="address" />
            <Text style={screenStyles.text}>
              {data.country ? data.country : 'country'}
            </Text>
          </View>
          <View style={screenStyles.infoBox}>
            <Entypo name="address" />
            <Text style={screenStyles.text}>
              {data.pincode ? data.pincode : 'pincode'}
            </Text>
          </View>
        </View>

        <View>
        <PdfViewer url={data.cv}  />
        </View>
        <View>
        <PdfViewer profile={data.profile}  />
        </View>
        <TouchableOpacity
          style={screenStyles.btn}
          onPress={() => navigation.navigate('profile drawer')}>
          <Text>Add Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
