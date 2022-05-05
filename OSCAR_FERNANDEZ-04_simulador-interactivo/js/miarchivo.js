let nombre = prompt("¡Hola! ¿Cómo te llamas?\nEscribe 'esc' para salir").toLowerCase();
let insulina;
let ingresarAlimento;
let calculoRaciones;
let gramosAlimento;
let confirmInsulina;
let continuar;


//gramos de cada alimento equivalentes a una ración
const pan = 20; // 20g de pan equivalen a 1 ración --> si me como 5 raciones de pan son 100g de pan en total
const manzana = 100;
const arroz = 15;

//Pedir que alimento va a consumir
function alimento(){
    ingresarAlimento = prompt(nombre+ ", Ingresa el alimento que vas a consumir\n-Pan\n-Manzana\n-Arroz").toLowerCase();
}

//Preguntar si quiere finalizar o volver a empezar
function continuarCalculo(){
    continuar = confirm("Continua para volver a emprezar o pulsa cancelar para finalizar")
    if(continuar == true){
        nombre = prompt("¡Hola! ¿Cómo te llamas?\nEscribe 'esc' para salir").toLowerCase();
    } else{
        nombre = "esc"
        ingresarAlimento = alert("Gracias")
    }
}

//Calculo de la insulina
function calculoInsulina() {
    confirmInsulina = confirm("¿Te gustaría saber cuanta insulina necesitas?")
    if (confirmInsulina == true) {
        insulina = parseFloat(prompt("¿Cuál es tu dosis de insulina?\nEscoge tu dosis por ración:\n3\n5\n7"))
        alert("Para este alimento con este peso necesitas " + insulina * calculoRaciones + " dosis de insulina")
    }
}

while(nombre !== "esc") {
    //Switch comprobando el alimento para hacer el calculo de las raciones de hc
    alimento()
    switch (ingresarAlimento) {
        case "pan":
            gramosAlimento = parseFloat(prompt("Ingresa los gramos del alimento que vas a consumir"));
            calculoRaciones = gramosAlimento / pan;
            alert(gramosAlimento +"g de " + ingresarAlimento + " equivalen a "+ calculoRaciones + " raciones" )
            calculoInsulina();
        break;
        case "manzana":
            gramosAlimento = parseFloat(prompt("Ingresa los gramos del alimento que vas a consumir"));
            calculoRaciones = gramosAlimento / manzana;
            alert(gramosAlimento +"g de " + ingresarAlimento + " equivalen a "+ calculoRaciones + " raciones" )
            calculoInsulina();
        break;
        case "arroz":
            gramosAlimento = parseFloat(prompt("Ingresa los gramos del alimento que vas a consumir"));
            calculoRaciones = gramosAlimento / arroz;
            alert(gramosAlimento +"g de " + ingresarAlimento + " equivalen a "+ calculoRaciones + " raciones" )
            calculoInsulina();
        break;
    
        default:
            alert("Por favor, ingresa un alimento válido")
            break;
        }
    continuarCalculo()
}

