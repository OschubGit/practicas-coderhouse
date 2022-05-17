let pokemones = [
  {
    nombre: "pikachu",
    color: "yellow",
    propiedades: [
      {
        id: Math.random(),
        fuerza: 20,
        propiedad: "rayo",
      },
    ],
  },
  {
    nombre: "bulbasur",
    color: "blue",
    propiedades: [
      {
        id: Math.random(),
        fuerza: 50,
        propiedad: "agua",
      },
    ],
  },
  {
    nombre: "machamp",
    color: "grey",
    propiedades: [
      {
        id: Math.random(),
        fuerza: 100,
        propiedad: "roca",
      },
    ],
  },
];

const propNoDefinida = "Sin definir";

//Agregamos al array
//creamos array con valores definidos
function Pokemons(nombre, color, fuerza, propiedad) {
  this.nombre = nombre ? nombre : propNoDefinida;
  this.color = color ? color : propNoDefinida;
  this.propiedades = {
    id: Math.random(),
    fuerza: fuerza ? fuerza : propNoDefinida,
    propiedad: propiedad ? propiedad : propNoDefinida,
  };
}

//Pedimos informacion del pokemon
function anadirProps() {
  pedirNombre = prompt("Ingresa el nombre del pokemon:").toLowerCase();
  pedirColor = prompt("Ingresa el color del pokemon:").toLowerCase();
  pedirFuerza = parseFloat(prompt("Ingresa la fuerza:"));
  pedirPropiedad = prompt("Ingresa su propiedad:").toLowerCase();
}

//Añadimos la informacion al nuevo array
function ingresarNuevoPokemon({ nombre, color, fuerza, propiedad }) {
  newArray = new Pokemons(nombre, color, fuerza, propiedad);
  //anadimos el nuevo aliemnto al array de alimentos
  pokemones.push(newArray);
}

anadirProps();
ingresarNuevoPokemon({
  nombre: pedirNombre,
  color: pedirColor,
  fuerza: pedirFuerza,
  propiedad: pedirPropiedad,
});
console.log(pokemones)

//Crear otro array con un pokemon y concatenar usando el metodo concat
const arrayConcat = new Pokemons("Vulpix", "Brown", 330, "fuego")
let result = pokemones.concat(arrayConcat)
console.log(result)

console.log("Estos son todos los pokemones disponibles:")
for (const poke of pokemones) {
  console.log(poke.nombre);
}
