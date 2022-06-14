//Comprueba si hay aliemntos añadidos
if (
  localStorage.getItem("alimentos") &&
  JSON.parse(localStorage.getItem("alimentos"))
) {
  alimentos = JSON.parse(localStorage.getItem("alimentos"));
  showList();
}

if (!localStorage.getItem("name")) {
  window.location = "index.html";
}

//muestra en pantalla la lista de alimentos
function showList() {
  for (const alimento of alimentos) {
    let list = document.getElementById("grid-columns-food");
    let contenedor = document.createElement("div");
    contenedor.className = "column is-one-quarter";
    contenedor.innerHTML = `
                  <div class="card">
                      <div class="card-image">
                      <figure class="image is-4by3">
                          <img src=${alimento.image} alt="image-food">
                      </figure>
                      </div>
                      <div class="card-content">
                      <div class="media">
                          <div class="media-content">
                          <p class="title is-4">${alimento.alimento}</p>
                          <p>Categoría:</p>
						  <span class="tag is-link is-normal is-light mb-3">${alimento.category}</span>
                          <p>Hidratos de Carbono:</p>
                          <p class="title is-6">${alimento.propiedades.hidratosCarbono}</p>
                          </div>
                      </div>
                      </div>
                      </div>
                  </div>`;
    list.appendChild(contenedor);
  }
}


