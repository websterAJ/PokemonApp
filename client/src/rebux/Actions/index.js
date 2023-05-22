import axios from "axios";
const BASE_URL = process.env.Api;

export function GetPokemons() {
    return async function (dispatch) {
        try {
            return dispatch({
                type: "GetAllPokemons",
                payload: await axios(`${BASE_URL}/pokemons`)
            })
        } catch (err) {
            console.log({ msg: err.message })
        }
    }
}

export function getAllTypes() {
	return async function (dispatch) {
		try {
			return dispatch({
				type: "GetAllTypes",
				payload: await axios.get(`${BASE_URL}/types`)
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
				payload: await axios.get(`/pokemons/${id}`),
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function createPokemon(payload) {
	return async function (dispatch) {
		return dispatch({
            type: "CreatePokemon",
            payload: await axios.post("/pokemons", payload)
        });
	};
}

export function filterByTypes(payload) {
	return {
		type: "filterByTypes",
		payload,
	};
}

export function filterByOrder(payload) {
	return {
		type: "filterByOrder",
		payload,
	};
}