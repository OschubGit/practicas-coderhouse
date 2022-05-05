//Pedir edad para poder entrar a la fiesta. Debe de ser mayor de 18 años
let edad = prompt("¿Qué edad tienes?")
let ingresarNombre;
let usuario;

if (edad >= 18) {
	alert("Tienes "+ edad + " años. Puedes entrar a la fiesta.")
} else {
    alert("Tienes "+ edad + " años. No puedes entrar a la fiesta.")
}

//Pedir si quiere otro ejempl
let otroEjemplo = prompt("¿Vamos con otro ejemplo? Escribe si o no");

//Si la respuesta es si entonces preguntar la edad a nuestro amigo Manuel
if(otroEjemplo == "si") {
    ingresarNombre = prompt("Hola Manuel, ¿qué edad tienes?")
    edad = 40;
    usuario = "Manuel";
    if (ingresarNombre >= edad) {
        alert("Bienvenido a la fiesta, " + usuario);
    } else {
        alert("No mientas Manuel...");
    }
} else {
    alert("Hasta otra!")
}


