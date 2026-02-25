/**
 * @file messages.js
 * @description NOVA character messages and responses
 * @module data/messages
 */

/**
 * Dynamic NOVA messages based on learning phase
 * @type {Object.<string, string>}
 */
export const NOVA_MESSAGES = {
    activation: "Nueva señal detectada… necesito ayuda.",
    exploration: "Mi nave no está dañada… mi sistema está incompleto.",
    understanding: "Funciones me permiten actuar. Condiciones me permiten existir.",
    application: "Tu decisión repara mi sistema.",
    collaborative: "Necesito tu ayuda final para despegar.",
    closure: "Sistema restaurado. Preparando lanzamiento.",
    default: "Analizando sistemas..."
};

/**
 * Auto-toast message variations for periodic display
 * These rotate automatically every 20-30 seconds
 * @type {Object.<string, string[]>}
 */
export const AUTO_TOAST_MESSAGES = {
    activation: [
        "Nueva señal detectada… ¿me ayudas?",
        "Estoy en órbita. Necesito tu apoyo.",
        "Sistema en espera. Necesito requerimientos."
    ],
    exploration: [
        "Mi nave no está dañada… mi sistema está incompleto.",
        "Faltan requerimientos. Sin ellos no despego.",
        "Como en software: sin requisitos claros, el sistema falla."
    ],
    understanding: [
        "Funciones = lo que hago. Condiciones = lo que necesito.",
        "Como en software: sin requisitos claros, el sistema falla.",
        "Un sistema funciona cuando cada parte cumple su propósito."
    ],
    application: [
        "Tu decisión repara mi sistema.",
        "¿Esto es función o condición? Tú decides.",
        "Cada clasificación correcta me acerca al despegue."
    ],
    collaborative: [
        "Necesito una última idea para despegar.",
        "Tu equipo puede darme el impulso final.",
        "La colaboración es clave en sistemas complejos."
    ],
    closure: [
        "Sistema restaurado. Preparando lanzamiento.",
        "¡Despegue autorizado! Gracias.",
        "Un sistema funciona cuando cada parte cumple su propósito."
    ]
};

/**
 * Progress-triggered special messages
 * @type {Object.<string, string>}
 */
export const PROGRESS_MESSAGES = {
    firstSubmission: "✅ Primer avance logrado. +10 puntos. Seguimos.",
    missionComplete: "⭐ Misión completada. Tu ayuda fue clave.",
    allComplete: "🎉 ¡Sistema restaurado al 100%! Despegue inminente."
};

/**
 * Get contextual completion message based on phase
 * @param {string} phase - Current learning phase
 * @returns {string} Completion message
 */
export function getCompletionMessage(phase) {
    const messages = {
        activation: "Gracias por responder mi llamada.",
        exploration: "Ahora entiendes mi situación.",
        understanding: "Estás aprendiendo cómo funciono.",
        application: "¡Mi sistema se está reparando!",
        collaborative: "Juntos podemos lograrlo.",
        closure: "¡Estoy lista para despegar!"
    };
    return messages[phase] || "Progreso registrado.";
}
