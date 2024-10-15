import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../navigation/RootStackParams';
import { useTheme } from '../../theme/index';
import { ThemeButton, LocaleButton } from '../../components/buttons';
import Loading from '../../components/loading';

type ResumeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Resume'>;

interface Props {
  navigation: ResumeScreenNavigationProp;
}

const Resume: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingData, setLoadingData] = useState({
    messages: [
      'Carregando...',
      'Aguarde um momento...',
      'Estamos quase lá...',
      'Por favor, não saia!',
    ],
    doneMessage: 'Pronto!',
    isLoaded: false
  });

  const loadData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('@formData');
      if (jsonData !== null) {
        setFormData(JSON.parse(jsonData));
        console.log('Data loaded successfully', JSON.parse(jsonData));
      }
    } catch (error) {
      console.error('Error loading data', error);
    } finally {
      // Independentemente do que aconteça, definimos isLoaded como true após carregar os dados
      //setIsLoaded(true);
      setTimeout(() => {
        setIsLoaded(true)
      }, 10000);
    }
  };

  const loadLoadingData = () => {
    setTimeout(() => {
      setLoadingData({...loadingData, isLoaded: true})
    }, 9000);
    setTimeout(() => {
      setIsLoaded(true)
    }, 10000);
  }

  const onPressContinue = () => {
    navigation.navigate("Dashboard");
  };

  useEffect(() => {
    loadData();
    loadLoadingData(); // Inicia o carregamento de dados
  }, []);

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
      width: "70%",
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
    },
    ask: {
      color: theme.text,
      fontSize: 14,
    },
    link: {
      marginTop: 5
    },
    linkText: {
      color: theme.primary,
      fontSize: 14,
      fontWeight: 'bold',
    },
  });

  return (
    <>
      {!isLoaded?(
      <View style={{flex: 1}}>
        <Loading loadingData={loadingData}/>
      </View>
      ):(
      <View style={styles.container}>
        <ThemeButton />
        <LocaleButton />
        <Text style={styles.title}>Resume</Text>
        <Text style={styles.title}>{formData?.one}</Text>
        <Text style={styles.title}>{formData?.two}</Text>
        <Text style={styles.title}>{formData?.three}</Text>
        <Text style={styles.title}>{formData?.stage}</Text>
        <TouchableOpacity style={styles.button} onPress={onPressContinue}>
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text style={styles.ask}>Não concorda com os dados inseridos ou deja alterar alguma informação, antes de seguir?</Text>
          <TouchableOpacity
            style={styles.link}
            onPress={() => navigation.replace('Form')}
          >
            <Text style={styles.linkText}>Modificar respostas.</Text>
          </TouchableOpacity>
        </View>
      </View>
      )}
    </>
  );
};

export default Resume;
