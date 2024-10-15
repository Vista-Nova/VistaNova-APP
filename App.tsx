import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './src/navigation/RootStackParams';
import { ThemeProvider } from './src/theme/index';
import { LocaleProvider } from './src/locale/index';
import WelcomeScreen from './src/screens/WelcomeScreen';
import WelcomeScreenTwo from './src/screens/WelcomeScreenTwo';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import Login from './src/screens/auth/Login';
import Register from './src/screens/auth/Register';

import Form from './src/screens/typeform/Form'
import Resume from './src/screens/typeform/Resume';

const Stack = createStackNavigator<RootStackParamList>();

const App = ()  => {

  return (
    <ThemeProvider>
      <LocaleProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false}}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Dashboard" component={BottomTabNavigator} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Form" component={Form} />
            <Stack.Screen name="Resume" component={Resume} />
          </Stack.Navigator>
        </NavigationContainer>
      </LocaleProvider>
    </ThemeProvider>
  );
}

export default App;
