import { StyleSheet } from "react-native";

const styles =(screencontext:any,width:number,height:number, colors:any)=> StyleSheet.create({
    wrapper:{
flex:1, alignItems:'center',
    },
    container:{
            flex:1,
            padding:width*0.01,
            width:height,alignItems:'center',justifyContent:'space-between',
    },
    languageSections:{


    },
    logoContainer:{
        marginVertical:width>=height ? 0 : width*0.05,
        alignItems:'center',
    },
    logoImage:{
        width:width*0.2,
        height:width*0.12,
        
    },
    formContainer:{
            flexDirection:'column',
            gap:height*0.01, width:'100%'
    },
    btn:{
        backgroundColor:'blue',
        height:height*0.12,
        borderRadius:10, justifyContent:'center', width:'100%'
    ,alignItems:'center'},
    btnText:{
        color:colors.text,fontSize:screencontext.windowFontScale*20
    },
    forgotBtn:{
        backgroundColor:'transparent'
    },
    createBtn:{
        borderWidth:1,
        backgroundColor:'white', position:width<height ? 'absolute' :'static',bottom:width<height ? 5 :0, width:'100%',height:height*0.12,
        borderRadius:10, justifyContent:'center',alignItems:'center',shadowColor:'white',shadowRadius: 30,
        shadowOpacity: 0.6,
        shadowOffset: {
            width: 0,
            height: 0
        },elevation:0.1,

    },createBtnText:{
        color:'black',fontSize:screencontext.windowFontScale*20

    }
})

export default styles