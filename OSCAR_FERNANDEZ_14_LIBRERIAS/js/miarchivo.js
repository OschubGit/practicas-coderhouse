//Validar formulario > linea 
//Edicion card > linea 
//Delete card > linea 
//Mostrar lista > linea 
//Cerrar modal > linea
//Filtrar por categorias > linea
//Buscador del navegador > linea


let defaultImage = "./images/default-placeholder.png"
let propNoDefinida = "No definido";


//Estructura de nuestro array
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



//Variables
let alimentos = [];
let selectOptions = "";
let selectOption = document.getElementById("selectOptions");
let list = document.getElementById("grid-columns-food");
let saveFood;
let saveFoodImage;
let totalRaciones;
let foodCategory = Object.values(typeCategory).map((m) => m)



//Comprueba si hay aliemntos anadidos al cargar la pagina
if (localStorage.getItem("alimentos") && JSON.parse(localStorage.getItem("alimentos"))) {
  alimentos = JSON.parse(localStorage.getItem("alimentos"));
  showList()
}

//Comprueba que si entras sin usuario te redirige al login
if (!localStorage.getItem("name")) {
	window.location = "index.html";
}

//Mostrar nombre del usuario del localStorage
let user = localStorage.getItem("name");
let addName = document.getElementById("title");
addName.innerHTML = "Hola, " + user + ". Añade y edita tus alimentos";



//Muestra en pantalla la lista de alimentos
function showList() {
    for (const alimento of alimentos) {
      let list = document.getElementById("grid-columns-food");
      let contenedor = document.createElement("div");
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
						  <div class="title is-5 raciones">
						  ${alimento.total > 7 ? (
							`
							<ion-icon style="color: red;" name="alert-circle-outline"></ion-icon>
							${alimento.total}raciones
							`
						  ) : (
							`
							<ion-icon style="color: green;" name="checkmark-circle-outline"></ion-icon>
							${alimento.total}raciones
							`
						  )}
						  </div>
                          <p class="title is-4">${alimento.alimento}</p>
                          <p>Categoría:</p>
						  <span class="tag is-link is-normal is-light mb-3">${alimento.category}</span>
                          <p>Hidratos de Carbono:</p>
                          <p class="title is-6">${alimento.propiedades.hidratosCarbono}</p>
						  <p>Peso en gramos:</p>
						  <p class="title is-6">${alimento.pesoRacion} gramos</p>
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



//Cargamos las categorias del formulario con el ENUM typeCategory
for (const category of foodCategory) {
foodCategory = Object.values(typeCategory).map((m) => m)
	let list  = document.getElementById("selectOptions");
    let contenedor = document.createElement("option");
    contenedor.innerHTML = category;
    list.appendChild(contenedor);
}

//Cargamos las categorias en el selector del modal de edicion
for (const category of foodCategory) {
	let list  = document.getElementById("selectOptionsEdit");
    let contenedor = document.createElement("option");
    contenedor.innerHTML = category;
    list.appendChild(contenedor);
}

//Cargamos las categorias en el selector del menu de navegación
for (const category of foodCategory) {
	let list = document.querySelector(".navbar-dropdown");
	let contenedor = document.createElement("div");
	contenedor.className = "navbar-item";
	contenedor.innerHTML = `<button type="button" class="button is-white btnfilter">${category}</button>`;
	list.appendChild(contenedor);
  }



//Edicion de alimentos
//Abrimos modal con evento onClick
let openModal = document.getElementById("modal");

//Anadimos la clase is-active en el modal para activarlo al ejecutar la funcion
function respuestaEditar() {
	openModal.className = "modal is-active";
}

//Cerramos modal con evento onClick
const closeModal = document.getElementById("closeModal");
closeModal.addEventListener("click", () => {
	openModal.classList.remove("is-active");
	openModal.className = "modal";
});



//Asignamos los nuevos valores del modal de edicion
let newFoodModal = document.getElementById("input-food-modal");
newFoodModal.addEventListener("input", () => {
	saveFood = newFoodModal.value;
});

let newFoodImageModal = document.getElementById("input-food-image-modal");
newFoodImageModal.addEventListener("input", () => {
	saveFoodImage = newFoodImageModal.value;
});

let newPesoRacion = document.getElementById("input-peso-racion-modal");
newPesoRacion.addEventListener("input", () => {
	savePesoRacion = newPesoRacion.value;
});



//Deteccion de onclick editar
let getOption;
let findAlimento;

function editCard(id){
	alimentos = JSON.parse(localStorage.getItem("alimentos"))
	respuestaEditar()
	getOption = document.getElementById("selectOptionsEdit");
	findAlimento = alimentos.findIndex((item) => item.id === id);
}

//Ejecutamos edicion de formulario
let formEdit = document.getElementById("formEdit");
	formEdit.addEventListener("submit", (e) => {
		e.preventDefault();
		alimentos[findAlimento].alimento = saveFood ? saveFood : alimentos[findAlimento].alimento;
		alimentos[findAlimento].pesoRacion = savePesoRacion ? savePesoRacion : alimentos[findAlimento].pesoRacion;
		alimentos[findAlimento].total = (savePesoRacion * alimentos[findAlimento].propiedades.hidratosCarbono) / 1000;
		alimentos[findAlimento].category = getOption.value;
		alimentos[findAlimento].image = saveFoodImage ? saveFoodImage : defaultImage;
		list.innerHTML = "";
		localStorage.setItem("alimentos", JSON.stringify(alimentos))
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



//Borrar alimento al cliclar btn eliminar
//Filtramos por todos los alimentos menos el seleccionado y actualizamos array
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
		onClick: function(){}
	}).showToast();
	const filtrarAlimentoDelete = alimentos.filter((i) => i.id != id);
	alimentos = filtrarAlimentoDelete;
	list.innerHTML = "";
  	localStorage.setItem("alimentos", JSON.stringify(alimentos))
	showList();
}


//Validacion de formulario
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
	let alimento = new Alimento(food, category, upload_image, pesoRacion, proteina, hc, total.toFixed(1));
  	alimentos.push(alimento)
	miFormulario.reset();

	list.innerHTML = "";
  	localStorage.setItem("alimentos", JSON.stringify(alimentos))

	showList();
}



//Filtrar alimentos por categoria cuando se selecciona en el menu de navegacion
//Detectamos cada uno de los items con queryselctor
let btnFilter = document.querySelectorAll(".btnfilter");

//Iteración por cada categoria de alimento para detectar el click
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



//Buscador del navegador
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
			<div class="card-image">
			<figure class="image is-4by3">
				<img src=${alimento.image} alt="image-food">
			</figure>
			</div>
			<div class="card-content">
			<div class="media">
				<div class="media-content">
				<div class="title is-5 raciones">
				${alimento.total > 7 ? (
					`
				  <ion-icon style="color: red; name="alert-circle-outline"></ion-icon>
				  ${alimento.total}raciones
				  `
				) : (
				  `
				  <ion-icon style="color: green;" class="checkmark-circle-outline" name="checkmark-circle-outline"></ion-icon>
				  ${alimento.total}raciones
				  `
				)}
				</div>
				<p class="title is-4">${alimento.alimento}</p>
				<p>Categoría:</p>
				<span class="tag is-link is-normal is-light mb-3">${alimento.category}</span>
				<p>Hidratos de Carbono:</p>
				<p class="title is-6">${alimento.propiedades.hidratosCarbono}</p>
				<p>Peso en gramos:</p>
				<p class="title is-6">${alimento.pesoRacion} gramos</p>
				</div>
			</div>
			<hr>
			<div class="content">
			<button type="button" class="button is-outlined is-info" onclick={editCard(${alimento.id})}>Editar</button>
			<button type="button" class="button is-danger is-outlined" onclick={deleteCard(${alimento.id})}>Eliminar</button>
			</div>
			</div>
		</div>`;
			card.appendChild(cardContainer);
		}
	}
	if (card.innerHTML === "") {
		cardContainer.innerHTML = `<p>No hay nada que coincida con ${text}</p>`;
		card.appendChild(cardContainer);
	}
}


//Cerramos mensaje de no hay coincidencias al filtrar
function deleteWarning() {
	const deleteWarning = document.getElementById("delete-warning");
	deleteWarning.remove();
}