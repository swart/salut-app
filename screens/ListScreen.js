import React, { useState, useEffect, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Text, View, SafeAreaView, Button, Alert } from 'react-native';

import { StoreContext } from '../context';
import { getData } from '../api';

function ListScreen() {
  const [state, dispatch] = useContext(StoreContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>
        {item.key}
      </Text>
      <Text style={styles.body}>
        {item.value}
      </Text>
    </View>
  );

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await getData(state.auth.token);
        if (response) {
          dispatch({ type: 'SET_DATA', payload: response });
        }
        else {
          setError('Error something went wrong');
        }
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    }
    if (!state.data) fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      {error && (
        <Text style={styles.error}>
          Error: {error}
        </Text>
      )}

      {loading && (
        <Text style={styles.label}>
          {'Loading...'}
        </Text>
      )}

      <FlatList
        data={state.data}
        renderItem={renderItem}
        keyExtractor={(_, index) => index}
      />

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
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 11,
  },
  label: {
    fontSize: 20,
    marginBottom: 20,
  },
  error: {
    color: '#FF4242'
  },
});

export default ListScreen;
