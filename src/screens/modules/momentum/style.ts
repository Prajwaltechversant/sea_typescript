import { StyleSheet } from "react-native";

const styles =(screenContext,width, height, colors)=> StyleSheet.create({
    container: {
        flex: 1,
        marginTop:30,
        justifyContent:'center',
        alignItems:'center'
    },
    clockView:{


        width:width*0.5,
        height:height*0.2,
        alignItems:'center',
        justifyContent:'center'
    },
    timeView:{
        borderColor:colors.text,
        borderWidth:1,
        borderRadius:5,
        width:width*0.7,
        justifyContent:'center',
        alignItems:'center',
        height:width*0.2
    }
})


export default styles