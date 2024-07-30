import {Image, View, Text} from 'react-native';
import React, {useRef} from 'react';

import Onboarding from 'react-native-onboarding-swiper';
import {Button} from 'react-native-paper';

const OnBoardUser = () => {
  const onBoardRef = useRef<Onboarding>(null);
  return (
    <Onboarding
      // titleStyles={{color: 'blue'}}
      ref={onBoardRef}
      SkipButtonComponent={() => (
        <Button onPress={() => onBoardRef.current?.goToPage(4, true)}>
          Skip
        </Button>
      )}
      pages={[
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={require('../../assets/images/bg.jpg')}
              style={{width: 300, height: 300}}
            />
          ),
          title: 'Lorem',
          subtitle:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit minus tenetur illo tempore',
          titleStyles: {color: 'red'},
        },
        {
          backgroundColor: '#b0f5cd',
          image: (
            <Image
              source={require('../../assets/images/bg2.jpg')}
              style={{width: 300, height: 300}}
            />
          ),
          title: 'Lorem',
          subtitle:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit minus tenetur illo tempore ',
        },
        {
          backgroundColor: '#365257',
          image: (
            <Image
              source={require('../../assets/images/bg3.jpg')}
              style={{width: 300, height: 300}}
            />
          ),
          title: 'Lorem..',
          subtitle:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit minus tenetur illo tempore',
        },
        {
          backgroundColor: '#ed6dab',
          image: (
            <Image
              source={require('../../assets/images/bg2.jpg')}
              style={{width: 300, height: 300}}
            />
          ),
          title: 'Lorem',
          subtitle:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit minus tenetur illo tempore ',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={require('../../assets/images/bg.jpg')}
              style={{width: 300, height: 300}}
            />
          ),
          title: 'Lorem',
          subtitle:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit minus tenetur illo tempore',
          titleStyles: {color: 'red'},
        },
      ]}
    />
  );
};

export default OnBoardUser;
