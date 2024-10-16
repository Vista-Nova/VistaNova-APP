// @0000
// @0002
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParams';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormOne from './FormOne';
import FormTwo from './FormTwo';
import FormThree from './FormThree';
import Loading from '../../components/loading'

type FormScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Form'>;

interface Props {
  navigation: FormScreenNavigationProp;
}

const Form: React.FC<Props> = ({ navigation }) => {
  const initialData = { one: '', two: '', three: '', stage: null};
  const [formData, setFormData] = useState(initialData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [stage, setStage] = useState(0);
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
        setFormData(JSON.parse(jsonData)); // Carrega os dados se existirem
        console.log('Data loaded successfully', JSON.parse(jsonData));
      }
      // Caso não haja dados, `formData` já estará inicializado com `initialData`
    } catch (error) {
      console.error('Error loading data', error);
    } finally {
      // Independentemente do que aconteça, definimos isLoaded como true após carregar os dados

      setIsLoaded(true);
      // @0001
      // setTimeout(() => {
      //   setIsLoaded(true)
      // }, 10000);
    }
  };
  
  const loadLoadingData = () => {
    setLoadingData({...loadingData, isLoaded: true})
    // @0001
    // setTimeout(() => {
    //   setLoadingData({...loadingData, isLoaded: true})
    // }, 9000);
    // setTimeout(() => {
    //   setIsLoaded(true)
    // }, 10000);
  }

  const onPressBack = () => {
    if (stage > 0) {
      setStage(stage - 1);
    } else {
      navigation.navigate("Login");
    }
  };

  const onPressNext = (nextStage: number) => {
    setStage(nextStage);
  };

  const saveData = () => {
    try {
      const jsonData = JSON.stringify(formData);
      AsyncStorage.setItem('@formData', jsonData);
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Error saving data', error);
    }
  };


  useEffect(() => {
    loadData(); // Carrega os dados ao montar o componente
    loadLoadingData(); // Inicia o carregamento de dados
  }, []);

  useEffect(() => {
    if (stage === 3) {
      saveData()
      navigation.navigate("Resume");
    }
  }, [stage]);

  return (
    <View style={{ flex: 1 }}>
      {!isLoaded ? (
        <Loading loadingData={loadingData}/>
      ):
      isLoaded && stage === 0 ? (
        <FormOne 
          formData={formData} 
          setFormData={setFormData} 
          onPressBack={onPressBack} 
          onPressNext={onPressNext} 
        />
      ) : isLoaded && stage === 1 ? (
        <FormTwo 
          formData={formData} 
          setFormData={setFormData} 
          onPressBack={onPressBack} 
          onPressNext={onPressNext} 
        />
      ) : isLoaded && stage === 2 ? (
        <FormThree 
          formData={formData} 
          setFormData={setFormData} 
          onPressBack={onPressBack} 
          onPressNext={onPressNext} 
        />
      ) : null}
    </View>
  );
};

export default Form;
