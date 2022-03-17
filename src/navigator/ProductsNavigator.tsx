import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductsScreen from '../screens/ProductsScreen';
import ProductScreen from '../screens/ProductScreen';
import ProtectedScreen from '../screens/ProtectedScreen';


export type ProductsStackParams = {
    ProdutsScreen: undefined,
    ProductScreen: { id?: string, name?: string },
    ProtectedScreen: {}
}
const Stack = createStackNavigator<ProductsStackParams>();


const ProductsNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: {
                    backgroundColor: 'white'
                },

                headerStyle: {
                    elevation: 0,
                    shadowColor: 'transparent'
                }
            }}
        >
            <Stack.Screen
                name="ProdutsScreen"
                component={ProductsScreen}
                options={{
                    title: 'Productos'
                }}
            />

            <Stack.Screen
                name="ProductScreen"
                component={ProductScreen}
            />

            <Stack.Screen 
                name='ProtectedScreen' 
                component={ProtectedScreen} 
            />


        </Stack.Navigator>
    )
}

export default ProductsNavigator