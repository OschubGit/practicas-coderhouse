let pedirNombre = prompt("¿Cómo te llamas?")
let pedirAlimento;
let indicarPeso;
let indicarHc;
let indicarProteina;
let newArray;
let confirmacion;
let list;
let contenedor;

let addName;
addName = document.getElementById("title");
addName.innerHTML = "Hola, " + pedirNombre;
let propNoDefinida = "No definido";

let alimentos = [];

//creamos array con valores definidos
function Alimento(alimento, pesoRacion, proteina, hidratosCarbono) {
  this.alimento = alimento ? alimento : propNoDefinida;
  this.image =
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880";
  this.pesoRacion = pesoRacion ? pesoRacion : propNoDefinida;
  this.propiedades = {
    proteina: proteina ? proteina : propNoDefinida,
    hidratosCarbono: hidratosCarbono ? hidratosCarbono : propNoDefinida,
  };
}

function anadirProps() {
  pedirAlimento = prompt("Ingresa un alimento:").toLowerCase();
  indicarPeso = parseFloat(prompt("Ingresa el peso en gramos:"));
  indicarHc = parseFloat(prompt("Ingresa la cantidad de Hidratos de Carbono:"));
  indicarProteina = parseFloat(prompt("Ingresa la proteina:"));
}

function ingresarNuevo({ alimento, peso, hc, proteina }) {
  newArray = new Alimento(alimento, peso, hc, proteina);
  //anadimos el nuevo aliemnto al array de alimentos
  alimentos.push(newArray);
}

function continuar() {
  do {
    anadirProps();
    ingresarNuevo({
      alimento: pedirAlimento,
      pesoRacion: indicarPeso,
      hc: indicarHc,
      proteina: indicarProteina,
    });
  } while (alimentos.length <= 1);
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

//Empezamos añadiendo el primer alimento
anadirProps();

//ingresamos el nuevo alimento con sus propiedades
ingresarNuevo({
  alimento: pedirAlimento,
  pesoRacion: indicarPeso,
  hc: indicarHc,
  proteina: indicarProteina,
});

function recorrerArray(param1) {
  for (const el of param1) {
    console.log("El alimento añadido es: " + el.alimento);
  }
}

recorrerArray(alimentos);
alert("Este es el nuevo alimento que has agregado: " + pedirAlimento);

//Preguntar si quiere seguir
confirmacion = confirm("¿Quieres añadir más aliementos?");
if (confirmacion) {
  //Quieres continuar
  continuar();
  //Eliminar elemento
  elimiarAlimentoArray();
  editarAlimentoArray();
  console.log("Lista de alimentos añadidos:");
  console.log(alimentos);
} else {
  alert("¡Nos vemos!");
}

//muestra en pantalla la lista de alimentos
function showList() {
  for (const alimento of alimentos) {
    list = document.getElementById("grid-columns-food");
    contenedor = document.createElement("div");
    contenedor.className="column is-one-quarter"
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                        <a href="#">#css</a> <a href="#">#responsive</a>
                        <br>
                        <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                    </div>
                    </div>
                </div>`;
    list.appendChild(contenedor);
  }
}
showList();

let addWithBtn = document.getElementById("buttonEl");
addWithBtn.addEventListener("click", respuesta);

function respuesta() {
  list.innerHTML = "";
  continuar();
  showList();
}
let editarBtn = document.getElementById("buttonEdit");
editarBtn.addEventListener("click", respuestaEditar);

function respuestaEditar() {
  list.innerHTML = "";
  editarAlimentoArray();
  showList();
}
let deleteBtn = document.getElementById("buttonDelete");
deleteBtn.addEventListener("click", respuestaDelete);

function respuestaDelete() {
  list.innerHTML = "";
  elimiarAlimentoArray();
  showList();
}

//Sumar el total de HC selecionados en la lista de alimentos
/* let sum = 0;
function suma() {
    for (const aliemento of alimentos) {
      sum += aliemento.propiedades.hidratosCarbono;
    }
}
suma()
//Contador de HC
let contador = document.getElementById("counter");
contador.innerHTML = `Total Hc a consumir: ${sum}`; */
