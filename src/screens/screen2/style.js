import { StyleSheet } from "react-native";


const styles = (screenContext, width, height, colors) => StyleSheet.create({
    container: {
        flex: 1

    },
    headerText: {
        textAlign: 'center',
        fontSize: width * 0.07
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center', alignItems: 'center',
        // paddingVertical:screenContext.windowisPortrait ?width*0.05 : height*.1

    },
    imageContainer: {

    },
    titleText:{
        fontSize:screenContext.windowFontScale * 20,
        fontWeight:'800'
    },
    autherText:{
        fontSize:screenContext.windowFontScale * 16,
        fontWeight:'600'

    },
    thumbnail: {
        width: screenContext.windowisPortrait ? width * 0.4 : height,
        height: screenContext.windowisPortrait ? width * .4 : height,
        marginVertical: screenContext.windowisPortrait ? width * 0.08 : height * .1,
        borderRadius:20
    },
    playerContainer: {
        // borderWidth:1,
        flexDirection: 'column',
    },
    playerOptionsContainer: {
        flexDirection: 'row',
        // alignItems:'stretch',
        justifyContent: 'space-between',
        // gap:40
        marginVertical: screenContext.windowisPortrait ? width * 0.02 : height * .1, alignItems:'center'

    }, moreInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    lyricsContainer: {
        // backgroundColor:colors.primary,
        backgroundColor: colors.secondary,

        width: '100%',
        height: 300,
        marginVertical: screenContext.windowisPortrait ? width * 0.03 : height * .1,
        borderRadius: 20
    },
    optionIcon:{
        fontSize:30
    }
})


export default styles;