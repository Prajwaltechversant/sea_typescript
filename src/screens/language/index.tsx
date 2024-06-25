import { View, Text, StyleSheet, VirtualizedList } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import colorPalette from '../../assets/colorPalette/colorPalette';
import axios from 'axios';
import UserCard from '../../components/userCard';
import DropdownLn from '../../components/dropdownLn';



type User = null | any
export default function Languages() {

    const [users, setUsers] = useState(null)
    const [isLoading, setIsLoading] = useState(true)


    const getData = async () => {
        try {
            const response = await axios.get('https://randomuser.me/api/?results=10')

            if (response.status === 200) {
                // console.log(response.data.results)
                setUsers(response.data.results)
                setIsLoading(false)
            } else {
                console.log(`${response.status} : ${response.statusText}`)
                setIsLoading(true)
            }

        } catch (error) {
            console.log(error)
        }

    }

    const getItem = (data: unknown[], index: number) => {
        return data[index]

    }
    const getItemCount = (data) => data.length

    useEffect(() => {
        getData()
    }, [])
    return (
        <>

            <View style={styles.container}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 2 }} colors={[colorPalette.light.backgroud, colorPalette.light.secondary, colorPalette.light.tertiary]} style={styles.containerGradientContainer} >
                    <View>

                        {isLoading ?

                            <Text>Loading...</Text>

                            :
                            <VirtualizedList
                                data={users}
                                renderItem={({ item }) => <UserCard data={item} />}
                                // keyExtractor={(item: any) => item.id.value}
                                getItem={getItem}
                                getItemCount={getItemCount}
                                keyExtractor={item => Math.random().toString(36).substring(2)}
                                initialNumToRender={5}
                                maxToRenderPerBatch={5}

                            />
                        }

                    </View>
                </LinearGradient>
            </View>
        </>
    )
}

