// @0000
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../navigation/RootStackParams';
import { useTheme } from '../../theme/index';
import { ThemeButton, LocaleButton } from '../../components/buttons';
import ProgressBar from '../../components/progressBar';
import Loading from '../../components/loading';
import { Txt } from '../../components/texts';

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
  const [progress, setProgress] = useState(100);

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
        <ProgressBar progress={progress} />
        <Txt style={styles.title}>Resume</Txt>
        <Txt style={styles.title}>{formData.one}</Txt>
        <Txt style={styles.title}>{formData?.two}</Txt>
        <Txt style={styles.title}>{formData?.three}</Txt>
        <Txt style={styles.title}>{formData?.stage}</Txt>
        <TouchableOpacity style={styles.button} onPress={onPressContinue}>
          <Txt style={styles.buttonText}>Confirmar</Txt>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Txt style={styles.ask}>Não concorda com os dados inseridos ou deja alterar alguma informação, antes de seguir?</Txt>
          <TouchableOpacity
            style={styles.link}
            onPress={() => navigation.replace('Form')}
          >
            <Txt style={styles.linkText}>Modificar respostas.</Txt>
          </TouchableOpacity>
        </View>
      </View>
      )}
    </>
  );
};

export default Resume;
