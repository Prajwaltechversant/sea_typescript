import { Avatar, Button, Card, Text, } from 'react-native-paper';
import React from 'react'
import { Image, View } from 'react-native';
import { useTranslation } from 'react-i18next';

type UserData = {
    data: {
        picture: {
            thumbnail?: string;
            large?: string;
        };
        name?: {
            title?: string;
            first?: string;
            last?: string;
        };
    }}

export default function UserCard({ data }: UserData) {

    const {t} = useTranslation()
    console.log(data.name)

    const imageUrl = data.picture?.thumbnail || data.picture?.large || 'https://picsum.photos/700'
    const name =`${data?.name?.title || ''} ${data?.name?.first || ''} ${data?.name?.last || ''}`;


    return (
        <Card>
            <Card.Content>
                <View style={{ flexDirection: 'row', alignItems:'center' }}>
                    <Image width={50} height={50} source={{ uri:imageUrl}} style={{ borderRadius: 50 }} />
                    <Text variant="titleLarge">{name}</Text>
                </View>
                {/* <Text></Text> */}
            </Card.Content>
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Actions>
                <Button>{t('cancel')}</Button>
                <Button>{t('ok')}</Button>
            </Card.Actions>
        </Card>
    )
}