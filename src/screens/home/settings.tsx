import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParams';
import { useLocale } from '../../locale/index';
import { useTheme } from '../../theme/index';

import { ThemeButton, LocaleButton, LogoutButton } from '../../components/buttons';
import { Txt } from '../../components/texts';

type SettingsNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

interface Props {
  navigation: SettingsNavigationProp;
}

const Settings: React.FC<Props> = ({ navigation }) => {
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
      <Txt style={styles.title}>{locale.account.title}</Txt>
      {/* Exibir informações do usuário simuladas */}
      <Txt style={styles.text}>{locale.account.name}{locale.account.testName}</Txt>
      <Txt style={styles.text}>{locale.account.mail}{locale.account.testMail}</Txt>
      <LogoutButton event={() => navigation.navigate("Login")}  />
    </View>
  );
}


export default Settings;