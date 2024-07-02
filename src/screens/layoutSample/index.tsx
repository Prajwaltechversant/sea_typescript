import React, { useRef, useState, useEffect } from 'react';
import { Animated, StyleSheet, View, TouchableOpacity, Text, Dimensions } from 'react-native';

const Layout2 = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [window, setWindow] = useState(Dimensions.get('window'));

  const widthAnim = useRef(new Animated.Value(window.width / 2)).current;
  const heightAnim = useRef(new Animated.Value(100)).current;

  const handleLayout = () => {
    setIsExpanded(prevState => !prevState);
  };

  useEffect(() => {
    const updateLayout = () => {
      setWindow(Dimensions.get('window'));
    };

const subscribe =     Dimensions.addEventListener('change', updateLayout);

    return () => {
      subscribe.remove();
    };
  }, []);

  const animateBox = () => {
    Animated.timing(widthAnim, {
      toValue: isExpanded ? window.width / 2 : window.width,
      duration: 500,
      useNativeDriver: false, 
    }).start();

    Animated.timing(heightAnim, {
      toValue: isExpanded ? 100 : window.height,
      duration: 500,
      useNativeDriver: false, 
    }).start();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={animateBox} style={styles.button}>
        <Text style={styles.buttonText}>{isExpanded ? 'Collapse' : 'Expand'}</Text>
      </TouchableOpacity>
      <Animated.View
        style={[styles.box, { width: widthAnim, height: heightAnim }]}
        onLayout={handleLayout}
      >
        <Text style={styles.boxText}>Resizable Box</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  button: {
    padding: 10,
    backgroundColor: '#6495ED',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  box: {
    backgroundColor: '#FF6347',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Layout2;
