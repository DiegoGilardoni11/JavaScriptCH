let pokedex = [];

// Función Agregar
function agregarPoke() {
  limpiarSalidas();

  const nombre = document.getElementById('nombreInput').value;
  const tipo = document.getElementById('tipoInput').value;
  const numeroInput = document.getElementById('numeroInput').value;
  const numero = parseInt(numeroInput);

  if (nombre.trim() === '' || tipo.trim() === '' || isNaN(numero)) {
      document.getElementById('salidaError').innerText = "Ingrese un nombre, tipo y número válidos.";
      return;
      
  }

  const nombreExistente = pokedex.find((pokemon) =>
      pokemon.nombre.toLowerCase() === nombre.toLowerCase()
  );

  const numeroExistente = pokedex.find((pokemon) => pokemon.numero === numero);

  if (nombreExistente) {
      document.getElementById('salidaExiste').innerText = "Ya se ha ingresado un pokémon con ese nombre";
      return;
  }

  if ( numeroExistente) {
    document.getElementById('salidaNumExiste').innerText = "Ya se ha ingresado un pokemon con ese número.";
    return;
    }

  const nuevoPoke = { nombre, tipo, numero };
  pokedex.push(nuevoPoke);
  guardarPokedex();
  document.getElementById('salidaAgregar').innerText = `${nombre} se agregó con éxito a la Pokédex!`;

}

// Función Resultados
function mostrarResultadoBusqueda(pokemon) {
  const salidaBuscar = document.getElementById('salidaBuscar');
  const buscarNomError = document.getElementById('buscarNomError');
  const buscarNumError = document.getElementById('buscarNumError');

  if (pokemon) {
    salidaBuscar.innerHTML = `
      <p>Nombre: ${pokemon.nombre}</p>
      <p>Tipo: ${pokemon.tipo}</p>
      <p>Número: ${pokemon.numero}</p>
    `;
  } else {
    buscarNomError.innerText = "No se ha encontrado el Pokémon por nombre.";
    buscarNumError.innerText = "No se ha encontrado el Pokémon por número.";
  }
}

// Función Buscar Nombre
function buscarPokeNombre() {
  limpiarSalidas();
  const nombre = document.getElementById('nombreBuscar').value;
  const buscarPoke = pokedex.find((pokemon) =>
    pokemon.nombre.toLowerCase() === nombre.toLowerCase()
  );
  mostrarResultadoBusqueda(buscarPoke);
}

// Función Buscar Número
function buscarPokeNumero() {
  limpiarSalidas();
  const numeroInput = document.getElementById('numeroBuscar').value;
  const numero = parseInt(numeroInput);
  const buscarPoke = pokedex.find((pokemon) => pokemon.numero === numero);
  mostrarResultadoBusqueda(buscarPoke);
}
//Funcion Mostrar Todos
function mostrarTodosLosPokemon() {
  document.getElementById('salidaTodos').innerText = '';

  if (pokedex.length === 0) {
      document.getElementById('salidaTodos').innerText += 'No has encontrado pokémones hasta el momento';
  } else {
      pokedex.forEach((pokemon) => {
          document.getElementById('salidaTodos').innerText += `${pokemon.nombre} (Tipo: ${pokemon.tipo}, Número: ${pokemon.numero})\n`;
      });
  }
}


//Funcion limpiar salidas de texto
function limpiarSalidas() {
  document.getElementById('salidaError').innerText = '';
  document.getElementById('salidaExiste').innerText = '';
  document.getElementById('salidaNumExiste').innerText = '';
  document.getElementById('salidaAgregar').innerText = '';
  document.getElementById('buscarNomError').innerText = '';
  document.getElementById('salidaBuscar').innerText = '';
  document.getElementById('buscarNumError').innerText = '';
  document.getElementById('salidaTodos').innerText = '';
  document.getElementById('statsExito').innerText = '';
  document.getElementById('statsError').innerText = '';
}

// Función para borrar todas las salidas
function borrarSalidas() {
  limpiarSalidas();
}

// Guardar Pokédex
function guardarPokedex() {
  localStorage.setItem('pokedex', JSON.stringify(pokedex));
}

// Cargar Pokédex
function cargarPokedex() {
  const pokedexJSON = localStorage.getItem('pokedex');
  if (pokedexJSON) {
      pokedex = JSON.parse(pokedexJSON);
  }
}
cargarPokedex();

//  Event Listeners
document.getElementById('agregarButton').addEventListener('click', function () {
  agregarPoke();
  guardarPokedex();
});
document.getElementById('buscarNombreButton').addEventListener('click', buscarPokeNombre);
document.getElementById('buscarNumeroButton').addEventListener('click', buscarPokeNumero);
document.getElementById('mostrarTodosButton').addEventListener('click', mostrarTodosLosPokemon);
document.getElementById('borrarSalidasButton').addEventListener('click', borrarSalidas);


//  Consulta de estadisticas a PokeApi
document.getElementById('statsButton').addEventListener('click', () => {
  const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;

  const statsExitoContainer = document.getElementById('statsExito');
  statsExitoContainer.innerHTML = '';
  const statsErrorContainer = document.getElementById('statsError');
  statsErrorContainer.innerHTML = '';

  axios.get(apiUrl)
      .then(response => {
          const pokemonData = response.data;
          const stats = pokemonData.stats;
          const statsContainer = document.getElementById('statsExito');
          statsContainer.innerHTML = `<h2>Estadísticas de ${pokemonName}:</h2>`;
          stats.forEach(stat => {
              statsContainer.innerHTML += `<p>${stat.stat.name}: ${stat.base_stat}</p>`;
          });
      })
      .catch(error => {
          const statsContainer = document.getElementById('statsError');
          statsContainer.innerHTML = `<p>Error al consultar los datos del pokémon ingresado.</p>`;
      });
});

//Mostrar ocultar - collapsible
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}