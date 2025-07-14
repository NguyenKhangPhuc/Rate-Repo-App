import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';
import createApolloClient from './src/utils/apolloClient';
import { ApolloProvider } from '@apollo/client';
import AuthStorageContext from './src/contexts/AuthStorageContext';
import AuthStorage from './src/utils/authStorage';
import { PaperProvider } from 'react-native-paper';

export default function App() {

  const authStorage = new AuthStorage()
  const client = createApolloClient(authStorage)
  return (
    <View style={styles.container}>
      <PaperProvider>
        <ApolloProvider client={client}>
          <AuthStorageContext.Provider value={authStorage}>
            <NativeRouter>
              <Main />
            </NativeRouter>
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </PaperProvider>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
