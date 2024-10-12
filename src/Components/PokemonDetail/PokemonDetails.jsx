import { useParams } from "react-router-dom";

import './pokemonDetails.css'
import usePokemonDetail from "../../hooks/usePokemonDetail";



function PokemonDetails(){
    const {id}= useParams();
    const [pokemon]=usePokemonDetail(id)
  
 
    return(

        <div className="pokemon-details-wrapper">
            <img className="pokemon-detail-image" src={pokemon.image}/>

            <div className="pokemon-detail-name">name: <span>{pokemon.name}</span></div>
            <div className="pokemon-detail-name">Height: {pokemon.height}</div>
            <div className="pokemon-detail-name">Weight: {pokemon.weight}</div>
            <div className="pokemon-detail-type">
                {pokemon.types && pokemon.types.map((t)=> <div key={t}>{t}</div>)}
            </div>

            {
                pokemon.types && pokemon.similarPokemons &&
                <div>
                    more {pokemon.types[0]} type pokemons
                    <ul>
                        { pokemon.similarPokemons .map((p,index)=><li key={p.pokemon.id || index}>{p.pokemon.name }</li>)}
                    </ul>
                </div>


            }

        </div>
    
    );
}

export default PokemonDetails;