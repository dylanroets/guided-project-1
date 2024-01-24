let nameH1;
let climateSpan;
let terrainSpan;
let populationSpan;
let filmsUl;
let residentsUl;
const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener("DOMContentLoaded", () => {
  nameH1 = document.querySelector("h1#name");
  climateSpan = document.querySelector("span#climate");
  terrainSpan = document.querySelector("span#terrain");
  populationSpan = document.querySelector("span#population");
  filmsUl = document.querySelector("#films>ul");
  residentsUl = document.querySelector("#residents>ul");

  const sp = new URLSearchParams(window.location.search);
  const id = sp.get("id");
  getPlanet(id);
});

async function getPlanet(id) {
  let planet;
  try {
    planet = await fetchPlanet(id);
    planet.films = await fetchFilms(planet);
    planet.residents = await fetchResidents(planet);
  } catch (ex) {
    console.error(`Error reading planet ${id} data.`, ex.message);
  }
  renderPlanet(planet);
}

async function fetchPlanet(id) {
  let planetUrl = `${baseUrl}/planets/${id}`;
  return await fetch(planetUrl).then((res) => res.json());
}

async function fetchFilms(planet) {
  const url = `${baseUrl}/planets/${planet?.id}/films`;
  const films = await fetch(url).then((res) => res.json());
  return films;
}

async function fetchResidents(planet) {
  const url = `${baseUrl}/planets/${planet?.id}/residents`;
  const residents = await fetch(url).then((res) => res.json());
  return residents;
}

const renderPlanet = (planet) => {
  document.title = `SWAPI - ${planet?.name}`;
  nameH1.textContent = planet?.name;
  climateSpan.textContent = planet?.climate;
  terrainSpan.textContent = planet?.terrain;
  populationSpan.textContent = planet?.population;

  const filmsLis = planet?.films?.map(
    (film) => `<li><a href="/film.html?id=${film.id}">${film.title}</a></li>`
  );
  filmsUl.innerHTML = filmsLis.join("");

  const residentsLis = planet?.residents?.map(
    (resident) =>
      `<li><a href="/character.html?id=${resident.id}">${resident.name}</a></li>`
  );
  residentsUl.innerHTML = residentsLis.join("");
};
