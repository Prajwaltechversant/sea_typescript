import { StyleSheet } from 'react-native';
import colorPalette from '../../assets/colorPalette/colorPalette';

const styles =(activeColor,width, height,isLandscape)=>
     StyleSheet.create({
    container: {
        flex: 8,
        height, width,
        backgroundColor: activeColor.canvasBg,flexDirection:width>height ? 'row' : 'column'
    },
    headerContainer: {
        flex:1,
        flexDirection:width>height ? 'column':'row',
        justifyContent: 'space-between',
        padding:isLandscape ? width*0.01 : height*0.02,
        
    },
    contentContainer: {
        flex: 6,
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
    },canvasImage:{

    }
});

export default styles;
