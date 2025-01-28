const resultArtist = document.getElementById("result-artist");
const playlistContainer = document.getElementById("result-playlists");
const searchInput = document.getElementById("search-input");
let debounceTimeout;

function requestApi(searchTerm) {
  fetch(`http://localhost:3000/artists?name_like=${searchTerm}`)
    .then((response) => response.json())
    .then((results) => displayResults(results))
    .catch((error) => {
      console.error('Erro ao buscar artistas:', error);
      resultArtist.innerHTML = 'Erro ao carregar os resultados.';
      resultArtist.classList.remove("hidden");
    });
}

function displayResults(results) {
  hidePlaylists();
  const artistImage = document.getElementById("artist-img");
  const artistName = document.getElementById("artist-name");

  if (results.length > 0) {
    const element = results[0]; // Supondo que você quer exibir o primeiro artista
    artistImage.src = element.urlImg;
    artistName.innerText = element.name;
    resultArtist.classList.remove("hidden");
  } else {
    resultArtist.innerHTML = 'Nenhum artista encontrado.';
    resultArtist.classList.remove("hidden");
  }
}

function hidePlaylists() {
  playlistContainer.classList.add("hidden");
}

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm === "") {
    resultArtist.classList.add("hidden");
    playlistContainer.classList.remove("hidden");
    return;
  }

  clearTimeout(debounceTimeout); // Limpa o timeout anterior
  debounceTimeout = setTimeout(() => {
    requestApi(searchTerm);
  }, 500); // 500ms de delay para evitar chamadas excessivas
});
