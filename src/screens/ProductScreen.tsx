import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, Image, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker'
import { ProductsStackParams } from '../navigator/ProductsNavigator';
import { useCategories } from '../hooks/useCategories';
import { useForm } from '../hooks/useForm';
import { ProductsContext } from '../context/ProducsContext';


interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'> { };

const ProductScreen = ({ navigation, route }: Props) => {
    const { id = '', name = '' } = route.params;

    const { categorias } = useCategories();
    const { loadProductById, addProduct, updateProduct, deleteProduct } = useContext(ProductsContext)

    const { _id, categoriaId, nombre, img, form, onChange, setFormValue } = useForm({
        _id: id,
        categoriaId: '',
        nombre: name,
        img: ''
    });


    useEffect(() => {
        navigation.setOptions({
            headerTitle: (nombre) ? nombre : 'Sin nombre de Producto'
        });
    }, [nombre]);

    useEffect(() => {
        loadProduct();
    }, [])


    const loadProduct = async () => {

        if (id.length === 0) return;
        const product = await loadProductById(id);
        console.log(product);

        setFormValue({
            _id: id,
            categoriaId: product.categoria._id,
            img: product.img || '',
            nombre
        })

    }


    const saveOrUpdate = async () => {
        if (id.length > 0) {

            updateProduct(categoriaId, nombre, id)

        } else {

            const tempCategoriaId = categoriaId || categorias[0]._id;
            const newProduct = await addProduct(tempCategoriaId, nombre);
            onChange(newProduct._id, '_id');

        }
    }

    const deleteProductId = () => {


        if (id.length === 0) return;
        Alert.alert(
            'Eliminar Producto', 
            '¿Estas seguro de eliminar este producto?',
            [
                {
                text: 'OK', onPress: () => {deleteProduct(id); navigation.navigate('ProdutsScreen')}
                }
            ])
    }

    return (
        <>
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.label}>Nombre del Producto:</Text>
                    <TextInput
                        placeholder='Producto'
                        style={styles.textInput}
                        value={nombre}
                        onChangeText={(value) => onChange(value, 'nombre')}

                    />

                    <Text style={styles.label}>Categoría:</Text>
                    <Picker
                        selectedValue={categoriaId}
                        onValueChange={(itemValue) =>
                            onChange(itemValue, 'categoriaId')
                        }
                    >

                        {
                            categorias.map(c => (
                                <Picker.Item label={c.nombre} value={c._id} key={c._id} />
                            ))
                        }

                    </Picker>

                    <Button
                        title='Guardar'
                        // TODO: POR HACER
                        onPress={saveOrUpdate}
                        color='#5856D6'
                    />

                    <Button
                        
                        title='Delete'
                        onPress={deleteProductId}
                        color='#5856D6'
                    />

                    {
                        (_id.length > 0) && (
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                                <Button
                                    title='Cámara'
                                    // TODO: POR HACER
                                    onPress={() => { console.log('Guardar') }}
                                    color='#5856D6'
                                />
                                <View style={{ width: 10 }} />
                                <Button
                                    title='Galeria'
                                    // TODO: POR HACER
                                    onPress={() => { console.log('Guardar') }}
                                    color='#5856D6'
                                />


                            </View>
                        )
                    }

                    {
                        (img.length > 0) && (
                            <Image
                                source={{ uri: img }}
                                style={{ marginTop: 20, width: '100%', height: 300 }}
                            />
                        )
                    }

                    {/* TODO: Mostrar imagen temporal */}

                </ScrollView>


            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 20
    },
    label: {
        fontSize: 18,
        color: 'black'
    },
    textInput: {
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        borderColor: 'rgba(0,0,0,0.2)',
        height: 45,
        marginTop: 5,
        marginBottom: 15
    }

})

export default ProductScreen;