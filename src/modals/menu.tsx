// @0000
// @0002
import React, { useRef, useEffect, useState } from 'react';
import { 
  Modal,
  View,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Animated
} from 'react-native';
import { ThemeButton, LocaleButton,  CloseMenuButton } from '../components/buttons'
import { useLocale } from '../locale/index';
import { useTheme } from '../theme/index';

interface ModalProps {
  children: any,
  visible: boolean;
  event: () => void;
}

const Menu: React.FC<ModalProps> = ({ children, visible, event }) => {
  const translateX = useRef(new Animated.Value(500)).current;
  const [showModal, setShowModal] = useState(visible);

  const { locale } = useLocale();
  const { theme } = useTheme();

  useEffect(() => {
    if (visible) {
      setShowModal(true);
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Animação de saída (volta para cima)
      Animated.timing(translateX, {
        toValue: 500,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShowModal(false));
    }
  }, [visible]);

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
      width: '80%',
      height: '100%',
      paddingHorizontal: 12,
      backgroundColor: theme.background,
      elevation: 10, // Sombra para Android
      shadowColor: '#000', // Sombra para iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    text: {
      fontSize: 18,
      marginBottom: 10,
      textAlign: 'center',
    },
    content: {
      flex: 1,
      marginTop: 72,
    },
  });

  return (
    <Modal
      transparent={true} 
      visible={showModal}
      onRequestClose={event}
    >
      <View style={{right: 216}}>
        <LocaleButton />
        <ThemeButton />
      </View>
      <TouchableWithoutFeedback onPress={event}>
        <View style={styles.overlay}>
          <Animated.View
            style={[
              styles.container,
              { transform: [{ translateX }] },
            ]}
          >
            <CloseMenuButton event={event} />
            <View style={styles.content}>
              {children}
            </View>
            </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};



export default Menu;
