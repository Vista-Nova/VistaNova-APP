import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function SimulatorsScreen() {
  const [creditAmount, setCreditAmount] = useState('');
  const [term, setTerm] = useState('');

  const simulateCredit = () => {
    // Lógica de simulação (por enquanto fictícia)
    const result = parseFloat(creditAmount) * 1.05; // Exemplo simples de cálculo
    alert(`Simulação de crédito aprovada: R$ ${result.toFixed(2)}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simulador de Créditos</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o valor do crédito"
        keyboardType="numeric"
        value={creditAmount}
        onChangeText={setCreditAmount}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite o prazo (meses)"
        keyboardType="numeric"
        value={term}
        onChangeText={setTerm}
      />
      <TouchableOpacity style={styles.button} onPress={simulateCredit}>
        <Text style={styles.buttonText}>Simular</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '80%',
  },
  button: {
    backgroundColor: '#ff6347',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 25,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
