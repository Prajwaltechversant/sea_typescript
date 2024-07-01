import { View, Text, StyleSheet, VirtualizedList, Dimensions, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import colorPalette from '../../assets/colorPalette/colorPalette';
import axios from 'axios';
import UserCard from '../../components/userCard';
import DropdownLn from '../../components/dropdownLn';
import { useTranslation } from 'react-i18next';
import Loader from '../../components/loader';
import { useTheme } from '@react-navigation/native';



type User = null | any
export default function Languages() {

    const [users, setUsers] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

    const {colors} = useTheme()
    const { t } = useTranslation() // localization
    // sample data from api
    const getData = async (page: number) => {
        try {
            const response = await axios.get(`https://randomuser.me/api/?page=${page}&results=5&seed=abc`)
            if (response.status === 200) {
                setUsers(response.data.results)
                setIsLoading(false)
                return response.data.results;
            } else {
                setIsLoading(true)
            }

        } catch (error) {
            console.log(error)
        }

    }



    // pagination
    const loadMore = async () => {
        try {
            const nextPage = currentPage + 1;
            const response = await getData(nextPage)
            setUsers([...users, response])
            setIsLoading(false)
            setCurrentPage(nextPage)


        } catch (err) {
            console.log(err)
        }
    }
    const getItem = (data: unknown[], index: number) => {
        return data[index]
    }
    const getItemCount = (data: any) => data.length

    useEffect(() => {
        getData(currentPage)
    }, [])



    return (
        <View style={[styles.container,]}>
            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 2 }} colors={[colors.background, colors.primary, colors.text]} style={styles.containerGradientContainer} >
                <View>
                    {isLoading ?
                        <Loader progress={0.5} />
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
                            onEndReached={loadMore}
                            onEndReachedThreshold={0.1}
                            ListFooterComponent={() => (
                                <ActivityIndicator color={'black'} size={'large'} />
                            )}
                        />
                    }
                </View>
                {/* <View>
                        <Loader progress={0.5} />
                    </View> */}
            </LinearGradient>
        </View>
    )
}

