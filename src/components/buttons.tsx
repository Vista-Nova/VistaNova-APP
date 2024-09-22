import React, { useState } from 'react';
import { TouchableOpacity, View , Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/index';
import { useLocale } from '../locale/index';


interface Props {
  event: Function
}

export const BackButton: React.FC<Props> = ({ event }) => {
  const { theme } = useTheme();

  return(
    <TouchableOpacity 
      style={{
        position: 'absolute',
        top: 44,
        left: 14,
        zIndex: 999
      }} 
      onPress={() => event()}
    >
      <Ionicons name="chevron-back" size={18} color={theme.text} />
    </TouchableOpacity>
  )
}

export const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();

  return(
    <TouchableOpacity 
      style={{
        position: 'absolute',
        top: 46,
        right: 72,
        zIndex: 999
      }} 
      onPress={() => toggleTheme()}
    >
      <Ionicons name={theme?.name === "light" ? "moon-outline": "sunny-outline" || "invert-mode-outline"} size={22} color={theme.text}  />
    </TouchableOpacity>
  )
}

export const LocaleButton = () => {
  const { theme } = useTheme();
  const { locales, list, changeLocale } = useLocale();
  const [ enable, setEnable ] = useState(false);

  return(
    <View style={{
      position: 'absolute',
      flexDirection: 'column',
      alignItems: 'flex-end',
      top: 46,
      right: 32,
      zIndex: 999
    }}>
      <TouchableOpacity onPress={() => setEnable(!enable)}>
        <Ionicons name={"language-outline"} size={22} color={theme.text}  />
      </TouchableOpacity>
      {enable?
        <View style={{top: 10, backgroundColor: theme.blur, padding: 10, borderRadius: 10}}>
          {list.map((item: { iso: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => 
            <TouchableOpacity
              key={item.iso}
              style={{
                borderTopWidth: 1, 
                borderColor: theme.textDk
              }}
              onPress={() => changeLocale(item.iso)}
            >
              <Text style={{textAlign: 'right', margin: 5, fontSize: 16, color: theme.text }}>{item.name}</Text>
            </TouchableOpacity>
          )}
        </View>
      :null}
    </View>
  )
}
