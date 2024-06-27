import React, { useState, useCallback, useTransition } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Menu, Divider, Provider as PaperProvider } from 'react-native-paper';
import colorPalette from '../../assets/colorPalette/colorPalette';
import { useTranslation } from 'react-i18next';

const DropdownLn: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const openMenu = useCallback(() => {
    console.log('Opening menu');
    setMenuVisible(true);
  }, []);
  const closeMenu = useCallback(() => {
    console.log('Closing menu');
    setMenuVisible(false);
  }, []);


  const {i18n} = useTranslation()

  const handleItemPress = useCallback((ln:string) => {
    i18n.changeLanguage(ln)
    closeMenu(); 
  }, [closeMenu]);




  
  return (
      <View style={styles.container}>
        <Menu
          // style={styles.menu}
          visible={menuVisible}
          anchor={<Button textColor='white' onPress={openMenu} style={{backgroundColor:colorPalette.light.primary,borderRadius:0}}>Language</Button>}
          anchorPosition='bottom'
          onDismiss={closeMenu}
        >
          <Menu.Item style={{borderWidth:2}} onPress={()=>handleItemPress('en')}  title="English"  />
          <Menu.Item onPress={()=>handleItemPress('fr')} title="French" />
          {/* <Divider /> */}
          <Menu.Item onPress={()=>handleItemPress('ge')} title="German" />
        </Menu>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  // menu: {
  //   backgroundColor: 'yellow',
  //   height: 200,
  //   width: 200,
  // },
});

export default DropdownLn;
