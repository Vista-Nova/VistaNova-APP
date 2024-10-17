import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart, ProgressChart } from 'react-native-chart-kit';
import { useLocale } from '../../locale/index';
import { useTheme } from '../../theme/index';
import { ThemeButton, LocaleButton, HamburgerMenuButton } from '../../components/buttons';
import { Txt } from '../../components/texts';

import Menu from '../../modals/menu'; // Importe o Modal


const Dashboard = () => {
  const { theme } = useTheme();
  const { locale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const onPressMenu = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background
    },
    content: {
      flex: 1,
      marginTop: '32%',
      justifyContent: 'center',
      alignItems: 'center',
      bottom: '10%'
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: theme.text
    },
    charts: {
    },
    chart1: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    modal: {
      flex: 1
    },
    modalItem: {
      width: 'auto',
      alignItems: 'center',
      margin: 12,
      padding: 4,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderColor: theme.textDk
    },
    modalText: {
      color: theme.text,
      fontSize: 22,
      fontWeight: 'bold'
    },
  });
  
  return (
    <ScrollView style={styles.container}>
      {/* <ThemeButton />
      <LocaleButton /> */}
      <HamburgerMenuButton event={onPressMenu}/>
      <View style={styles.content}>
        <Txt style={styles.title}>{locale.home.title}</Txt>
        <View style={styles.charts}>
          <View style={styles.chart1}>
            <ProgressChart
              data={{
                labels: ['Jan', 'Fev', 'Mar'],
                data: [0.20, 0.45, 0.28],
              }}
              width={Dimensions.get('window').width - 240}
              height={100}
              strokeWidth={4}
              radius={28}
              chartConfig={{
                backgroundColor: theme.quaternary,
                backgroundGradientFrom: theme.primary,
                backgroundGradientTo: theme.secondary,
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
                elevation: 10, // Sombra para Android
                shadowColor: '#000', // Sombra para iOS
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
              }}
            />
            <LineChart
              data={{
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [{ data: [20, 45, 28, 80, 99, 43] }],
              }}
              width={Dimensions.get('window').width - 240}
              height={140}
              yAxisLabel="€"
              chartConfig={{
                backgroundColor: theme.quaternary,
                backgroundGradientFrom: theme.primary,
                backgroundGradientTo: theme.secondary,
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
                elevation: 10, // Sombra para Android
                shadowColor: '#000', // Sombra para iOS
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
              }}
            />
          </View>
          <LineChart
            data={{
              labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
              datasets: [{ data: [20, 45, 28, 80, 99, 43] }],
            }}
            width={Dimensions.get('window').width - 40}
            height={220}
            verticalLabelRotation={30}
            chartConfig={{
              backgroundColor: theme.quaternary,
              backgroundGradientFrom: theme.primary,
              backgroundGradientTo: theme.secondary,
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
              elevation: 10, // Sombra para Android
              shadowColor: '#000', // Sombra para iOS
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
          }}
            />
        </View>
      </View>
      <Menu visible={isOpen} event={closeModal}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.modalItem}>
            <Txt style={styles.modalText}>Sobre nós</Txt>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalItem}>
            <Txt style={styles.modalText}>Apoio</Txt>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalItem}>
            <Txt style={styles.modalText}>Créditos</Txt>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalItem}>
            <Txt style={styles.modalText}>Fazer simulação</Txt>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalItem}>
            <Txt style={styles.modalText}>Solicitar crédito</Txt>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalItem}>
            <Txt style={styles.modalText}>Blog e notícias</Txt>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalItem}>
            <Txt style={styles.modalText}>Contactos</Txt>
          </TouchableOpacity>
        </View>
      </Menu>
    </ScrollView>
  );
}

export default Dashboard;