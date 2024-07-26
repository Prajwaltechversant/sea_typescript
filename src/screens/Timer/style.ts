import { StyleSheet } from "react-native";
import { styleText } from "util";

const styles = (screenContext, width, height, colors) => StyleSheet.create(

    {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        headerContainer: {
            flex: 0.2,
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: screenContext.windowisPortrait ? height * 0.05 : 20
        },
        headerText: {
            fontSize: 20,
            fontWeight: '800',
            color: colors.text
        },
        timerInputBox: {
            flex: 0.8,
            // borderWidth: 2,
            // borderColor: 'yellow',
            justifyContent: 'center',
            alignItems: 'center',
        },
        loaderBox: {
            justifyContent: 'space-between', flex: .8,
        },
        swipeBtn: {
            backgroundColor: 'red',
            width: screenContext.windowisPortrait ? width * 0.9 : width * 0.9,
            height: screenContext.windowisPortrait ? width * 0.14 : width * 0.14,
            borderRadius: 40,
            // justifyContent: 'center',
            paddingHorizontal: 20,
            flexDirection: 'row', alignItems: 'center'

        }
        , circle: {
            backgroundColor: 'white',
            width: screenContext.windowisPortrait ? (width * 0.2) / 2 : width * 0.9,
            height: screenContext.windowisPortrait ? (width * 0.2) / 2 : width * 0.14,
            borderRadius: 50

        },
        swipeBtnContainer: {
            flex: 0.2
        },
        swipeBtnText: {
            textAlign: 'center', fontSize: 20,fontWeight:'900', color:colors.text,
            marginHorizontal:60

        }
    })

export default styles;