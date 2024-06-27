import { StyleSheet } from "react-native";

const styles = (colors, width, height, ITEM_WIDTH, ITEM_HEIGHT) => StyleSheet.create({
    container: { width: width < height ? width : height, justifyContent: 'center', alignItems: 'center', flex: 1 },
    mainWrapper: {
        borderRadius: 18,
        borderWidth: 10,
        borderColor: 'white',
        shadowRadius: 30,
        shadowOpacity: 0.6,
        shadowOffset: {
            width: 0,
            height: 0
        },
        padding: 6,
        backgroundColor: 'white'
    },
    innerWrapper:
    {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        overflow: 'hidden',
        alignItems: 'center',
        borderRadius: 14,
    },
    profileContainer: {
        width: 60,
        height: 60,
        borderRadius: 60,
        borderWidth: 8,
        borderColor: 'white',
        position: 'absolute',
        bottom: 10,
        right: 10

    }


})

export default styles