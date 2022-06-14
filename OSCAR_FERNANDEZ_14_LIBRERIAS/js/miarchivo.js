function Alimento(alimento, category, pesoRacion, proteina, hidratosCarbono) {
	this.id = Math.random();
	this.alimento = alimento ? alimento : propNoDefinida;
	this.category = category ? category : propNoDefinida;
	this.image =
		"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880";
	this.pesoRacion = pesoRacion ? pesoRacion : propNoDefinida;
	this.propiedades = {
		proteina: proteina ? proteina : propNoDefinida,
		hidratosCarbono: hidratosCarbono ? hidratosCarbono : propNoDefinida,
	};
}

let alimentos = [];
let foodCategory = Object.values(typeCategory).map((m) => m)

//Comprueba si hay aliemntos añadidos
if (localStorage.getItem("alimentos") && JSON.parse(localStorage.getItem("alimentos"))) {
  alimentos = JSON.parse(localStorage.getItem("alimentos"));
  showList()
}


if (!localStorage.getItem("name")) {
	window.location = "index.html";
}

let user = localStorage.getItem("name");
let addName = document.getElementById("title");
addName.innerHTML = "Hola, " + user + ". Añde y edita tus alimentos";

let propNoDefinida = "No definido";

// Selectores
let selectOptions = "";
let selectOption = document.getElementById("selectOptions");
let list = document.getElementById("grid-columns-food");


function ingresarNuevo({ alimento, category, peso, hc, proteina }) {
	let nuevoAlimento = new Alimento(alimento, category, peso, hc, proteina);
	//anadimos el nuevo aliemnto al array de alimentos
	alimentos.push(nuevoAlimento);
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
					  <hr>
                      <div class="content">
                      <button type="button" class="button is-outlined is-info" onclick={editCard(${alimento.id})}>Editar</button>
                      <button type="button" class="button is-danger is-outlined" onclick={deleteCard(${alimento.id})}>Eliminar</button>
                      </div>
                      </div>
                  </div>`;
      list.appendChild(contenedor);
	}
}

/* Create options for menu in navbar */
for (const item of foodCategory) {
foodCategory = Object.values(typeCategory).map((m) => m)
	let list  = document.getElementById("selectOptions");
    let contenedor = document.createElement("option");
    contenedor.innerHTML = item;
    list.appendChild(contenedor);
}
/* Create options for edit select in modal */
for (const item of foodCategory) {
	let list  = document.getElementById("selectOptionsEdit");
    let contenedor = document.createElement("option");
    contenedor.innerHTML = item;
    list.appendChild(contenedor);
}

/* EDITAR CARD */
let openModal = document.getElementById("modal");
//abrimos y cerramos el modal con evento onclick
const closeModal = document.getElementById("closeModal");
closeModal.addEventListener("click", () => {
	openModal.classList.remove("is-active");
	openModal.className = "modal";
});
function respuestaEditar() {
	openModal.className = "modal is-active";
}

let saveFood;
let newFoodModal = document.getElementById("input-food-modal");
newFoodModal.addEventListener("input", () => {
	saveFood = newFoodModal.value;
});


function editCard(id){
	alimentos = JSON.parse(localStorage.getItem("alimentos"))
	respuestaEditar()
	let formEdit = document.getElementById("formEdit");
	formEdit.addEventListener("submit", (e) => {
		e.preventDefault();
		let getOption = document.getElementById("selectOptionsEdit");
		const findAlimento = alimentos.findIndex((item) => item.id === id);
		alimentos[findAlimento].alimento = saveFood;
		alimentos[findAlimento].category = getOption.value;
		localStorage.setItem("alimentos", JSON.stringify(alimentos))
		list.innerHTML = "";
		showList();
	});
}

//Borrar card filtrando por id y actualizando la lista
function deleteCard(id) {
	Toastify({
		text: "Eliminado correctamente",
		duration: 3000,
		newWindow: true,
		close: true,
		gravity: "bottom",
		position: "center",
		stopOnFocus: true,
		style: {
			background: "#485fc7",
		},
		onClick: function(){} // Callback after click
	}).showToast();
	const filtrarAlimentoDelete = alimentos.filter((i) => i.id != id);
	alimentos = filtrarAlimentoDelete;
	list.innerHTML = "";
  	localStorage.setItem("alimentos", JSON.stringify(alimentos))
	showList();
}


//validar datos con el formulario
let miFormulario = document.getElementById("formulario");
miFormulario.addEventListener("submit", validarFormulario);

function validarFormulario(e) {
  e.preventDefault();
	let food = document.getElementById("input-food").value;
	let pesoRacion = document.getElementById("input-peso-racion").value;
	let hc = document.getElementById("input-hc").value;
	let proteina = document.getElementById("input-proteina").value;
	//form para seleccionar alimento a editar
	let category = document.getElementById("selectOptions").value;

	let alimento = new Alimento(food, category, pesoRacion, proteina, hc);
  	alimentos.push(alimento)
	// Para vaciar todo, tomamos el id del formulario y usamos el método reset()
	miFormulario.reset();
  
	list.innerHTML = "";
  	localStorage.setItem("alimentos", JSON.stringify(alimentos))
	showList();
}


/* ALLFOODS */
/* Create options menu with enum values */
for (const item of foodCategory) {
	let list = document.querySelector(".navbar-dropdown");
	let contenedor = document.createElement("div");
	contenedor.className = "navbar-item";
	contenedor.innerHTML = `<button type="button" class="button is-white btnfilter">${item}</button>`;
	list.appendChild(contenedor);
  }
  
  /* Filtrar por item seleccionado */
  let btnFilter = document.querySelectorAll(".btnfilter");
  for (let x = 0; x < foodCategory.length; x++) {
	btnFilter[x].addEventListener("click", () => {
	  let result = btnFilter[x].innerHTML;
	  let filterPerId = JSON.parse(localStorage.getItem("alimentos")).filter(
		(f) => f.category === result
	  );
	  list.innerHTML = "";
	  alimentos = filterPerId;
	  let nameCat = document.getElementById("title");
	  nameCat.innerHTML = `Has filtrado por ${result}`;
	  if (filterPerId.length > 0) {
		showList();
	  } else {
		list.innerHTML = `
			  <div id="delete-warning" class="notification is-warning">
			  <button type="button" onclick={deleteWarning()} class="delete"></button>
			  No hay alimentos en la categoría ${result}.
			  </div>`;
	  }
	});
  }
  
  function deleteWarning() {
	const deleteWarning = document.getElementById("delete-warning");
	deleteWarning.remove();
  }
  
  /* BUSCADOR */
  let searchInputhtml = document.querySelector("#searchInput");
  let searchBtnHtml = document.getElementById("btnSearch");
  searchBtnHtml.addEventListener("click", filtrar);
  
  let card;
  let cardContainer;
  function filtrar() {
	list.innerHTML = "";
	let text = searchInputhtml.value.toLowerCase();
	for (const alimento of alimentos) {
	  card = document.getElementById("grid-columns-food");
	  cardContainer = document.createElement("div");
	  cardContainer.className = "column is-one-quarter";
	  let nombre = alimento.alimento.toLowerCase();
	  if (nombre.indexOf(text) !== -1) {
		cardContainer.innerHTML += `
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
			  `;
		card.appendChild(cardContainer);
	  }
	}
	if (card.innerHTML === "") {
	  cardContainer.innerHTML = `<p>No hay nada que coincida con ${text}</p>`;
	  card.appendChild(cardContainer);
	}
  }
/*   searchInputhtml.addEventListener("keyup", filtrar);
  filtrar(); */