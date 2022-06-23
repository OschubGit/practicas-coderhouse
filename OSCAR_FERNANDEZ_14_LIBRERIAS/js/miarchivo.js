let defaultImage = "./images/default-placeholder.png"
function Alimento(alimento, category, image, pesoRacion, proteina, hidratosCarbono, total) {
	this.id = Math.random();
	this.alimento = alimento ? alimento : propNoDefinida;
	this.category = category ? category : propNoDefinida;
	this.image = image ? image : defaultImage;
	this.pesoRacion = pesoRacion ? pesoRacion : propNoDefinida;
	this.propiedades = {
		proteina: proteina ? proteina : propNoDefinida,
		hidratosCarbono: hidratosCarbono ? hidratosCarbono : propNoDefinida,
	};
	this.total = total ? total : propNoDefinida;
}

let alimentos = [];
let totalRaciones;
let foodCategory = Object.values(typeCategory).map((m) => m)

//Comprueba si hay aliemntos añadidos
if (localStorage.getItem("alimentos") && JSON.parse(localStorage.getItem("alimentos"))) {
  alimentos = JSON.parse(localStorage.getItem("alimentos"));
  showList()
}
//Comprueba si hay total de raciones añadidas
if (sessionStorage.getItem("total-raciones") && JSON.parse(sessionStorage.getItem("total-raciones"))) {
  totalRaciones = JSON.parse(sessionStorage.getItem("total-raciones"));
  let anadirRaciones = document.getElementById("raciones");
	anadirRaciones.innerHTML = "Tienes un total de "+ totalRaciones;
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


function ingresarNuevo({ alimento, category, image, peso, hc, proteina, total }) {
	let nuevoAlimento = new Alimento(alimento, category, image, peso, hc, proteina, total);
	//anadimos el nuevo aliemnto al array de alimentos
	alimentos.push(nuevoAlimento);
}

//muestra en pantalla la lista de alimentos
function showList() {
    for (const alimento of alimentos) {
      let list = document.getElementById("grid-columns-food");
      let contenedor = document.createElement("div");
      contenedor.innerHTML = `
                  <div class="card">
				  <div class="total" onclick={selectCard(${alimento.total})}>${alimento.total}r</div>
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

/* select card */
let raciones = [];
function selectCard(total) {
	raciones.push(total)
	totalRaciones = raciones.reduce((a, b) => a + b).toFixed(2);
	console.log(totalRaciones)
	sessionStorage.setItem("total-raciones", JSON.stringify(totalRaciones));
	let anadirRaciones = document.getElementById("raciones");
	anadirRaciones.innerHTML = "Tienes un total de "+ totalRaciones;
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
let saveFoodImage;
let newFoodModal = document.getElementById("input-food-modal");
newFoodModal.addEventListener("input", () => {
	saveFood = newFoodModal.value;
});
let newFoodImageModal = document.getElementById("input-food-image-modal");
newFoodImageModal.addEventListener("input", () => {
	saveFoodImage = newFoodImageModal.value;
});


function editCard(id){
	alimentos = JSON.parse(localStorage.getItem("alimentos"))
	respuestaEditar()
	let formEdit = document.getElementById("formEdit");
	formEdit.addEventListener("submit", (e) => {
		e.preventDefault();
		let getOption = document.getElementById("selectOptionsEdit");
		const findAlimento = alimentos.findIndex((item) => item.id === id);
		alimentos[findAlimento].alimento = saveFood ? saveFood : alimentos[findAlimento].alimento;
		alimentos[findAlimento].category = getOption.value;
		alimentos[findAlimento].image = saveFoodImage ? saveFoodImage : alimentos[findAlimento].image;
		localStorage.setItem("alimentos", JSON.stringify(alimentos))
		list.innerHTML = "";
		showList();
		Toastify({
			text: "Editado correctamente",
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
			background: "#f14668",
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
	let category = document.getElementById("selectOptions").value;
	let image_input = document.querySelector("#image_input")
	let upload_image = image_input.value;
	let total = (pesoRacion * hc) / 1000;

	console.log(upload_image)
	let alimento = new Alimento(food, category, upload_image, pesoRacion, proteina, hc, total.toFixed(1));
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
	  let nombre = alimento.alimento.toLowerCase();
	  if (nombre.indexOf(text) !== -1) {
		cardContainer.innerHTML += `
			  <div class="card">
			  <div class="total">${alimento.total}r</div>
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

