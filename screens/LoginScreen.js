import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Alert } from 'react-native';

import { StoreContext } from '../context';
import { authenticate } from '../api';

function LoginScreen(props) {
  const { navigation } = props;

  const [state, dispatch] = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePressLogin = async () => {
    setLoading(true);

    try {
      const response = await authenticate();
      if (response?.success) {
        dispatch({ type: 'LOGIN', payload: response });
        navigation.navigate('List');
      }
      else {
        setError(response?.message);
      }
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  const handlePressLogout = async () => {
    dispatch({ type: 'LOGOUT' });
  };

  const handlePressGoList = () => {
    navigation.navigate('List');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.label}>
        {state.auth ? 'You\'re logged in' : 'Please log in'}
      </Text>

      <View style={styles.buttonContainer}>
        {state.auth ? (
          <Button
            title="Log out"
            color="#FF4242"
            onPress={handlePressLogout}
          />
        ) : (
          <Button
            title={loading ? "Logging in..." : "Log in"}
            color="#645DD7"
            onPress={handlePressLogin}
          />
        )}
      </View>

      {state.auth && (
        <View style={styles.listButtonContainer}>
          <Button
            title="Go to list"
            color="#645DD7"
            onPress={handlePressGoList}
          />
        </View>
      )}

      {error && (
        <Text style={styles.error}>
          Error: {error}
        </Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B3FFFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 20,
    marginBottom: 20,
  },
  error: {
    color: '#FF4242'
  },
  buttonContainer: {
    width: '80%',
  },
  listButtonContainer: {
    marginTop: 10,
    width: '80%',
  },
});


export default LoginScreen;
