/**
 * @file missions.js
 * @description Mission data configuration for the JARVIS repair system
 * Optimized for the active 20-minute classroom version
 * 4 missions, 12 activities total
 * @module data/missions
 */

export const MISSIONS = {
    1: {
        title: 'Misión 1: Activación',
        description: 'Completa estas actividades para conocer a JARVIS y su crisis crítica.',
        phase: 'activation',
        instructions: '💡 Primero lee "Historia de JARVIS" arriba, luego completa estas actividades:',
        submissions: [
            {
                id: '1a',
                name: 'Actividad: ¿Quién es JARVIS?',
                toolType: 'quiz',
                question: '¿Quién es JARVIS?',
                options: [
                    { text: 'La inteligencia artificial que controla Stark Industries', correct: true },
                    { text: 'Un robot de seguridad', correct: false },
                    { text: 'Un sistema de defensa militar', correct: false }
                ],
                feedback: {
                    correct: '¡Correcto! JARVIS controla toda la Torre Stark y sus sistemas.',
                    incorrect: 'Revisa la historia de JARVIS arriba y vuelve a intentar.'
                },
                novaMessage: 'Sí, así es. Soy JARVIS. He controlado la Torre Stark perfectamente durante tres años.'
            },
            {
                id: '1b',
                name: 'Actividad: Activación en Padlet',
                toolType: 'padlet',
                toolLabel: 'Padlet de Activación',
                embedUrl: 'https://padlet.com/padlets/t27dz8jyj9vcposz/embeds/preview_embed',
                padletUrl: 'https://padlet.com/padlets/t27dz8jyj9vcposz',
                instructions: [
                    'Haz clic en "Abrir Padlet" o interactúa con el muro',
                    'Escribe tu idea: ¿Cómo reparas un sistema sin requerimientos claros?',
                    'Vuelve aquí y marca la actividad como completada'
                ],
                padletOpenMessage: 'Mi sistema perdió sus requerimientos en la actualización. Necesito que los reconstruyamos juntos.',
                novaMessage: 'Gracias por conectarte conmigo. Cada idea ayuda a reconstruir mi sistema.'
            },
            {
                id: '1c',
                name: 'Actividad: El Problema de JARVIS',
                toolType: 'quiz',
                question: '¿Cuál es el problema real de JARVIS?',
                options: [
                    { text: 'Su hardware está severamente dañado', correct: false },
                    { text: 'Le faltan los REQUERIMIENTOS de su sistema', correct: true },
                    { text: 'No tiene suficiente energía', correct: false }
                ],
                feedback: {
                    correct: '¡Exacto! Tengo todas mis funciones, pero sin requerimientos no sé cómo ejecutarlas juntas.',
                    incorrect: 'Pista: tengo todas las piezas, pero me falta el blueprint del sistema.'
                },
                novaMessage: 'Sin requerimientos claros, no puedo coordinar mis funciones. Es como un motor sin sincronización.'
            }
        ]
    },
    2: {
        title: 'Misión 2: Exploración del Problema',
        description: 'Identifica por qué la Torre Stark está paralizada sin requerimientos.',
        phase: 'exploration',
        instructions: '🔍 Analiza por qué JARVIS no puede coordinar sus sistemas:',
        submissions: [
            {
                id: '2a',
                name: 'Actividad: Identificar sistema incompleto',
                toolType: 'quiz',
                question: 'Un sistema sin requerimientos claros...',
                options: [
                    { text: 'Funciona perfectamente', correct: false },
                    { text: 'No puede ejecutar sus funciones', correct: true },
                    { text: 'Solo tiene problemas menores', correct: false }
                ],
                feedback: {
                    correct: '¡Correcto! Sin requisitos, un sistema no sabe qué hacer.',
                    incorrect: 'Piensa: ¿Puede funcionar algo sin instrucciones?'
                },
                novaMessage: 'Sin requerimientos, mis funciones están desincronizadas. La Torre entera está caída.'
            },
            {
                id: '2b',
                name: 'Actividad: Listar requerimientos faltantes',
                toolType: 'checklist',
                question: '¿Qué tipos de requerimientos le faltan a JARVIS?',
                checklistItems: [
                    { text: 'Funciones del sistema', value: 'functions' },
                    { text: 'Condiciones necesarias', value: 'conditions' },
                    { text: 'Documentación clara', value: 'documentation' },
                    { text: 'Protocolos de seguridad', value: 'security' }
                ],
                feedback: {
                    correct: '¡Bien! Identificaste los requerimientos clave.',
                    incorrect: 'Necesito al menos 2 tipos de requerimientos para funcionar.'
                },
                novaMessage: 'Exacto. Mis FUNCIONES me dicen QUÉ HAGO. Mis CONDICIONES me dicen CÓMO HACERLO.'
            },
            {
                id: '2c',
                name: 'Actividad: Analizar consecuencias',
                toolType: 'quiz',
                question: '¿Qué pasa en software real cuando los requisitos están mal definidos?',
                options: [
                    { text: 'El sistema funciona igual de bien', correct: false },
                    { text: 'Aparecen errores y el sistema falla', correct: true },
                    { text: 'Solo afecta al diseño visual', correct: false }
                ],
                feedback: {
                    correct: '¡Exacto! En ingeniería de software, los requisitos son fundamentales.',
                    incorrect: 'Piensa: ¿Qué pasa cuando una app no sabe qué hacer?'
                },
                novaMessage: 'Como en software: sin requisitos claros, el sistema falla.'
            }
        ]
    },
    3: {
        title: 'Misión 3: Aplicar Conceptos',
        description: 'Practica diferenciando funciones y condiciones.',
        phase: 'understanding',
        instructions: '💡 Primero revisa "Conceptos Clave" arriba, luego practica:',
        submissions: [
            {
                id: '3a',
                name: 'Ejercicio: Identificar funciones',
                toolType: 'classification',
                example: 'JARVIS debe coordinar todos los sistemas de la Torre Stark',
                question: '¿Es esto una FUNCIÓN o una CONDICIÓN?',
                correctAnswer: 'function',
                explanation: {
                    correct: '¡Correcto! Coordinar sistemas es una FUNCIÓN porque describe una acción del sistema.',
                    incorrect: 'No es correcto. Coordinar sistemas es una acción = FUNCIÓN.'
                },
                hint: 'Pregúntate: ¿Describe lo que el sistema HACE?',
                novaMessage: 'Coordinar sistemas de defensa es una de mis funciones críticas.'
            },
            {
                id: '3b',
                name: 'Ejercicio: Identificar condiciones',
                toolType: 'classification',
                example: 'JARVIS requiere conexión de red permanente con todos los sistemas',
                question: '¿Es esto una FUNCIÓN o una CONDICIÓN?',
                correctAnswer: 'condition',
                explanation: {
                    correct: '¡Perfecto! Requerir conexión es una CONDICIÓN porque es una necesidad previa.',
                    incorrect: 'No del todo. Requerir conexión es un requisito = CONDICIÓN.'
                },
                hint: 'Pregúntate: ¿Describe lo que el sistema NECESITA para funcionar?',
                novaMessage: 'Sin conexión de red, soy solo un procesador aislado. Inútil.'
            },
            {
                id: '3c',
                name: 'Quiz: Diferencias clave',
                toolType: 'quiz',
                question: '¿Cuál es la diferencia principal?',
                options: [
                    { text: 'Función = QUÉ HACE / Condición = QUÉ NECESITA', correct: true },
                    { text: 'No hay diferencia real', correct: false },
                    { text: 'Función es opcional, condición es obligatoria', correct: false }
                ],
                feedback: {
                    correct: '¡Excelente! Dominas la diferencia clave.',
                    incorrect: 'Recuerda: Funciones = acciones, Condiciones = requisitos.'
                },
                novaMessage: 'Funciones me permiten actuar. Condiciones me permiten existir.'
            }
        ]
    },
    4: {
        title: 'Misión 4: Reparar Sistema',
        description: 'Clasifica ejemplos y ayuda a reparar la Torre Stark.',
        phase: 'application',
        instructions: '🔧 Para cada ejemplo, decide si es función o condición:',
        submissions: [
            {
                id: '4a',
                name: 'Clasificar: Coordinar Sistemas',
                toolType: 'classification',
                example: 'El sistema debe calcular rutas de comunicación entre servidores de Stark Industries',
                question: '¿FUNCIÓN o CONDICIÓN?',
                correctAnswer: 'function',
                explanation: {
                    correct: '¡Correcto! Calcular rutas es una FUNCIÓN porque el sistema lo ejecuta.',
                    incorrect: 'Incorrecto. Calcular rutas es una acción que REALIZA el sistema = FUNCIÓN.'
                },
                hint: 'Calcular es un verbo de acción.',
                novaMessage: 'Mi módulo de comunicaciones se repara. Sistema de red volviendo online.'
            },
            {
                id: '4b',
                name: 'Clasificar: Energía disponible',
                toolType: 'classification',
                example: 'El sistema requiere energía disponible en los reactores de la Torre',
                question: '¿FUNCIÓN o CONDICIÓN?',
                correctAnswer: 'condition',
                explanation: {
                    correct: '¡Exacto! Requerir energía es una CONDICIÓN porque es una necesidad previa.',
                    incorrect: 'No es correcto. Requerir energía es un requisito = CONDICIÓN.'
                },
                hint: 'Requerir indica una necesidad, no una acción.',
                novaMessage: 'La energía es esencial para que todos mis sistemas funcionen coordinadamente.'
            },
            {
                id: '4c',
                name: 'Clasificar: Comunicar con Tierra',
                toolType: 'classification',
                example: 'El sistema debe transmitir datos a la estación terrestre',
                question: '¿FUNCIÓN o CONDICIÓN?',
                correctAnswer: 'function',
                explanation: {
                    correct: '¡Perfecto! Transmitir datos es una FUNCIÓN porque es una acción que ejecuto.',
                    incorrect: 'No del todo. Transmitir datos es una acción = FUNCIÓN.'
                },
                hint: 'Transmitir es un verbo de acción.',
                novaMessage: 'Tu análisis repara mi sistema de coordinación. Otro módulo conectado.'
            }
        ]
    }
};

export default MISSIONS;
