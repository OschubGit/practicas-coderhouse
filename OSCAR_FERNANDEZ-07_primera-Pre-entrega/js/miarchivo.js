let pedirAlimento;
let indicarPeso;
let indicarHc;
let indicarProteina;
let newArray;
let confirmacion;

let propNoDefinida = "No definido"

let alimentos = []

//creamos array con valores definidos
function Alimento(alimento, pesoRacion, proteina, hidratosCarbono){
    this.alimento = alimento ? alimento : propNoDefinida;
    this.pesoRacion = pesoRacion ? pesoRacion : propNoDefinida;
    this.propiedades = {
        proteina: proteina ? proteina : propNoDefinida,
        hidratosCarbono: hidratosCarbono ? hidratosCarbono : propNoDefinida,
    };
}

function anadirProps(){
    pedirAlimento = prompt("Ingresa un alimento:").toLowerCase();
    indicarPeso = parseFloat(prompt("Ingresa el peso en gramos:"))
    indicarHc = parseFloat(prompt("Ingresa la cantidad de Hidratos de Carbono:"))
    indicarProteina = parseFloat(prompt("Ingresa la proteina:"))
}

function ingresarNuevo({alimento, peso, hc, proteina}) {
    newArray = new Alimento(alimento, peso, hc, proteina)
    //anadimos el nuevo aliemnto al array de alimentos
    alimentos.push(newArray)
}

function continuar(){
    do{
        anadirProps()
        ingresarNuevo({alimento: pedirAlimento, pesoRacion: indicarPeso, hc: indicarHc, proteina: indicarProteina})
     }while(alimentos.length <= 3);
}

function elimiarAlimentoArray(){

    //preguntamos si queremos eliminar algún alimento del array
    confirmacion = confirm("¿Quieres eliminar algún aliemento?")

    if (confirmacion) {
        //Mostramos alimentos que hay para eliminar
        const mapAlimentos = alimentos.map((item) => item.alimento)
        let eliminarAlimento = prompt("Escribe que alimneto quieres eliminar:" + mapAlimentos.join(", ")).toLowerCase()
        
        //Este es el alimento que quiere eliminar
        const result = alimentos.find((item) => item.alimento === eliminarAlimento)
        console.log(result)
        
        //filtramos los alimentos que no se han indicado
        const filter = alimentos.filter((item) => item.alimento !== eliminarAlimento)
        console.log(filter)
    
        //pasamos el nuevo array al array alimentos
        alimentos = filter;

        //Mostramos la lista actualizada
        const nuevaLista = alimentos.map((i) => i.alimento)
        alert("Has eliminado: "+ eliminarAlimento + ", ahora tu lista tiene: "+ nuevaLista)
    }
    
}

function editarAlimentoArray() {
    //Preguntar si desea editar
    let confirmacion = confirm("¿Quieres editar la lista de alimentos?")
    if(!confirmacion){
        alert("¡Vuelve pronto!")
    }else{
        //Muestra los alimentos a editar
        const editar = alimentos.map((item) => item.alimento)
        const editarAlimento = prompt("Cuál de estos alimentos deseas editar: " + editar.join(", "))
        
        //Filtra el alimento del prompt entre los alimentos del array
        const filter = alimentos.filter((item) => item.alimento === editarAlimento)
        console.log(filter)

        //Añadimos un nuevo nombre al alimento que queremos editar
        const nuevoNombre = prompt("¿Por cuál alimento quieres cambiar el "+ editarAlimento+ "?")
    
        //Encuentra el item especifico al alimento a editar    
        findAlimento = alimentos.findIndex((item => item.alimento == editarAlimento));
    
        console.log("Alimentos antes de editar: ", alimentos[findAlimento])
    
        //Actualizar alimento seleccionado
        alimentos[findAlimento].alimento = nuevoNombre
    
        //Alimentos actualizados
        console.log("Los alimentos han sido actualizados: ", alimentos[findAlimento])
        const mapAlimentos = alimentos.map((i) => i.alimento)
        alert("Los alimentos han sido actualizados: "+ mapAlimentos.join(", "))
        alert("¡Gracias!")
    }

}

//Empezamos añadiendo el primer alimento
anadirProps()

//ingresamos el nuevo alimento con sus propiedades
ingresarNuevo({alimento: pedirAlimento, pesoRacion: indicarPeso, hc: indicarHc, proteina: indicarProteina})

function recorrerArray(param1){
    for (const el of param1) {
        console.log("El alimento añadido es: "+ el.alimento)
    }
}

recorrerArray(alimentos)
alert("Este es el nuevo alimento que has agregado: "+ pedirAlimento)

//Preguntar si quiere seguir
confirmacion = confirm("¿Quieres añadir más aliementos?")
if (confirmacion) {
    //Quieres continuar
    continuar();
    //Eliminar elemento
    elimiarAlimentoArray();
    editarAlimentoArray();
    console.log("Lista de alimentos añadidos:")
    console.log(alimentos)
} else{
    alert("¡Nos vemos!")
}







