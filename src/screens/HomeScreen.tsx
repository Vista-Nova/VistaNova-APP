import React from 'react';
import { View, ScrollView, SafeAreaView, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart, ProgressChart } from 'react-native-chart-kit';
import { useLocale } from '../locale/index';
import { useTheme } from '../theme/index';
import { ThemeButton, LocaleButton } from '../components/buttons';

const HomeScreen = () => {
  const { theme } = useTheme();
  const { locale } = useLocale();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background
    },
    content: {
      flex: 1,
      marginTop: '45%',
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
      flexDirection: 'row'
    }
  });
  
  return (
    <ScrollView style={styles.container}>
      <ThemeButton />
      <LocaleButton />
      <View style={styles.content}>
        <Text style={styles.title}>{locale.home.title}</Text>
        <View style={styles.charts}>
          <View style={styles.chart1}>
            <ProgressChart
              data={{
                labels: ['Jan', 'Fev', 'Mar'],
                data: [0.20, 0.45, 0.28],
              }}
              width={Dimensions.get('window').width - 220}
              height={100}
              strokeWidth={4}
              radius={28}
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
            <LineChart
              data={{
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [{ data: [20, 45, 28, 80, 99, 43] }],
              }}
              width={Dimensions.get('window').width - 220}
              height={140}
              yAxisLabel="€"
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
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
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            />
        </View>
      </View>
    </ScrollView>
  );
}

export default HomeScreen;