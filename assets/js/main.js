const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
let offset = 0;
const limit = 10;
const maxRecords = 151;

function loadPokemonItems(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {

        const newHtml = pokemons.map(pokemon => `
            <a href="detail.html?id=${pokemon.id}">
                <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.id.toString().padStart(3, "0")}</span>
                    <span class="name">${pokemon.name}</span>
            
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join("")}
                        </ol>    
                        <img src="${pokemon.imgUrl}" alt="${pokemon.name}">
                    </div>
                </li>
            </a>
        `).join("");

        pokemonList.innerHTML += newHtml;
    })
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;

    const recordsNextPage = offset + limit;

    if (recordsNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItems(offset, newLimit);
        
        loadMoreButton.parentElement.removeChild(loadMoreButton);
        
    } else {
        loadPokemonItems(offset, limit);
    }
});