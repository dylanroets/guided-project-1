let filmName;
let planetsUL;
let charactersUL;
let releaseDate;
let director;
let producer;
const baseUrl = `https://swapi2.azurewebsites.net/api/films`;

addEventListener('DOMContentLoaded', () => {
    filmName = document.querySelector("h1#name");
    planetsUL = document.querySelector("#planets>ul");
    charactersUL = document.querySelector("#characters>ul");
    releaseDate = document.querySelector("span#releaseDate");
    director = document.querySelector("span#director");
    producer = document.querySelector("span#producer");
    const sp = new URLSearchParams(window.location.search);
    const id = sp.get("id");
    getFilm(id);
})

async function getFilm(id){
    let film;
    try{
        film = await fetchFilm(id);
        film.characters = await fetchCharacters(id);
        film.planets = await fetchPlanets(id);
    }catch{
        console.error(`Error reading film ${id} data.`, ex.message);
    }
    renderFilm(film);
}

async function fetchFilm(id){
    let filmsUrl = `${baseUrl}/${id}`;
    return await fetch(filmsUrl).then((res) => res.json());
}

async function fetchCharacters(id){
    const url = `${baseUrl}/${id}/characters`;
    const characters = await fetch(url).then((res) => res.json());
    return characters;
}

async function fetchPlanets(id){
     const url = `${baseUrl}/${id}/planets`;
     const planets = await fetch(url).then((res) => res.json());
     return planets;
}

const renderFilm = (film) => {
    document.title = `SWAPI - ${film?.name}`;
    filmName.textContent = film?.title;
    releaseDate.textContent = film?.release_date;
    director.textContent = film?.director;
    producer.textContent = film?.producer;
    const characterList = film?.characters?.map(
      (character) => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`
    );
    charactersUL.innerHTML = characterList.join("");
    const planetList = film?.planets?.map(
      (planet) =>
        `<li><a href="/character.html?id=${planet.id}">${planet.name}</li>`
    );
    planetsUL.innerHTML = planetList.join("");
};