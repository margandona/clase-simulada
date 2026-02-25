/**
 * @file missions.js
 * @description Mission data configuration for NOVA game
 * @module data/missions
 */

/**
 * Mission configuration data
 * Each mission contains title, description, phase, instructions and submissions
 * @type {Object.<number, Mission>}
 */
export const MISSIONS = {
    1: {
        title: 'Misión 1: Activación',
        description: 'Completa estas actividades para conocer a NOVA y su misión.',
        phase: 'activation',
        instructions: '💡 Primero lee "Historia de NOVA" arriba, luego completa estas actividades:',
        submissions: [
            { 
                id: '1a', 
                name: 'Actividad: ¿Quién es NOVA?',
                toolType: 'quiz',
                learningGoal: 'Identificar a NOVA como personaje protagonista',
                udlHints: ['Lee con calma', 'Puedes revisar la historia arriba'],
                successCondition: 'Responde correctamente la pregunta',
                question: '¿Quién es NOVA?',
                options: [
                    { text: 'Una inteligencia artificial varada en órbita', correct: true },
                    { text: 'Un astronauta humano perdido', correct: false },
                    { text: 'Un satélite de comunicaciones', correct: false }
                ],
                feedback: {
                    correct: '¡Correcto! NOVA es una IA que necesita tu ayuda.',
                    incorrect: 'Revisa la historia de NOVA arriba y vuelve a intentar.'
                },
                novaMessage: 'Gracias por conocerme.'
            },
            { 
                id: '1b', 
                name: 'Actividad: Activación en Padlet',
                toolType: 'padlet',
                toolLabel: 'Padlet de Activación',
                embedUrl: 'https://padlet.com/padlets/t27dz8jyj9vcposz/embeds/preview_embed',
                padletUrl: 'https://padlet.com/padlets/t27dz8jyj9vcposz',
                learningGoal: 'Conectar con NOVA y activar el sistema',
                udlHints: ['Comparte una idea breve', 'Lee lo que otros aportaron'],
                successCondition: 'Interactúa con el Padlet',
                instructions: [
                    'Haz clic en "Abrir Padlet" o interactúa con el muro',
                    'Escribe una idea sobre cómo ayudarías a NOVA',
                    'Vuelve aquí y marca la actividad como completada'
                ],
                padletOpenMessage: 'Estoy aprendiendo cómo funcionan los sistemas humanos...'
            },
            { 
                id: '1c', 
                name: 'Actividad: ¿Qué necesita NOVA?',
                toolType: 'quiz',
                learningGoal: 'Comprender el problema central de NOVA',
                udlHints: ['Piensa: ¿qué le falta para funcionar?', 'No es un problema físico'],
                successCondition: 'Responde correctamente la pregunta',
                question: '¿Qué necesita NOVA para viajar de regreso?',
                options: [
                    { text: 'Reparar su nave dañada', correct: false },
                    { text: 'Completar su sistema de requerimientos', correct: true },
                    { text: 'Conseguir más combustible', correct: false }
                ],
                feedback: {
                    correct: '¡Perfecto! Mi nave está bien, pero mi sistema está incompleto.',
                    incorrect: 'Pista: mi problema no es físico, es de software.'
                },
                novaMessage: 'Ahora entiendes mi problema.'
            }
        ]
    },
    2: {
        title: 'Misión 2: Explorar Problema',
        description: 'Identifica por qué NOVA no puede despegar.',
        phase: 'exploration',
        instructions: '🔍 Analiza el problema del sistema de NOVA:',
        submissions: [
            { 
                id: '2a', 
                name: 'Actividad: Identificar sistema incompleto',
                toolType: 'quiz',
                learningGoal: 'Reconocer las señales de un sistema incompleto',
                udlHints: ['Los sistemas necesitan instrucciones claras', 'Sin requerimientos = sin función'],
                successCondition: 'Responde correctamente',
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
                novaMessage: 'Sin requerimientos, estoy paralizada.'
            },
            { 
                id: '2b', 
                name: 'Actividad: Listar requerimientos faltantes',
                toolType: 'checklist',
                learningGoal: 'Identificar tipos de requerimientos que faltan',
                udlHints: ['Selecciona todos los que crees que faltan', 'Puedes marcar más de uno'],
                successCondition: 'Selecciona al menos 2 opciones',
                question: '¿Qué tipos de requerimientos le faltan a NOVA? (Selecciona al menos 2)',
                checklistItems: [
                    { text: 'Funciones del sistema', value: 'functions' },
                    { text: 'Condiciones necesarias', value: 'conditions' },
                    { text: 'Documentación clara', value: 'documentation' },
                    { text: 'Color de la nave', value: 'color' }
                ],
                feedback: {
                    correct: '¡Bien! Identificaste los requerimientos clave.',
                    incorrect: 'Necesito al menos 2 tipos de requerimientos para funcionar.'
                },
                novaMessage: 'Esos son exactamente los que necesito.'
            },
            { 
                id: '2c', 
                name: 'Actividad: Analizar consecuencias',
                toolType: 'quiz',
                learningGoal: 'Comprender las consecuencias de requerimientos incompletos',
                udlHints: ['Piensa en sistemas que usas a diario', 'Apps, software, juegos...'],
                successCondition: 'Responde correctamente',
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
                learningGoal: 'Identificar qué es una función del sistema',
                udlHints: ['Función = lo que el sistema HACE', 'Busca verbos de acción'],
                successCondition: 'Clasifica correctamente el ejemplo',
                example: 'NOVA debe enviar señales de comunicación a la Tierra',
                question: '¿Es esto una FUNCIÓN o una CONDICIÓN?',
                correctAnswer: 'function',
                explanation: {
                    correct: '¡Correcto! "Enviar señales" es una FUNCIÓN (acción que realiza el sistema).',
                    incorrect: 'No es correcto. "Enviar señales" es una acción = FUNCIÓN.'
                },
                hint: 'Pregúntate: ¿Describe lo que el sistema HACE?',
                novaMessage: 'Enviar señales es una de mis funciones clave.'
            },
            { 
                id: '3b', 
                name: 'Ejercicio: Identificar condiciones',
                toolType: 'classification',
                learningGoal: 'Identificar qué es una condición necesaria',
                udlHints: ['Condición = lo que el sistema NECESITA', 'Requisitos previos para funcionar'],
                successCondition: 'Clasifica correctamente el ejemplo',
                example: 'NOVA requiere energía solar para operar sus sistemas',
                question: '¿Es esto una FUNCIÓN o una CONDICIÓN?',
                correctAnswer: 'condition',
                explanation: {
                    correct: '¡Perfecto! "Requerir energía" es una CONDICIÓN (necesidad para funcionar).',
                    incorrect: 'No del todo. "Requerir energía" es un requisito = CONDICIÓN.'
                },
                hint: 'Pregúntate: ¿Describe lo que el sistema NECESITA para funcionar?',
                novaMessage: 'Sin energía, no puedo hacer nada.'
            },
            { 
                id: '3c', 
                name: 'Quiz: Diferencias clave',
                toolType: 'quiz',
                learningGoal: 'Consolidar la diferencia entre función y condición',
                udlHints: ['Recuerda: HACE vs NECESITA', 'Acción vs Requisito'],
                successCondition: 'Responde correctamente',
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
        description: 'Clasifica ejemplos y ayuda a reparar el sistema de NOVA.',
        phase: 'application',
        instructions: '🔧 Para cada ejemplo, decide si es función o condición:',
        submissions: [
            { 
                id: '4a', 
                name: 'Clasificar: Navegar al espacio',
                toolType: 'classification',
                learningGoal: 'Aplicar clasificación a casos reales',
                udlHints: ['¿Es una acción o un requisito?', 'Navegar = verbo de acción'],
                successCondition: 'Clasifica correctamente',
                example: 'El sistema debe calcular rutas de navegación espacial',
                question: '¿FUNCIÓN o CONDICIÓN?',
                correctAnswer: 'function',
                explanation: {
                    correct: '¡Correcto! "Calcular rutas" es una FUNCIÓN (acción del sistema).',
                    incorrect: 'Incorrecto. "Calcular rutas" es una acción que REALIZA = FUNCIÓN.'
                },
                hint: 'Calcular es un verbo de acción.',
                novaMessage: 'Mi sistema de navegación se activa.'
            },
            { 
                id: '4b', 
                name: 'Clasificar: Combustible disponible',
                toolType: 'classification',
                learningGoal: 'Aplicar clasificación a casos reales',
                udlHints: ['¿Es algo que HACE o algo que NECESITA?', 'Disponible = requisito'],
                successCondition: 'Clasifica correctamente',
                example: 'El sistema requiere combustible disponible en el tanque',
                question: '¿FUNCIÓN o CONDICIÓN?',
                correctAnswer: 'condition',
                explanation: {
                    correct: '¡Exacto! "Requiere combustible" es una CONDICIÓN (necesidad previa).',
                    incorrect: 'No es correcto. "Requiere combustible" es un requisito = CONDICIÓN.'
                },
                hint: 'Requerir indica una necesidad, no una acción.',
                novaMessage: 'El combustible es esencial para despegar.'
            },
            { 
                id: '4c', 
                name: 'Clasificar: Comunicar con Tierra',
                toolType: 'classification',
                learningGoal: 'Aplicar clasificación a casos reales',
                udlHints: ['Comunicar = acción', '¿Qué hace el sistema?'],
                successCondition: 'Clasifica correctamente',
                example: 'El sistema debe transmitir datos a la estación terrestre',
                question: '¿FUNCIÓN o CONDICIÓN?',
                correctAnswer: 'function',
                explanation: {
                    correct: '¡Perfecto! "Transmitir datos" es una FUNCIÓN (acción que ejecuta).',
                    incorrect: 'No del todo. "Transmitir datos" es una acción = FUNCIÓN.'
                },
                hint: 'Transmitir es un verbo de acción.',
                novaMessage: 'Tu clasificación repara mi sistema de comunicaciones.'
            }
        ]
    },
    5: {
        title: 'Misión 5: Colaborar',
        description: 'Contribuye con tu equipo para el lanzamiento final.',
        phase: 'collaborative',
        instructions: '🤝 Trabaja en equipo para completar:',
        submissions: [
            { 
                id: '5a', 
                name: 'Abrir Padlet Colaborativo',
                toolType: 'padlet',
                toolLabel: 'Padlet Colaborativo',
                embedUrl: 'https://padlet.com/padlets/7t8fczx0d5ecget2/embeds/preview_embed',
                padletUrl: 'https://padlet.com/padlets/7t8fczx0d5ecget2',
                learningGoal: 'Contribuir ideas al equipo',
                udlHints: ['Comparte 1-2 ideas', 'Lee las ideas de otros', 'Sé respetuoso y constructivo'],
                successCondition: 'Confirma que abriste el Padlet',
                instructions: [
                    'Haz clic en "Abrir Padlet"',
                    'Contribuye con al menos 1 idea',
                    '¿Qué otras funciones o condiciones necesita NOVA?',
                    'Vuelve aquí y confirma'
                ],
                padletOpenMessage: 'Tu idea puede ser la pieza que falta para despegar.',
                novaMessage: 'Las ideas de todos me ayudan a volar.'
            },
            { 
                id: '5b', 
                name: 'Completar lista de verificación',
                toolType: 'checklist',
                learningGoal: 'Verificar preparativos finales',
                udlHints: ['Revisa cada ítem con cuidado', 'Marca solo cuando estés seguro'],
                successCondition: 'Completa todos los ítems',
                question: 'Lista de verificación pre-lanzamiento:',
                checklistItems: [
                    { text: 'Sistema de navegación: Funciones definidas', value: 'nav' },
                    { text: 'Sistema de energía: Condiciones verificadas', value: 'energy' },
                    { text: 'Sistema de comunicación: Requisitos completos', value: 'comm' }
                ],
                feedback: {
                    correct: '¡Verificación completa! Todo listo para despegar.',
                    incorrect: 'Completa todos los ítems de la lista.'
                },
                novaMessage: 'Sistemas verificados. Casi lista.'
            },
            { 
                id: '5c', 
                name: 'Obtener autorización de lanzamiento',
                toolType: 'confirmation',
                learningGoal: 'Autorizar el despegue final',
                udlHints: ['Confirma solo si todo está listo', 'Esto es el paso final'],
                successCondition: 'Confirma la autorización',
                question: '¿Autorizar el lanzamiento de NOVA?',
                confirmText: 'Sí, el sistema está completo y listo',
                feedback: {
                    correct: '🚀 ¡Autorización concedida! Preparando despegue...',
                    incorrect: ''
                },
                novaMessage: 'Autorización recibida. Preparando motores.'
            }
        ]
    },
    6: {
        title: 'Misión 6: Despegar',
        description: 'Sistema restaurado. ¡NOVA está lista para volver a casa!',
        phase: 'closure',
        instructions: '🚀 Últimos pasos para el despegue:',
        submissions: [
            { 
                id: '6a', 
                name: 'Verificar: Sistema al 100%',
                toolType: 'verification',
                learningGoal: 'Confirmar que el sistema está completo',
                udlHints: ['Revisa el indicador de sistema arriba', 'Debe estar al 100%'],
                successCondition: 'Confirma verificación',
                question: '¿Confirmas que el sistema de NOVA está al 100%?',
                feedback: {
                    correct: '✅ Sistema verificado al 100%',
                    incorrect: ''
                },
                novaMessage: 'Todos mis sistemas están operativos.'
            },
            { 
                id: '6b', 
                name: 'Acción: Iniciar despegue',
                toolType: 'action',
                learningGoal: 'Ejecutar el despegue final',
                udlHints: ['Solo disponible si 6a está completo', 'Este es el momento final'],
                successCondition: 'Presiona el botón de despegue',
                requiresPrevious: '6a',
                question: '¿Iniciar secuencia de despegue?',
                actionLabel: '🚀 DESPEGAR',
                feedback: {
                    correct: '🚀 ¡Despegue iniciado! NOVA vuelve a casa.',
                    incorrect: ''
                },
                novaMessage: '¡Despegando! Gracias por todo.'
            },
            { 
                id: '6c', 
                name: 'Celebrar: ¡Misión cumplida!',
                toolType: 'celebration',
                learningGoal: 'Celebrar el logro',
                udlHints: ['¡Lo lograste!', 'Revisa tu progreso final'],
                successCondition: 'Disfruta la celebración',
                autoComplete: true,
                novaMessage: '¡Misión cumplida! Eres un maestro del sistema.'
            }
        ]
    }
};
