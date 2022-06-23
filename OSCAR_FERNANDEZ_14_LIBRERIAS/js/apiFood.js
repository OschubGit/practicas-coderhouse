let alimentos = [];
let apiFood = [];
let apiFoodGithub = [];
let cardContainer;

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "d742d3e02emsh431ef8b4f86d09ap1b6f02jsn4d7e237b4c1b",
    "X-RapidAPI-Host": "tasty.p.rapidapi.com",
  },
};

fetch(
  "https://tasty.p.rapidapi.com/recipes/list?from=0&size=10&tags=under_30_minutes",
  options
)
  .then((resp) => resp.status === 200 && resp.json())
  .then((data) => {
    apiFood = data.results;
    console.log(apiFood);
  });

setTimeout(showListApi, 4000);
let listFoodApi;
//muestra en pantalla la lista de alimentos
function showListApi() {
  const filterPerNutrients = apiFood.filter(
    (f) => f.nutrition.carbohydrates < 30
  );
  apiFood = filterPerNutrients;
  for (const item of apiFood) {
    let listFoodApi = document.getElementById("grid-columns-apiFood");
    let contenedorApi = document.createElement("div");
    contenedorApi.className = "column is-one-quarter";
    contenedorApi.innerHTML = `
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
    <button type="button" onclick={receta(${item.id})}>Ver receta</button>
    </div>
    </div>
    </div>
    </div>`;
    listFoodApi.appendChild(contenedorApi);
  }
}

//abrimos y cerramos el modal con evento onclick
let openModal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
closeModal.addEventListener("click", () => {
	openModal.classList.remove("is-active");
	openModal.className = "modal";
});


let instructionsApi = document.getElementById("grid-columns-instructions");
function receta(id) {
  openModal.className = "modal is-active";
  instructionsApi.innerHTML = "";
  
  let instructions = [];

  //filtro por id todas las instrucciones
  let filterPerId = apiFood.filter((f) => f.id === id);
  //como solo me puede devolver una por cada Id recojo la primera de todas
  instructions = filterPerId[0].instructions;

  //recojo en la variable tags todos los tags de la receta seleccionada
  let tags = filterPerId[0].tags;
  //concateno el array de instrucciones y el de tags
  let instructionsTag = instructions.concat(tags)

  for (let i = 0; i < instructions.length; i++) {
    
  }

  instructionsApi = document.getElementById("grid-columns-instructions");

  for (const item of instructionsTag) {
    let contenedorApi = document.createElement("div");
    contenedorApi.innerHTML = `
    <li class="panel-block is-active">
    <span class="panel-icon">
    ${item.position}
    </span>
    ${item.display_text}
    </li>
    ${item.display_name && item.display_name}
    `;

    instructionsApi.appendChild(contenedorApi);
  }
}
showListApi();
