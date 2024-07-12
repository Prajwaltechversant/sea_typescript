import { StyleSheet } from "react-native"

const styles = (screenContext, width, height, colors) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    downloadBtn: {
        width:width*0.3,
        backgroundColor:colors.primary,
        justifyContent:'center',
        alignItems:'center',
        height:height*0.1
    }
})

export default styles