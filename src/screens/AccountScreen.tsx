import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/RootStackParams';
import { useLocale } from '../locale/index';
import { useTheme } from '../theme/index';

import { ThemeButton, LocaleButton, LogoutButton } from '../components/buttons';
type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

interface Props {
  navigation: WelcomeScreenNavigationProp;
}

const AccountScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { locale } = useLocale();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.background,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: theme.text
    },
    text: {
      color: theme.text
    },
  });

  return (
    <View style={styles.container}>
      <ThemeButton />
      <LocaleButton />
      <Text style={styles.title}>{locale.account.title}</Text>
      {/* Exibir informações do usuário simuladas */}
      <Text style={styles.text}>{locale.account.name}{locale.account.testName}</Text>
      <Text style={styles.text}>{locale.account.mail}{locale.account.testMail}</Text>
      <LogoutButton event={() => navigation.navigate("Login")}  />
    </View>
  );
}


export default AccountScreen;