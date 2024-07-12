import { StyleSheet } from "react-native";

const styles = (screenContext, width, height, colors) =>
    StyleSheet.create(
        {
            container: {
                justifyContent: 'center', alignItems: 'center'
            },
            addBtnContainer: {
                justifyContent: 'center', alignItems: 'center'

            },
            addbtn: {
                backgroundColor: colors.btnGray,
                justifyContent: 'center', alignItems: 'center',
                width: screenContext.windowisPortrait ? width * 0.2 : 0.2,
                height: screenContext.windowisPortrait ? width * 0.05 : 0.2,
                borderRadius: screenContext.windowisPortrait ? width * 0.01 : 0.2
            },
            contentContainer: {
                justifyContent: 'center', alignItems: 'center', flex: 1

            },
            inputContainer: {
                // width:  screenContext.windowisPortrait ? width * 0.44 :width * 0.98,
                // height: screenContext.windowisPortrait ? width * 0.05 : height*0.1,
                width: width * 0.44,
                height: width * 0.05,
                marginVertical: screenContext.windowisPortrait ? width * 0.03 : width * 0.01,
                borderRadius: 10, justifyContent: 'center', padding: 5,
                backgroundColor: colors.background
            },
            pdfBtn: {
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 2
            }, signview: {
                flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 10, width: width * 0.3
            },
            formSubmitBtn: {
                width: width * 0.44,
                height: width * 0.05,
                backgroundColor: colors.btnGray,
                fontSize: 20,
                borderRadius: width * 0.08,
                justifyContent: 'center', alignItems: 'center',
                marginTop: 20
            }, labelText: {
                fontSize: screenContext.windowFontScale * 25
            }
        }
    )

export default styles