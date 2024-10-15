import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../theme/index';

interface Prop {
  progress: any;
}

const ProgressBar: React.FC<Prop> = ({ progress }) => {
  const { theme } = useTheme();

  return (
    <View style={{flex: 1, position: 'absolute', width: '80%', height: 10, bottom: '6%', borderRadius: 15, backgroundColor: theme.textDk}}>
      {progress < 100? (
      <View style={{flex: 1, width: `${progress}%`, height: 10, borderTopLeftRadius: 15, borderBottomLeftRadius: 15, backgroundColor: theme.primary, zIndex: 2}}></View>
      ):(
      <View style={{flex: 1, width: `${progress}%`, height: 10, borderRadius: 15, backgroundColor: theme.primary, zIndex: 2}}></View>
      )}
    </View>
  );
};

export default ProgressBar;
