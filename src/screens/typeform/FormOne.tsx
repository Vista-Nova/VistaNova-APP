import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Switch, 
  StyleSheet,  
  PanResponder, 
  Animated ,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
 } from 'react-native';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import { useLocale } from '../../locale/index';
import { useTheme } from '../../theme/index';
import { ThemeButton, LocaleButton, LogoutButton } from '../../components/buttons';
import ProgressBar from '../../components/progressBar';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  formData: any;
  setFormData: any;
  onPressBack: any;
  onPressNext: Function;
}

const FormOne: React.FC<Props> = ({ formData, setFormData, onPressBack, onPressNext })  =>{
  const [text, setText] = useState(formData?.one?? '');
  const { locale } = useLocale();
  const { theme } = useTheme();

  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [sliderValue, setSliderValue] = useState(50);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [selectedOption, setSelectedOption] = useState('java');
  const pan = useState(new Animated.ValueXY())[0];
  const [progress, setProgress] = useState(33.33);

  // Draggable setup with PanResponder
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [null, { dx: pan.x, dy: pan.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: () => {
      Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
    }
  });

  const toggleCheckbox = () => setChecked(!checked);

  const onFormOnePress = () => {
    setFormData({...formData, one: text})
    onPressNext(1)
  }

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
    input: {
      height: 40,
      borderColor: theme.dot,
      color: theme.text,
      borderWidth: 1,
      borderRadius: 20,
      paddingHorizontal: 10,
      marginVertical: 10,
      width: '80%',
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
      flexDirection: 'row',
      marginTop: 15,
    },
    ask: {
      color: theme.text,
      fontSize: 14,
    },
    link: {
      marginLeft: 3,
    },
    linkText: {
      color: theme.primary,
      fontSize: 14,
      fontWeight: 'bold',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    label: {
      fontSize: 16,
      marginLeft: 8,
    },
    radioContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 10,
    },
    radio: {
      fontSize: 16,
      color: '#000',
    },
    radioSelected: {
      fontSize: 16,
      color: '#ff6347',
      fontWeight: 'bold',
    },
    picker: {
      height: 50,
      width: '60%',
      marginVertical: 10,
    },
    box: {
      width: 100,
      height: 100,
      backgroundColor: '#ff6347',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginTop: 20,
    },
    boxText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    checkboxContainer: {
      width: 100,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginVertical: 10,
    },
    iconBox: {
      justifyContent: 'flex-start'
    },
    labelBox: {
      marginLeft: 8,
      fontSize: 18,
      color: '#333',
    },
  });

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adapta o comportamento para iOS e Android
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ThemeButton />
        <LocaleButton />
        <LogoutButton event={() => onPressBack()} />
        <ProgressBar progress={progress} />
        <Text style={styles.title}>Primeira Form</Text>
        <Text style={styles.ask}>Como poderias responder a essa primeira pergunta?</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor={theme.textDk}
          placeholder={"Resposta"}
          keyboardType="default"
          autoComplete="off"
          value={text}
          onChangeText={setText}
        />

        {/* Radio Buttons */}
        <View style={styles.radioContainer}>
          <TouchableOpacity onPress={() => setRadioValue('option1')}>
            <Text style={radioValue === 'option1' ? styles.radioSelected : styles.radio}>Opção 1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setRadioValue('option2')}>
            <Text style={radioValue === 'option2' ? styles.radioSelected : styles.radio}>Opção 2</Text>
          </TouchableOpacity>
        </View>

        {/* CheckBox */}
        <TouchableOpacity 
        style={styles.checkboxContainer} 
        onPress={toggleCheckbox}
        >
          <Ionicons 
            style={styles.iconBox}
            name={checked ? 'checkmark-circle' : 'ellipse-outline'} 
            size={24} 
            color={checked ? '#4caf50' : '#757575'} 
          />
          <Text style={styles.labelBox}>
            {checked ? 'Checked' : 'Unchecked'}
          </Text>
        </TouchableOpacity>

        {/* Slider */}
        <Text style={styles.label}>Valor do Slider: {sliderValue}</Text>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={sliderValue}
          onValueChange={setSliderValue}
        />

        {/* Switch */}
        <View style={styles.row}>
          <Text style={styles.label}>Switch</Text>
          <Switch value={isSwitchOn} onValueChange={setIsSwitchOn} />
        </View>

        {/* Picker */}
        <Picker
          selectedValue={selectedOption}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedOption(itemValue)}
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="javascript" />
          <Picker.Item label="Python" value="python" />
        </Picker>

        {/* Draggable Box */}
        <Animated.View
          {...panResponder.panHandlers}
          style={[styles.box, { transform: [{ translateX: pan.x }, { translateY: pan.y }] }]}
        >
          <Text style={styles.boxText}>Arraste-me!</Text>
        </Animated.View>
        <TouchableOpacity style={styles.button} onPress={onFormOnePress}>
          <Text style={styles.buttonText}>Continue 2</Text>
        </TouchableOpacity>
        {/* <View style={styles.footer}>
          <Text style={styles.ask}>{locale.login.ask}</Text>
          <TouchableOpacity
            style={styles.link}
            onPress={() => navigation.replace('FormOne')}
          >
            <Text style={styles.linkText}>{locale.login.link}</Text>
          </TouchableOpacity>
        </View> */}
      </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default FormOne;