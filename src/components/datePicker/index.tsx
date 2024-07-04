import { View, Text, Button, Pressable } from 'react-native'
import React, { useState } from 'react'
import DatePicker from 'react-native-date-picker'
import { TextInput } from 'react-native-gesture-handler'
import Fontisto  from 'react-native-vector-icons/Fontisto'

interface Props {
    setNewDate:(value:any)=>void
}

export default function DatePickerComponent({setNewDate}:Props) {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    return (
        <View>
            <Pressable style={{justifyContent:'space-between',alignItems:'center', flexDirection:'row',paddingHorizontal:2}} onPress={()=>setOpen(true)}>
                <Fontisto name='date' size={30} />
            <Text>{date.toDateString()}</Text>
            </Pressable>
            <DatePicker
                modal
                open={open}
                mode='date'
                date={date}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                    setNewDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
        </View>
    )
}