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
let foodCategory = ["Verduras", "Farináceos", "Proteicos", "Frutos Secos", "Lácteos", "Frutas"]
//ABRIR MODAL Y ESCRIBIR
let addcategory = document.querySelectorAll("add-category");
addcategory.onchange = () => {
	console.log(addcategory.value)
}

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
                          <p class="title is-6">${alimento.category}</p>
                          <p class="title is-6">${alimento.propiedades.hidratosCarbono}</p>
                          </div>
                      </div>
                      <div class="content">
                      <button type="button" class="button is-danger" onclick={deleteCard(${alimento.id})}>Delete</button>
                      <button type="button" class="button is-danger" onclick={editCard(${alimento.id})}>Edit</button>
                      </div>
                      </div>
                  </div>`;
      list.appendChild(contenedor);
	}
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
	respuestaEditar()
	let formEdit = document.getElementById("formEdit");
	formEdit.addEventListener("submit", (e) => {
		e.preventDefault();
		const findAlimento = alimentos.findIndex((item) => item.id === id);
		alimentos[findAlimento].alimento = saveFood;
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

	let alimento = new Alimento(food, category, pesoRacion, hc, proteina);
  	alimentos.push(alimento)
	// Para vaciar todo, tomamos el id del formulario y usamos el método reset()
	miFormulario.reset();
  
	list.innerHTML = "";
  	localStorage.setItem("alimentos", JSON.stringify(alimentos))
	showList();
}


