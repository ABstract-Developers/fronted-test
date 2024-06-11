import axios from "axios"

export const getPokemonsByChunk = async (url) =>{
  const {data} = await axios.get(url);
  const promises = data.results.map((result) => axios(result.url));
  const fetchedPokemon = (await Promise.all(promises)).map(
    (res) => res.data
  );

  return ({
    count: data.count,
    pokemon: [...fetchedPokemon]
  });
}

export const saveNewPokemon = async (id, name) => {
    try {
      const response = await axios.post('api/catched/', {
        id: id,
        name: name
      },{
        "Content-type": "application/json"
      });
  
      console.log('Saved Pokémon:', response.data);
    } catch (error) {
      if (error.response) {
        console.error('Error on server response:', error.response.data);
      } else if (error.request) {
        console.error("There's not server answer: ", error.request);
      } else {
        console.error('Error on preparing request:', error.message);
      }
    }
  }