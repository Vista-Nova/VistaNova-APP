import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParams';
import { BackButton } from '../../components/buttons';
import { useLocale } from '../../locale/index';
import { useTheme } from '../../theme/index';
import { ThemeButton, LocaleButton } from '../../components/buttons';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

const Register: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const { locale } = useLocale();
  const { theme } = useTheme();

  const onRegisterPress = () => {
    const data =  {
      username: username,
      password: password,
    }

    setUser(data)
    setIsAuth(true)
    navigation.navigate("Form")
  }
  
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
    input: {
      height: 40,
      borderColor: theme.dot,
      color: theme.text,
      borderWidth: 1,
      borderRadius: 20,
      paddingHorizontal: 10,
      marginVertical: 10,
      width: '80%',
    },
    button: {
      backgroundColor: theme.primary,
      paddingVertical: 15,
      paddingHorizontal: 80,
      borderRadius: 25,
      marginTop: 30,
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
      <BackButton event={() => navigation.navigate("Welcome")} />
      <Text style={styles.title}>{locale.register.title}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={theme.textDk}
        placeholder={locale.register.username}
        keyboardType="email-address"
        autoComplete="email"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={theme.textDk}
        placeholder={locale.register.password}
        keyboardType="visible-password"
        autoComplete="new-password"
        secureTextEntry
        enterKeyHint="enter"
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={theme.textDk}
        placeholder={locale.register.repassword}
        keyboardType="visible-password"
        autoComplete="new-password"
        secureTextEntry
        enterKeyHint="enter"
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={onRegisterPress}>
        <Text style={styles.buttonText}>{locale.register.button}</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.ask}>{locale.register.ask}</Text>
        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.replace('Login')}
        >
          <Text style={styles.linkText}>{locale.register.link}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Register;