import React, { useState } from 'react';
import { TouchableOpacity, View , Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/index';
import { useLocale } from '../locale/index';
import { Txt } from './texts';


interface Props {
  event: Function
}

export const BackButton: React.FC<Props> = ({ event }) => {
  const { theme } = useTheme();

  return(
    <TouchableOpacity 
      style={{
        position: 'absolute',
        top: 32,
        left: 24,
        zIndex: 999
      }} 
      onPress={() => event()}
    >
      <Ionicons name="chevron-back" size={24} color={theme.text} />
    </TouchableOpacity>
  )
}

export const LogoutButton: React.FC<Props> = ({ event }) => {
  const { theme } = useTheme();

  return(
    <TouchableOpacity 
      style={{
        position: 'absolute',
        top: 32,
        left: 24,
        zIndex: 999
      }} 
      onPress={() => event()}
    >
      <Ionicons name="log-out-outline" size={24} color={theme.text} />
    </TouchableOpacity>
  )
}

export const HamburgerMenuButton: React.FC<Props> = ({ event }) => {
  const { theme } = useTheme();

  return(
    <TouchableOpacity 
      style={{
        position: 'absolute',
        top: 32,
        right: 24,
        zIndex: 999
      }} 
      onPress={() => event()}
    >
      <Ionicons name="menu" size={24} color={theme.text} />
    </TouchableOpacity>
  )
}

export const CloseMenuButton: React.FC<Props> = ({ event }) => {
  const { theme } = useTheme();

  return(
    <TouchableOpacity 
      style={{
        position: 'absolute',
        top: 32,
        right: 24,
        zIndex: 999
      }} 
      onPress={() => event()}
    >
      <Ionicons name="close-outline" size={24} color={theme.text} />
    </TouchableOpacity>
  )
}

export const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();

  return(
    <TouchableOpacity 
      style={{
        position: 'absolute',
        top: 32,
        right: 62,
        zIndex: 999
      }} 
      onPress={() => toggleTheme()}
    >
      <Ionicons name={theme?.name === "light" ? "moon-outline": "sunny-outline"} size={24} color={theme.text}  />
    </TouchableOpacity>
  )
}

export const LocaleButton = () => {
  const { theme } = useTheme();
  const { locale, list, changeLocale } = useLocale();
  const [ enable, setEnable ] = useState(false);

  return(
    <View style={{
      position: 'absolute',
      flexDirection: 'column',
      alignItems: 'flex-end',
      top: 32,
      right: 24,
      zIndex: 999
    }}>
      <TouchableOpacity onPress={() => setEnable(!enable)}>
        <Ionicons name={"language-outline"} size={24} color={theme.text}  />
      </TouchableOpacity>
      {enable?
        <View style={{top: 10, backgroundColor: theme.blur, padding: 10, borderRadius: 10}}>
          {list.map((item: { iso: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => 
            <TouchableOpacity
              key={item.iso}
              style={{
                borderTopWidth: item.iso === list[0]? 1: 0, 
                borderColor: theme.textSw
              }}
              onPress={() => changeLocale(item.iso)}
            >
              <Txt style={{textAlign: 'right', marginVertical: 8, marginHorizontal: 4, fontSize: 16, fontWeight: locale.iso === item.iso? 'bold' : 'regular', color: locale.iso === item.iso? theme.primary : theme.text }}>{item.name}</Txt>
            </TouchableOpacity>
          )}
        </View>
      :null}
    </View>
  )
}
