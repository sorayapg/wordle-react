
function Casilla({ letra, estado = '' }) {
  return (
    <input
      className={`casilla ${estado}`}
      value={letra}
      maxLength={1}
      readOnly
    />
  )
}

export default Casilla
