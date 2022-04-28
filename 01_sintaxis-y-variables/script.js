//Pedir nombre mediante prompt y mostrarlo en consola junto con algún texto de saludo. Ejemplo:  ¡Hola, Juan!
let nombre = prompt("Ingresa tu nombre:");
console.log("Hola" + " " + nombre);

//Pedir un número mediante prompt, parsearlo, sumarlo a otro que se encuentre almacenado en una variable y luego mostrar el resultado en consola.
let number = parseInt(prompt("Ingresa un número:"));
let numberDos = 10;
let result = number + numberDos;
console.log("El resultado es: " + result);

//Pedir un texto mediante prompt, luego otro, concatenarlos y mostrarlo en un alerta.
let text = prompt("Hola me llamo:");
let textDos = prompt(text+ " " + "¿Como te encuentras?:");
result = "Me llamo " + text + " y estoy " + textDos; 
alert(result);