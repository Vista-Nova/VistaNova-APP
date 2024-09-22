import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocale } from '../locale/index';
import { useTheme } from '../theme/index';
import { ThemeButton, LocaleButton } from '../components/buttons';

const AccountScreen = () => {
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
    </View>
  );
}


export default AccountScreen;