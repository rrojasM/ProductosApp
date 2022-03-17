import React, { createContext, useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { ImagePickerResponse } from 'react-native-image-picker';
import productosApi from '../api/ProductosApi';
import { Producto, ProductsResponse, DeleteResponse } from '../interfaces/AppInterfaces';

type ProductsContextProps = {
    products: Producto[];
    loadProducts: () => Promise<void>;
    addProduct: (categoryId: string, productName: string) => Promise<Producto>;
    updateProduct: (categoryId: string, productName: string, productId: string) => Promise<void>;
    loadProductById: (id: string) => Promise<Producto>;


    /*  uploadImage: (data: any, id: string) => Promise<void>; */

    uploadImage: (uri: string, name: string, type: string, id: string) => Promise<void>;

    deleteProduct: (id: string) => Promise<void>;

}

export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider = ({ children }: any) => {

    const [products, setProducts] = useState<Producto[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        loadProducts();
    }, [])


    const loadProducts = async () => {

        const resp = await productosApi.get<ProductsResponse>('/productos?limite=100');

        /* setProducts([...products, ...resp.data.productos]); */
        setProducts([...resp.data.productos])

    }

    const addProduct = async (categoryId: string, productName: string): Promise<Producto> => {
        const resp = await productosApi.post<Producto>('/productos', {
            nombre: productName,
            categoria: categoryId
        });
        setProducts([...products, resp.data]);

        return resp.data;
    }

    const updateProduct = async (categoryId: string, productName: string, productId: string) => {
        try {
            const resp = await productosApi.put<Producto>(`/productos/${productId}`, {
                nombre: productName,
                categoria: categoryId
            });
            setProducts(products.map(producto => {
                return (producto._id === productId) ? resp.data : producto;
            }));

        } catch (error) {
            console.log(error);
        }
    }

    const deleteProduct = async (id: string) => {
        try {
            const resp = await productosApi.delete<DeleteResponse>(`/productos/${id}`);
            console.log('data delete', resp.data._id);
            loadProducts();


        } catch (error) {
            console.log(error);
        }

    }

    const loadProductById = async (id: string): Promise<Producto> => {
        const resp = await productosApi.get<Producto>(`/productos/${id}`);

        return resp.data;
    }

    //TODO: cambiar ANY
    const uploadImage = async (uri: string, name: string, type: string, id: string) => {
        setIsUploading(true);
        const fileToUpload = {
            name,
            type,
            uri
        }

        const formData = new FormData;
        formData.append("archivo", fileToUpload);

        const baseURL = 'https://app-cafe-react-native.herokuapp.com/api';
        try {
            /* {
                <ActivityIndicator size={50} animating={isUploading} />
            } */
            await fetch(`${baseURL}/uploads/productos/${id}`, {
                method: 'PUT',
                body: formData
            });
        } catch (error: any) {
            console.log(error.response.data)
        }
        setIsUploading(false);
    }

    return (
        <ProductsContext.Provider value={{
            products,
            loadProducts,
            addProduct,
            updateProduct,
            loadProductById,
            uploadImage,
            deleteProduct

        }}>
            {
                children
            }
        </ProductsContext.Provider>
    )

}