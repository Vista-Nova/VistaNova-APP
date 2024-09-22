// src/@types/expo-vector-icons.d.ts
declare module '@expo/vector-icons' {
  import * as React from 'react';
  import { StyleProp, TextStyle, ViewStyle } from 'react-native';

  // Definindo o tipo para os ícones
  export interface IconProps {
    name: string;
    size?: number;
    color?: string;
    style?: StyleProp<ViewStyle>;
  }

  // Exportando os ícones do Ionicons
  export class Ionicons extends React.Component<IconProps> {}

  // Se você usa outros ícones, defina-os aqui também
  // export class MaterialIcons extends React.Component<IconProps> {}
  // export class FontAwesome extends React.Component<IconProps> {}
  // export class AntDesign extends React.Component<IconProps> {}
  // export class Entypo extends React.Component<IconProps> {}
  // export class Fontisto extends React.Component<IconProps> {}
  // export class Octicons extends React.Component<IconProps> {}
  // export class SimpleLineIcons extends React.Component<IconProps> {}
  // export class Zocial extends React.Component<IconProps> {}
}
