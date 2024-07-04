import { StyleSheet } from "react-native";

const styles = (screenContext, width, height, colors,style) =>
    StyleSheet.create(
        {
            container: {
                justifyContent: 'center', alignItems: 'center',
                padding:screenContext.windowisPortrait ? height * 0.01 : height*0.01
            },
            inputContainer: {
                width: style ? screenContext.windowisPortrait ? width * 0.216 :width * 0.486 :screenContext.windowisPortrait ? width * 0.44 :width * 0.98,
                
                height: screenContext.windowisPortrait ? width * 0.05 : height*0.1,
            }
        }
    )

export default styles