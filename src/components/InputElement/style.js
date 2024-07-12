import { StyleSheet } from "react-native";

const styles = (screenContext, width, height, colors,style) =>
    StyleSheet.create(
        {
            container: {
                justifyContent: 'center', alignItems: 'center',
                padding:screenContext.windowisPortrait ? height * 0.01 : height*0.01,
                justifyContent:'center'

            },
            inputContainer: {
                width: style ? screenContext.windowisPortrait ? width * 0.216 :width * 0.486 :screenContext.windowisPortrait ? width * 0.44 :width * 0.44,
                
                height:  width * 0.05,
                marginVertical:10,
                justifyContent:'center',
            },signview: {
                flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 10,  width: width * 0.3
            },
        }
    )

export default styles