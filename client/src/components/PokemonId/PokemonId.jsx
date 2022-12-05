import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import * as actions from '../../redux/actions/index';
import s from './PokemonId.module.css';

export default function PokemonId() {
    
    const pokemon = useSelector(state => state.pokeById);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
      dispatch(actions.getPokemonById(id))
    }, [dispatch, id]);
    
    
    return(
        <div className={s.pokemon}>
            <div className={s.details}>
                <div className={s.image}>
                    <img src={pokemon.image} alt={pokemon.name} />
                </div>
                <div className={s.main}>
                    <h3>{pokemon.name}</h3>
                    <div className={s.info}>
                        <div className={s.infoOne}>
                            <div><label><strong>Health:</strong> <br /> {pokemon.hp} </label></div>
                            <div><label><strong>Defense:</strong> <br /> {pokemon.defense} </label></div>
                            <div><label><strong>Height:</strong> <br /> {pokemon.height} </label></div>
                        </div>
                        <div className={s.infoTwo}>
                            <div><label><strong>Attack:</strong> <br /> {pokemon.attack} </label></div>
                            <div><label><strong>Speed:</strong> <br /> {pokemon.speed} </label></div>
                            <div><label><strong>Weight:</strong> <br /> {pokemon.weight} </label></div>
                        </div>
                    </div>
                    <div className={s.types}>
                        {pokemon.types && pokemon.types.map(t => <span>{t.name}</span>)}
                    </div>
                </div>
            </div>
        </div>
    )
}