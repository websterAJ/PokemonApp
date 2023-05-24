export const initialState = {
	pokemons: [],
	Allpokemons:[],
	dataFilter:false,
	pokemon: {},
	ListTypes: [],
	loading: true,
	countPokemon:0,
	next: "",
	prev: ""
};

export default function rootReducer(state = initialState, action){
    switch (action.type) {
        case "GetAllPokemons":
            return {
				...state,
				pokemons: action.payload.data,
				countPokemon: action.payload.count,
				next: action.payload.next,
				prev: action.payload.prev,
				loading: false,
			};
        case "GetAllTypes":
            return {
				...state,
				ListTypes: action.payload,
			};
        case "GetPokemonByName":
            return {
                ...state,
                pokemons: action.payload
            }
		case "GetPokemonsByPage":
			return {
                ...state,
                pokemons: action.payload
            }
        case "CreatePokemon":
            return {
                ...state,
            }
		
        case "GetPokemonDetail":
            return {
                ...state,
                pokemon: action.payload,
                loading: false,
            };

		case "filterByName":
			if (action.payload.length>0) {
				let allPokemons = [...state.pokemons];
				let typesFiltered = allPokemons.filter((pokemon) =>{
					return pokemon.nombre.includes(action.payload)
				}
				);
				return{
					...state,
					pokemons: typesFiltered,
					dataFilter:true
				};
			}else{
				return state;
			}
        case "filterByTypes":
            let allPokemons = [...state.pokemons];
			if (action.payload === "All") {
				return {
					...state,
					pokemons: allPokemons,
				};
			} else {
				let typesFiltered = allPokemons.filter((pokemon) =>{
						return pokemon.Types.includes(action.payload)
					}
				);
				return {
					...state,
					pokemons: typesFiltered,
					dataFilter:true
				};
			}
        case "filterByOrder":
            let currentPokemons = [...state.pokemons];
			switch (action.payload) {
				case "pokedex":
					currentPokemons.sort((obj1, obj2) => {
						if (obj1.id < obj2.id) {
							return -1;
						} else {
							return 1;
						}
					});
					break;
				case "Order A-Z":
					currentPokemons.sort((obj1, obj2) => {
						if (obj1.nombre < obj2.nombre) {
							return -1;
						} else {
							return 1;
						}
					});
					break;
				case "Order Z-A":
					currentPokemons.sort((obj1, obj2) => {
						if (obj2.nombre > obj1.nombre) {
							return 1;
						} else {
							return -1;
						}
					});
					break;
				case "Attack +":
					currentPokemons.sort((obj1, obj2) => {
						if (obj1.ataque < obj2.ataque) {
							return 1;
						} else {
							return -1;
						}
					});
					break;
				case "Attack -":
					currentPokemons.sort((obj1, obj2) => {
						if (obj1.ataque > obj2.ataque) {
							return 1;
						} else {
							return -1;
						}
					});
					break;
				case "DB":
					currentPokemons=currentPokemons.filter(o => o["origin"]==="db" ? true : false);
					break;
				case "Api":
					currentPokemons=currentPokemons.filter(o => o["origin"]==="api" ? true : false);
					break;
				default:
					break;
			}
			return {
				...state,
				pokemons: currentPokemons,
				dataFilter:true
			};
		case "EMPTY_FILTER":
			let data;
			if(state.dataFilter === true){
				state.pokemons= state.Allpokemons;
				data=state.Allpokemons;
			}else{
				state.Allpokemons=state.pokemons;
				data=state.pokemons;
			}
			return {
				...state,
				pokemons: data,
			};
        default:
            return state;
    }
}