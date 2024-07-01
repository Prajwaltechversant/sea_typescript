import React, { useState, useCallback, useTransition } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Menu, Divider, Provider as PaperProvider } from 'react-native-paper';
import colorPalette from '../../assets/colorPalette/colorPalette';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@react-navigation/native';

const DropdownLn: React.FC = () => {


  const [menuVisible, setMenuVisible] = useState(false);
  const { i18n } = useTranslation()
  const { colors } = useTheme()
  const openMenu = useCallback(() => {
    setMenuVisible(true);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuVisible(false);
  }, []);



  const handleItemPress = useCallback((ln: string) => {
    i18n.changeLanguage(ln)
    closeMenu();
  }, [closeMenu]);


  return (
    <View style={styles.container}>
      <Menu
        visible={menuVisible}
        anchor={<Button textColor='white' onPress={openMenu} style={{ backgroundColor: colors.primary, borderRadius: 0 }}>Language</Button>}
        anchorPosition='bottom'
        onDismiss={closeMenu}
      >
        <Menu.Item style={{ borderWidth: 2 }} onPress={() => handleItemPress('en')} title="English" />
        <Menu.Item onPress={() => handleItemPress('fr')} title="French" />
        <Menu.Item onPress={() => handleItemPress('ge')} title="German" />
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default DropdownLn;
