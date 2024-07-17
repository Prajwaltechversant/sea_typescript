import { Dimensions, Text, useWindowDimensions, View, Alert } from 'react-native'
import React from 'react'
import RenderHTML from 'react-native-render-html'
import { MomentZone } from 'moment-timezone';
export default function RenderhtmlPkg() {

  function onPress(event, href) {
    Alert.alert(`You just pressed ${href}`);
    console.log(event)
  }
  
  const source = {
    html: `<a
    href="https://developer.mozilla.org/"
    style="text-align:center;">
      A link to MDN!
  </a>`
  };
  
  const renderersProps = {
    a: {
      onPress: onPress
    }
  };

    const { width } = useWindowDimensions();

  return (
   <View>
      <RenderHTML
      contentWidth={width}
      source={source}
      renderersProps={renderersProps}
    />
   </View>
  )
}

