import { StyleSheet } from 'react-native';
import colorPalette from '../../assets/colorPalette/colorPalette';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorPalette.imageEdior.canvasBg,
    },
    headerContainer: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 20,
    },
    contentContainer: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressableContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressableText: {
        fontSize: 16,
        color: '#888',
        marginTop: 20,
    },
    footerContainer: {
        flex:1,
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
});

export default styles;
