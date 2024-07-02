import { he } from "@faker-js/faker";
import { StyleSheet } from "react-native";

const styles = (screenContext, width, height, colors) =>
    StyleSheet.create({

        container: {
            flex: 1,
            backgroundColor: colors.background,margin:0,padding:0, borderWidth:1,
        },
        headingText: { fontSize: screenContext.windowFontScale * 20, textAlign: 'center', color: colors.text, fontWeight: '700' },
        listContainer: {
            flexDirection: 'row',gap:width*.01, width, justifyContent:'center', alignItems:'center'
        },
        dropDownContainer: {
            width:width
        }

    })

export default styles