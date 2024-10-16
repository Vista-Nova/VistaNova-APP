import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useLocale } from '../locale/index';
import { useTheme } from '../theme/index';
import { ThemeButton, LocaleButton } from '../components/buttons';
import { Txt } from '../components/texts';

const SimulatorsScreen = () => {
  const [creditAmount, setCreditAmount] = useState('');
  const [term, setTerm] = useState('');
  const { theme } = useTheme();
  const { locale } = useLocale();

  const simulateCredit = () => {
    // Lógica de simulação (por enquanto fictícia)
    const result = parseFloat(creditAmount) * 1.05; // Exemplo simples de cálculo
    alert(`${locale.simulators.resultLog} ${result.toFixed(2)}${locale.simulators.currency}`);
  };

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
  });

  return (
    <View style={styles.container}>
      <ThemeButton />
      <LocaleButton />
      <Txt style={styles.title}>{locale.simulators.title}</Txt>
      <TextInput
        style={styles.input}
        placeholderTextColor={theme.textDk}
        placeholder={locale.simulators.valueInput}
        keyboardType="numeric"
        value={creditAmount}
        onChangeText={setCreditAmount}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={theme.textDk}
        placeholder={locale.simulators.termInput}
        keyboardType="numeric"
        value={term}
        onChangeText={setTerm}
      />
      <TouchableOpacity style={styles.button} onPress={simulateCredit}>
        <Txt style={styles.buttonText}>{locale.simulators.buttonText}</Txt>
      </TouchableOpacity>
    </View>
  );
}

export default SimulatorsScreen;
