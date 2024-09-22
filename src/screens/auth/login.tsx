import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParams';
import { BackButton } from '../../components/buttons';
import { useLocale } from '../../locale/index';


type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const Login: React.FC<Props> = ({ navigation })  =>{
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const { locale } = useLocale();

  const onLoginPress = () => {
    const data =  {
      username: username,
      password: password,
    }

    setUser(data)
    setIsAuth(true)
    navigation.navigate("Dashboard")
  }

  return (
    <View style={styles.container}>
      <BackButton event={() => navigation.navigate("Welcome")} />
      <Text style={styles.title}>{locale.login.title}</Text>
      <TextInput
        style={styles.input}
        placeholder={locale.login.username}
        keyboardType="email-address"
        autoComplete="email"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder={locale.login.password}
        keyboardType="visible-password"
        secureTextEntry
        enterKeyHint="enter"
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={onLoginPress}>
        <Text style={styles.buttonText}>{locale.login.button}</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.ask}>{locale.login.ask}</Text>
        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.replace('Login')}
        >
          <Text style={styles.linkText}>{locale.login.link}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '80%',
  },
  button: {
    backgroundColor: '#ff6347',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 25,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  ask: {
    color: '#000',
    fontSize: 14,
  },
  link: {
    marginLeft: 3,
  },
  linkText: {
    color: '#ff6347',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Login;