import {Dimensions, FlatList, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import thunkAcion from '../../redux/actions/listdataAction/thunkAction';
import Animated, {
  Keyframe,
  BounceOut,
  FadingTransition,
} from 'react-native-reanimated';
import {ActivityIndicator} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';
import {useScreenContext} from '../../context/ScreenContextProvider';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';

interface Props {}

const Users: React.FC<Props> = () => {
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const screenContext = useScreenContext();
  useEffect(() => {
    dispatch(thunkAcion());
  }, []);

  // const data = useSelector(state => state.fetchData.data.quotes);
  const data = useAppSelector(state => state.fetchData.data.quotes);

  const keyframe = new Keyframe({
    from: {
      transform: [{rotate: '0deg'}],
    },
    to: {
      transform: [{rotate: '180deg'}],
    },
  });

  return (
    <View style={{alignItems: 'center', flex: 1}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshing
        ListEmptyComponent={<ActivityIndicator color="red" />}
        data={data}
        initialNumToRender={3}
        renderItem={({item, index}) => (
          <Animated.View
            style={{
              backgroundColor: '#53B0AE',
              elevation: 10,
              width: Dimensions.get('screen').width * 0.9,
              height: 100,
              borderRadius: 10,
              marginVertical: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            layout={FadingTransition.duration(1000)}
            // entering={keyframe}
            exiting={BounceOut}>
            <Text style={{textAlign: 'center'}}>{item.quote}</Text>
          </Animated.View>
        )}
      />
      {/* <Animated.View
                entering={keyframe.duration(10000)}
                style={{ width: 150, height: 150, backgroundColor: 'green' }}
            /> */}
    </View>
  );
};

export default Users;
