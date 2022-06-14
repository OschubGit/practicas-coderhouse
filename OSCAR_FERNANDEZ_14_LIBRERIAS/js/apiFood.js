let apiFood = [];
let cardContainer;

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "d742d3e02emsh431ef8b4f86d09ap1b6f02jsn4d7e237b4c1b",
    "X-RapidAPI-Host": "tasty.p.rapidapi.com",
  },
};


fetch("https://tasty.p.rapidapi.com/recipes/list?from=0&size=10&tags=under_30_minutes",options)
.then((resp) => resp.status === 200 && resp.json())
.then((data) => {
    apiFood = data.results;
    console.log(apiFood);
});

setTimeout(showListApi, 3000);
let listFoodApi;
//muestra en pantalla la lista de alimentos
function showListApi() {
    const filterPerNutrients = apiFood.filter((f) => f.nutrition.carbohydrates < 30)
    console.log(filterPerNutrients)
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
    </div>
    </div>
    </div>
    </div>`
    listFoodApi.appendChild(contenedorApi);
  }
}
showListApi()

