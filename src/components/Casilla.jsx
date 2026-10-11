
function Casilla({ letra, estado = '', onCambio }) {
  return (
    <input
      className={`casilla ${estado}`}
      value={letra}
      maxLength={1}
      onChange={onCambio}
    />
  )
}

export default Casilla
