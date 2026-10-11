
import { useEffect, useState } from 'react';
import Casilla from './components/Casilla.jsx';

const FILAS = 6
const COLUMNAS = 5
const SOLUCION = 'PERRO'

// Crea un tablero vacío: 6 filas de 5 letras en blanco
function tableroVacio() {
  const tablero = []
  for (let f = 0; f < FILAS; f++) {
    tablero.push(Array(COLUMNAS).fill(''))
  }
  return tablero
}

// Decide el color de una letra ya comprobada
function estadoDe(letra, columna) {
  if (SOLUCION[columna] === letra) return 'correcta'
  if (SOLUCION.includes(letra)) return 'presente'
  return 'ausente'
}

function App() {
  const [intentos, setIntentos] = useState(tableroVacio())
  const [filaActual, setFilaActual] = useState(0)
  
  // El último intento comprobado, como texto: 'PERRO'
  const ultimo = filaActual > 0 ? intentos[filaActual - 1].join('') : ''
  const ganada = ultimo === SOLUCION
  const terminada = ganada || filaActual === FILAS
  
  useEffect(() => {
    // Lleva el cursor a la primera casilla en la que se puede escribir
    document.querySelector('.casilla:enabled')?.focus()
  }, [filaActual])



  function cambiarLetra(f, c, evento) {
    const letra = evento.target.value.toUpperCase()

    // Solo aceptamos una letra, o nada si se ha borrado
    if (!/^[A-ZÑ]?$/.test(letra)) return

    // Copiamos el tablero, cambiamos la copia y la guardamos
    const copia = intentos.map((fila) => [...fila])
    copia[f][c] = letra
    setIntentos(copia)
    
    // Después de escribir una letra, pasamos a la casilla siguiente
    if (letra !== '') evento.target.nextElementSibling?.focus()

  }

  function comprobar(evento) {
    // Evita que el navegador recargue la página
    evento.preventDefault()
    if (terminada) return

    // No se puede comprobar una fila incompleta
    if (intentos[filaActual].includes('')) return

    setFilaActual(filaActual + 1)
  }

  // Reinicia el juego para comenzar una nueva partida
  function nuevaPartida() {
    // Vacía todas las casillas del tablero
    setIntentos(tableroVacio())

    // Vuelve a activar la primera fila (índice 0)
    setFilaActual(0)
  }


  return (
    <form className="juego" onSubmit={comprobar}>
      <h1>Wordle</h1>

      <div className="tablero">
        {intentos.map((fila, f) => (
          <div className="fila" key={f}>
            {fila.map((letra, c) => (
              <Casilla
                key={c}
                letra={letra}
                estado={f < filaActual ? estadoDe(letra, c) : ''}
                activa={!terminada && f === filaActual}
                onCambio={(evento) => cambiarLetra(f, c, evento)}
              />
            ))}
          </div>
        ))}
      </div>    
      
      {terminada ? (
        <>
          {/* Mostramos el resultado final de la partida */}
          <p className="mensaje" role="status">
            {ganada
              ? '¡Enhorabuena, has acertado!'
              : `La palabra era ${SOLUCION}`}
          </p>

          {/* Permite comenzar una nueva partida sin recargar la página */}
          <button
            className="boton"
            type="button"
            onClick={nuevaPartida}
          >
            Nueva partida
          </button>
        </>
      ) : (
        // Mientras la partida esté activa, mostramos el botón Comprobar
        <button className="boton" type="submit">
          Comprobar
        </button>
      )}


    </form>
  )
}

export default App
