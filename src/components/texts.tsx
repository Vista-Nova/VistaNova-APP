import React from 'react';
import { Text } from 'react-native'
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';;
import { useTheme } from '../theme/index';
import { useLocale } from '../locale/index';

interface TxtProps {
  children: any
  style: any
}
export const Txt: React.FC<TxtProps> = ({ children, style }) => {
  const { theme } = useTheme();
  let [fontsLoaded] = useFonts({
    Roboto_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }

  return(
    <Text style={{...style, fontFamily: 'Roboto_400Regular'}}>
      {children}
    </Text>
  )
}
