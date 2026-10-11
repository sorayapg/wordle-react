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
  const intentos = tableroVacio()

  return (
    <div className="juego">
      <h1>Wordle</h1>
      <div className="tablero">
        {intentos.map((fila, f) => (
          <div className="fila" key={f}>
            {fila.map((letra, c) => (
              <Casilla key={c} letra={letra} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App