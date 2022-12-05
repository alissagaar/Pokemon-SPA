import { useState , useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions/index';
import Pokemons from '../Widgets/Pokemons/Pokemons';
import SearchBar from '../Widgets/SearchBar/SearchBar';
import s from './Home.module.css';

export default function Home() {
    const pokemons = useSelector(state => state.pokes);
    const types = useSelector(state => state.types);
    const result = useSelector(state => state.filter);
    const dispatch = useDispatch()

// Filter Options ------------------------------------------
    const [click, setClick] = useState({
        creator: false,
        types: false,
        attack: false,
        alphorder: false
    })
   
    useEffect(() => {
      dispatch(actions.getAllPokemons());
      dispatch(actions.getTypes());
    }, [dispatch])
    
    const filterCreator = (e) => {
        dispatch(actions.filterByCreator(pokemons,e.target.value));
        setClick({
            ...click,
            creator: !click.creator
        })
    }
    const filterTypes = (e) => {
        dispatch(actions.filterByTypes(pokemons,e.target.value));
        setClick({
            ...click,
            types: !click.types
        })
    }
    const filterAttack = (e) => {
        dispatch(actions.filterByAttack(pokemons,e.target.value));
        setClick({
            ...click,
            attack: !click.attack
        })
    }
    const filterAlphOrder = (e) => {
        dispatch(actions.filterByAlphOrder(pokemons,e.target.value));
        setClick({
            ...click,
            alphorder: !click.alphorder
        })
    }

// Pagination ------------------------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const [pokesPerPage] = useState(12);

    // Get current pokemons
    const indexOfLastPoke = currentPage * pokesPerPage
    const indexOfFirstPoke = indexOfLastPoke - pokesPerPage
    const currentPokes = click.creator === false && click.types === false && click.attack === false && click.alphorder === false ? pokemons.slice(indexOfFirstPoke,indexOfLastPoke) : result.slice(indexOfFirstPoke,indexOfLastPoke);

    const pageNumber = Math.ceil(pokemons.length / pokesPerPage)
    
    // Change Page
    const next = () =>{
        if(currentPage < pageNumber) setCurrentPage(currentPage + 1);
        else setCurrentPage(1);
    }
    const back = () =>{
        if(currentPage !== 1) setCurrentPage(currentPage - 1);
        else setCurrentPage(pageNumber);
    }

    return(
        <div>
            <section className={s.heroHome} >
                <div className={s.hero} >
                    <div className={s.content}>
                        <h1>Discover all the details <br /> of your best-loved pokemons</h1>
                        <SearchBar />
                    </div>
                </div>
            </section>
            <section className={s.filter}>
                <div>
                    <select className={s.selector} id="creator" name="creator" value={click.creator} onChange={filterCreator} >
                        <option>Filter by Creator</option>
                        <option value="pokeapi">Poke Api</option>
                        <option value="own">Own Poke</option>
                    </select>
                </div>
                <div>
                    <select className={s.selector} id="types" name="types" value={click.types} onChange={filterTypes} >
                        <option>Filter by Types</option>
                        {types && types.map((type, i) => <option key={i} value={type.name} >{type.name}</option>)}
                    </select>
                </div>
                <div>
                    <select className={s.selector} id="attack" name="attack" value={click.attack} onChange={filterAttack} >
                        <option>Filter by Attack</option>
                        <option value="ws">Weak - Strong</option>
                        <option value="sw">Strong - Weak</option>
                    </select>
                </div>
                <div>
                    <select className={s.selector} id="alphorder" name="alphorder" value={click.alphorder} onChange={filterAlphOrder} >
                        <option>Filter by Order</option>
                        <option value="az">Aa - Zz</option>
                        <option value="za">Zz - Aa</option>
                    </select>
                </div>
            </section>
            <section>
                { pokemons.length < pokesPerPage ? 
                    <div>
                        <h2>Loading...</h2>
                    </div> :
                    <div>
                        <Pokemons pokemons={currentPokes}/>
                        <div className={s.pagination}>
                            { currentPage === 1 ?                              
                            <div className={s.pagbutton} >
                                <button className={s.disabled} disabled>Back</button>
                                <button className={s.next} onClick={next} >Next</button>
                            </div> :                             
                            <div className={s.pagbutton} >
                                <button className={s.back} onClick={back} >Back</button>
                                <button className={s.next} onClick={next} >Next</button>
                            </div>}
                        </div>
                    </div>
                }
            </section>
        </div>
    )
}