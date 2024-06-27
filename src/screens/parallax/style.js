import { StyleSheet } from "react-native";

const styles = (width, height, imageH, imageW) => StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#000'
    },

    cardContainer: {
        width, justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowOffset: {
            width: 0,
            height: 1
        }
    },
    cardImage: {
        width: imageW,
        height: imageH,
        resizeMode: 'cover',
        borderRadius: 14
    }
})




export default styles