let alimentos = [];
let apiFood = [];



//Headers para consumir la api
//Hacemos fetch a la api https://tasty.p.rapidapi.com
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "d742d3e02emsh431ef8b4f86d09ap1b6f02jsn4d7e237b4c1b",
    "X-RapidAPI-Host": "tasty.p.rapidapi.com",
  },
};

const getFoodData = async () => {
  const resp = await fetch(
    "https://tasty.p.rapidapi.com/recipes/list?from=0&size=10&tags=under_30_minutes",
    options
  );
  const data = await resp.json();
  apiFood = data.results;
  showListApi();
};

getFoodData();


//Muestra en pantalla la lista de alimentos de la api que contengan HC
let listFoodApi;
function showListApi() {
  let foodWithHc = apiFood.filter((f) =>  f.nutrition.carbohydrates !== undefined)

  for (const item of foodWithHc) {
    let listFoodApi = document.getElementById("grid-columns-apiFood");
    let container = document.createElement("div");
    container.innerHTML = `
    <div class="card">
    <div class="card-image">
    <figure class="image is-4by3">
    <img src=${item.thumbnail_url} alt="image-food">
    </figure>
    </div>
    <div class="card-content">
    <div class="media">
    <div class="media-content">
    <p class="title is-4">${item.name}</p>
    <span class="my-3 description-api">${item.description}</span>
    <p class="title is-6">Carbohidratos: ${item.nutrition.carbohydrates}</p>
    <p class="title is-6">Tiempo de preparación: </p>
    <progress class="progress is-primary" value=${item.total_time_minutes} max="60">minutes</progress>
    <button type="button" class="button is-info" onclick={receta(${item.id})}>Ver receta</button>
    </div>
    </div>
    </div>
    </div>`;
    listFoodApi.appendChild(container);
  }
}



//Abrimos y cerramos el modal con evento onclick con la info de instrucciones
const openModal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
closeModal.addEventListener("click", () => {
  openModal.classList.remove("is-active");
  openModal.className = "modal";
});

let instructionsModal = document.getElementById("grid-columns-instructions");
function receta(id) {
  openModal.className = "modal is-active";
  instructionsModal.innerHTML = "";

  let instructions = [];

  //filtro por id todas las instrucciones
  let filterPerId = apiFood.filter((f) => f.id === id);

  //Solo me puede devolver una por cada Id. Recojo la primera de todas
  instructions = filterPerId[0].instructions;

  instructionsModal = document.getElementById("grid-columns-instructions");

  for (const item of instructions) {
    let container = document.createElement("div");
    container.innerHTML = `
    <li class="panel-block is-active">
    <span class="panel-icon">
    ${item.position}
    </span>
    ${item.display_text}
    </li>
    `;

    instructionsModal.appendChild(container);
  }
}
