import axios from "axios";
const BASE_URL ="http://localhost:3001"
export function GetPokemons() {
    return async function (dispatch) {
        try {
			let data = await axios(`${BASE_URL}/pokemons`);
            dispatch({
                type: "GetAllPokemons",
                payload: data.data
            })
        } catch (err) {
            console.log({ msg: err.message })
        }
    }
}

export function GetPokemonsByPage(page) {
    return async function (dispatch) {
        try {
			let data = await axios(`${BASE_URL}/pokemons/${page}`);
            dispatch({
                type: "GetPokemonsByPage",
                payload: data.data
            })
        } catch (err) {
            console.log({ msg: err.message })
        }
    }
}

export function getAllTypes() {
	return async function (dispatch) {
		try {
			let data = await axios.get(`${BASE_URL}/types`);
			dispatch({
				type: "GetAllTypes",
				payload: data.data
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function getPokemonByName(name) {
	return async function (dispatch) {
		try {
			return dispatch({
				type: "GetPokemonByName",
				payload: await axios.get(`${BASE_URL}/pokemons/name?name=${name}`),
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function getPokemonDetail(id) {
	return async function (dispatch) {
		try {
			return dispatch({
				type: "GetPokemonDetail",
				payload: await axios.get(`${BASE_URL}/pokemons/${id}`),
			});
		} catch (error) {
			console.log(error.response);
		}
	};
}

export function createPokemon(payload) {
	return async function (dispatch) {
		return dispatch({
            type: "CreatePokemon",
            payload: await axios.post(`${BASE_URL}/pokemons`, payload)
        });
	};
}

export function filterByTypes(payload) {
	return async function(dispatch){ 
		return dispatch({
			type: "filterByTypes",
			payload,
		})
	};
}

export function filterByName(payload) {
	return async function(dispatch){ 
		return dispatch({
			type: "filterByName",
			payload,
		})
	};
}

export function filterByOrder(payload) {
	return async function(dispatch){ 
		return dispatch({
			type: "filterByOrder",
			payload,
		})
	};
}

export function ClearFilter(){
	return {
		type: "EMPTY_FILTER",
	};
}