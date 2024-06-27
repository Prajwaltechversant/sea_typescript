
import { View, Text, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native'
import { WebView } from 'react-native-webview';
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../../stack/MainStack';




type Props = NativeStackScreenProps<RootStackParams, 'ResultView'>
const ResultView = ({ route, navigation, }: Props) => {
    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: route.params.url }}
                style={{ flex: 1 }}
                onLoadStart={() => console.log('started')}
                onLoadEnd={() => console.log('completed')
                }
                startInLoadingState
                renderLoading={() => (
                    <View style={{ flex: 1, backgroundColor: 'white' }}>
                        <ActivityIndicator size={'large'} color={'black'} />
                        <Text style={{ textAlign: 'center', color: 'black' }}>Loading...</Text>
                    </View>
                )}

            />
            <StatusBar barStyle={'light-content'} backgroundColor={'black'} />
        </View>
    )
}

export default ResultView