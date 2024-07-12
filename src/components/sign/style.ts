import { StyleSheet } from "react-native";



const styles =(screenContext:any, width:number, height:number, colors:any)=> StyleSheet.create({

    container:{
        justifyContent:'center',alignItems:'center',
    }, 
    openBtn:{
        justifyContent:'space-between',
        flexDirection:'row',alignItems:'center',      marginHorizontal: screenContext.windowisPortrait ? height * 0.05 : height * 0.01,
        marginVertical: screenContext.windowisPortrait ? height * 0.02 : height * 0.01,
    },
    signContainer:{

     backgroundColor:'white',padding:5
    },
    canvas:{
        width:screenContext.windowisPortrait ? width*0.42 : width*0.5,height:screenContext.windowisPortrait ? height*0.8:height*0.5, backgroundColor:'white',borderWidth:1

    },
    saveBtn:{ alignItems: 'center', justifyContent:'center', flexDirection:'row', backgroundColor:colors.btnGray}
})

export default styles;