import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../theme/index';
import { Txt } from './texts';

interface Prop {
  loadingData: any;
}

const Loading: React.FC<Prop> = ({ loadingData }) => {
  const { theme } = useTheme();
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.background,
    },
    loadingText: {
      fontSize: 20,
      color: theme.textSw,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      {data?.isLoaded? (
      <Txt style={styles.loadingText}>
        {data?.doneMessage}
      </Txt>
      ):(
      <Animated.Text style={[styles.loadingText, { opacity }]}>
        <Txt style={[styles.loadingText]}>
          {data?.messages[messageIndex]}
        </Txt>
      </Animated.Text>
      )}
    </View>
  );
};

export default Loading;
