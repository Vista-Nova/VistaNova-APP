import React, { useState } from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity, useWindowDimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/RootStackParams';
import { useLocale } from '../locale/index';
import { useTheme } from '../theme/index';
import { ThemeButton, LocaleButton, BackButton } from '../components/buttons';
import { Txt } from '../components/texts';

const { width } = Dimensions.get('window');

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

interface Props {
  navigation: WelcomeScreenNavigationProp;
}

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { theme } = useTheme();
  const { locale } = useLocale();

  const { width, height } = useWindowDimensions();


  const slides = [
    {
      title: locale.welcome.slider1.title,
      text: locale.welcome.slider1.text,
      image: require('../../assets/sliders/1.png'),
    },
    {
      title: locale.welcome.slider2.title,
      text: locale.welcome.slider2.text,
      image: require('../../assets/sliders/2.png'),
    },
    {
      title: locale.welcome.slider3.title,
      text: locale.welcome.slider3.text,
      image: require('../../assets/sliders/3.png'),
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    carousel: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 350,
      height: 350,
      resizeMode: 'contain',
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.text,
      marginTop: 10,
      textAlign: 'center',
    },
    text: {
      fontSize: 16,
      color: theme.textDk,
      textAlign: 'center',
      marginHorizontal: 24,
      marginTop: 10,
    },
    pagination: {
      flexDirection: 'row',
      marginBottom: '8%'
    },
    dot: {
      width: 12,
      height: 6,
      borderRadius: 5,
      backgroundColor: theme.dot,
      marginHorizontal: 2,
    },
    dotActive: {
      width: 32,
      height: 6,
      borderRadius: 5,
      backgroundColor: theme.primary,
      marginHorizontal: 2,
    },
    action: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '16%'
    },
    button: {
      backgroundColor: theme.primary,
      paddingVertical: 15,
      paddingHorizontal: 80,
      borderRadius: 25,
    },
    buttonText: {
      color: theme.buttonText,
      fontSize: 16,
      fontWeight: 'bold',
    },
    footer: {
      flexDirection: 'row',
      marginTop: 15,
    },
    ask: {
      color: theme.text,
      fontSize: 14,
    },
    link: {
      marginLeft: 3,
    },
    linkText: {
      color: theme.primary,
      fontSize: 14,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      <ThemeButton />
      <LocaleButton />
      <BackButton event={() => navigation.navigate("Home")}/>
      <Carousel
        style={styles.carousel}
        data={slides}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={item.image} style={styles.image} />
            <Txt style={styles.title}>{item.title}</Txt>
            <Txt style={styles.text}>{item.text}</Txt>
          </View>
        )}
        width={width}
        height={400}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View key={index} style={index === activeSlide ? styles.dotActive : styles.dot} />
        ))}
      </View>
      <View style={styles.action}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace('Register')}
        >
          <Txt style={styles.buttonText}>{locale.welcome.button}</Txt>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Txt style={styles.ask}>{locale.welcome.ask}</Txt>
          <TouchableOpacity
            style={styles.link}
            onPress={() => navigation.replace('Login')}
          >
            <Txt style={styles.linkText}>{locale.welcome.link}</Txt>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};



export default WelcomeScreen;
