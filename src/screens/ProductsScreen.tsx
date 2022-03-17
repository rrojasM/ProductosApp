import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl, Button } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigator/ProductsNavigator';
import { ProductsContext } from '../context/ProducsContext';
import { AuthContext } from '../context/AuthContext';


interface Props extends StackScreenProps<ProductsStackParams> { };
const ProductsScreen = ({ navigation }: Props) => {

    const { products, loadProducts } = useContext(ProductsContext);
    const { logOut } = useContext(AuthContext)
    const [isRefresh, setIsRefresh] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ marginRight: 20 }}
                    onPress={() => navigation.navigate('ProductScreen', {})}
                >
                    <Text>Agregar</Text>

                </TouchableOpacity>
            )
        })
    }, []);


    // TODO: Pull to refresh

    const loadProductsFromBackend = async () => {

        setIsRefresh(true);
        await loadProducts();
        setIsRefresh(false)

    }


    return (
        <>
            <View style={{ flex: 1, marginHorizontal: 10 }}>

                <FlatList
                    data={products}
                    keyExtractor={(p) => p._id}
                    renderItem={({ item }) => {
                        return (
                            <>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => navigation.navigate('ProductScreen', {
                                        id: item._id,
                                        name: item.nombre
                                    })}
                                >
                                    <Text style={styles.productName}>{item.nombre}</Text>
                                </TouchableOpacity>

                            </>
                        )
                    }}
                    ItemSeparatorComponent={() => (
                        <View style={styles.separator} />
                    )}

                    refreshControl={
                        <RefreshControl
                            refreshing={isRefresh}
                            onRefresh={loadProductsFromBackend}
                        />
                    }
                />

                <Button
                    title='Logout'
                    color='#5856d6'
                    onPress={logOut}
                />

            </View>
        </>
    )
}


const styles = StyleSheet.create({
    productName: {
        fontSize: 20
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#674D64'
    }
})
export default ProductsScreen;