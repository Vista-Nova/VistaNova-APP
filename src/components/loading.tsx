import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface Prop {
  loadingData: any;
}

const Loading: React.FC<Prop> = ({ loadingData }) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const opacity = useRef(new Animated.Value(0)).current;

  const data = {
    messages: loadingData?.messages,
    doneMessage: loadingData?.doneMessage,
    isLoaded: loadingData?.isLoaded
  }

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        fadeOut();
      }, 1200);
    });
  };

  const fadeOut = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % data?.messages.length);
      fadeIn();
    });
  };

  useEffect(() => {
    fadeIn();
  }, []);

  return (
    <View style={styles.container}>
      {data?.isLoaded? (
      <Text style={[styles.loadingText]}>
        {data?.doneMessage}
      </Text>
      ):(
      <Animated.Text style={[styles.loadingText, { opacity }]}>
        {data?.messages[messageIndex]}
      </Animated.Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    fontSize: 20,
    color: '#343a40',
    fontWeight: 'bold',
  },
});

export default Loading;
