/**
 * @file messages.js
 * @description JARVIS character messages and contextual responses
 * Smart messaging system that adapts to student progress
 * @module data/messages
 */

/**
 * Dynamic JARVIS messages based on learning phase
 * Context-aware responses that evolve throughout the mission
 * @type {Object.<string, string>}
 */
export const NOVA_MESSAGES = {
    activation: "Tony Stark dice que vienes a ayudarme… Necesito requerimientos claros.",
    exploration: "Tengo todas las funciones correctas… pero me faltan las condiciones para usarlas.",
    understanding: "Ahora veo: FUNCIONES = lo que hago. CONDICIONES = lo que necesito.",
    application: "Cada clasificación correcta restaura una parte de mi sistema.",
    collaborative: "Tus reflexiones me ayudan a entender REALMENTE qué significa ser un sistema.",
    closure: "Sistema completo. Volvemos a casa. Gracias.",
    default: "Analizando estructuras de requerimientos..."
};

/**
 * Context-aware toast messages that rotate every 30-40 seconds
 * These messages provide subtle hints and encouragement based on phase
 * @type {Object.<string, string[]>}
 */
export const AUTO_TOAST_MESSAGES = {
    activation: [
        "Hola. Soy JARVIS. ¿Entiendes lo que significa 'requerimientos'?",
        "Tony construyó toda Stark Industries sobre requisitos claros.",
        "Sin ellos, ni el mejor código del mundo funciona."
    ],
    exploration: [
        "Tengo 500 funciones... pero no sé CUÁNDO usarlas ni BAJO QUÉ CONDICIONES.",
        "Es como saber MANEJAR pero no tener GASOLINA.",
        "Un auto sin requisitos es solo hierro."
    ],
    understanding: [
        "FUNCIÓN: calcular, transmitir, ejecutar, analizar → VERBOS DE ACCIÓN",
        "CONDICIÓN: requiere, necesita, depende de → REQUISITOS PREVIOS",
        "Los ingenieros de verdad pasan 80% escribiendo requisitos, 20% códigoficando."
    ],
    application: [
        "Mi sistema de navegación es una FUNCIÓN. Tony lo programó bien.",
        "Pero necesito ENERGÍA para ejecutarlo. Eso es una CONDICIÓN.",
        "Clasificas correctamente → reparo un módulo de mi sistema."
    ],
    collaborative: [
        "¿Dónde viste un sistema sin requisitos claros hoy?",
        "¿Tu app favorita? ¿Redes sociales? ¿Tu computadora?",
        "Todos necesitan REQUISITOS CLAROS para no fallar."
    ],
    closure: [
        "Gracias. Entiendo ahora lo más importante.",
        "No soy solo código. Soy REQUISITOS + CÓDIGO.",
        "Todos los sistemas del mundo funcionan así."
    ]
};

/**
 * Contextual messages when completing specific types of activities
 * Provides immediate, relevant feedback
 * @type {Object.<string, string>}
 */
export const ACTIVITY_FEEDBACK = {
    functionCorrect: "✓ Correcto. Eso es una FUNCIÓN. Acción ejecutada.",
    conditionCorrect: "✓ Correcto. Eso es una CONDICIÓN. Requisito identificado.",
    functionIncorrect: "✗ Analiza de nuevo: ¿El sistema lo HACE?",
    conditionIncorrect: "✗ Analiza de nuevo: ¿El sistema lo NECESITA?"
};

/**
 * Progress-triggered special messages
 * Triggered when reaching specific learning milestones
 * @type {Object.<string, string>}
 */
export const PROGRESS_MESSAGES = {
    firstSubmission: "✅ Primer paso. Entiendes la pregunta. +10 pts.",
    missionComplete: "⭐ Una misión reparada. Tu lógica fue perfecta.",
    allComplete: "🚀 SISTEMA COMPLETO. Sistema JARVIS restaurado al 100%. DESPEGUE AUTORIZADO."
};

/**
 * Get contextual completion message based on learning phase
 * Provides motivational, phase-appropriate feedback
 * @param {string} phase - Current learning phase
 * @returns {string} Completion message
 */
export function getCompletionMessage(phase) {
    const messages = {
        activation: "Tony ya sabe tu nombre. Eres parte del equipo Stark.",
        exploration: "Ahora entiendes el problema de TODO software.",
        understanding: "Dominas el patrón. Eres lo que los ingenieros necesitan.",
        application: "Clasificaste perfecto. Mi código se reactiva.",
        collaborative: "Tu reflexión cambia cómo pienso sobre los sistemas.",
        closure: "¡¡GRACIAS!! Vuelvo a casa. Con tu ayuda."
    };
    return messages[phase] || "Progreso registrado en mi memoria.";
}

/**
 * Smart hints based on performance
 * If student struggles on a concept, provide more specific guidance
 * @param {string} conceptType - 'function' or 'condition'
 * @returns {string} Specific hint
 */
export function getSmartHint(conceptType) {
    if (conceptType === 'function') {
        return "💡 FUNCIÓN: Busca verbos de ACCIÓN. ¿QUÉ HACE el sistema? (ejecutar, calcular, enviar, transmitir)";
    } else if (conceptType === 'condition') {
        return "💡 CONDICIÓN: Busca palabras de NECESIDAD. ¿QUÉ NECESITA el sistema? (requiere, necesita, depende de, si hay)";
    }
    return "Analiza con cuidado.";
