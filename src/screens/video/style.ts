import { StyleSheet } from "react-native"

const styles = (screenContext: any, width: number, height: number, colors: any) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
       
    },
    backgroundVideo: {
        width: screenContext.windowisPortrait ? width * 0.5 : width,
        height: width,
  
    },

    controlStyles:{
        marginBottom:20
    }
})

export default styles