
let pedirNombre;
if (localStorage.getItem("user") === null) {
  pedirNombre = localStorage.setItem("user", prompt("¿Cómo te llamas?"));
}
user = localStorage.getItem("user");

let pedirAlimento;
let indicarPeso;
let indicarHc;
let indicarProteina;
let newArray;
let confirmacion;
let list = "";
let contenedor;
let saveFood;
let saveHc;
let savePesoRacion;
let saveProteina;
let addName;
let propNoDefinida = "No definido";
let selectOption;
let selectOptions = "";

addName = document.getElementById("title");
addName.innerHTML = "Hola, " + user;

let alimentos = [];

//creamos array con valores definidos
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

function ingresarNuevo({ alimento, peso, hc, proteina }) {
  newArray = new Alimento(alimento, peso, hc, proteina);
  //anadimos el nuevo aliemnto al array de alimentos
  alimentos.push(newArray);
}

function elimiarAlimentoArray() {
  //preguntamos si queremos eliminar algún alimento del array
  confirmacion = confirm("¿Quieres eliminar algún aliemento?");

  if (confirmacion) {
    //Mostramos alimentos que hay para eliminar
    const mapAlimentos = alimentos.map((item) => item.alimento);
    let eliminarAlimento = prompt(
      "Escribe que alimneto quieres eliminar:" + mapAlimentos.join(", ")
    ).toLowerCase();

    //Este es el alimento que quiere eliminar
    const result = alimentos.find((item) => item.alimento === eliminarAlimento);
    console.log(result);

    //filtramos los alimentos que no se han indicado
    const filter = alimentos.filter(
      (item) => item.alimento !== eliminarAlimento
    );
    console.log(filter);

    //pasamos el nuevo array al array alimentos
    alimentos = filter;

    //Mostramos la lista actualizada
    const nuevaLista = alimentos.map((i) => i.alimento);
    alert(
      "Has eliminado: " +
        eliminarAlimento +
        ", ahora tu lista tiene: " +
        nuevaLista
    );
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
    const editarAlimento = prompt(
      "Cuál de estos alimentos deseas editar: " + editar.join(", ")
    );

    //Filtra el alimento del prompt entre los alimentos del array
    const filter = alimentos.filter((item) => item.alimento === editarAlimento);
    console.log(filter);

    //Añadimos un nuevo nombre al alimento que queremos editar
    const nuevoNombre = prompt(
      "¿Por cuál alimento quieres cambiar el " + editarAlimento + "?"
    );

    //Encuentra el item especifico al alimento a editar
    findAlimento = alimentos.findIndex(
      (item) => item.alimento == editarAlimento
    );

    console.log("Alimentos antes de editar: ", alimentos[findAlimento]);

    //Actualizar alimento seleccionado
    alimentos[findAlimento].alimento = nuevoNombre;

    //Alimentos actualizados
    console.log(
      "Los alimentos han sido actualizados: ",
      alimentos[findAlimento]
    );
    const mapAlimentos = alimentos.map((i) => i.alimento);
    alert("Los alimentos han sido actualizados: " + mapAlimentos.join(", "));
    alert("¡Gracias!");
  }
}


//muestra en pantalla la lista de alimentos
function showList() {
  for (const alimento of alimentos) {
    list = document.getElementById("grid-columns-food");
    contenedor = document.createElement("div");
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
function deleteCard(id){
  const filtrarAlimentoDelete = alimentos.filter((i) => i.id != id)
  alimentos = filtrarAlimentoDelete;
  list.innerHTML = "";
  showList();
}

//Input para añadir alimentos
let addWithInput = document.getElementById("input-food");
addWithInput.addEventListener("input", () => {
  saveFood = addWithInput.value;
});
//Input para añadir peso racion
let addWithInputPesoRacion = document.getElementById("input-peso-racion");
addWithInputPesoRacion.addEventListener("input", () => {
  savePesoRacion = addWithInputPesoRacion.value;
});
//Input para añadir hc
let addWithInputHc = document.getElementById("input-hc");
addWithInputHc.addEventListener("input", () => {
  saveHc = addWithInputHc.value;
});
//Input para añadir proteina
let addWithInputProteina = document.getElementById("input-proteina");
addWithInputProteina.addEventListener("input", () => {
  saveProteina = addWithInputProteina.value;
});

//validar datos con el formulario
let miFormulario = document.getElementById("formulario");
miFormulario.addEventListener("submit", validarFormulario);
function validarFormulario(e) {
  e.preventDefault();
  newArray = new Alimento(saveFood, savePesoRacion, saveHc, saveProteina);
  alimentos.push(newArray);
  list.innerHTML = "";
  addWithInput.value = "";
  addWithInputPesoRacion.value = "";
  addWithInputHc.value = "";
  addWithInputProteina.value = "";
  showList();
  selectOption.innerHTML="";
}

//Editar alimnetos del array al abrir el modal
let openModal = document.getElementById("modal");

let editarBtn = document.getElementById("buttonEdit");
editarBtn.addEventListener("click", respuestaEditar);

//abrimos y cerramos el modal con evento onclick
const closeModal = document.getElementById("closeModal");
closeModal.addEventListener("click", () => {
  openModal.classList.remove('is-active')
  openModal.className = "modal";
  console.log("first")
});
function respuestaEditar() {
  openModal.className = "modal is-active";
  optionsSelect();
}


//mapeamos los alimentos en el options del input
//muestra en pantalla la lista de alimentos
function optionsSelect(){
  for (const alimento of alimentos) {
    selectOption= document.getElementById("selectOptions");
    selectOptions = document.createElement("option");
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
  const findAlimento = alimentos.findIndex(
    (item) => item.alimento == getOption.value
    );
  //Actualizar alimento seleccionado
  alimentos[findAlimento].alimento = saveFood;
  list.innerHTML = "";
  showList();
}
