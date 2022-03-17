import { useEffect, useState } from "react"
import productosApi from '../api/ProductosApi';
import { CagetoriesResponse, Categoria } from '../interfaces/AppInterfaces';

export const useCategories = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    useEffect(() => {

        getCategories();

    }, [])

    const getCategories = async () => {
        const resp = await productosApi.get<CagetoriesResponse>('/categorias');
        setCategorias(resp.data.categorias);
        setIsLoading(false);
    }

    return {
        isLoading,
        categorias
    }
}

