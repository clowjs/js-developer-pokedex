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

    pokemonModel.abilities = pokemon.abilities.map(ability => ability.ability.name);
    pokemonModel.height = pokemon.height;
    pokemonModel.weight = pokemon.weight;
    pokemonModel.hp = pokemon.stats.find(stat => stat.stat.name === "hp").base_stat;
    pokemonModel.attack = pokemon.stats.find(stat => stat.stat.name === "attack").base_stat;
    pokemonModel.defense = pokemon.stats.find(stat => stat.stat.name === "defense").base_stat;
    pokemonModel.spAttack = pokemon.stats.find(stat => stat.stat.name === "special-attack").base_stat;
    pokemonModel.spDefense = pokemon.stats.find(stat => stat.stat.name === "special-defense").base_stat;
    pokemonModel.speed = pokemon.stats.find(stat => stat.stat.name === "speed").base_stat;

    return pokemonModel;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then(response => response.json())
        .then(convertToPokemonModel)
        .catch(error => console.error(error))
}

pokeApi.getPokemonDetailById = (id) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(convertToPokemonModel)
        .catch(error => console.error(error))
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
    .then(response => response.json())
    .then(jsonBody => jsonBody.results)
    .then(pokemons => pokemons.map(pokeApi.getPokemonDetail))
    .then(requests => Promise.all(requests))
    .catch(error => console.error(error))
}