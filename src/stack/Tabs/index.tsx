import {Appearance} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home';
import DrawerStack from '../Drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParams} from '../MainStack';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import Screen2 from '../../screens/screen2';
import CustomTabBar from './customTabBar';
import Profile from '../../screens/profile';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Forms from '../../screens/forms';
import Settings from '../../screens/settings';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
import Icon from 'react-native-vector-icons/AntDesign';

const Profiledrawer = () => {
  const {colors} = useTheme();

  return (
    <Drawer.Navigator
      screenOptions={({navigation}) => ({
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Entypo
              name="menu"
              size={25}
              color={colors.text}
              style={{marginLeft: 15}}
            />
          </TouchableOpacity>
        ),

        headerStyle: {backgroundColor: colors.background},

        drawerStyle: {
          backgroundColor: colors.background,
          elevation: 6,
          shadowColor: colors.text,
        },
        drawerStatusBarAnimation: 'fade',
      })}>
      <Drawer.Screen name="form" component={Forms} />
      <Drawer.Screen name="settings" component={Settings} />
    </Drawer.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="drawer"
        component={DrawerStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="profilepage"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="profile drawer"
        component={Profiledrawer}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};


// type NavigationProps = NativeStackScreenProps<RootStackParams, 'TabStack'>;

const Tab = createBottomTabNavigator<RootStackParams['TabStack']>();
const  TabStack:React.FC=() =>{
  const deviceTheme = Appearance.getColorScheme();
  const {t} = useTranslation();
  const {colors} = useTheme();
  
  return (
    <Tab.Navigator
      // tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.background,
          borderWidth: 2,
          elevation: 6,
          shadowColor: colors.text,
        },
        headerStyle: {backgroundColor: colors.background},
        headerShown: false,
        headerShadowVisible: false,
        tabBarHideOnKeyboard: true,
        tabBarBadgeStyle: {backgroundColor: 'red'},
      }}>
      <Tab.Screen 
      // name={t('home')} 
      name={"Home"} 

      component={Home}
      
      options={{
        tabBarIcon:({color,focused,size})=>{
          return(
            <Icon name={'home'} size={20} color={colors.text} />

          )
        }
      }}

      />
      <Tab.Screen
      //  name={t('tasks')} 
      name={"Tasks"} 

       component={HomeStack}
      
      options={{
        tabBarIcon:({color,focused,size})=>{
          return(
            <Icon name={'plus'} size={20} color={colors.text} />

          )
        }
      }}
      />
      <Tab.Screen
       name="TrackPlayer"
      //  name="Track Player"

        component={Screen2}
      
      options={{
        tabBarIcon:({color,focused,size})=>{
          return(
            <Icon name={'play'} size={20} color={colors.text} />

          )
        }
      }}
      />
      <Tab.Screen name="Profile" component={ProfileStack}
      
      options={{
        tabBarIcon:({color,focused,size})=>{
          return(
            <Icon name={'user'} size={20} color={colors.text} />

          )
        }
      }}
      />
    </Tab.Navigator>
  );
}

export default TabStack
