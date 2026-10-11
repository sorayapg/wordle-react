
function Casilla({ letra, estado = '', activa, onCambio }) {

  // Controla las teclas que pulsamos dentro de una casilla
  function manejarTecla(evento) {

    // Si pulsamos Backspace y la casilla está vacía,
    // retrocedemos a la casilla anterior
    if (evento.key === 'Backspace' && evento.target.value === '') {
      evento.target.previousElementSibling?.focus()
    }
  }

  return (
    <input
      className={`casilla ${estado}`}
      value={letra}
      maxLength={1}
      disabled={!activa}
      onChange={onCambio}
      onKeyDown={manejarTecla}
    />
  )
}

export default Casilla
