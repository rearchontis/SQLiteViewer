import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {NativeView} from './src/NativeView';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <NativeView />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
