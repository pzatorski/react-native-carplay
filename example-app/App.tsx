import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Main from './components/Main';
import { Provider } from 'react-redux';
import { store } from './store/rootStore';
import useCarPlayTemplate from './hooks/useCarPlayTemplate';

export default function App() {
  useCarPlayTemplate();

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar style="auto" />

        <Main />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
