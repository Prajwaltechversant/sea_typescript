import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Menu, Divider, Provider as PaperProvider } from 'react-native-paper';
import colorPalette from '../../assets/colorPalette/colorPalette';

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

  const handleItemPress = useCallback(() => {
    // console.log('Item selected');
    // setSelectedLanguage(title)
    closeMenu(); 
  }, [closeMenu]);

  console.log('Menu visible:', menuVisible);
  return (
      <View style={styles.container}>
        <Menu
          // style={styles.menu}
          visible={menuVisible}
          anchor={<Button textColor='white' onPress={openMenu} style={{backgroundColor:colorPalette.light.primary,borderRadius:0}}>Language</Button>}
          anchorPosition='bottom'
          onDismiss={closeMenu}
        >
          <Menu.Item style={{borderWidth:2}} onPress={handleItemPress}  title="English"  />
          <Menu.Item onPress={handleItemPress} title="Spanish" />
          <Divider />
          <Menu.Item onPress={handleItemPress} title="German" />
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
