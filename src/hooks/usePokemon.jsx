import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList(){

     // const [pokemonList,setPokemonList]=useState([]);
      // const [isLoading,setIsLoading]=useState(true);
      // const [pokedexUrl,setPokedexUrl]=useState('https://pokeapi.co/api/v2/pokemon');

      // const [nextUrl,setNextUrl]=useState('');
      // const [prevUrl,setPrevUrl]=useState('');

    const [pokemonListState, setPokemonListState] =useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl:"https://pokeapi.co/api/v2/pokemon",
        nextUrl: '',
        prevUrl:'',
    })


    async function downloadPokemons() {
       

        //iterating over the array of pokemons, and using their url, to create an array of promises
        //that will download those 20 pokemons

    
            setPokemonListState((state)=> ({...state, isLoading:true}))

            const response= await axios.get(pokemonListState.pokedexUrl);//this download list of 20 pokemon
            
            const pokemonResult=response.data.results;//we get the array of pokemon from result
    
    
            // setNextUrl(response.data.next);
            // setPrevUrl(response.data.previous);
    
            setPokemonListState((state)=>({
              ...state,
              nextUrl: response.data.next,
              prevUrl: response.data.previous
            }));

            const pokemonResultPromis = pokemonResult.map((pokemon)=> axios.get(pokemon.url));

        //passing that promise array to axios.all
        const pokemonData=await axios.all(pokemonResultPromis);//array of 20 pokemon detailed data

        //now iterate on the data of each pokemon, and extract id, name, image,types
        const PokeListResult = pokemonData.map((pokeData)=>{
            const pokemon= pokeData.data;
            return{
                id: pokemon.id,
                name: pokemon.name,
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types: pokemon.types
            }
        });
        // setPokemonList(PokeListResult);
        // setIsLoading(false)/

        setPokemonListState((state)=>({
          ...state,
          pokemonList: PokeListResult,
          isLoading: false,
        }))
    
    }

    useEffect(()=>{
        downloadPokemons();
    },[pokemonListState.pokedexUrl])

    return [ pokemonListState, setPokemonListState ];


}

export default usePokemonList;