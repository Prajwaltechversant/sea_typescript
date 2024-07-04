import { StyleSheet } from "react-native";

const styles = (screenContext, width, height, colors) =>
    StyleSheet.create(
        {
            container: {
                flex: 1
            },
            addBtnContainer:{
                justifyContent:'center',alignItems:'center'

            },
            addbtn:{
                backgroundColor:colors.btnGray,
                justifyContent:'center',alignItems:'center',
                width:screenContext.windowisPortrait ? width *0.2 : 0.2,
                height:screenContext.windowisPortrait ? width *0.05 : 0.2,
                borderRadius:screenContext.windowisPortrait ? width *0.01 : 0.2
            },
            contentContainer:{
                justifyContent:'center',alignItems:'center'
                
            },
            inputContainer: {
                width:  screenContext.windowisPortrait ? width * 0.44 :width * 0.98,
                height: screenContext.windowisPortrait ? width * 0.05 : height*0.1,
                marginVertical:screenContext.windowisPortrait ? width * 0.01 : width * 0.01
            }
        }
    )

export default styles