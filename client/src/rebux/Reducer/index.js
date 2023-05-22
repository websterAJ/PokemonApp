export const initialState = {
	ListAllPokemons: [],
	pokemon: {},
	ListTypes: [],
	loading: false,
};

export default function rootReducer(state = initialState, action){
    switch (action.type) {
        case "GetAllPokemons":
            return {
				...state,
				pokemonsList: [...action.payload],
				allPokemonsList: [...action.payload],
				createdPokemonFiltered: [...action.payload],
				loading: false,
			};
        case "GetAllTypes":
            return {
				...state,
				typesList: action.payload,
			};
        case "GetPokemonByName":
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
            const allPokemons = [...state.createdPokemonFiltered];

			if (action.payload === "all") {
				return {
					...state,
					pokemonsList: allPokemons,
				};
			} else {
				const typesFiltered = allPokemons.filter(
					(pokemon) =>
						pokemon.types[0]?.name === action.payload ||
						pokemon.types[1]?.name === action.payload
				);

				return {
					...state,
					pokemonsList: typesFiltered,
				};
			}
        case "filterByOrder":
            const currentPokemons = [...state.pokemonsList];
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
				pokemonsList: currentPokemons,
			};
        default:
            return state;
    }
}