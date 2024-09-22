import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from './src/theme/index';
import { LocaleProvider } from './src/locale/index';
import WelcomeScreen from './src/screens/WelcomeScreen';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import Login from './src/screens/auth/login';
import Register from './src/screens/auth/register';

const Stack = createStackNavigator();

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
          </Stack.Navigator>
        </NavigationContainer>
      </LocaleProvider>
    </ThemeProvider>
  );
}

export default App;
