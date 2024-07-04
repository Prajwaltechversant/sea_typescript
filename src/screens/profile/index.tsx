import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import styles from './style'
import { TouchableOpacity } from 'react-native'

export default function Profile({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>

      <View style={styles.contentContainer}>
        <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('profile drawer')}>
          <Text>Profile Settings</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  )
}

