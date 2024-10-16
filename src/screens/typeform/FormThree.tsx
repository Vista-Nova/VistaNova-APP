// @0000
import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  Switch, 
  StyleSheet,  
  PanResponder, 
  Animated 
 } from 'react-native';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import { useLocale } from '../../locale/index';
import { useTheme } from '../../theme/index';
import { ThemeButton, LocaleButton, BackButton } from '../../components/buttons';
import ProgressBar from '../../components/progressBar';
import { Ionicons } from '@expo/vector-icons';
import { Txt } from '../../components/texts';

interface Props {
  formData: any;
  setFormData: any;
  onPressBack: any;
  onPressNext: any;
}

const FormThree: React.FC<Props> = ({ formData, setFormData, onPressBack, onPressNext })  => {
  const [text, setText] = useState(formData?.three?? '');
  const { locale } = useLocale();
  const { theme } = useTheme();

  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [sliderValue, setSliderValue] = useState(50);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [selectedOption, setSelectedOption] = useState('java');
  const pan = useState(new Animated.ValueXY())[0];
  const [progress, setProgress] = useState(75);

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

  const onFormThreePress = () => {
    setFormData({...formData, three: text})
    onPressNext(3)
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
    <View style={styles.container}>
      <ThemeButton />
      <LocaleButton />
      <BackButton event={() => onPressBack()} />
      <ProgressBar progress={progress} />
      <Txt style={styles.title}>Terceira Form</Txt>
      <Txt style={styles.ask}>Como poderias responder a essa terceira pergunta?</Txt>
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
          <Txt style={radioValue === 'option1' ? styles.radioSelected : styles.radio}>Opção 1</Txt>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setRadioValue('option2')}>
          <Txt style={radioValue === 'option2' ? styles.radioSelected : styles.radio}>Opção 2</Txt>
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
        <Txt style={styles.labelBox}>
          {checked ? 'Checked' : 'Unchecked'}
        </Txt>
      </TouchableOpacity>

      {/* Slider */}
      <Txt style={styles.label}>Valor do Slider: {sliderValue}</Txt>
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
        <Txt style={styles.label}>Switch</Txt>
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
        <Txt style={styles.boxText}>Arraste-me!</Txt>
      </Animated.View>
      <TouchableOpacity style={styles.button} onPress={onFormThreePress}>
        <Txt style={styles.buttonText}>Calcular...</Txt>
      </TouchableOpacity>
      {/* <View style={styles.footer}>
        <Txt style={styles.ask}>{locale.login.ask}</Txt>
        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.replace('FormThree')}
        >
          <Txt style={styles.linkText}>{locale.login.link}</Txt>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

export default FormThree;