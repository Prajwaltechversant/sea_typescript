import { StyleSheet } from "react-native";

const styles =(width, height)=>
     StyleSheet.create({
    container:{
        flex:1,
        padding:10
    }
    ,  
    subChart:{
            backgroundColor:'white',
            // flex:1,
            borderRadius:15,
            height:'auto',
            shadowColor: "#000",
            marginVertical:10,
            // shadowOffset: {
            //     width: 0,
            //     height: 1,
            // },
            // shadowOpacity: 0.44,
            // shadowRadius: 2.22,
            
            elevation: 6,        
            width : '100%'
    },
    subscriberHeading:{
        color:'black',
        fontSize:20,
        fontWeight:'700',
        margin:10

    },
   
})

export default styles