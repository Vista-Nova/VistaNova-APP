import React, { useState, useRef } from 'react';
import { 
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParams';
import { BackButton } from '../../components/buttons';
import { useLocale } from '../../locale/index';
import { useTheme } from '../../theme/index';
import { ThemeButton, LocaleButton } from '../../components/buttons';
import { Txt } from '../../components/texts';


type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const Login: React.FC<Props> = ({ navigation })  =>{
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);

  const { locale } = useLocale();
  const { theme } = useTheme();

  const usernameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const onVisiblePasswordPress = () => {
    setVisiblePassword(!visiblePassword)
    passwordRef.current?.focus()
  }

  const onLoginPress = () => {
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
    inputBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '82%',
    },
    input: {
      flex: 1,
      height: 40,
      borderColor: theme.dot,
      color: theme.text,
      borderWidth: 1,
      borderRadius: 20,
      paddingHorizontal: 10,
      marginVertical: 10,
      left: 8
    },
    inputBtn: {
      left: -24,
      padding: 5
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <ThemeButton />
          <LocaleButton />
          <BackButton event={() => navigation.navigate("Welcome")} />
          <Txt style={styles.title}>{locale.login.title}</Txt>
          <View style={styles.inputBox}>
            <TextInput
              ref={usernameRef}
              style={styles.input}
              placeholderTextColor={theme.textDk}
              placeholder={locale.register.username}
              keyboardType="email-address"
              autoComplete="email"
              autoCapitalize="none"
              returnKeyType="next"
              value={username}
              onChangeText={setUsername}
              onSubmitEditing={() => passwordRef.current?.focus()}
              blurOnSubmit={false}
            />
            <View style={{...styles.inputBtn, width: 16, margin: 5}}></View>
          </View>
          <View style={styles.inputBox}>
            <TextInput
              ref={passwordRef}
              style={styles.input}
              placeholderTextColor={theme.textDk}
              placeholder={locale.register.password}
              autoComplete="password"
              autoCapitalize="none"
              secureTextEntry={!visiblePassword}
              returnKeyType="next"
              value={password}
              onChangeText={setPassword}
              onSubmitEditing={onLoginPress}
            />
            <TouchableOpacity style={styles.inputBtn} onPress={onVisiblePasswordPress}>
              <Ionicons name={!visiblePassword?"eye-outline": "eye-off-outline"} size={16} color={theme.text} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={onLoginPress}>
            <Txt style={styles.buttonText}>{locale.login.button}</Txt>
          </TouchableOpacity>
          <View style={styles.footer}>
            <Txt style={styles.ask}>{locale.login.ask}</Txt>
            <TouchableOpacity
              style={styles.link}
              onPress={() => navigation.replace('Register')}
            >
              <Txt style={styles.linkText}>{locale.login.link}</Txt>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default Login;