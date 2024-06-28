import { StyleSheet } from "react-native";

const styles = (colors) => StyleSheet.create({
    container: {
        flex: 1,
    },
    actionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    downloadBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        backgroundColor: colors.btnGray,
        width: 200,
        height: 50,
        fontWeight:'700',
        borderRadius:10
    },
    btnText: {
        fontSize: 20,
        textAlign:'center',
        color:colors.text
    },
    resultContainer:{
        // padding:10,
        flex:1

    }
})

export default styles;