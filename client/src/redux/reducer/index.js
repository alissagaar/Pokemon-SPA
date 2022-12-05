const initialState = {
    pokes: [],
    filter:[],
    pokeById: {},
    pokeByName: {},
    types: [],
}

export default function rootReducer(state= initialState, action){
    switch (action.type) {
        case 'GET_ALL_POKEMONS':
            return {
                ...state,
                pokes: action.payload,
            }
        case 'GET_POKEMON_BY_ID':
            return {
                ...state,
                pokeById: action.payload,
            }
        case 'GET_POKEMON_BY_NAME':
            return {
                ...state,
                pokeByName: action.payload,
            }
        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload,
            }
        case 'CREATE_POKEMON':
            const newPoke = {
                id: action.payload.id,
                name: action.payload.name,
                types: action.payload.types.map(t => { return {name: t.name} }),
                hp: action.payload.hp,
                attack: action.payload.attack,
                defense: action.payload.defense,
                speed: action.payload.speed,
                height: action.payload.height,
                weight: action.payload.weight,
                image: action.payload.image
            }
            return {
                ...state,
                pokes: [...state.pokes, newPoke],
            }
        case 'FILTER_BY_TYPES':
            return {
                ...state,
                filter: action.payload,
            }
        case 'FILTER_BY_CREATOR':
            return {
                ...state,
                filter: action.payload,
            }
        case 'FILTER_BY_ALPHORDER':
            return {
                ...state,
                filter: action.payload,
            }
        case 'FILTER_BY_ATTACK':
            return {
                ...state,
                filter: action.payload,
            }
        default:
            return {...state}
    }
}