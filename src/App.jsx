import { useState, useEffect } from 'react';

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
},

  3: [
    {
      id: 11,
      tipo: 'decision',
      titulo: '🎯 Encontraste $50k',
      pregunta: 'Apareció un billete de $50k viejo en un cajón. ¿Qué hacés?',
      opciones: [
        { texto: 'Lo gasto en algo que quiero', correcto: false },
        { texto: 'Lo cambio a dólares YA', correcto: true },
        { texto: 'Lo dejo ahí por las dudas', correcto: false },
        { texto: 'Plazo fijo UVA', correcto: false }
      ],
      puntos: 10,
      explicacion: '$50k hoy son USD 40. En un mes, tal vez USD 35. Cada hora con pesos en mano es pérdida. Dolarizás primero, pensás después.'
    },
    {
      id: 12,
      tipo: 'noticia',
      titulo: '📰 BCRA subió tasa al 100% anual',
      pregunta: '¿Esto significa que conviene el plazo fijo en pesos?',
      opciones: [
        { texto: 'Sí, 100% es mucho', correcto: false },
        { texto: 'No, la inflación será mayor', correcto: true },
        { texto: 'Depende del banco', correcto: false },
        { texto: 'Solo si es UVA', correcto: false }
      ],
      puntos: 15,
      explicacion: 'Si suben la tasa al 100%, esperan inflación del 120%+. Es señal de alarma, no oportunidad. El BCRA no regala plata.'
    },
    {
      id: 13,
      tipo: 'calculo',
      titulo: '🧮 ¿Cuánto para jubilarte?',
      pregunta: 'Querés vivir con USD 1.000/mes sin trabajar. ¿Cuánto necesitás ahorrar para jubilarte?',
      opciones: [
        { texto: 'USD 100k', correcto: false },
        { texto: 'USD 300k', correcto: true },
        { texto: 'USD 500k', correcto: false },
        { texto: 'USD 1 millón', correcto: false }
      ],
      puntos: 20,
      explicacion: 'Regla del 4%: necesitás 25 veces tu gasto anual. USD 1k/mes × 12 = USD 12k/año × 25 = USD 300k. Con eso, retirás 4% anual indefinidamente.'
    },
    {
      id: 14,
      tipo: 'trivia',
      titulo: '💰 ¿Qué es el dólar MEP?',
      pregunta: 'El dólar MEP es:',
      opciones: [
        { texto: 'El dólar oficial', correcto: false },
        { texto: 'El que se compra en la Bolsa', correcto: true },
        { texto: 'El dólar blue', correcto: false },
        { texto: 'Una estafa', correcto: false }
      ],
      puntos: 10,
      explicacion: 'MEP = Mercado Electrónico de Pagos. Comprás un bono en pesos, lo vendés en dólares. Legal, más barato que blue, pero tiene parking.'
    },
    {
      id: 15,
      tipo: 'realidad',
      titulo: '🔥 Juan y el Bitcoin',
      pregunta: 'Juan tiene USD 5k. Quiere poner USD 1k en Bitcoin. ¿Es buena idea?',
      opciones: [
        { texto: 'No, es muy arriesgado', correcto: false },
        { texto: 'Sí, pero solo el 20%', correcto: true },
        { texto: 'Sí, todo a BTC', correcto: false },
        { texto: 'No, mejor plazo fijo', correcto: false }
      ],
      puntos: 25,
      explicacion: 'Regla: nunca más del 10-20% en activos volátiles. USD 1k de USD 5k = 20%. Si BTC cae 50%, perdés USD 500, no USD 2.500. Diversificación es clave.'
    }
  ],
  4: [
    {
      id: 16,
      tipo: 'trivia',
      titulo: '💰 ¿Qué es un ETF?',
      pregunta: 'Un ETF es:',
      opciones: [
        { texto: 'Una criptomoneda', correcto: false },
        { texto: 'Un fondo que replica un índice', correcto: true },
        { texto: 'Una acción', correcto: false },
        { texto: 'Un plazo fijo', correcto: false }
      ],
      puntos: 10,
      explicacion: 'ETF = Exchange Traded Fund. Es como comprar una "canasta" de acciones. Ejemplo: ETF del S&P 500 = las 500 empresas más grandes de USA.'
    },
    {
      id: 17,
      tipo: 'noticia',
      titulo: '📰 Inflación diciembre: 25%',
      pregunta: '¿Cómo afecta esto a tu aguinaldo?',
      opciones: [
        { texto: 'No me afecta', correcto: false },
        { texto: 'Mi aguinaldo vale 20% menos que en junio', correcto: true },
        { texto: 'Gané poder adquisitivo', correcto: false },
        { texto: 'Depende de mi sueldo', correcto: false }
      ],
      puntos: 15,
      explicacion: 'Si inflación semestral fue 25%, tu aguinaldo de diciembre compra 20% menos que el de junio (1/1.25 = 0.80). Dolarizar apenas cobrás.'
    },
    {
      id: 18,
      tipo: 'calculo',
      titulo: '🧮 Costo de no invertir',
      pregunta: 'Guardás USD 10k en el colchón 10 años (0% retorno). Si hubieras invertido al 8% anual, ¿cuánto tendrías?',
      opciones: [
        { texto: 'USD 11k', correcto: false },
        { texto: 'USD 18k', correcto: false },
        { texto: 'USD 21.6k', correcto: true },
        { texto: 'USD 15k', correcto: false }
      ],
      puntos: 20,
      explicacion: 'USD 10k × (1.08)^10 = USD 21.589. Perdiste USD 11.589 por no invertir. El costo de no hacer nada es ENORME.'
    },
    {
      id: 19,
      tipo: 'decision',
      titulo: '🎯 Préstamo personal',
      pregunta: 'Te ofrecen préstamo al 80% TNA en pesos. ¿Lo tomás?',
      opciones: [
        { texto: 'Sí, 80% es poco', correcto: false },
        { texto: 'No, es carísimo', correcto: true },
        { texto: 'Depende para qué', correcto: false },
        { texto: 'Solo si inflación es mayor', correcto: false }
      ],
      puntos: 10,
      explicacion: '80% TNA suena "bajo", pero es CFT 110%+. Y si inflación baja, te morís pagando. Préstamos en pesos casi nunca convienen.'
    },
    {
      id: 20,
      tipo: 'realidad',
      titulo: '🔥 Ana freelancer',
      pregunta: 'Ana cobra USD 2k/mes. ¿Cómo manejarlo?',
      opciones: [
        { texto: 'Pesificar todo', correcto: false },
        { texto: 'Mantener 70% en USD, pesificar lo que gasta', correcto: true },
        { texto: 'Todo a Bitcoin', correcto: false },
        { texto: 'Comprar propiedades', correcto: false }
      ],
      puntos: 25,
      explicacion: 'Regla de oro: si cobrás en dólares, ahorrás en dólares. Pesificá solo gastos del mes. El resto en USD o invertido. Nunca al revés.'
    }
  ],
  5: [
    {
      id: 21,
      tipo: 'decision',
      titulo: '🎯 Vacaciones a Brasil',
      pregunta: 'Sale USD 1.500. Tenés USD 3k ahorrados. ¿Vas?',
      opciones: [
        { texto: 'Sí, me lo merezco', correcto: false },
        { texto: 'No, es el 50% de mi patrimonio', correcto: true },
        { texto: 'Sí, pero más barato', correcto: false },
        { texto: 'Voy y lo financio', correcto: false }
      ],
      puntos: 10,
      explicacion: 'Gastar 50% del patrimonio en vacaciones es un lujo que no podés darte. Regla: gastos grandes solo cuando tenés 10x ese monto. Con USD 3k, máximo USD 300 en vacaciones.'
    },
    {
      id: 22,
      tipo: 'noticia',
      titulo: '📰 Oro alcanzó USD 2.100/onza',
      pregunta: '¿Conviene comprar oro ahora?',
      opciones: [
        { texto: 'Sí, está en máximos', correcto: false },
        { texto: 'No, está caro', correcto: false },
        { texto: 'Depende de tu estrategia', correcto: true },
        { texto: 'Mejor Bitcoin', correcto: false }
      ],
      puntos: 15,
      explicacion: 'El oro no "sube", preserva valor. Si está en máximos en USD, es porque el dólar pierde poder. El oro es seguro, no crecimiento.'
    },
    {
      id: 23,
      tipo: 'calculo',
      titulo: '🧮 Alquiler vs Compra',
      pregunta: 'Alquiler: USD 500/mes. Comprar: USD 120k. Inversión 8% anual. ¿Qué conviene?',
      opciones: [
        { texto: 'Comprar', correcto: false },
        { texto: 'Alquilar e invertir', correcto: true },
        { texto: 'Depende', correcto: false },
        { texto: 'Es lo mismo', correcto: false }
      ],
      puntos: 20,
      explicacion: 'USD 120k al 8% = USD 9.6k/año = USD 800/mes. Alquilás por USD 500, sobran USD 300. En 10 años: USD 260k vs depto en USD 120k.'
    },
    {
      id: 24,
      tipo: 'trivia',
      titulo: '💰 ¿Qué es DCA?',
      pregunta: 'DCA (Dollar Cost Averaging) significa:',
      opciones: [
        { texto: 'Comprar todo de una', correcto: false },
        { texto: 'Comprar un poco cada mes', correcto: true },
        { texto: 'Vender cuando baja', correcto: false },
        { texto: 'Un tipo de cripto', correcto: false }
      ],
      puntos: 10,
      explicacion: 'DCA = comprar regularmente sin importar precio. Ej: USD 100/mes en Bitcoin. A veces caro, a veces barato. Promediás. Estrategia más segura.'
    },
    {
      id: 25,
      tipo: 'realidad',
      titulo: '🔥 Lucía a los 30',
      pregunta: 'Lucía: 30 años, USD 20k, sueldo USD 2k/mes. ¿Qué priorizar?',
      opciones: [
        { texto: 'Comprarse un depto', correcto: false },
        { texto: 'Invertir agresivamente (80% acciones)', correcto: true },
        { texto: 'Plazo fijo seguro', correcto: false },
        { texto: 'Todo en efectivo', correcto: false }
      ],
      puntos: 25,
      explicacion: 'A los 30, con buen ingreso y USD 20k, tenés 35 años para crecer. Tolerás volatilidad. 80% ETFs, 20% bonos. El tiempo es tu aliado.'
    }
  ],
  6: [
    {
      id: 26,
      tipo: 'calculo',
      titulo: '🔥 Devaluación vs Inflación',
      pregunta: 'Dólar: $1.000 → $1.200 (20%). Inflación: 15%. ¿Conclusión?',
      opciones: [
        { texto: 'Dólar ganó a inflación', correcto: true },
        { texto: 'Perdí poder adquisitivo', correcto: false },
        { texto: 'Es lo mismo', correcto: false },
        { texto: 'Inflación fue mayor', correcto: false }
      ],
      puntos: 20,
      explicacion: 'Devaluación 20% > Inflación 15% = dólar preservó mejor. Si tenías USD, ganaste 5% real (1.20/1.15=1.043). Con pesos, perdiste 15%.'
    },
    {
      id: 27,
      tipo: 'calculo',
      titulo: '🧮 BTC en pesos',
      pregunta: 'Compraste BTC a USD 30k (enero). Hoy USD 45k (50%). Dólar: $1.000 → $1.300. ¿Ganancia en pesos?',
      opciones: [
        { texto: '50%', correcto: false },
        { texto: '95%', correcto: true },
        { texto: '80%', correcto: false },
        { texto: '30%', correcto: false }
      ],
      puntos: 20,
      explicacion: 'Enero: BTC=$30M. Hoy: USD 45k=$58.5M. (58.5/30)-1=95%. Por eso en Argentina, medir en pesos es engañoso. Siempre medí en USD.'
    },
    {
      id: 28,
      tipo: 'decision',
      titulo: '🎯 Crédito UVA',
      pregunta: 'Cuota $350k, ajusta inflación, 20 años. Sueldo: $800k. ¿Lo tomás?',
      opciones: [
        { texto: 'Sí, cuota baja', correcto: false },
        { texto: 'No, muy arriesgado', correcto: true },
        { texto: 'Solo si sueldo sigue inflación', correcto: true },
        { texto: 'Sí, siempre conviene', correcto: false }
      ],
      puntos: 20,
      explicacion: 'Cuota hoy: 43% sueldo. Si tu sueldo no sigue inflación, en 2 años pagás 60-70%. Ruleta rusa. Solo con ingreso en USD o paritarias.'
    },
    {
      id: 29,
      tipo: 'trivia',
      titulo: '💰 ¿Qué es carry trade?',
      pregunta: 'Carry trade en Argentina:',
      opciones: [
        { texto: 'Comprar dólares y holdear', correcto: false },
        { texto: 'Pesos al 80% vs dólar 40%', correcto: true },
        { texto: 'Invertir en Bitcoin', correcto: false },
        { texto: 'Un plazo fijo', correcto: false }
      ],
      puntos: 20,
      explicacion: 'Carry = deuda barata en una moneda, invertir en otra con mayor retorno. Ej: pesos 80% vs dólar 40%. Si ganás, explotás. Si devalúa más, te fundís.'
    },
    {
      id: 30,
      tipo: 'realidad',
      titulo: '🔥 Pablo con USD 100k',
      pregunta: 'Pablo: 35 años, USD 100k, CABA, soltero. ¿Qué hacer?',
      opciones: [
        { texto: 'Comprar un depto', correcto: false },
        { texto: '60% ETFs, 20% BTC, 20% cash', correcto: true },
        { texto: 'Todo plazo fijo USD', correcto: false },
        { texto: 'Irse del país', correcto: false }
      ],
      puntos: 25,
      explicacion: 'A los 35, con USD 100k, depto te deja sin liquidez. Mejor: invertir agresivo, alquilar, en 10 años tener USD 250k+ para algo mejor. Propiedad para 45+.'
    }
  ],
  0: [
    {
      id: 31,
      tipo: 'trivia',
      titulo: '💰 Reserva de emergencia',
      pregunta: '¿Cuántos meses de gastos deberías tener ahorrados?',
      opciones: [
        { texto: '1-2 meses', correcto: false },
        { texto: '3-6 meses', correcto: true },
        { texto: '12 meses', correcto: false },
        { texto: 'No hace falta', correcto: false }
      ],
      puntos: 10,
      explicacion: '3-6 meses de gastos en activo líquido (dólares). Para aguantar sin ingresos por pérdida de laburo, enfermedad, etc. Es tu red de seguridad.'
    },
    {
      id: 32,
      tipo: 'noticia',
      titulo: '📰 Sube precio de alimentos 8%',
      pregunta: 'Tu sueldo subió 5% este mes. ¿Qué significa?',
      opciones: [
        { texto: 'Gané 5%', correcto: false },
        { texto: 'Perdí 3% de poder adquisitivo', correcto: true },
        { texto: 'Quedé igual', correcto: false },
        { texto: 'Depende', correcto: false }
      ],
      puntos: 15,
      explicacion: '(1.05/1.08)-1 = -2.8%. Tu sueldo creció menos que la inflación. Perdiste poder adquisitivo real, aunque tengas más billetes.'
    },
    {
      id: 33,
      tipo: 'calculo',
      titulo: '🧮 Regla del 72',
      pregunta: 'Invertís al 8% anual. ¿En cuántos años duplicás tu plata?',
      opciones: [
        { texto: '7 años', correcto: false },
        { texto: '9 años', correcto: true },
        { texto: '12 años', correcto: false },
        { texto: '8 años', correcto: false }
      ],
      puntos: 20,
      explicacion: 'Regla del 72: dividís 72 por tasa anual. 72/8 = 9 años. Es aproximación rápida para calcular tiempo de duplicación.'
    },
    {
      id: 34,
      tipo: 'decision',
      titulo: '🎯 Herencia de $5M',
      pregunta: 'Recibís $5M de herencia. ¿Qué hacés primero?',
      opciones: [
        { texto: 'Comprar algo grande', correcto: false },
        { texto: 'Dolarizar inmediatamente', correcto: true },
        { texto: 'Plazo fijo en pesos', correcto: false },
        { texto: 'Repartirlo en gastos', correcto: false }
      ],
      puntos: 10,
      explicacion: 'Paso 1: proteger el capital. Dolarizás YA. Paso 2: respirás. Paso 3: planificás qué hacer con esos USD. Nunca al revés.'
    },
    {
      id: 35,
      tipo: 'realidad',
      titulo: '🔥 María ahorra USD 300/mes',
      pregunta: 'María: 25 años, ahorra USD 300/mes. ¿En 10 años cuánto tiene al 8% anual?',
      opciones: [
        { texto: 'USD 36k', correcto: false },
        { texto: 'USD 55k', correcto: true },
        { texto: 'USD 42k', correcto: false },
        { texto: 'USD 30k', correcto: false }
      ],
      puntos: 25,
      explicacion: 'USD 300/mes × 120 meses = USD 36k de capital. Con interés compuesto al 8%, llega a USD 55k. El tiempo hace magia.'
    }
  ]
};

// Copiar contenido para días que aún no tienen asignación específica
preguntasPorDia[1] = preguntasPorDia[1]; // Lunes ya existe
preguntasPorDia[2] = preguntasPorDia[2]; // Martes ya existe  
preguntasPorDia[3] = preguntasPorDia[3]; // Miércoles ahora tiene contenido
preguntasPorDia[4] = preguntasPorDia[4]; // Jueves ahora tiene contenido
preguntasPorDia[5] = preguntasPorDia[5]; // Viernes ahora tiene contenido
preguntasPorDia[6] = preguntasPorDia[6]; // Sábado ahora tiene contenido
preguntasPorDia[0] = preguntasPorDia[0]; // Domingo ahora tiene contenido

// Copiar contenido para días que aún no tienen asignación específica
preguntasPorDia[1] = preguntasPorDia[1]; // Lunes ya existe
preguntasPorDia[2] = preguntasPorDia[2]; // Martes ya existe  
preguntasPorDia[3] = preguntasPorDia[3]; // Miércoles ahora tiene contenido
preguntasPorDia[4] = preguntasPorDia[4]; // Jueves ahora tiene contenido
preguntasPorDia[5] = preguntasPorDia[5]; // Viernes ahora tiene contenido
preguntasPorDia[6] = preguntasPorDia[6]; // Sábado ahora tiene contenido
preguntasPorDia[0] = preguntasPorDia[0]; // Domingo ahora tiene contenido

export default function App() {
  const [pantalla, setPantalla] = useState('loading');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [desafioActual, setDesafioActual] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [mostrarExplicacion, setMostrarExplicacion] = useState(false);
  const [puntosHoy, setPuntosHoy] = useState(0);
  const [racha, setRacha] = useState(1);
  const [puntosAcumulados, setPuntosAcumulados] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [cargando, setCargando] = useState(false);
  
  const diaActual = new Date().getDay();
  const desafiosDiarios = preguntasPorDia[diaActual] || preguntasPorDia[1];

  // Cargar leaderboard y usuario al inicio
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      // Cargar leaderboard compartido
      const leaderboardData = await window.storage.get('leaderboard-global', true);
      if (leaderboardData) {
        setLeaderboard(JSON.parse(leaderboardData.value));
      }

      // Cargar último usuario
      const ultimoUsuario = await window.storage.get('ultimo-usuario', false);
      if (ultimoUsuario) {
        const userData = JSON.parse(ultimoUsuario.value);
        setNombreUsuario(userData.nombre);
        setPuntosAcumulados(userData.puntos || 0);
        setRacha(userData.racha || 1);
        setPantalla('home');
      } else {
        setPantalla('login');
      }
    } catch (error) {
      console.log('Primera vez, inicializando...');
      setPantalla('login');
    }
  };

  const guardarUsuario = async (nombre, puntos, rachaActual) => {
    try {
      // Guardar datos del usuario local
      await window.storage.set('ultimo-usuario', JSON.stringify({
        nombre,
        puntos,
        racha: rachaActual,
        ultimaFecha: new Date().toISOString()
      }), false);

      // Actualizar leaderboard global
      let leaderboardActual = [];
      try {
        const leaderboardData = await window.storage.get('leaderboard-global', true);
        if (leaderboardData) {
          leaderboardActual = JSON.parse(leaderboardData.value);
        }
      } catch (e) {
        leaderboardActual = [];
      }

      // Buscar si el usuario ya existe
      const indexUsuario = leaderboardActual.findIndex(u => u.nombre.toLowerCase() === nombre.toLowerCase());
      
      if (indexUsuario >= 0) {
        leaderboardActual[indexUsuario].puntos = puntos;
        leaderboardActual[indexUsuario].racha = rachaActual;
      } else {
        leaderboardActual.push({
          nombre,
          puntos,
          racha: rachaActual,
          nivel: puntos < 100 ? 'Principiante' : puntos < 300 ? 'Ahorrador' : puntos < 600 ? 'Ahorrador Pro' : 'Inversor'
        });
      }

      // Ordenar por puntos
      leaderboardActual.sort((a, b) => b.puntos - a.puntos);
      
      // Guardar solo top 10
      const top10 = leaderboardActual.slice(0, 10);
      await window.storage.set('leaderboard-global', JSON.stringify(top10), true);
      
      setLeaderboard(top10);
    } catch (error) {
      console.error('Error guardando usuario:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (nombreUsuario.trim()) {
      setCargando(true);
      
      // Verificar si el usuario ya existe en el leaderboard
      try {
        const leaderboardData = await window.storage.get('leaderboard-global', true);
        let puntosExistentes = 0;
        let rachaExistente = 1;
        
        if (leaderboardData) {
          const leaderboardActual = JSON.parse(leaderboardData.value);
          const usuarioExistente = leaderboardActual.find(u => u.nombre.toLowerCase() === nombreUsuario.toLowerCase());
          
          if (usuarioExistente) {
            puntosExistentes = usuarioExistente.puntos || 0;
            rachaExistente = usuarioExistente.racha || 1;
          }
        }
        
        setPuntosAcumulados(puntosExistentes);
        setRacha(rachaExistente);
        
        await guardarUsuario(nombreUsuario, puntosExistentes, rachaExistente);
      } catch (error) {
        console.log('Usuario nuevo');
      }
      
      setCargando(false);
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
      // Guardar puntos finales
      guardarUsuario(nombreUsuario, puntosAcumulados, racha);
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

  if (pantalla === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-white text-2xl">Cargando...</div>
      </div>
    );
  }

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
                disabled={!nombreUsuario.trim() || cargando}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-xl shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {cargando ? 'Cargando...' : 'Empezar a aprender 🚀'}
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
              <p className="text-lg">
                Acá vas a conocer a <strong className="text-purple-900">"El Inversor Perfecto"</strong> 🤓
              </p>

              <p>
                Ese personaje que NUNCA gasta en nada, invierte hasta el último peso, y te mira feo si comprás un alfajor. Sí, <strong>ese psicópata</strong> que duerme en un colchón lleno de dólares.
              </p>

              <div className="bg-purple-50 rounded-xl p-4 border-l-4 border-purple-500">
                <p className="font-semibold text-purple-900 mb-2">🎯 Su filosofía (extrema):</p>
                <ul className="space-y-2 text-sm">
                  <li>💎 <strong>Patrimonio > Todo</strong> (incluso tu cumpleaños)</li>
                  <li>🚫 Gastos sin necesidad = pecado mortal</li>
                  <li>📈 Si no genera retorno, no existe</li>
                  <li>🏃 Auto, vacaciones, gustos = "pasivos que te empobrecen"</li>
                </ul>
              </div>

              <p>
                <strong className="text-purple-900">¿Tenés que ser así de intenso?</strong> Por favor, no. Pero este juego te muestra el <em>pensamiento extremo</em> de alguien obsesionado con la libertad financiera.
              </p>

              <p className="text-sm">
                Tomalo como un <strong>experimento mental</strong>: ¿qué pasaría si priorizaras patrimonio sobre todo? Después vos decidís qué tanto de esto aplicás a tu vida real. Podés ser 80% Inversor Perfecto y 20% persona normal. O al revés 😂
              </p>

              <div className="bg-yellow-50 rounded-xl p-4 border-l-4 border-yellow-500">
                <p className="text-sm">
                  <strong className="text-yellow-900">💡 Disclaimer:</strong> Este personaje es una caricatura. En la vida real, balance > extremismo. Pero conocer este mindset te ayuda a tomar mejores decisiones.
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
    const usuarioEnLeaderboard = leaderboard.find(u => u.nombre.toLowerCase() === nombreUsuario.toLowerCase());
    const posicion = leaderboard.findIndex(u => u.nombre.toLowerCase() === nombreUsuario.toLowerCase()) + 1;

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
                  <p className="text-purple-200 text-sm">
                    {posicion > 0 ? `Estás en el puesto #${posicion}` : 'Unite al ranking'}
                  </p>
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
                  {leaderboard.findIndex(l => l.nombre.toLowerCase() === nombreUsuario.toLowerCase()) >= 0 
                    ? `Estás en el top ${leaderboard.findIndex(l => l.nombre.toLowerCase() === nombreUsuario.toLowerCase()) + 1} del leaderboard 🏆`
                    : 'Te uniste al ranking 🏆'}
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

          {leaderboard.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-6 border border-white/20 text-center">
              <p className="text-white text-lg mb-2">Sé el primero en el ranking 🚀</p>
              <p className="text-purple-200 text-sm">Completá el desafío para aparecer aquí</p>
            </div>
          ) : (
            <div className="space-y-3 mb-6">
              {leaderboard.map((usuario, index) => (
                <div
                  key={index}
                  className={`rounded-2xl p-5 ${
                    usuario.nombre.toLowerCase() === nombreUsuario.toLowerCase()
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
                        {usuario.nombre.toLowerCase() === nombreUsuario.toLowerCase() && ' (Vos)'}
                      </p>
                      <p className={`text-sm ${usuario.nombre.toLowerCase() === nombreUsuario.toLowerCase() ? 'text-orange-100' : 'text-purple-200'}`}>
                        {usuario.nivel}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">{usuario.puntos}</p>
                      <p className={`text-xs ${usuario.nombre.toLowerCase() === nombreUsuario.toLowerCase() ? 'text-orange-100' : 'text-purple-200'}`}>
                        puntos
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

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