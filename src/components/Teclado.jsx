
function Teclado({ onLetra }) {

  // Distribuimos las letras en tres filas,
  // siguiendo el orden habitual de un teclado español.
  const filas = [
    'QWERTYUIOP',
    'ASDFGHJKLÑ',
    'ZXCVBNM'
  ]

  return (
    <div className="teclado">
      {/* Recorremos las tres filas del teclado */}
      {filas.map((fila, indice) => (
        <div className="teclado-fila" key={indice}>

          {/* Creamos un botón para cada letra */}
          {fila.split('').map((letra) => (
            <button
              key={letra}
              type="button"
              className="tecla"
              onClick={() => onLetra(letra)}
              aria-label={`Escribir letra ${letra}`}
            >
              {letra}
            </button>
          ))}

        </div>
      ))}
    </div>
  )
}

export default Teclado
