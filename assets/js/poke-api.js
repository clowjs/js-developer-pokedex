const pokeApi = {}

function convertToPokemonModel(pokemon) {
    const pokemonModel = new Pokemon();
    const types = pokemon.types.map(type => type.type.name);
    const [ type ] = types;

    pokemonModel.name = pokemon.name;
    pokemonModel.id = pokemon.id;
    pokemonModel.types = types
    pokemonModel.type = type
    pokemonModel.imgUrl = pokemon.sprites.other.dream_world.front_default;

    return pokemonModel;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then(response => response.json())
        .then(convertToPokemonModel)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
    .then(response => response.json())
    .then(jsonBody => jsonBody.results)
    .then(pokemons => pokemons.map(pokeApi.getPokemonDetail))
    .then(requests => Promise.all(requests))
}