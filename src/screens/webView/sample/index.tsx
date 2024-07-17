import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useRef, useState ,useTransition} from 'react'
import {WebView,} from 'react-native-webview'
// import {InferProps} from 'prop-types'
const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/echarts@5.5.1/dist/echarts.min.js"></script>
    <title>Sample webview inside react native app                                              </title>
    <script src="https://cdn.jsdelivr.net/npm/react-pdf@9.1.0/dist/cjs/index.min.js"></script>


</head>
<body >
    <h1 style="text-align: center;">react native echart</h1>
    <a href='https://google.com'>
    <h5 >click</h5>
    </a>

    <div id="chart" style="background-color: antiquewhite; width: 90vw; height: 70vh;">
        
    </div>
    
</body>
<script>
    const chart = echarts.init(document.getElementById('chart'));
    chart.setOption({
        tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      padAngle: 5,
      itemStyle: {
        borderRadius: 10
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
    })
    chart.on('click',function(params){
        window.ReactNativeWebView.postMessage(params.name)
    });
</script>
</html>`

const WebViews:React.FC=()=> {

  const [clickedItem, setClickedItem] = useState('')

  const webViewRef = useRef<WebView>(null)
  return (
    <View style={{flex:1, backgroundColor:'white'}}>
     <WebView
     ref={webViewRef}
     source={
      {
        html,
        // uri:'google.com'
       }
    }

     originWhitelist={['*']}

     onMessage={(e)=>{
      setClickedItem(e.nativeEvent.data)
     }}
pagingEnabled
/>
     <Text style={{color:'red',textAlign:'center', fontSize:20}}>{clickedItem}</Text>
     <TouchableOpacity>
     <Text style={{color:'red',textAlign:'center', fontSize:20}} onPress={()=>webViewRef.current?.goBack()}>Go back</Text>
     </TouchableOpacity>
     <TouchableOpacity>
     <Text style={{color:'red',textAlign:'center', fontSize:20}} onPress={()=>webViewRef.current?.goForward()}>Go Forward</Text>
     </TouchableOpacity>
     <TouchableOpacity>
     <Text style={{color:'red',textAlign:'center', fontSize:20}} onPress={()=>webViewRef.current?.reload()}>Reload</Text>
     </TouchableOpacity>
     <TouchableOpacity>
     <Text style={{color:'red',textAlign:'center', fontSize:20}} onPress={()=>webViewRef.current?.injectJavaScript('alert(document.title)')}>Alert title</Text>
     </TouchableOpacity>
    </View>
  )
}

export default WebViews