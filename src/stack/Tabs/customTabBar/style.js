import { StyleSheet } from "react-native";

const styles = (screenContext, width, height, colors) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        // backgroundColor:'yellow',
        height: 50,
        // marginBottom: 20,
        backgroundColor: 'transparent',
        // position: 'absolute',
        // bottom: 5,
        justifyContent: 'center', alignItems: 'center',
        width: screenContext.windowisPortrait ? height : width,
        // borderWidth: 2,
        // borderRadius: width * 0.1,
    },
    tabBarItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', padding: 5,
        // backgroundColor:'yellow',
        // borderRadius:100,
        // borderRightWidth:1, borderLeftWidth:1, 
        

    }, labelContainer: {
        flexDirection: 'column', alignItems: 'center',justifyContent:'center'
    },
    iconContainerWrapper:{
        justifyContent:'center', alignItems:'center',
        padding:width/8*0.08, borderRadius:50,
    },
    labelText:{
         color: colors.text
    }
})

export default styles