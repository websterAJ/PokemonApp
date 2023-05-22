export const initialState = {
	pokemons: [],
	pokemon: {},
	ListTypes: [],
	loading: true,
	next: "",
	prev: ""
};

export default function rootReducer(state = initialState, action){
    switch (action.type) {
        case "GetAllPokemons":
            return {
				...state,
				pokemons: action.payload.data,
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

        case "filterByTypes":
            const allPokemons = [...state.pokemons];

			if (action.payload === "all") {
				return {
					...state,
					pokemons: allPokemons,
				};
			} else {
				const typesFiltered = allPokemons.filter(
					(pokemon) =>
						pokemon.types[0]?.name === action.payload ||
						pokemon.types[1]?.name === action.payload
				);

				return {
					...state,
					pokemons: typesFiltered,
				};
			}
        case "filterByOrder":
            const currentPokemons = [...state.pokemons];
			if (action.payload === "pokedex") {
				currentPokemons.sort((obj1, obj2) => {
					if (obj1.id < obj2.id) {
						return -1;
					} else {
						return 1;
					}
				});
			}
			if (action.payload === "ascending") {
				currentPokemons.sort((obj1, obj2) => {
					if (obj1.name < obj2.name) {
						return -1;
					} else {
						return 1;
					}
				});
			}
			if (action.payload === "descending") {
				currentPokemons.sort((obj1, obj2) => {
					if (obj1.name < obj2.name) {
						return 1;
					} else {
						return -1;
					}
				});
			}
			return {
				...state,
				pokemons: currentPokemons,
			};
        default:
            return state;
    }
}