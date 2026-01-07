import { useState } from 'react';

const Icons = {
  Trophy: () => <span className="text-3xl">🏆</span>,
  Zap: () => <span className="text-3xl">⚡</span>,
  Target: () => <span className="text-3xl">🎯</span>,
  Flame: () => <span className="text-3xl">🔥</span>,
  Award: () => <span className="text-3xl">🏅</span>,
  Clock: () => <span className="text-2xl">⏰</span>,
  ChevronRight: () => <span className="text-xl">→</span>
};

const preguntasPorDia = {
  1: [
    {
      id: 1,
      tipo: 'noticia',
      titulo: '📰 El dólar blue cerró en $1.250',
      pregunta: 'Compraste USD 1.000 hace 3 meses a $1.000. ¿Cuánto ganaste en pesos?',
      opciones: [
        { texto: 'Nada, los dólares valen lo mismo', correcto: false },
        { texto: '$250.000', correcto: true },
        { texto: 'Perdí poder adquisitivo', correcto: false },
        { texto: 'Gané 25% en dólares', correcto: false }
      ],
      puntos: 15,
      explicacion: 'Tus USD 1.000 ahora valen $1.250.000 vs los $1.000.000 de hace 3 meses. Ganaste $250.000 en pesos (25%). Pero en dólares seguís teniendo USD 1.000. Por eso el dólar es refugio, no inversión.'
    },
    {
      id: 2,
      tipo: 'trivia',
      titulo: '💰 ¿Qué es la inflación?',
      pregunta: 'Tu sueldo sigue siendo $500k, pero el super que te costaba $80k ahora sale $100k. Esto es:',
      opciones: [
        { texto: 'Mala suerte', correcto: false },
        { texto: 'Inflación', correcto: true },
        { texto: 'El super me está cagando', correcto: false },
        { texto: 'Crisis económica', correcto: false }
      ],
      puntos: 10,
      explicacion: 'Eso es inflación: cuando tus pesos compran cada vez menos. No es que ganás mal, es que tu plata vale menos. En Argentina, es una constante silenciosa que te roba todos los días.'
    },
    {
      id: 3,
      tipo: 'calculo',
      titulo: '🧮 Hacé la cuenta',
      pregunta: 'Tu sueldo pasó de $500k a $650k en un año (30%). La inflación fue 25%. ¿Ganaste o perdiste?',
      opciones: [
        { texto: 'Gané 30%', correcto: false },
        { texto: 'Gané 5%', correcto: false },
        { texto: 'Gané 4%', correcto: true },
        { texto: 'Perdí', correcto: false }
      ],
      puntos: 20,
      explicacion: 'El cálculo real: (650/500) / 1.25 = 1.04. Ganaste 4% de poder adquisitivo. Tu sueldo le ganó a la inflación, pero apenas. Por eso siempre tenés que calcular en términos REALES, no nominales.'
    },
    {
      id: 4,
      tipo: 'decision',
      titulo: '🎯 Cobrás en 15 días',
      pregunta: 'Tenés $100k en la billetera. Cobrás en 15 días. El dólar viene subiendo. ¿Qué hacés HOY?',
      opciones: [
        { texto: 'Nada, espero a cobrar', correcto: false },
        { texto: 'Compro dólares con esos $100k', correcto: true },
        { texto: 'Plazo fijo a 15 días', correcto: false },
        { texto: 'Me los gasto', correcto: false }
      ],
      puntos: 10,
      explicacion: 'Cada día que esperás con pesos en mano durante una corrida cambiaria perdés poder adquisitivo. Mejor tener USD 80 hoy que USD 70 en 15 días. Dolarizar primero, pensar después.'
    },
    {
      id: 5,
      tipo: 'realidad',
      titulo: '🔥 El dilema de Martín',
      pregunta: 'Martín ahorró USD 10k trabajando de freelance. Tiene 28 años. ¿Qué debería hacer?',
      opciones: [
        { texto: 'Guardarlos abajo del colchón', correcto: false },
        { texto: 'Comprar un auto', correcto: false },
        { texto: 'Invertir en un plazo fijo en USD al 3% anual', correcto: true },
        { texto: 'Comprar cripto y holdear', correcto: false }
      ],
      puntos: 25,
      explicacion: 'A los 28, con USD 10k, el auto es un pasivo (se deprecia). Cripto es muy volátil para el 100% de tu patrimonio. El colchón no genera retorno. Un plazo fijo en USD te da 3-4% anual sin riesgo cambiario. Es poco, pero es crecer sin perder. Luego diversificás.'
    }
  ],
  2: [
    {
      id: 6,
      tipo: 'calculo',
      titulo: '🧮 Plazo fijo vs Inflación',
      pregunta: 'Pusiste $100k en plazo fijo al 8% mensual. Un mes después tenés $108k. La inflación del mes fue 10%. ¿Qué pasó?',
      opciones: [
        { texto: 'Gané $8.000', correcto: false },
        { texto: 'Perdí $2.000 en poder adquisitivo', correcto: true },
        { texto: 'Gané 8%', correcto: false },
        { texto: 'Quedé igual', correcto: false }
      ],
      puntos: 20,
      explicacion: 'Tenés más pesos (ganaste nominalmente), pero podés comprar menos (perdiste en términos reales). Cálculo: $108k / 1.10 = $98.181 en pesos de hace un mes. Perdiste $1.819 de poder adquisitivo.'
    },
    {
      id: 7,
      tipo: 'noticia',
      titulo: '📰 Bitcoin cayó 15% esta semana',
      pregunta: 'Tenés 0.01 BTC (aprox USD 1.000). ¿Qué hacés?',
      opciones: [
        { texto: 'Vendo todo, me asusté', correcto: false },
        { texto: 'No hago nada, holdeo', correcto: true },
        { texto: 'Compro más "en el dip"', correcto: false },
        { texto: 'Lo paso a pesos', correcto: false }
      ],
      puntos: 15,
      explicacion: 'Si invertiste en BTC pensando en 5+ años, una caída del 15% es ruido. Bitcoin bajó 80% en 2022 y se recuperó. La clave es tu horizonte temporal. Si necesitás la plata YA, no deberías haber invertido. Si es largo plazo, holdear es lo racional.'
    },
    {
      id: 8,
      tipo: 'trivia',
      titulo: '💰 ¿Qué es el interés compuesto?',
      pregunta: 'Invertís USD 1.000 al 10% anual. Al año tenés USD 1.100. Lo reinvertís. Al segundo año, ¿cuánto tenés?',
      opciones: [
        { texto: 'USD 1.200', correcto: false },
        { texto: 'USD 1.210', correcto: true },
        { texto: 'USD 1.100', correcto: false },
        { texto: 'Depende del banco', correcto: false }
      ],
      puntos: 10,
      explicacion: 'Año 1: USD 1.100. Año 2: USD 1.100 × 1.10 = USD 1.210. Ganaste interés sobre el interés. Esos USD 10 extra son la magia del interés compuesto. Einstein lo llamó "la octava maravilla del mundo".'
    },
    {
      id: 9,
      tipo: 'decision',
      titulo: '🎯 Te aumentaron el sueldo',
      pregunta: 'Tu sueldo pasó de $500k a $600k. ¿Qué hacés con esos $100k extra?',
      opciones: [
        { texto: 'Mejoro mi estilo de vida', correcto: false },
        { texto: 'Los ahorro/invierto', correcto: true },
        { texto: 'Me endeudo para comprar algo más grande', correcto: false },
        { texto: 'Los dejo en la cuenta', correcto: false }
      ],
      puntos: 10,
      explicacion: 'La trampa del "lifestyle creep": cuando ganas más, gastas más. Los $100k extra son la oportunidad de acelerar tu patrimonio. Inversión > consumo. Siempre.'
    },
    {
      id: 10,
      tipo: 'realidad',
      titulo: '🔥 La decisión del auto',
      pregunta: 'Tenés USD 15k. Un auto 0km sale USD 20k. ¿Qué hacés?',
      opciones: [
        { texto: 'Saco crédito prendario por USD 5k', correcto: false },
        { texto: 'Espero y sigo ahorrando', correcto: false },
        { texto: 'Compro uno usado por USD 10k', correcto: false },
        { texto: 'Invierto los USD 15k y sigo en colectivo', correcto: true }
      ],
      puntos: 25,
      explicacion: 'El auto es un pasivo. Se deprecia 15-20% anual. Los USD 15k invertidos al 8% anual son USD 32k en 10 años. El auto en 10 años vale USD 3k. ¿Querés movilidad o querés patrimonio? Si podés esperar, esperá.'
    }
  ]
};

preguntasPorDia[0] = preguntasPorDia[1];
preguntasPorDia[3] = preguntasPorDia[1];
preguntasPorDia[4] = preguntasPorDia[2];
preguntasPorDia[5] = preguntasPorDia[1];
preguntasPorDia[6] = preguntasPorDia[2];

export default function App() {
  const [pantalla, setPantalla] = useState('login');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [desafioActual, setDesafioActual] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [mostrarExplicacion, setMostrarExplicacion] = useState(false);
  const [puntosHoy, setPuntosHoy] = useState(0);
  const [racha] = useState(3);
  const [puntosAcumulados, setPuntosAcumulados] = useState(0);
  
  const diaActual = new Date().getDay();
  const desafiosDiarios = preguntasPorDia[diaActual] || preguntasPorDia[1];

  const [leaderboard, setLeaderboard] = useState([
    { nombre: 'Martín', puntos: 850, nivel: 'Inversor' },
    { nombre: 'Laura', puntos: 720, nivel: 'Ahorrador Pro' },
    { nombre: 'Diego', puntos: 680, nivel: 'Ahorrador Pro' },
    { nombre: 'Ana', puntos: 540, nivel: 'Ahorrador' },
    { nombre: 'Carlos', puntos: 420, nivel: 'Principiante' }
  ]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (nombreUsuario.trim()) {
      const usuarioExiste = leaderboard.find(u => u.nombre === nombreUsuario);
      if (!usuarioExiste) {
        setLeaderboard([{ nombre: nombreUsuario, puntos: 0, nivel: 'Principiante' }, ...leaderboard]);
      } else {
        setPuntosAcumulados(usuarioExiste.puntos);
      }
      setPantalla('bienvenida');
    }
  };

  const manejarRespuesta = (opcion, index) => {
    setRespuestaSeleccionada(index);
    setMostrarExplicacion(true);
    
    if (opcion.correcto) {
      const puntosGanados = desafiosDiarios[desafioActual].puntos;
      setPuntosHoy(prev => prev + puntosGanados);
      setPuntosAcumulados(prev => prev + puntosGanados);
    }
  };

  const siguienteDesafio = () => {
    if (desafioActual < desafiosDiarios.length - 1) {
      setDesafioActual(prev => prev + 1);
      setRespuestaSeleccionada(null);
      setMostrarExplicacion(false);
    } else {
      const nuevosLideres = leaderboard.map(u => 
        u.nombre === nombreUsuario ? { ...u, puntos: puntosAcumulados } : u
      );
      nuevosLideres.sort((a, b) => b.puntos - a.puntos);
      setLeaderboard(nuevosLideres);
      setPantalla('resultado');
    }
  };

  const iniciarDesafio = () => {
    setPantalla('juego');
    setDesafioActual(0);
    setRespuestaSeleccionada(null);
    setMostrarExplicacion(false);
    setPuntosHoy(0);
  };

  if (pantalla === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-block bg-yellow-400 rounded-full p-6 mb-4 shadow-2xl">
              <Icons.Zap />
            </div>
            <h1 className="text-5xl font-black text-white mb-2">FinanZap</h1>
            <p className="text-purple-200 text-lg">Tu snack financiero diario 🚀</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-purple-900 mb-2">¡Bienvenido!</h2>
            <p className="text-gray-600 mb-6">¿Cómo te llamás?</p>
            
            <form onSubmit={handleLogin}>
              <input
                type="text"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                placeholder="Tu nombre"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-lg mb-4 focus:outline-none focus:border-purple-500"
                autoFocus
              />
              
              <button
                type="submit"
                disabled={!nombreUsuario.trim()}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-xl shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Empezar a aprender 🚀
              </button>
            </form>

            <p className="text-gray-500 text-sm text-center mt-4">
              3 minutos al día • 5 preguntas • Sistema de puntos
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (pantalla === 'bienvenida') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="inline-block bg-purple-100 rounded-full p-4 mb-4">
                <span className="text-4xl">🎯</span>
              </div>
              <h2 className="text-3xl font-black text-purple-900 mb-2">
                Antes de empezar, {nombreUsuario}...
              </h2>
              <p className="text-gray-600 text-lg">
                Aclaremos cuál es el objetivo
              </p>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed mb-8">
              <p>
                <strong className="text-purple-900">FinanZap no es la verdad absoluta.</strong> Es una herramienta educativa con un objetivo claro: ayudarte a construir una vida financieramente ordenada y sólida en el largo plazo.
              </p>

              <div className="bg-purple-50 rounded-xl p-4 border-l-4 border-purple-500">
                <p className="font-semibold text-purple-900 mb-2">🎯 Nuestra filosofía:</p>
                <ul className="space-y-2 text-sm">
                  <li>✓ Priorizar el <strong>patrimonio a largo plazo</strong> sobre el consumo inmediato</li>
                  <li>✓ Protegerte de la inflación y la devaluación</li>
                  <li>✓ Tomar decisiones basadas en <strong>retorno real</strong>, no nominal</li>
                  <li>✓ Construir libertad financiera con disciplina y paciencia</li>
                </ul>
              </div>

              <p>
                Muchas de nuestras "respuestas correctas" priorizan la estabilidad financiera sobre otras opciones válidas. Por ejemplo: preferimos invertir antes que comprar un auto, o ahorrar en dólares antes que gastar en pesos.
              </p>

              <p>
                <strong className="text-purple-900">¿Esto significa que es la única forma de vivir?</strong> No. Cada persona tiene sus prioridades. Pero si tu objetivo es construir patrimonio y seguridad financiera en Argentina, estos principios funcionan.
              </p>

              <div className="bg-yellow-50 rounded-xl p-4 border-l-4 border-yellow-500">
                <p className="text-sm">
                  <strong className="text-yellow-900">💡 Recordá:</strong> Las finanzas personales son un estilo de vida. Nosotros te enseñamos el camino hacia la solidez financiera. Vos decidís cuánto de ese camino querés recorrer.
                </p>
              </div>
            </div>

            <button
              onClick={() => setPantalla('home')}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-xl shadow-lg hover:scale-105 transition-transform"
            >
              Entendido, ¡vamos! 🚀
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (pantalla === 'home') {
    const usuarioEnLeaderboard = leaderboard.find(u => u.nombre === nombreUsuario);
    const posicion = leaderboard.findIndex(u => u.nombre === nombreUsuario) + 1;

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="max-w-md mx-auto p-6">
          <div className="text-center mb-8 pt-8">
            <div className="inline-block bg-yellow-400 rounded-full p-4 mb-4 shadow-lg">
              <Icons.Zap />
            </div>
            <h1 className="text-5xl font-black text-white mb-2">FinanZap</h1>
            <p className="text-purple-200 text-lg">Hola {nombreUsuario}! 👋</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-6 border border-white/20">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Icons.Flame />
                  <span className="text-2xl font-bold text-white">{racha}</span>
                </div>
                <p className="text-xs text-purple-200">días seguidos</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Icons.Trophy />
                  <span className="text-2xl font-bold text-white">{puntosAcumulados}</span>
                </div>
                <p className="text-xs text-purple-200">puntos totales</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Icons.Award />
                  <span className="text-2xl font-bold text-white">5</span>
                </div>
                <p className="text-xs text-purple-200">desafíos hoy</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-3">
              <p className="text-white text-sm font-semibold">🎯 Nivel: {usuarioEnLeaderboard?.nivel || 'Principiante'}</p>
              <div className="bg-white/20 rounded-full h-2 mt-2">
                <div 
                  className="bg-white rounded-full h-2 transition-all duration-500"
                  style={{width: `${(puntosAcumulados % 100)}%`}}
                />
              </div>
              <p className="text-white/80 text-xs mt-1">
                {100 - (puntosAcumulados % 100)} puntos para subir de nivel
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-6 mb-4 shadow-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white rounded-full p-2">
                <Icons.Target />
              </div>
              <div>
                <h2 className="text-white font-bold text-xl">Desafío Diario</h2>
                <p className="text-orange-100 text-sm">5 preguntas • 3-5 min • 80 puntos</p>
              </div>
            </div>

            <div className="bg-white/20 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Icons.Clock />
                <span className="text-white text-sm font-semibold">Temas de hoy:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white/30 text-white text-xs px-3 py-1 rounded-full">Inflación</span>
                <span className="bg-white/30 text-white text-xs px-3 py-1 rounded-full">Dólar</span>
                <span className="bg-white/30 text-white text-xs px-3 py-1 rounded-full">Bitcoin</span>
              </div>
            </div>

            <button
              onClick={iniciarDesafio}
              className="w-full bg-white text-orange-600 font-bold py-4 rounded-xl shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              ¡Empezar ahora!
              <Icons.ChevronRight />
            </button>
          </div>

          <button
            onClick={() => setPantalla('leaderboard')}
            className="w-full bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icons.Trophy />
                <div className="text-left">
                  <p className="text-white font-bold">Leaderboard</p>
                  <p className="text-purple-200 text-sm">Estás en el puesto #{posicion}</p>
                </div>
              </div>
              <Icons.ChevronRight />
            </div>
          </button>
        </div>
      </div>
    );
  }

  if (pantalla === 'juego') {
    const desafio = desafiosDiarios[desafioActual];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="max-w-md mx-auto p-6">
          <div className="mb-6 pt-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Icons.Zap />
                <span className="text-white font-bold text-lg">{puntosHoy} pts</span>
              </div>
              <span className="text-purple-200 text-sm">
                {desafioActual + 1} de {desafiosDiarios.length}
              </span>
            </div>
            
            <div className="bg-white/20 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full h-3 transition-all duration-500"
                style={{width: `${((desafioActual + 1) / desafiosDiarios.length) * 100}%`}}
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-2xl mb-6">
            <h3 className="text-purple-900 font-bold text-lg mb-4">{desafio.titulo}</h3>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">{desafio.pregunta}</p>

            <div className="space-y-3">
              {desafio.opciones.map((opcion, index) => (
                <button
                  key={index}
                  onClick={() => !mostrarExplicacion && manejarRespuesta(opcion, index)}
                  disabled={mostrarExplicacion}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    respuestaSeleccionada === index
                      ? opcion.correcto
                        ? 'bg-green-500 text-white border-green-600'
                        : 'bg-red-500 text-white border-red-600'
                      : mostrarExplicacion && opcion.correcto
                      ? 'bg-green-100 border-green-500 text-gray-900 border-2'
                      : 'bg-purple-100 hover:bg-purple-200 border-purple-300 text-gray-900'
                  } border-2 font-medium`}
                >
                  <div className="flex items-center justify-between">
                    <span>{opcion.texto}</span>
                    {mostrarExplicacion && (
                      opcion.correcto ? <span className="text-2xl">✅</span> : respuestaSeleccionada === index ? <span className="text-2xl">❌</span> : null
                    )}
                  </div>
                </button>
              ))}
            </div>

            {!mostrarExplicacion && (
              <div className="mt-4 text-center">
                <span className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-bold">
                  +{desafio.puntos} puntos 🎯
                </span>
              </div>
            )}
          </div>

          {mostrarExplicacion && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
              <h4 className="text-white font-bold mb-2">💡 Explicación:</h4>
              <p className="text-purple-100 leading-relaxed mb-6">{desafio.explicacion}</p>

              <button
                onClick={siguienteDesafio}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-4 rounded-xl shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
              >
                {desafioActual < desafiosDiarios.length - 1 ? 'Siguiente desafío' : 'Ver resultados'}
                <Icons.ChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (pantalla === 'resultado') {
    const porcentaje = (puntosHoy / 80) * 100;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-block bg-yellow-400 rounded-full p-6 mb-4 shadow-2xl">
              <Icons.Trophy />
            </div>
            
            <h1 className="text-5xl font-black text-white mb-2">¡{puntosHoy} puntos!</h1>
            <p className="text-purple-200 text-xl">
              {porcentaje >= 80 ? '¡Sos un crack! 🔥' : porcentaje >= 60 ? '¡Muy bien! 💪' : '¡Seguí practicando! 📈'}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-2xl mb-6">
            <h3 className="font-bold text-purple-900 mb-4 text-lg">Tu resumen del día:</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Desafíos completados</span>
                <span className="font-bold text-purple-900">5/5 ✅</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Respuestas correctas</span>
                <span className="font-bold text-purple-900">{Math.round(porcentaje/20)}/5</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Racha</span>
                <span className="font-bold text-orange-500">{racha} días 🔥</span>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Total acumulado</span>
                  <span className="font-bold text-purple-900 text-xl">{puntosAcumulados} pts</span>
                </div>
                <p className="text-sm text-gray-500">
                  Estás en el top {leaderboard.findIndex(l => l.nombre === nombreUsuario) + 1} del leaderboard 🏆
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setPantalla('leaderboard')}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-xl shadow-lg hover:scale-105 transition-transform mb-3"
          >
            Ver Leaderboard
          </button>

          <button
            onClick={() => setPantalla('home')}
            className="w-full bg-white/10 backdrop-blur-lg text-white font-bold py-4 rounded-xl border border-white/20"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  if (pantalla === 'leaderboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="max-w-md mx-auto p-6">
          <div className="text-center mb-8 pt-8">
            <Icons.Trophy />
            <h1 className="text-4xl font-black text-white mb-2">Leaderboard</h1>
            <p className="text-purple-200">Los mejores de la semana 🔥</p>
          </div>

          <div className="space-y-3 mb-6">
            {leaderboard.map((usuario, index) => (
              <div
                key={index}
                className={`rounded-2xl p-5 ${
                  usuario.nombre === nombreUsuario
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 border-2 border-yellow-300'
                    : 'bg-white/10 backdrop-blur-lg border border-white/20'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-black text-white">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-bold text-white">
                      {usuario.nombre}
                      {usuario.nombre === nombreUsuario && ' (Vos)'}
                    </p>
                    <p className={`text-sm ${usuario.nombre === nombreUsuario ? 'text-orange-100' : 'text-purple-200'}`}>
                      {usuario.nivel}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">{usuario.puntos}</p>
                    <p className={`text-xs ${usuario.nombre === nombreUsuario ? 'text-orange-100' : 'text-purple-200'}`}>
                      puntos
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setPantalla('home')}
            className="w-full bg-white/10 backdrop-blur-lg text-white font-bold py-4 rounded-xl border border-white/20"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }
}