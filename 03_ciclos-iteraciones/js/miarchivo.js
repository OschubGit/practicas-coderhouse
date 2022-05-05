//Pedir nombre para personalizar la experiencia de usuario
//Calcular las raciones de Hidratos de carbono que se va a consumir según el alimento elegido.
//Posteriormente dar la opción de calcular las dosis de insulina
let nombre = prompt("¡Hola! ¿Cómo te llamas?\nEscribe 'esc' para salir").toLowerCase();
let resultado;
let ingresarAlimento;
let calculoRaciones;
let gramosAlimento;
let confirmInsulina;
let continuar;

function insulina() {
    confirmInsulina = confirm("¿Te gustaría saber cuanta insulina necesitas?")
}

//1ración = 10g de HC
const pan = 20; // 20g de pan equivalen a 1 raciónn --> si me como 5 raciones de pan son 100g de pan en total
const manzana = 100; // 100g de manzana equivalen a 1 raciónn
const arroz = 15; // 15g de arroz equivalen a 1 raciónn

//Pedir que alimento va a consumir
/* function alimento(){
    ingresarAlimento = prompt(nombre+ ", Ingresa el alimento que vas a consumir\n-Pan\n-Manzana\n-Arroz").toLowerCase();
} */

function continuarCalculo(){
    continuar = confirm("Continua para volver a emprezar o pulsa cancelar para finalizar")
    if(continuar == true){
        nombre = prompt("¡Hola! ¿Cómo te llamas?\nEscribe 'esc' para salir").toLowerCase();
    } else{
        nombre = "esc"
        ingresarAlimento = alert("Gracias")
    }
}

while(nombre !== "esc") {
    //Switch comprobando el alimento para hacer el calculo
    alimento()
    switch (ingresarAlimento) {
        case "pan":
            gramosAlimento = parseFloat(prompt("Ingresa los gramos del alimento que vas a consumir"));
            calculoRaciones = gramosAlimento / pan;
            resultado = calculoRaciones;
            alert(gramosAlimento +"g de " + ingresarAlimento + " equivalen a "+ calculoRaciones + " raciones" )
        break;
        case "manzana":
            gramosAlimento = parseFloat(prompt("Ingresa los gramos del alimento que vas a consumir"));
            calculoRaciones = gramosAlimento / manzana;
            resultado = calculoRaciones;
            alert(gramosAlimento +"g de " + ingresarAlimento + " equivalen a "+ calculoRaciones + " raciones" )
        break;
        case "arroz":
            gramosAlimento = parseFloat(prompt("Ingresa los gramos del alimento que vas a consumir"));
            calculoRaciones = gramosAlimento / arroz;
            resultado = calculoRaciones;
            alert(gramosAlimento +"g de " + ingresarAlimento + " equivalen a "+ calculoRaciones + " raciones" )
        break;
    
        default:
            alert("Por favor, ingresa un alimento válido")
            break;
        }
    continuarCalculo()
}

