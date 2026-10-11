
import { useState } from 'react'
import Casilla from './components/Casilla.jsx'

const FILAS = 6
const COLUMNAS = 5

// Crea un tablero vacío: 6 filas de 5 letras en blanco
function tableroVacio() {
  const tablero = []
  for (let f = 0; f < FILAS; f++) {
    tablero.push(Array(COLUMNAS).fill(''))
  }
  return tablero
}

function App() {
  const [intentos, setIntentos] = useState(tableroVacio())
  const [filaActual, setFilaActual] = useState(0)

  const terminada = filaActual === FILAS

  function cambiarLetra(f, c, evento) {
    const letra = evento.target.value.toUpperCase()

    // Solo aceptamos una letra, o nada si se ha borrado
    if (!/^[A-ZÑ]?$/.test(letra)) return

    // Copiamos el tablero, cambiamos la copia y la guardamos
    const copia = intentos.map((fila) => [...fila])
    copia[f][c] = letra
    setIntentos(copia)
  }

  function comprobar(evento) {
    // Evita que el navegador recargue la página
    evento.preventDefault()
    if (terminada) return

    // No se puede comprobar una fila incompleta
    if (intentos[filaActual].includes('')) return

    setFilaActual(filaActual + 1)
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
                activa={!terminada && f === filaActual}
                onCambio={(evento) => cambiarLetra(f, c, evento)}
              />
            ))}
          </div>
        ))}
      </div>
      <button className="boton" type="submit">
        Comprobar
      </button>
    </form>
  )
}

export default App
