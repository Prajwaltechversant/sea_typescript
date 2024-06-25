import { Avatar, Button, Card, Text, } from 'react-native-paper';
import React from 'react'
import { Image, View } from 'react-native';

type UserData = {
    data: unknown
}

export default function UserCard({ data }: UserData) {

    return (
        <Card>
            <Card.Content>
                <View style={{ flexDirection: 'row', alignItems:'center' }}>
                    <Image width={50} height={50} source={{ uri: data.picture.thumbnail }} style={{ borderRadius: 50 }} />
                    <Text variant="titleLarge">{`${data.name.title}  ${data.name.first}  ${data.name.last}`}</Text>
                </View>
                {/* <Text></Text> */}
            </Card.Content>
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Actions>
                <Button>Cancel</Button>
                <Button>Ok</Button>
            </Card.Actions>
        </Card>
    )
}