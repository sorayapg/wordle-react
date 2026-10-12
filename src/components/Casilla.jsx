
function Casilla({ letra, estado = '', activa, onCambio, etiqueta }) {

  // Relaciona cada resultado con un símbolo visible
  const simbolos = {
    correcta: '✓',
    presente: '~',
    ausente: '✕'
  }

  // Obtiene el símbolo correspondiente al estado de la casilla
  const simbolo = simbolos[estado] || ''

  // Controla las teclas que pulsamos dentro de una casilla
  function manejarTecla(evento) {

    // Si pulsamos Backspace y la casilla está vacía,
    // retrocedemos a la casilla anterior
    if (evento.key === 'Backspace' && evento.target.value === '') {

      // Buscamos el contenedor de la casilla actual
      const contenedor = evento.target.closest('.contenedor-casilla')

      // Localizamos el input del contenedor anterior
      const anterior = contenedor?.previousElementSibling?.querySelector('input')

      // Movemos el cursor si existe una casilla anterior
      anterior?.focus()
    }
  }

  // Dibuja la casilla junto con su símbolo de accesibilidad
  return (
    <span className="contenedor-casilla">

      {/* Casilla en la que el jugador escribe una letra */}
      <input
        className={`casilla ${estado}`}
        value={letra}
        maxLength={1}
        disabled={!activa}
        onChange={onCambio}
        onKeyDown={manejarTecla}
        aria-label={etiqueta}
      />

      {/* Símbolo visual que complementa el color */}
      {simbolo && (
        <span className="simbolo-casilla" aria-hidden="true">
          {simbolo}
        </span>
      )}

    </span>
  )
}

export default Casilla
