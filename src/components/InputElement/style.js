import { StyleSheet } from "react-native";

const styles = (screenContext, width, height, colors,style) =>
    StyleSheet.create(
        {
            container: {
                justifyContent: 'center', alignItems: 'center',
                padding:screenContext.windowisPortrait ? height * 0.01 : height*0.01
            },
            inputContainer: {
                width: style ? screenContext.windowisPortrait ? width * 0.216 :width * 0.486 :screenContext.windowisPortrait ? width * 0.44 :width * 0.44,
                
                height:  width * 0.05,
                marginVertical:10
            }
        }
    )

export default styles