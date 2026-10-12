import { useEffect, useState } from "react";
import Casilla from "./components/Casilla.jsx";

const FILAS = 6;
const COLUMNAS = 5;

// Lista de posibles soluciones, todas de cinco letras y sin tildes
const PALABRAS = ["PERRO", "GATOS", "LIBRO", "PLAYA", "NUBES"];

// Selecciona una palabra aleatoria de la lista
function palabraAleatoria() {
  const indice = Math.floor(Math.random() * PALABRAS.length);
  return PALABRAS[indice];
}

// Crea un tablero vacío: 6 filas de 5 letras en blanco
function tableroVacio() {
  const tablero = [];

  for (let f = 0; f < FILAS; f++) {
    tablero.push(Array(COLUMNAS).fill(""));
  }

  return tablero;
}


// Calcula los colores de una fila completa en dos pasadas
function estadosDeFila(fila, solucion) {
  // Todas las letras empiezan como ausentes
  const estados = Array(COLUMNAS).fill('ausente')

  // Copiamos las letras de la solución para llevar su control
  const disponibles = solucion.split('')

  // PRIMERA PASADA: buscamos letras en la posición correcta
  for (let c = 0; c < COLUMNAS; c++) {
    if (fila[c] === solucion[c]) {
      // Marcamos la letra como correcta
      estados[c] = 'correcta'

      // Esa letra ya está utilizada y no puede contarse otra vez
      disponibles[c] = null
    }
  }

  // SEGUNDA PASADA: buscamos letras presentes en otra posición
  for (let c = 0; c < COLUMNAS; c++) {
    // Las letras correctas ya están comprobadas
    if (estados[c] === 'correcta') continue

    // Buscamos la letra entre las que quedan disponibles
    const posicion = disponibles.indexOf(fila[c])

    if (posicion !== -1) {
      // La letra existe, pero está en otra posición
      estados[c] = 'presente'

      // La retiramos para evitar contarla dos veces
      disponibles[posicion] = null
    }
  }

  // Devolvemos los cinco estados de la fila
  return estados
}


function App() {
  // Guarda las letras introducidas en el tablero
  const [intentos, setIntentos] = useState(tableroVacio());

  // Indica la fila en la que estamos jugando
  const [filaActual, setFilaActual] = useState(0);

  // Guarda la palabra secreta elegida aleatoriamente para cada partida
  const [solucion, setSolucion] = useState(palabraAleatoria)

  
  // Guarda el mensaje de aviso cuando el intento está incompleto
  const [aviso, setAviso] = useState('')


  // Obtiene la última palabra comprobada
  const ultimo = filaActual > 0 ? intentos[filaActual - 1].join("") : "";

  // Comprueba si hemos acertado la palabra secreta
  const ganada = ultimo === solucion;

  // La partida termina si acertamos o agotamos los seis intentos
  const terminada = ganada || filaActual === FILAS;

  // Coloca automáticamente el cursor en la primera casilla activa
  useEffect(() => {
    document.querySelector(".casilla:enabled")?.focus();
  }, [filaActual]);

  // Actualiza la letra escrita en una casilla
  function cambiarLetra(f, c, evento) {
    const letra = evento.target.value.toUpperCase();

    // Solo permite una letra o un campo vacío
    if (!/^[A-ZÑ]?$/.test(letra)) return;

    // Copia el tablero para actualizarlo sin modificar el original
    const copia = intentos.map((fila) => [...fila]);

    // Guarda la letra en su fila y columna
    copia[f][c] = letra;
    setIntentos(copia);
    
    // Después de escribir una letra, avanzamos a la siguiente casilla
    if (letra !== '') {
      // Buscamos el contenedor de la casilla actual
      const contenedor = evento.target.closest('.contenedor-casilla')

      // Localizamos el input del siguiente contenedor
      const siguiente = contenedor?.nextElementSibling?.querySelector('input')

      // Movemos el cursor si existe una casilla siguiente
      siguiente?.focus()
    }

    
  }

  
  // Comprueba el intento cuando pulsamos el botón o Enter
  function comprobar(evento) {
    // Evita que el navegador recargue la página
    evento.preventDefault()

    // No permite comprobar si la partida ha terminado
    if (terminada) return

    // Comprueba si faltan letras en la fila actual
    if (intentos[filaActual].includes('')) {
      // Muestra un aviso al jugador
      setAviso('Faltan letras')
      return
    }

    // Elimina cualquier aviso anterior
    setAviso('')

    // Activa la siguiente fila
    setFilaActual(filaActual + 1)
  }

  // Reinicia el juego para comenzar una nueva partida
  function nuevaPartida() {
    // Vacía todas las casillas del tablero
    setIntentos(tableroVacio());

    // Vuelve a activar la primera fila
    setFilaActual(0);

    // Selecciona una nueva palabra secreta
    setSolucion(palabraAleatoria());

    // Limpia cualquier aviso de la partida anterior
    setAviso('')
  }

  return (
    <form className="juego" onSubmit={comprobar}>
      <h1>Wordle</h1>

      {/* Dibuja las seis filas del tablero */}
      <div className="tablero">
        {intentos.map((fila, f) => (
          <div className="fila" key={f}>
            {fila.map((letra, c) => (
              <Casilla
                key={c}
                letra={letra}
                etiqueta={`Fila ${f + 1}, columna ${c + 1}, ${
                  letra ? `letra ${letra}` : 'vacía'
                }, ${
                  f < filaActual
                    ? {
                        correcta: 'posición correcta',
                        presente: 'letra presente en otra posición',
                        ausente: 'letra ausente'
                      }[estadosDeFila(fila, solucion)[c]]
                    : 'sin comprobar'
                }`}
                estado={
                  f < filaActual
                    ? estadosDeFila(fila, solucion)[c]
                    : ''
                }
                activa={!terminada && f === filaActual}
                onCambio={(evento) => cambiarLetra(f, c, evento)}
              />
            ))}
          </div>
        ))}
      </div>
      
      {/* Leyenda accesible: explica los resultados sin depender solo del color */}
      <p className="leyenda">
        ✓ Posición correcta · ~ Otra posición · ✕ Letra ausente
      </p>
      
      {/* Muestra un aviso si la fila está incompleta */}
      {aviso && (
        <p className="mensaje" role="status">
          {aviso}
        </p>
      )}

      {/* Muestra el resultado final o el botón Comprobar */}
      {terminada ? (
        <>
          {/* Mensaje de victoria o derrota */}
          <p className="mensaje" role="status">
            {ganada
              ? "¡Enhorabuena, has acertado!"
              : `La palabra era ${solucion}`}
          </p>

          {/* Permite comenzar otra partida */}
          <button className="boton" type="button" onClick={nuevaPartida}>
            Nueva partida
          </button>
        </>
      ) : (
        <button className="boton" type="submit">
          Comprobar
        </button>
      )}
    </form>
  );
}

export default App;
