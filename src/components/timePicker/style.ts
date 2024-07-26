import { StyleSheet } from "react-native";

const styles = (screenContext, width, height, colors) => StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    inputBox: {

        height: screenContext.windowisPortrait ? width * 0.2 : width * 0.2,
        width: screenContext.windowisPortrait ? width * 0.9 : width * 0.9,
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
    },
    inputField: {
        borderWidth: 1,
        borderColor: 'white',
        width: screenContext.windowisPortrait ? width * 0.2 : width * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:5
    }
})


export default styles