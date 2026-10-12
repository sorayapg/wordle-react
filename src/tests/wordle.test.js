
import { describe, it, expect } from 'vitest'
import { estadosDeFila } from '../App.jsx'

// Agrupamos las pruebas de nuestro juego Wordle
describe('Pruebas de Wordle', () => {

  // Primera prueba: comprobamos que Vitest funciona
  it('debe reconocer una palabra de cinco letras', () => {
    // Definimos una palabra de ejemplo
    const palabra = 'PERRO'

    // Comprobamos que tiene exactamente cinco letras
    expect(palabra.length).toBe(5)
  })

  // Segunda prueba: comprobamos que una letra repetida no se cuenta dos veces
  it('debe evaluar correctamente las letras repetidas', () => {
    // La solución contiene una sola letra R
    const solucion = 'LIBRO'

    // El intento contiene dos letras R
    const intento = ['P', 'E', 'R', 'R', 'O']

    // Calculamos el estado de cada letra
    const resultado = estadosDeFila(intento, solucion)

    // Comprobamos que solo se utiliza una R
    expect(resultado).toEqual([
      'ausente',
      'ausente',
      'ausente',
      'correcta',
      'correcta'
    ])
  })

  // PRUEBA 3: Comprobamos que una palabra acertada se evalúa correctamente
  it('debe marcar todas las letras como correctas al acertar', () => {

    // Definimos la palabra secreta
    const solucion = 'GATOS'

    // Introducimos exactamente la misma palabra
    const intento = ['G', 'A', 'T', 'O', 'S']

    // Calculamos los estados de las cinco letras
    const resultado = estadosDeFila(intento, solucion)

    // Todas las letras deben estar en la posición correcta
    expect(resultado).toEqual([
      'correcta',
      'correcta',
      'correcta',
      'correcta',
      'correcta'
    ])

  })

  // PRUEBA 4: Comprobamos las letras presentes en otra posición
  it('debe detectar letras presentes en otra posición', () => {

    // Definimos la palabra secreta
    const solucion = 'GATOS'

    // Introducimos las mismas letras en distinto orden
    const intento = ['S', 'O', 'T', 'A', 'G']

    // Calculamos el estado de cada letra
    const resultado = estadosDeFila(intento, solucion)

    // La T está bien colocada y las demás letras
    // existen en la solución, pero en otras posiciones
    expect(resultado).toEqual([
      'presente',
      'presente',
      'correcta',
      'presente',
      'presente'
    ])

  })

})
