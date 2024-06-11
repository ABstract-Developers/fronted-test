import { getPokemonsByChunk, saveNewPokemon } from "@/pages/api/gateways";
import { createContext, useContext, useEffect, useState } from "react"

const PokemonContext = createContext();

export const ContextProvider = ({children}) =>{
    const [count, setCount] = useState(0);
    const [catched, setCatched] = useState(null);
    const [pokemon, setPokemon] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOff, setIsModalOff] = useState(true);
    const [params, setParams] = useState({chunk: 20, offset: 0});
    const currentPage=`https://pokeapi.co/api/v2/pokemon/?limit=${params.chunk}&offset=${params.offset}`
    const value = {
        count,
        params,
        currentPage,
        isLoading,
        catched,
        pokemon,
        setParams,
        setPokemon,
        setIsLoading,
        setIsModalOff,
        setCatched
    }
    useEffect(() =>{
        if(isModalOff && catched !== null){
            saveNewPokemon(catched).then((res) =>{});
        }
    }, [isModalOff]);
    useEffect(() => {
        setIsLoading(true);
        getPokemonsByChunk(currentPage)
        .then((res) =>{setPokemon(res.pokemon); setCount(res.count); setIsLoading(false)})
    }, [params]);
    return (
        <PokemonContext.Provider value={value}>
            {children}
        </PokemonContext.Provider>
    )
}

export const usePokemonContext = () => {
    return useContext(PokemonContext)
}