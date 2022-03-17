import React, { createContext, useState, useEffect } from 'react';
import productosApi from '../api/ProductosApi';
import { Producto, ProductsResponse, DeleteResponse } from '../interfaces/AppInterfaces';

type ProductsContextProps = {
    products: Producto[];
    loadProducts: () => Promise<void>;
    addProduct: (categoryId: string, productName: string) => Promise<Producto>;
    updateProduct: (categoryId: string, productName: string, productId: string) => Promise<void>;
    loadProductById: (id: string) => Promise<Producto>;
    uploadImage: (data: any, id: string) => Promise<void>; //TODO: cambiar ANY

    deleteProduct: (id: string) => Promise<void>;

}

export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider = ({ children }: any) => {

    const [products, setProducts] = useState<Producto[]>([]);

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
            console.log('data delete',resp.data._id);
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
    const uploadImage = async (data: any, id: string) => {

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