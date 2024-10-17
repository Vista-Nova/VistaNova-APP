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

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

const Register: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleRePassword, setVisibleRePassword] = useState(false);
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);

  const { locale } = useLocale();
  const { theme } = useTheme();

  const usernameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const rePasswordRef = useRef<TextInput>(null);

  const onVisiblePasswordPress = () => {
    setVisiblePassword(!visiblePassword)
    passwordRef.current?.focus()
  }
  const onVisibleRePasswordPress = () => {
    setVisibleRePassword(!visibleRePassword)
    rePasswordRef.current?.focus()
  }

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
          <Txt style={styles.title}>{locale.register.title}</Txt>
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
              autoComplete="new-password"
              autoCapitalize="none"
              secureTextEntry={!visiblePassword}
              returnKeyType="next"
              value={password}
              onChangeText={setPassword}
              onSubmitEditing={() => rePasswordRef.current?.focus()}
              blurOnSubmit={false}
            />
            <TouchableOpacity style={styles.inputBtn} onPress={onVisiblePasswordPress}>
              <Ionicons name={!visiblePassword?"eye-outline": "eye-off-outline"} size={16} color={theme.text} />
            </TouchableOpacity>
          </View>
          <View style={styles.inputBox}>
            <TextInput
              ref={rePasswordRef}
              style={styles.input}
              placeholderTextColor={theme.textDk}
              placeholder={locale.register.repassword}
              autoComplete="new-password"
              autoCapitalize="none"
              secureTextEntry={!visibleRePassword}
              returnKeyType="done"
              value={rePassword}
              onChangeText={setRePassword}
              onSubmitEditing={onRegisterPress}
            />
            <TouchableOpacity style={styles.inputBtn} onPress={onVisibleRePasswordPress}>
              <Ionicons name={!visibleRePassword?"eye-outline": "eye-off-outline"} size={16} color={theme.text} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={onRegisterPress}>
            <Txt style={styles.buttonText}>{locale.register.button}</Txt>
          </TouchableOpacity>
          <View style={styles.footer}>
            <Txt style={styles.ask}>{locale.register.ask}</Txt>
            <TouchableOpacity
              style={styles.link}
              onPress={() => navigation.replace('Login')}
            >
              <Txt style={styles.linkText}>{locale.register.link}</Txt>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default Register;