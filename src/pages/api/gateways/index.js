import axios from "axios";

export const getPokemonsByChunk = async (url) => {
  const { data } = await axios.get(url);
  const promises = data.results.map((result) => axios(result.url));
  const fetchedPokemon = (await Promise.all(promises)).map((res) => res.data);

  return {
    count: data.count,
    pokemon: [...fetchedPokemon],
  };
};

export const saveNewPokemon = async ({ id, name, source }) => {
  try {
    const response = await axios.post("api/catched/", {
      id,
      name,
      source,
    });
  } catch (error) {
    if (error.response) {
      console.error("Error on server response:", error.response.data);
    } else if (error.request) {
      console.error("There's not server answer: ", error.request);
    } else {
      console.error("Error on preparing request:", error.message);
    }
  }
};

export const getCatchedPokemons = async () => {
  try {
    const response = await axios.get("api/catched");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los Pokémon capturados:", error);
  }
};
export const deletePokemonById = async (id) => {
  try {
    const response = await axios.delete(`api/catched/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los Pokémon capturados:", error);
  }
};
