import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Dimensions, StyleSheet } from "react-native";
import { Svg, Path } from "react-native-svg";
import { scale } from "react-native-size-scaling";
import { Ionicons } from '@expo/vector-icons';
import Dashboard from "../screens/home/dashboard";
import Account from "../screens/home/settings";
import Simulators from "../screens/home/services";
import { getPathDown } from "../components/curve";
import { useLocale } from '../locale/index';
import { useTheme } from '../theme/index';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const [maxWidth, setMaxWidth] = useState(Dimensions.get("window").width);
  const returnpathDown = getPathDown(maxWidth, 60, 50);
  const { theme } = useTheme();
  const { locale } = useLocale();

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === 'Simulators') {
            iconName = focused ? 'calculator' : 'calculator-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textDk,
        tabBarStyle: {
          backgroundColor: "transparent",
          borderTopWidth: 0,
          position: "absolute",
          elevation: 0,
        },
        headerShown: false
      })}
    >
      <Tab.Screen
        name="Simulators"
        component={Simulators}
        options={{
          headerShown: false,
          tabBarItemStyle: {
            margin: 0,
            backgroundColor: theme.tabBackground,
          },
          tabBarLabel: () => <></>,
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
          unmountOnBlur: false,
          tabBarItemStyle: {
            margin: 0,
            zIndex: -50,
          },
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 56,
                width: 56,
                backgroundColor: theme.tabBackground,
                borderRadius: 35,
              }}
            >
              <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
            </View>
          ),
          tabBarLabel: () => (
            <View>
              <Svg width={maxWidth} height={scale(60)}>
                <Path fill={theme.tabBackground} {...{ d: returnpathDown }} />
              </Svg>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,
          tabBarItemStyle: {
            margin: 0,
            backgroundColor: theme.tabBackground,
          },
          tabBarLabel: () => <></>,
        }}
      />
    </Tab.Navigator>
  );
}
