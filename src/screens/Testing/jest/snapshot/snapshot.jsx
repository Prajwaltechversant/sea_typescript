import { View, Text } from 'react-native'
import React from 'react'
import axios from 'axios'


// export const sampleFunction = (n) => {
//   return n*2;
// }

export const dummyAPIFn = async () => {
  const data = await axios.get('https://jsonplaceholder.typicode.com/posts')
  return data.data
}

const Snapshot = () => {

  const sampleFunction = (n) => {
    return n * 2;
  }

  return (
    <View>
      <Text onPress={sampleFunction}>snapshot</Text>
      <Text>snapshot</Text>

      <Text>snapshot</Text>
      <Text>snapshot</Text>

      <Text>snapshot</Text>

    </View>
  )
}

export default Snapshot;