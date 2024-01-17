const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const detailContent = document.getElementById('detailContent');

function loadPokemonDetails(id) {
  pokeApi.getPokemonDetailById(id).then((pokemon) => {

    const newHtml = `
      <section class="detailCard ${pokemon.type}">

      <div class="nagivation">
        <a href="./index.html">
            <span class="material-symbols-rounded">
                arrow_back
            </span>
        </a>
      </div>

      <div class="nameAndNumber">
        <span class="name">${pokemon.name}</span>
        <span class="number">#${pokemon.id.toString().padStart(3, "0")}</span>
      </div>

     <ol class="types">
        ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join("")}
     </ol>

    <img id="pokemonImg" src="${pokemon.imgUrl}" alt="${pokemon.name}">

    <div class="details">

        <div class="detail">
            <h4>About</h4>
            <ul>
                <li class="detailItem">
                    <span class="item">Height</span>
                    <span>
                      ${Math.floor(pokemon.height * 0.32808)}' 
                      ${Math.floor(12 * ((pokemon.height * 0.32808) - Math.floor(pokemon.height * 0.32808)))}" 
                      (${(pokemon.height * 0.1).toFixed(2)} m)
                    </span>
                </li>
                <li class="detailItem">
                    <span class="item">Weight</span>
                    <span>${(pokemon.weight / 4.5360).toFixed(2)} lbs (${(pokemon.weight * 0.1).toFixed(2)} kg)</span>
                </li>
                <li class="detailItem">
                    <span class="item">Abilities</span>
                    <span class="abilities">${
                      pokemon.abilities.map(x => x.replace("-", " ")).join(", ")
                    }</span>
                </li>
                
            </ul>
        </div>

        <div class="detail">
            <h4>Base Stats</h4>
            <ul>
                <li class="detailItem">
                    <span class="item">HP</span>
                    <span>${pokemon.hp}</span>
                </li>
                <li class="detailItem">
                    <span class="item">Attack</span>
                    <span>${pokemon.attack}</span>
                </li>
                <li class="detailItem">
                    <span class="item">Defense</span>
                    <span>${pokemon.defense}</span>
                </li>
                <li class="detailItem">
                    <span class="item">Sp. Atk</span>
                    <span>${pokemon.spAttack}</span>
                </li>
                <li class="detailItem">
                    <span class="item">Sp. Def</span>
                    <span>${pokemon.spDefense}</span>
                </li>
                <li class="detailItem">
                    <span class="item">Speed</span>
                    <span>${pokemon.speed}</span>
                </li>
                
            </ul>
        </div>

      </div>

      </section>
    `

    detailContent.innerHTML = newHtml;
  })
  .catch(error => console.error(error));
}

loadPokemonDetails(id);