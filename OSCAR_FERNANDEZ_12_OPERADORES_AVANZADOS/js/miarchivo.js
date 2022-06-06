function Alimento(alimento, pesoRacion, proteina, hidratosCarbono) {
	this.id = Math.random();
	this.alimento = alimento ? alimento : propNoDefinida;
	this.image =
		"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880";
	this.pesoRacion = pesoRacion ? pesoRacion : propNoDefinida;
	this.propiedades = {
		proteina: proteina ? proteina : propNoDefinida,
		hidratosCarbono: hidratosCarbono ? hidratosCarbono : propNoDefinida,
	};
}

let alimentos = [];

if (JSON.parse(localStorage.getItem("alimentos"))) {
  alimentos = JSON.parse(localStorage.getItem("alimentos"));
  showList()
}


if (localStorage.getItem("user") === null) {
	localStorage.setItem("user", prompt("¿Cómo te llamas?"));
}

let user = localStorage.getItem("user");
let addName = document.getElementById("title");
addName.innerHTML = "Hola, " + user + ". Añde y edita tus alimentos";

let propNoDefinida = "No definido";

// Selectores
let selectOptions = "";
let selectOption = document.getElementById("selectOptions");
let list = document.getElementById("grid-columns-food");


function ingresarNuevo({ alimento, peso, hc, proteina }) {
	let nuevoAlimento = new Alimento(alimento, peso, hc, proteina);
	//anadimos el nuevo aliemnto al array de alimentos
	alimentos.push(nuevoAlimento);
}

function elimiarAlimentoArray() {
	//preguntamos si queremos eliminar algún alimento del array
	let confirmacion = confirm("¿Quieres eliminar algún aliemento?");

	if (confirmacion) {
		//Mostramos alimentos que hay para eliminar
		const mapAlimentos = alimentos.map((item) => item.alimento);
		let eliminarAlimento = prompt("Escribe que alimneto quieres eliminar:" + mapAlimentos.join(", ")).toLowerCase();

		//Este es el alimento que quiere eliminar
		const result = alimentos.find((item) => item.alimento === eliminarAlimento);
		console.log(result);

		//filtramos los alimentos que no se han indicado
		const filter = alimentos.filter((item) => item.alimento !== eliminarAlimento);
		console.log(filter);

		//pasamos el nuevo array al array alimentos
		alimentos = filter;

		//Mostramos la lista actualizada
		const nuevaLista = alimentos.map((i) => i.alimento);
		alert("Has eliminado: " + eliminarAlimento + ", ahora tu lista tiene: " + nuevaLista);
	}
}

function editarAlimentoArray() {
	//Preguntar si desea editar
	let confirmacion = confirm("¿Quieres editar la lista de alimentos?");

	if (!confirmacion) {
		alert("¡Vuelve pronto!");
	} else {
		//Muestra los alimentos a editar
		const editar = alimentos.map((item) => item.alimento);
		const editarAlimento = prompt("Cuál de estos alimentos deseas editar: " + editar.join(", "));

		//Filtra el alimento del prompt entre los alimentos del array
		const filter = alimentos.filter((item) => item.alimento === editarAlimento);
		console.log(filter);

		//Añadimos un nuevo nombre al alimento que queremos editar
		const nuevoNombre = prompt("¿Por cuál alimento quieres cambiar el " + editarAlimento + "?");

		//Encuentra el item especifico al alimento a editar
		findAlimento = alimentos.findIndex((item) => item.alimento == editarAlimento);

		console.log("Alimentos antes de editar: ", alimentos[findAlimento]);

		//Actualizar alimento seleccionado
		alimentos[findAlimento].alimento = nuevoNombre;

		//Alimentos actualizados
		console.log("Los alimentos han sido actualizados: ", alimentos[findAlimento]);
		const mapAlimentos = alimentos.map((i) => i.alimento);
		alert("Los alimentos han sido actualizados: " + mapAlimentos.join(", "));
		alert("¡Gracias!");
	}
}

//muestra en pantalla la lista de alimentos
function showList() {
    for (const alimento of alimentos) {
      let list = document.getElementById("grid-columns-food");
      let contenedor = document.createElement("div");
      contenedor.className = "column is-one-fifth";
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
                          <p class="title is-6">${alimento.propiedades.hidratosCarbono}</p>
                          </div>
                      </div>
                      <div class="content">
                      <button type="button" class="button is-danger" onclick={deleteCard(${alimento.id})}>Delete</button>
                      </div>
                      </div>
                  </div>`;
      list.appendChild(contenedor);
	}
}

//Borrar card filtrando por id y actualizando la lista
function deleteCard(id) {
	const filtrarAlimentoDelete = alimentos.filter((i) => i.id != id);
	alimentos = filtrarAlimentoDelete;
	list.innerHTML = "";
	selectOption.innerHTML = "";
  localStorage.setItem("alimentos", JSON.stringify(alimentos))
	showList();
}
//Editar card filtrando por id y actualizando la lista
function deleteCard(id) {
	const filtrarAlimentoDelete = alimentos.filter((i) => i.id != id);
	alimentos = filtrarAlimentoDelete;
	list.innerHTML = "";
	selectOption.innerHTML = "";
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

	let alimento = new Alimento(food, pesoRacion, hc, proteina);
  alimentos.push(alimento)
	// Para vaciar todo, tomamos el id del formulario y usamos el método reset()
	miFormulario.reset();
  
	list.innerHTML = "";
	selectOption.innerHTML = "";
  localStorage.setItem("alimentos", JSON.stringify(alimentos))
	showList();
}

//Editar alimnetos del array al abrir el modal
let openModal = document.getElementById("modal");

let editarBtn = document.getElementById("buttonEdit");
editarBtn.addEventListener("click", respuestaEditar);

//abrimos y cerramos el modal con evento onclick
const closeModal = document.getElementById("closeModal");
closeModal.addEventListener("click", () => {
	openModal.classList.remove("is-active");
	openModal.className = "modal";
	console.log("first");
});
function respuestaEditar() {
	openModal.className = "modal is-active";
	optionsSelect();
}

//mapeamos los alimentos en el options del input
//muestra en pantalla la lista de alimentos
function optionsSelect() {
	let selectOption = document.getElementById("selectOptions");

	for (const alimento of alimentos) {
		let selectOptions = document.createElement("option");
		selectOptions.innerHTML = `${alimento.alimento}`;

		selectOption.appendChild(selectOptions);
	}
}

//form para seleccionar alimento a editar
let getOption = document.getElementById("selectOptions");

let formEdit = document.getElementById("formEdit");
formEdit.addEventListener("submit", validateFormEdit);

//Input para añadir alimentos
let newFoodModal = document.getElementById("input-food-modal");
newFoodModal.addEventListener("input", () => {
	saveFood = newFoodModal.value;
});

function validateFormEdit(e) {
	e.preventDefault();
	//Encuentra el item especifico al alimento a editar
	const findAlimento = alimentos.findIndex((item) => item.alimento == getOption.value);
	//Actualizar alimento seleccionado
	alimentos[findAlimento].alimento = saveFood;
	list.innerHTML = "";
  	localStorage.setItem("alimentos", JSON.stringify(alimentos))
	showList();
}

