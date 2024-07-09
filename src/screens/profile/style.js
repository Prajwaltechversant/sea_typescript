import { StyleSheet } from "react-native";

const styles = (screenContext, width, height, colors) => StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: colors.secondary, alignItems: 'center', justifyContent: 'center'

        },
        contentContainer: {
            flex: 1,
            backgroundColor: colors.tertiary,
            width:screenContext.windowisPortrait ? width * 0.9 : width * 0.2,
            borderRadius: screenContext.windowisPortrait ? width * 0.1 : width * 0.2,
            position:'absolute',top:screenContext.windowisPortrait ? width * 0.63 : width * 0.2,
            height:screenContext.windowisPortrait ? width * 1.3 : width * 0.2,
            alignItems:'center'

        },
        infoContainer:{
            width:screenContext.windowisPortrait ? width * 0.6 : width * 0.2,

        },
        infoBox:{
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:colors.lightGray,
            width:'100%',
            marginVertical:10,
            borderRadius: screenContext.windowisPortrait ? width * 0.6 : width * 0.2,

        },
        btn: {
            backgroundColor: colors.btnGray, width: 200, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 10,
            marginVertical:10
        },
        profileContainer: {

            backgroundColor: colors.primary, width: screenContext.windowisPortrait ? width : height, justifyContent: 'center', height: screenContext.windowisPortrait ? width * 0.7 : height,
            justifyContent: 'center', alignItems: 'center',
            borderBottomLeftRadius: screenContext.windowisPortrait ? width * 0.1 : width * 0.2, borderBottomRightRadius: screenContext.windowisPortrait ? width * 0.1 : width * 0.2,
            position:'absolute',top:0,

        },
        profileImage: {
            width: screenContext.windowisPortrait ? width * 0.4 : 100,
            height: screenContext.windowisPortrait ? width * 0.4 : 10,
            resizeMode: 'cover', borderRadius: 100

        },
        text:{
            fontSize:15,color:colors.text
        }

    }
)

export default styles