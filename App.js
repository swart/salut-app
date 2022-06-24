import React, { useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen, ListScreen } from './screens';
import { StoreContext, reducer, initialState } from './context';

const Stack = createNativeStackNavigator();

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Salut Demo Login' }}
          />
          <Stack.Screen
            name="List"
            component={ListScreen}
            options={{ title: 'Salut Demo List' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreContext.Provider>
  );
}
