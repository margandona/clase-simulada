/**
 * @file missions.js
 * @description Mission data configuration for JARVIS repair system
 * OPTIMIZED FOR 20-MINUTE CLASS SESSION
 * 4 missions, 9 activities total
 * @module data/missions
 */

export const MISSIONS = {
    1: {
        title: 'Misión 1: Activación',
        description: 'Conecta con JARVIS y comprende su situación.',
        phase: 'activation',
        instructions: '⚡ JARVIS necesita que lo reconozcas. Completa esta misión:',
        submissions: [
            { 
                id: '1a', 
                name: 'Quiz: ¿Quién es JARVIS?',
                toolType: 'quiz',
                question: '¿Quién es JARVIS?',
                options: [
                    { text: 'La IA que controla Stark Industries', correct: true },
                    { text: 'Un robot de defensa', correct: false },
                    { text: 'Un sistema de vigilancia', correct: false }
                ],
                feedback: {
                    correct: '✓ ¡Correcto! JARVIS es la inteligencia que coordina TODO en Stark.',
                    incorrect: 'Pista: JARVIS controla mucho más que una función.'
                },
                novaMessage: 'Gracias por identificarme. Ahora entiende mi problema.'
            },
            { 
                id: '1b', 
                name: 'Padlet: ¿Cómo ayudarías?',
                toolType: 'padlet',
                toolLabel: 'Padlet de Activación',
                embedUrl: 'https://padlet.com/padlets/t27dz8jyj9vcposz/embeds/preview_embed',
                padletUrl: 'https://padlet.com/padlets/t27dz8jyj9vcposz',
                novaMessage: 'Las ideas de los humanos siempre me fascinan.'
            }
        ]
    },
    2: {
        title: 'Misión 2: Explorar el Problema',
        description: 'Identifica exactamente qué le falta a JARVIS.',
        phase: 'exploration',
        instructions: '🔍 JARVIS dice: "Tengo funciones, pero me faltan condiciones". ¿Qué significa?',
        submissions: [
            { 
                id: '2a', 
                name: 'Quiz: Sistema Incompleto',
                toolType: 'quiz',
                question: 'Un sistema sin requerimientos claros...',
                options: [
                    { text: 'Funciona perfectamente', correct: false },
                    { text: 'No sabe QUÉ HACER ni BAJO QUÉ CONDICIONES hacerlo', correct: true },
                    { text: 'Solo tiene problemas estéticos', correct: false }
                ],
                feedback: {
                    correct: '✓ ¡Exacto! Sin requerimientos = software paralizado.',
                    incorrect: 'Piensa: si no sabes QUÉ debes hacer, ¿puedes funcionar?'
                },
                novaMessage: 'Sin instrucciones claras, no puedo ejecutarme.'
            },
            { 
                id: '2b', 
                name: 'Checklist: Tipos de Requerimientos',
                toolType: 'checklist',
                question: '¿JARVIS necesita...? (Selecciona lo correcto)',
                checklistItems: [
                    { text: 'Saber QUÉ FUNCIONES ejecutar (requisitos funcionales)', value: 'functions' },
                    { text: 'BAJO QUÉ CONDICIONES ejecutarlas (requisitos no-funcionales)', value: 'conditions' }
                ],
                feedback: {
                    correct: '✓ ¡Perfecto! Identificaste los VERDADEROS requerimientos.',
                    incorrect: 'Marca las opciones que tengan sentido para SOFTWARE.'
                },
                novaMessage: 'Exactamente. Funciones + Condiciones = Sistema Completo.'
            }
        ]
    },
    3: {
        title: 'Misión 3: Aprender el Patrón',
        description: 'Entiende la diferencia crítica: FUNCIÓN vs CONDICIÓN.',
        phase: 'understanding',
        instructions: '🧠 Esto es LO MÁS IMPORTANTE. Aprende bien:',
        submissions: [
            { 
                id: '3a', 
                name: 'Ejemplo 1: ¿Qué HACE JARVIS?',
                toolType: 'classification',
                example: 'JARVIS debe calcular trayectorias de vuelo para Tony',
                question: '¿Esto es FUNCIÓN o CONDICIÓN?',
                correctAnswer: 'function',
                explanation: {
                    correct: '✓ ¡CORRECTO! "CALCULAR" = ACCIÓN = FUNCIÓN. El sistema LO HACE.',
                    incorrect: 'NO. "Calcular" es un verbo de acción. El sistema LO REALIZA = FUNCIÓN.'
                },
                hint: '¿QUÉ HACE el sistema? → FUNCIÓN',
                novaMessage: 'Calcular trayectorias es mi función principal.'
            },
            { 
                id: '3b', 
                name: 'Ejemplo 2: ¿Qué NECESITA JARVIS?',
                toolType: 'classification',
                example: 'JARVIS requiere conexión a internet para comunicarse con la Torre',
                question: '¿Esto es FUNCIÓN o CONDICIÓN?',
                correctAnswer: 'condition',
                explanation: {
                    correct: '✓ ¡PERFECTO! "REQUIERE" = NECESIDAD = CONDICIÓN. El sistema LO NECESITA.',
                    incorrect: 'NO. "Requiere" significa que lo NECESITA como prerequisito = CONDICIÓN.'
                },
                hint: '¿QUÉ NECESITA el sistema para funcionar? → CONDICIÓN',
                novaMessage: 'Sin internet, no puedo conectarme a Tony. Esa es una condición crítica.'
            }
        ]
    },
    4: {
        title: 'Misión 4: Reparar JARVIS',
        description: 'Clasifica requerimientos y repara el sistema. ¡COMPLETADO!',
        phase: 'application',
        instructions: '🔧 Ahora TÚ decides: ¿FUNCIÓN o CONDICIÓN? Repara a JARVIS:',
        submissions: [
            { 
                id: '4a', 
                name: 'Clasificar: Navegar por el espacio',
                toolType: 'classification',
                example: 'El sistema debe plotear y ejecutar rutas de navegación espacial',
                question: '¿FUNCIÓN o CONDICIÓN?',
                correctAnswer: 'function',
                explanation: {
                    correct: '✓ FUNCIÓN. "Plotear rutas" = acciones que EJECUTA = FUNCIÓN.',
                    incorrect: 'Es FUNCIÓN. El verbo "plotear/ejecutar" = acciones del sistema.'
                },
                hint: 'Plotear es un VERBO DE ACCIÓN.',
                novaMessage: '✓ Sistema de navegación activado.'
            },
            { 
                id: '4b', 
                name: 'Clasificar: Energía disponible',
                toolType: 'classification',
                example: 'JARVIS necesita energía en su núcleo de procesamiento para operar',
                question: '¿FUNCIÓN o CONDICIÓN?',
                correctAnswer: 'condition',
                explanation: {
                    correct: '✓ CONDICIÓN. "Necesita energía" = prerequisito = CONDICIÓN.',
                    incorrect: 'Es CONDICIÓN. "Necesita" = no es acción, es un requisito.'
                },
                hint: 'Necesita = PREREQUISITO = CONDICIÓN.',
                novaMessage: '✓ Sistema de energía verificado.'
            },
            { 
                id: '4c', 
                name: 'Clasificar: Comunicación crítica',
                toolType: 'classification',
                example: 'JARVIS debe transmitir reportes de seguridad a Tony en tiempo real',
                question: '¿FUNCIÓN o CONDICIÓN?',
                correctAnswer: 'function',
                explanation: {
                    correct: '✓ FUNCIÓN. "Transmitir" = acción que ejecuta = FUNCIÓN.',
                    incorrect: 'Es FUNCIÓN. "Transmitir" es un verbo de acción.'
                },
                hint: 'Transmitir, enviar, ejecutar = FUNCIONES.',
                novaMessage: '✓ Sistema de comunicación restaurado.'
            },
            { 
                id: '4d', 
                name: '🚀 AUTORIZAR DESPEGUE',
                toolType: 'confirmation',
                question: '¿JARVIS está completamente reparado?',
                confirmText: 'SÍ. He clasificado todos correctamente.',
                feedback: {
                    correct: '🚀🚀🚀 ¡¡REPARACIÓN COMPLETADA!! Sistema al 100%. JARVIS vuelve a casa.',
                    incorrect: ''
                },
                novaMessage: '¡¡GRACIAS!! LO LOGRAMOS. VOY A CASA.'
            }
        ]
    }
};

export default MISSIONS;

