import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { fetchUser, selectUserName, selectUserFetchStatus } from './userSlice'
import { Button, View,Text } from 'react-native'

export default function ReduxTest() {
  const dispatch = useAppDispatch()
  const userName = useAppSelector(selectUserName)
  const userFetchStatus = useAppSelector(selectUserFetchStatus)

  return (
    <View>
      {/* Display the current user name */}
      <View>{userName}</View>
      {/* On button click, dispatch a thunk action to fetch a user */}
      <Button title='display' onPress={() => dispatch(fetchUser())}/>
      {/* At any point if we're fetching a user, display that on the UI */}
      {userFetchStatus === 'loading' && <Text>Fetching user...</Text>}
    </View>
  )
}