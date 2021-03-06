import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProtectedScreen from '../screens/ProtectedScreen';
import LoadinScreen from '../screens/LoadinScreen';
import ProductsNavigator from '../navigator/ProductsNavigator';

const Stack = createStackNavigator();

export const Navigator = () => {

  const { status } = useContext(AuthContext);

  if (status === 'checking') return <LoadinScreen />
  return (
    <Stack.Navigator initialRouteName='LoginScreen' screenOptions={{
      headerShown: false, cardStyle: {
        backgroundColor: 'white'
      }
    }}>

      {
        (status !== 'authenticated') ?
          (
            <>
              <Stack.Screen name='LoginScreen' component={LoginScreen} />
              <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="ProductsNavigator" component={ProductsNavigator} />
              <Stack.Screen name='ProtectedScreen' component={ProtectedScreen} />
            </>

          )
      }


    </Stack.Navigator>
  );
}