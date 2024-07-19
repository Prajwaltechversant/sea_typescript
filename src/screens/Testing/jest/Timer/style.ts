import { StyleSheet } from "react-native";

const styles = (screenContext, width, height, colors) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 9,
        justifyContent: 'center',
        alignItems: 'center',

    },
    headingText: {
        fontSize: 30,
        fontWeight: '800'
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 5,
        alignItems: 'center'
    },
    numPadContainer: {
        height: width*0.6,width:width*0.6,
        justifyContent:'center',alignContent:'center'
    },
    numPad: {
        borderWidth: 1, borderColor: 'red',
    },
    numKey: {
        width: 50,
        height: 50,
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center'
    },
    startIcon:{
        justifyContent:'center',
        alignItems:'center'
    }
})

export default styles