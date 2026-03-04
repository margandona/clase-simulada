/**
 * JARVIS Repair System - Interactive Educational Game
 * Character animation, modals, and mission management
 * 
 * PEDAGOGICAL ITINERARY (20-minute classroom session)
 * Aligned with constructivist learning theory
 */

/**
 * Initialize the game (called after welcome screen is dismissed)
 */
function initializeGame() {
    console.log('🎮 Initializing JARVIS Repair System...');
    
    // Load saved state if any
    loadStateFromStorage();
    
    // Initialize all game systems
    initApp();
    setupKeyboardNavigation();
    setupTouchEnhancements();
    initializeFlipCards();
    
    console.log('✅ Game initialized successfully');
}

/**
 * Audio Service - Simple Text-to-Speech using Web Speech API
 */
class AudioService {
    constructor() {
        this.speechSynthesis = window.speechSynthesis;
        this.SpeechSynthesisUtterance = window.SpeechSynthesisUtterance || window.webkitSpeechSynthesisUtterance;
        this.isPlaying = false;
        this.isPending = false;
        this.currentUtterance = null;
        this.onEndCallback = null;
        this.onErrorCallback = null;
        
        console.log('🎵 AudioService initialized');
    }
    
    speak(text, callbacks = {}) {
        if (!this.speechSynthesis || !this.SpeechSynthesisUtterance) {
            console.error('❌ Web Speech API not supported');
            return false;
        }
        
        if (!text || text.trim().length === 0) {
            console.warn('⚠️ Empty text');
            return false;
        }
        
        // Prevent rapid clicks
        if (this.isPending) {
            console.log('⏳ Audio pending, ignoring request');
            return false;
        }
        
        try {
            // Cancel any ongoing speech
            this.speechSynthesis.cancel();
            
            // Set pending flag
            this.isPending = true;
            
            // Store callbacks
            this.onEndCallback = callbacks.onEnd || null;
            this.onErrorCallback = callbacks.onError || null;
            
            // Create utterance
            this.currentUtterance = new this.SpeechSynthesisUtterance(text);
            this.currentUtterance.lang = 'es-ES';
            this.currentUtterance.rate = 0.8;
            this.currentUtterance.pitch = 1.1;
            this.currentUtterance.volume = 1.0;
            
            // Handle start event
            this.currentUtterance.onstart = () => {
                this.isPlaying = true;
                this.isPending = false;
                console.log('▶️ Speech started');
            };
            
            // Handle end event
            this.currentUtterance.onend = () => {
                this.isPlaying = false;
                this.isPending = false;
                console.log('🏁 Speech finished');
                if (this.onEndCallback) {
                    this.onEndCallback();
                }
            };
            
            this.currentUtterance.onerror = (event) => {
                this.isPlaying = false;
                this.isPending = false;
                console.error('❌ Speech error:', event.error);
                if (this.onErrorCallback) {
                    this.onErrorCallback(event.error);
                } else if (event.error !== 'interrupted') {
                    // Only log non-interrupted errors
                    console.error('❌ Unhandled speech error:', event.error);
                }
            };
            
            // Speak
            this.speechSynthesis.speak(this.currentUtterance);
            console.log('🎵 Speaking:', text.substring(0, 50) + '...');
            
            return true;
        } catch (error) {
            console.error('❌ Error in speak():', error);
            this.isPending = false;
            return false;
        }
    }
    
    stop() {
        if (this.speechSynthesis) {
            this.speechSynthesis.cancel();
            this.isPlaying = false;
            this.isPending = false;
            console.log('⏹️ Speech stopped');
        }
    }
    
    isPlaying_status() {
        return this.isPlaying || this.isPending;
    }
}

// Initialize Global Audio Service
const audioService = new AudioService();

// Mission Data - Expanded with Activity Metadata
const MISSIONS = {
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
                learningGoal: 'Identificar a JARVIS como la IA principal de Stark Industries',
                udlHints: ['Lee con calma', 'Puedes revisar la historia arriba'],
                successCondition: 'Responde correctamente la pregunta',
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
                learningGoal: 'Conectar con JARVIS y entender su situación',
                udlHints: ['Comparte una idea breve', 'Lee lo que otros aportaron'],
                successCondition: 'Interactúa con el Padlet',
                instructions: [
                    'Haz clic en "Abrir Padlet" o interactúa con el muro',
                    'Escribe tu idea: ¿Cómo reparas un sistema sin requerimientos claros?',
                    'Vuelve aquí y marca la actividad como completada'
                ],
                padletOpenMessage: 'Mi sistema perdió sus requerimientos en la actualización. Necesito que los reconstruyamos juntos.'
            },
            { 
                id: '1c', 
                name: 'Actividad: El Problema de JARVIS',
                toolType: 'quiz',
                learningGoal: 'Comprender qué hace falta en JARVIS',
                udlHints: ['Piensa: ¿qué falta para que una IA funcione?', 'No es un problema de hardware'],
                successCondition: 'Responde correctamente la pregunta',
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
                novaMessage: 'Sin requerimientos claros, no puedo coordinar mis funciones. Es cómo un motor de alta performance sin instrucciones de sincronización.'
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
                novaMessage: 'Sin requerimientos, mis funciones están desincronizadas. La Torre entera está caída.'
            },
            { 
                id: '2b', 
                name: 'Actividad: Listar requerimientos faltantes',
                toolType: 'checklist',
                learningGoal: 'Identificar tipos de requerimientos que faltan',
                udlHints: ['Selecciona todos los que crees que faltan', 'Puedes marcar más de uno'],
                successCondition: 'Selecciona al menos 2 opciones',
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
                example: 'JARVIS debe coordinar todos los sistemas de la Torre Stark',
                question: '¿Es esto una FUNCIÓN o una CONDICIÓN?',
                correctAnswer: 'function',
                explanation: {
                    correct: '¡Correcto! "Enviar señales" es una FUNCIÓN (acción que realiza el sistema).',
                    incorrect: 'No es correcto. "Enviar señales" es una acción = FUNCIÓN.'
                },
                hint: 'Pregúntate: ¿Describe lo que el sistema HACE?',
                novaMessage: 'Coordinar sistemas de defensa es una de mis funciones críticas.'
            },
            { 
                id: '3b', 
                name: 'Ejercicio: Identificar condiciones',
                toolType: 'classification',
                learningGoal: 'Identificar qué es una condición necesaria',
                udlHints: ['Condición = lo que el sistema NECESITA', 'Requisitos previos para funcionar'],
                successCondition: 'Clasifica correctamente el ejemplo',
                example: 'JARVIS requiere conexión de red permanente con todos los sistemas',
                question: '¿Es esto una FUNCIÓN o una CONDICIÓN?',
                correctAnswer: 'condition',
                explanation: {
                    correct: '¡Perfecto! "Requerir energía" es una CONDICIÓN (necesidad para funcionar).',
                    incorrect: 'No del todo. "Requerir energía" es un requisito = CONDICIÓN.'
                },
                hint: 'Pregúntate: ¿Describe lo que el sistema NECESITA para funcionar?',
                novaMessage: 'Sin conexión de red, soy solo un procesador aislado. Inútil.'
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
        description: 'Clasifica ejemplos y ayuda a reparar la Torre Stark.',
        phase: 'application',
        instructions: '🔧 Para cada ejemplo, decide si es función o condición:',
        submissions: [
            { 
                id: '4a', 
                name: 'Clasificar: Coordinar Sistemas',
                toolType: 'classification',
                learningGoal: 'Aplicar clasificación a casos reales',
                udlHints: ['¿Es una acción o un requisito?', 'Navegar = verbo de acción'],
                successCondition: 'Clasifica correctamente',
                example: 'El sistema debe calcular rutas de comunicación entre servidores de Stark Industries',
                question: '¿FUNCIÓN o CONDICIÓN?',
                correctAnswer: 'function',
                explanation: {
                    correct: '¡Correcto! "Calcular rutas" es una FUNCIÓN (acción del sistema).',
                    incorrect: 'Incorrecto. "Calcular rutas" es una acción que REALIZA = FUNCIÓN.'
                },
                hint: 'Calcular es un verbo de acción.',
                novaMessage: 'Mi módulo de comunicaciones se repara. Sistema de red volviendo online.'
            },
            { 
                id: '4b', 
                name: 'Clasificar: Combustible disponible',
                toolType: 'classification',
                learningGoal: 'Aplicar clasificación a casos reales',
                udlHints: ['¿Es algo que HACE o algo que NECESITA?', 'Disponible = requisito'],
                successCondition: 'Clasifica correctamente',
                example: 'El sistema requiere energía disponible en los reactores de la Torre',
                question: '¿FUNCIÓN o CONDICIÓN?',
                correctAnswer: 'condition',
                explanation: {
                    correct: '¡Exacto! "Requiere energía" es una CONDICIÓN (necesidad previa).',
                    incorrect: 'No es correcto. "Requiere energía" es un requisito = CONDICIÓN.'
                },
                hint: 'Requerir indica una necesidad, no una acción.',
                novaMessage: 'La energía es esencial para que todos mis sistemas funcionen coordinadamente.'
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
                novaMessage: 'Tu análisis repara mi sistema de coordinación. Otro módulo conectado.'
            }
        ]
    },
    5: {
        title: 'Misión 5: Colaborar',
        description: 'Contribuye con tu equipo para la restauración final.',
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
                    '¿Qué otras funciones o condiciones necesita JARVIS para operar?',
                    'Vuelve aquí y confirma'
                ],
                padletOpenMessage: 'Tu idea puede ser la pieza clave para completar la reparación de la Torre.',
                novaMessage: 'Sus ideas son como piezas que necesito. Cada requerimiento es una pieza de mi rompecabezas.'
            },
            { 
                id: '5b', 
                name: 'Completar lista de verificación',
                toolType: 'checklist',
                learningGoal: 'Verificar preparativos finales',
                udlHints: ['Revisa cada ítem con cuidado', 'Marca solo cuando estés seguro'],
                successCondition: 'Completa todos los ítems',
                question: 'Lista de verificación pre-reactivación:',
                checklistItems: [
                    { text: 'Sistema de navegación: Funciones definidas', value: 'nav' },
                    { text: 'Sistema de energía: Condiciones verificadas', value: 'energy' },
                    { text: 'Sistema de comunicación: Requisitos completos', value: 'comm' }
                ],
                feedback: {
                    correct: '¡Verificación completa! Todo listo para la reactivación.',
                    incorrect: 'Completa todos los ítems de la lista.'
                },
                novaMessage: 'Requerimientos verificados. Casi completamente reparada.'
            },
            { 
                id: '5c', 
                name: 'Obtener autorización de reactivación',
                toolType: 'confirmation',
                learningGoal: 'Autorizar la reactivación final del sistema',
                udlHints: ['Confirma solo si todo está listo', 'Esto es el paso final'],
                successCondition: 'Confirma la autorización',
                question: '¿Autorizar el reinicio completo de JARVIS?',
                confirmText: 'Sí, el sistema está completo y listo',
                feedback: {
                    correct: '🚀 ¡Autorización concedida! Torre Stark reiniciando...',
                    incorrect: ''
                },
                novaMessage: 'Autorización recibida. Reiniciando sistemas. Sincronizando requerimientos...'
            }
        ]
    },
    6: {
        title: 'Misión 6: Restauración Completa',
        description: 'Sistema restaurado. ¡La Torre Stark está lista para operar al 100%!',
        phase: 'closure',
        instructions: '🚀 Últimos pasos para la restauración completa:',
        submissions: [
            { 
                id: '6a', 
                name: 'Verificar: Sistema al 100%',
                toolType: 'verification',
                learningGoal: 'Confirmar que el sistema está completo',
                udlHints: ['Revisa el indicador de sistema arriba', 'Debe estar al 100%'],
                successCondition: 'Confirma verificación',
                question: '¿Confirmas que todos los requerimientos de JARVIS están completos?',
                feedback: {
                    correct: '✅ Sistema verificado al 100%',
                    incorrect: ''
                },
                novaMessage: 'Todos mis módulos están sincronizados. Mis requerimientos están completos.'
            },
            { 
                id: '6b', 
                name: 'Acción: Completar restauración',
                toolType: 'action',
                learningGoal: 'Ejecutar la restauración final del sistema',
                udlHints: ['Solo disponible si 6a está completo', 'Este es el momento final'],
                successCondition: 'Presiona el botón de restauración',
                requiresPrevious: '6a',
                question: '¿Iniciar restauración completa del sistema?',
                actionLabel: '🚀 RESTAURAR',
                feedback: {
                    correct: '🚀 ¡Reinicio completado! Sistema Stark Industries restaurado.',
                    incorrect: ''
                },
                novaMessage: '¡Sistema completamente reparado! ¡JARVIS en línea al 100%! La Torre funciona en armonía.'
            },
            { 
                id: '6c', 
                name: 'Celebrar: ¡Misión cumplida!',
                toolType: 'celebration',
                learningGoal: 'Celebrar el logro',
                udlHints: ['¡Lo lograste!', 'Revisa tu progreso final'],
                successCondition: 'Disfruta la celebración',
                autoComplete: true,
                novaMessage: '¡Hemos logrado el objetivo! Entiendes que JARVIS, como todo software, necesita funciones Y condiciones claras para operar perfectamente.'
            }
        ]
    }
};

// Dynamic JARVIS messages based on learning phase
const JARVIS_MESSAGES = {
    activation: "Nueva señal detectada… soy JARVIS. Necesito que entiendas mis requerimientos.",
    exploration: "Mi hardware funciona perfecto… mi software está incompleto.",
    understanding: "Funciones = lo que EJECUTO. Condiciones = lo que NECESITO para ejecutar.",
    application: "Tus decisiones reparan mi sistema. ¿Función o condición?",
    collaborative: "Casi logramos reparar la Torre Stark.",
    closure: "Sistema JARVIS restaurado. Torre Stark en línea completa.",
    default: "Analizando sistemas de Stark Industries..."
};

// Auto-toast message variations (for periodic display)
// These rotate automatically every 20-30 seconds
const AUTO_TOAST_MESSAGES = {
    activation: [
        "Soy JARVIS, IA de Stark Industries.",
        "Mi sistema está incompleto sin tus requerimientos.",
        "La Torre Stark depende de que me repares."
    ],
    exploration: [
        "Tengo todas las funciones, pero me faltan condiciones.",
        "Sin requerimientos claros, hasta yo quedo paralizado.",
        "FUNCIÓN = lo que HAGO | CONDICIÓN = lo que NECESITO"
    ],
    understanding: [
        "FUNCIÓN: verbos de acción (calcular, transmitir, ejecutar)",
        "CONDICIÓN: palabras de necesidad (requiere, necesita, debe tener)",
        "Ambas son esenciales en ingeniería de software."
    ],
    application: [
        "Clasifica cada requerimiento correctamente.",
        "¿Es FUNCIÓN o CONDICIÓN? Tú decides.",
        "Cada clasificación me acerca a la reparación completa."
    ],
    collaborative: [
        "Tony Stark confía en que repararé los sistemas.",
        "La colaboración es clave en sistemas complejos.",
        "Juntos podemos lograrlo. Tú y yo."
    ],
    closure: [
        "Sistema restaurado. Todos los requerimientos claros.",
        "¡JARVIS está de vuelta! Gracias.",
        "Un sistema bien especificado funciona perfectamente."
    ]
};

// Progress-triggered special messages
const PROGRESS_MESSAGES = {
    firstSubmission: "✅ Primer avance logrado. +10 puntos. Seguimos.",
    missionComplete: "⭐ Misión completada. Tu ayuda fue clave.",
    allComplete: "🎉 ¡Sistema restaurado al 100%! Torre Stark operativa."

};

/**
 * Contextual Messages by Phase and Progress
 * Shows messages that evolve with the student's learning journey
 * @type {Object.<string, Array>}
 */
const CONTEXTUAL_MESSAGES_BY_PHASE = {
    activation: [
        "🔧 Soy JARVIS. Sistema de Stark Industries.",
        "⚙️ Mi hardware funciona. Mi software está incompleto.",
        "❓ ¿Entiendes qué diferencia FUNCIÓN y CONDICIÓN?",
        "💡 Tony necesita que repares mi sistema."
    ],
    exploration: [
        "🔍 Correcto. Estás investigando mi problemablema.",
        "⚙️ Tengo funciones pero faltan condiciones.",
        "📋 Sin ambas especificadas, cualquier sistema cae.",
        "🚨 Necesito que identifiques ambos tipos de requerimientos."
    ],
    understanding: [
        "✅ ¡Lo comprendes! FUNCIÓN vs CONDICIÓN.",
        "🧠 FUNCIÓN: lo que EJECUTO (verbos de acción).",
        "CONDICIÓN: lo que NECESITO (requisitos previos).",
        "💪 Ahora aplicarémoslo en ejemplos reales."
    ],
    application: [
        "🎯 Clasifica: ¿FUNCIÓN o CONDICIÓN?",
        "🔧 Cada decisión correcta me repara.",
        "⚡ Esto son casos reales de Stark Industries.",
        "🌠 Casi lo logramos. Continúa."
    ],
    collaborative: [
        "🤝 Último paso. Ayuda a los otros estudiantes.",
        "👥 La colaboración es la clave en ingeniería.",
        "🎪 Sistemas complejos = trabajo en equipo.",
        "🚀 Juntos lo conseguiremos."
    ],
    closure: [
        "✨ Mi sistema está completamente reparado.",
        "🎉 ¡Gracias por tu ayuda, especialista en requerimientos!",
        "🌌 Volveré con Tony a la Torre Stark.",
        "👋 Nunca olvidaré que entendiste FUNCIÓN vs CONDICIÓN."
    ]
};

// State Management - Enhanced for pedagogical tracking
const STATE = {
    completedMissions: [],
    earnedMedals: [],           // Track earned medals [1, 2, 3, 4]
    trophyEarned: false,        // Track if trophy earned
    characterFrame: 0,
    rewards: 0,
    currentPhase: 'activation', // Track learning phase
    showedFinalScreen: false,   // Track if final celebration shown
    messagesMuted: false,        // Track if auto-messages are muted
    lastMessageIndex: 0,         // Track last shown message variation
    firstSubmissionShown: false, // Track if first submission message shown
    activityInteractions: {},    // Track interactions per activity
    currentActivity: null,       // Current open activity
    readingMode: false,          // UDL: Simple reading mode
    lastPhaseInInbox: null       // Track last phase shown in inbox to avoid repeating messages
};

/**
 * Get Contextual Message Based on Current Progress
 * Returns a message that reflects where the student is in their learning journey
 * @returns {string} Contextual message for current phase
 */
function getContextualMessage() {
    const completedCount = Math.floor(STATE.completedMissions.length / 3);
    const phase = STATE.currentPhase;
    const messages = CONTEXTUAL_MESSAGES_BY_PHASE[phase] || CONTEXTUAL_MESSAGES_BY_PHASE.activation;
    
    // Rotate through messages based on progress
    // More progress = later messages in the array
    const messageIndex = Math.min(completedCount, messages.length - 1);
    return messages[messageIndex];
}

/**
 * Initialize Message Inbox for Phase
 * Shows the first contextual message when a phase begins
 * Only shows new message if phase has changed
 */
function initializeMessageInboxForPhase() {
    const phase = STATE.currentPhase;
    
    // Only show new message if we entered a new phase
    if (STATE.lastPhaseInInbox === phase) {
        return;
    }
    
    STATE.lastPhaseInInbox = phase;
    const message = getContextualMessage();
    
    // Clear previous messages and show initial message for new phase
    const inboxList = document.getElementById('messagesInbox');
    if (inboxList) {
        // Remove all items except separator
        const items = inboxList.querySelectorAll('.message-item');
        items.forEach(item => item.remove());
        
        // Add initial message for this phase
        addMessageToInbox(message, '💭');
    }
}

/**
 * Update Message Inbox on Progress
 * Adds contextual message when student makes progress
 */
function updateMessageInboxOnProgress() {
    const completedCount = Math.floor(STATE.completedMissions.length / 3);
    
    // Show message based on milestones
    if (completedCount === 1) {
        addMessageToInbox("🎯 Primera misión completada. ¡Buen comienzo!", '✅');
    } else if (completedCount === 3) {
        addMessageToInbox("⚡ Ya dominas tres misiones. ¡Vamos bien!", '⚡');
    } else if (completedCount === 5) {
        addMessageToInbox("🌟 Casi al final. ¡Casi despego!", '🌟');
    } else if (completedCount === 6) {
        addMessageToInbox("🚀 ¡TORRE STARK OPERATIVA! Sistema restaurado al 100%.", '🎉');
    }
    
    // Also show current contextual message
    const message = getContextualMessage();
    addMessageToInbox(message, '💭');
}

/**
 * Initialize Application
 */
function initApp() {
    setupModals();
    setupMissionButtons();
    setupMessageSystem();         // Auto-toast messages
    setupMuteToggle();            // Mute toggle button
    setupRewardsButton();         // Rewards/Medals button
    loadStateFromStorage();
    setupJARVISSpriteSystem();
    updateUI();
    updateJARVISMessage(); // Display contextual message
    setupProgressIndicator();
    initializeMessageInboxForPhase(); // Initialize inbox with contextual messages
    startAutoMessages();          // Start automatic message rotation
    updateHeaderMedalDisplay();   // Update medal display on load
}

/**
 * JARVIS UI System - Character moods and animation states
 */
const JARVIS_SPRITES = {
    neutral: {
        frames: ['assets/nova/nova1.png', 'assets/nova/nova2.png'],
        alt: 'JARVIS neutral'
    },
    pensativo: {
        frames: ['assets/nova/pensativo1.png', 'assets/nova/pensativo2.png'],
        alt: 'JARVIS pensando'
    },
    preocupado: {
        frames: ['assets/nova/preocupado1.png', 'assets/nova/preocupado2.png'],
        alt: 'JARVIS preocupado'
    },
    feliz: {
        frames: ['assets/nova/feliz1.png', 'assets/nova/feliz2.png'],
        alt: 'JARVIS feliz'
    },
    celebrando: {
        frames: ['assets/nova/celebrando1.png', 'assets/nova/celebrando2.png'],
        alt: 'JARVIS celebrando'
    }
};

const NOVA_MISSION_MOOD = {
    1: 'neutral',
    2: 'neutral',
    3: 'neutral',
    4: 'neutral'
};

const novaSpriteState = {
    mood: 'neutral',
    blinkTimeoutId: null,
    isBlinking: false,
    preloaded: false
};

function setupJARVISSpriteSystem() {
    const sprite = document.getElementById('novaSprite');
    if (!sprite) return;

    preloadNovaSprites();
    sprite.dataset.src = sprite.getAttribute('src') || '';
    updateNovaMoodFromProgress();
    scheduleNovaBlink(true);
    console.log('✅ JARVIS sprite system initialized - blinking enabled');
}

function preloadNovaSprites() {
    if (novaSpriteState.preloaded) return;
    Object.values(JARVIS_SPRITES).forEach((mood) => {
        mood.frames.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    });
    novaSpriteState.preloaded = true;
}

function setNovaMoodByMission(missionId) {
    const mood = NOVA_MISSION_MOOD[missionId] || 'neutral';
    setNovaMood(mood);
}

function setNovaMood(mood) {
    if (!JARVIS_SPRITES[mood]) return;
    if (novaSpriteState.mood === mood) {
        updateNovaSpriteAlt(mood);
        return;
    }

    novaSpriteState.mood = mood;
    updateNovaSpriteAlt(mood);
    updateNovaSpriteFrame(0, true);
    scheduleNovaBlink(true);
}

function updateNovaMoodFromProgress() {
    const completedMissionsCount = Math.floor(STATE.completedMissions.length / 2);
    const missionId = Math.min(completedMissionsCount + 1, 4);
    setNovaMoodByMission(missionId);
}

function updateNovaSpriteAlt(mood) {
    const sprite = document.getElementById('novaSprite');
    if (!sprite) return;
    sprite.alt = JARVIS_SPRITES[mood].alt || 'NOVA';
}

function updateNovaSpriteFrame(frameIndex, withFade) {
    const sprite = document.getElementById('novaSprite');
    if (!sprite) {
        console.warn('⚠️ NOVA sprite not found');
        return;
    }

    const frames = JARVIS_SPRITES[novaSpriteState.mood]?.frames || [];
    const frameSrc = frames[frameIndex];
    if (!frameSrc) {
        console.warn('⚠️ Frame not found:', frameIndex);
        return;
    }
    if (sprite.dataset.src === frameSrc) return;

    console.log(`🖼️ Updating frame to: ${frameIndex} (${frameSrc})`);

    if (withFade) {
        sprite.classList.add('nova-sprite--fade');
        setTimeout(() => {
            sprite.src = frameSrc;
            sprite.dataset.src = frameSrc;
            requestAnimationFrame(() => {
                sprite.classList.remove('nova-sprite--fade');
            });
        }, 120);
    } else {
        sprite.src = frameSrc;
        sprite.dataset.src = frameSrc;
    }
}

function scheduleNovaBlink(resetTimer) {
    if (resetTimer && novaSpriteState.blinkTimeoutId) {
        clearTimeout(novaSpriteState.blinkTimeoutId);
    }

    // Blink interval: approximately 10 seconds
    const baseDelay = 9000;
    const randomDelay = Math.random() * 2000;
    const delay = baseDelay + randomDelay;
    
    console.log(`👁️ Next blink scheduled in ${Math.round(delay/1000)} seconds`);
    
    novaSpriteState.blinkTimeoutId = setTimeout(() => {
        runNovaBlink();
    }, delay);
}

function runNovaBlink() {
    if (novaSpriteState.isBlinking) return;
    novaSpriteState.isBlinking = true;

    console.log('👁️ NOVA blinking...');

    // First blink (eyes close)
    updateNovaSpriteFrame(1, false);
    
    // Random blink duration (80-150ms for realism)
    const blinkDuration = 80 + Math.random() * 70;
    
    setTimeout(() => {
        // Eyes open
        updateNovaSpriteFrame(0, false);
        
        // 30% chance of double blink (like humans do)
        const doubleBlink = Math.random() < 0.30;
        
        if (doubleBlink) {
            console.log('👁️👁️ Double blink!');
            // Short pause before second blink (150-250ms)
            const pauseBeforeSecond = 150 + Math.random() * 100;
            
            setTimeout(() => {
                // Second blink - eyes close again
                updateNovaSpriteFrame(1, false);
                
                setTimeout(() => {
                    // Eyes open again
                    updateNovaSpriteFrame(0, false);
                    novaSpriteState.isBlinking = false;
                    scheduleNovaBlink(false);
                }, blinkDuration);
            }, pauseBeforeSecond);
        } else {
            // Single blink - schedule next
            novaSpriteState.isBlinking = false;
            scheduleNovaBlink(false);
        }
    }, blinkDuration);
}

/**
 * Modal Management
 */
function setupModals() {
    const storyModal = document.getElementById('storyModal');
    const conceptsModal = document.getElementById('conceptsModal');
    const missionModal = document.getElementById('missionModal');
    const activityModal = document.getElementById('activityModal');
    
    // Story Button
    document.getElementById('storyBtn').addEventListener('click', () => {
        openModal(storyModal);
    });
    
    // Conceptos Button (NEW)
    document.getElementById('conceptsBtn').addEventListener('click', () => {
        openModal(conceptsModal);
        showToastMessage("💡 Estos conceptos son clave para ayudar a NOVA.", 3000);
    });
    
    // Audio Button - Story Modal
    const storyAudioBtn = document.querySelector('#storyModal .audio-btn-story');
    if (storyAudioBtn) {
        storyAudioBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            console.log('🖱️ Story audio button clicked');
            
            const storyText = document.querySelector('#storyModal .modal-text');
            if (!storyText) return;
            
            const isPlaying = audioService.isPlaying_status();
            
            if (isPlaying) {
                audioService.stop();
                storyAudioBtn.textContent = '🔊 Escuchar';
            } else {
                // Extract clean text (exclude images/figures)
                const clone = storyText.cloneNode(true);
                clone.querySelectorAll('script, style, figure, img, figcaption').forEach(el => el.remove());
                const text = clone.textContent.replace(/\s+/g, ' ').trim();
                
                console.log('📝 Text length:', text.length);
                
                // Speak with callbacks
                const success = audioService.speak(text, {
                    onEnd: () => {
                        console.log('✅ Story audio finished');
                        storyAudioBtn.textContent = '🔊 Escuchar';
                    },
                    onError: (error) => {
                        console.log('⚠️ Story audio error:', error);
                        storyAudioBtn.textContent = '🔊 Escuchar';
                    }
                });
                
                if (success) {
                    storyAudioBtn.textContent = '⏹️ Detener';
                }
            }
        }, { once: false, capture: true });
    }
    
    // Audio Button - Concepts Modal
    const conceptsAudioBtn = document.querySelector('#conceptsModal .audio-btn-concepts');
    if (conceptsAudioBtn) {
        conceptsAudioBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            console.log('🖱️ Concepts audio button clicked');
            
            const conceptsContainer = document.querySelector('#conceptsModal .modal-text');
            if (!conceptsContainer) return;
            
            const isPlaying = audioService.isPlaying_status();
            
            if (isPlaying) {
                audioService.stop();
                conceptsAudioBtn.textContent = '🔊 Escuchar';
            } else {
                // Extract text from each concept card with structured pauses
                const conceptCards = conceptsContainer.querySelectorAll('.concept-card');
                const conceptTexts = [];
                
                conceptCards.forEach(card => {
                    const frontFace = card.querySelector('.concept-front');
                    if (frontFace) {
                        const clone = frontFace.cloneNode(true);
                        clone.querySelectorAll('script, style, figure, img').forEach(el => el.remove());
                        
                        // Extract title and body separately
                        const titleEl = clone.querySelector('h3');
                        const title = titleEl ? titleEl.textContent.trim() : '';
                        
                        // Remove title from clone to get only description
                        if (titleEl) titleEl.remove();
                        const description = clone.textContent.replace(/\s+/g, ' ').trim();
                        
                        // Combine with comma pause between title and description
                        const concept = title + ', ' + description;
                        if (concept.length > 5) {
                            conceptTexts.push(concept);
                        }
                    }
                });
                
                if (conceptTexts.length > 0) {
                    // Join concepts with double pauses (comma + period combination)
                    const fullText = conceptTexts.join(', , , ');
                    
                    console.log('📝 Concepts to read:', conceptTexts.length);
                    
                    // Speak with callbacks
                    const success = audioService.speak(fullText, {
                        onEnd: () => {
                            console.log('✅ Concepts audio finished');
                            conceptsAudioBtn.textContent = '🔊 Escuchar';
                        },
                        onError: (error) => {
                            console.log('⚠️ Concepts audio error:', error);
                            conceptsAudioBtn.textContent = '🔊 Escuchar';
                        }
                    });
                    
                    if (success) {
                        conceptsAudioBtn.textContent = '⏹️ Detener';
                    }
                }
            }
        }, { once: false, capture: true });
    }
    
    // Close buttons
    document.getElementById('closeStory').addEventListener('click', () => {
        closeModal(storyModal);
    });
    
    document.getElementById('closeConcepts').addEventListener('click', () => {
        closeModal(conceptsModal);
    });
    
    document.getElementById('closeMission').addEventListener('click', () => {
        closeModal(missionModal);
    });
    
    document.getElementById('closeActivity').addEventListener('click', () => {
        closeModal(activityModal);
    });
    
    // Celebration Modal
    const celebrationModal = document.getElementById('celebrationModal');
    document.getElementById('closeCelebration').addEventListener('click', () => {
        closeModal(celebrationModal);
    });
    
    document.getElementById('restartGameBtn').addEventListener('click', () => {
        // Reset game state
        STATE.completedMissions = [];
        STATE.earnedMedals = [];
        STATE.trophyEarned = false;
        STATE.rewards = 0;
        STATE.currentPhase = 'activation';
        STATE.showedFinalScreen = false;
        STATE.lastPhaseInInbox = null;
        STATE.firstSubmissionShown = false;
        
        // Save state
        saveStateToStorage();
        
        // Close modal
        closeModal(celebrationModal);
        
        // Reset UI
        updateUI();
        updateNOVAMessage();
        initializeMessageInboxForPhase();
        
        // Reset mission panels
        for (let i = 1; i <= 6; i++) {
            const badge = document.getElementById(`badge-${i}`);
            badge.textContent = '○';
            badge.classList.remove('completed');
            badge.parentElement.setAttribute('aria-label', `Misión ${i}`);
            
            const panel = document.getElementById(`mission-${i}-panel`);
            panel.style.display = 'none';
        }
        
        showToastMessage('🔄 Misión reiniciada. ¡Ayuda a NOVA de nuevo!', 3000);
    });
    
    // Activity modal buttons
    document.getElementById('cancelActivityBtn').addEventListener('click', () => {
        STATE.currentActivity = null;
        closeModal(activityModal);
    });
    
    document.getElementById('completeActivityBtn').addEventListener('click', () => {
        if (STATE.currentActivity) {
            completeActivityFromModal(STATE.currentActivity);
        }
    });
    
    document.getElementById('validateActivityBtn').addEventListener('click', () => {
        if (STATE.currentActivity) {
            validateActivity(STATE.currentActivity);
        }
    });
    
    // UDL Controls
    document.getElementById('toggleReadingMode').addEventListener('click', () => {
        STATE.readingMode = !STATE.readingMode;
        document.querySelector('.activity-modal-content').classList.toggle('reading-mode', STATE.readingMode);
        document.getElementById('readingModeIcon').textContent = STATE.readingMode ? '📘' : '📖';
    });
    
    document.getElementById('toggleAudio').addEventListener('click', () => {
        showToastMessage('🔊 Función de audio próximamente disponible', 2000);
    });
    
    // Generic close button handler for all modals
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });
    
    // Close on background click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    // Keyboard: Escape to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        closeModal(modal);
    });
    closeSubmenu();
}

/**
 * ============================================
 * NOVA MESSAGE SYSTEM (Auto-toast notifications)
 * ============================================
 * Displays contextual, rotating messages to students
 * - Auto-rotates every 20-30 seconds (if not muted)
 * - Shows progress-triggered messages
 * - Supports mute toggle (persisted)
 * - Accessible (ARIA live region)
 */

let messageTimer = null;

/**
 * Setup Message System
 */
function setupMessageSystem() {
    const closeBtn = document.getElementById('novaMessageClose');
    
    // Close button handler
    closeBtn.addEventListener('click', () => {
        hideToastMessage();
    });
    
    // Auto-hide on click anywhere in toast
    const toast = document.getElementById('novaMessageToast');
    toast.addEventListener('click', (e) => {
        if (e.target !== closeBtn) {
            hideToastMessage();
        }
    });
}

/**
 * Setup Mute Toggle Button
 */
function setupMuteToggle() {
    const muteBtn = document.getElementById('muteToggleBtn');
    const muteIcon = document.getElementById('muteIcon');
    
    // Update icon on load
    updateMuteIcon();
    
    muteBtn.addEventListener('click', () => {
        STATE.messagesMuted = !STATE.messagesMuted;
        updateMuteIcon();
        saveStateToStorage();
        
        if (STATE.messagesMuted) {
            hideToastMessage();
            clearTimeout(messageTimer);
            showToastMessage("🔕 Mensajes automáticos silenciados", 2000);
        } else {
            showToastMessage("🔔 Mensajes automáticos activados", 2000);
            startAutoMessages();
        }
    });
    
    function updateMuteIcon() {
        muteIcon.textContent = STATE.messagesMuted ? '🔕' : '🔔';
        muteBtn.setAttribute('aria-label', 
            STATE.messagesMuted ? 'Activar mensajes automáticos' : 'Silenciar mensajes automáticos'
        );
    }
}

/**
 * Setup Rewards Button
 */
function setupRewardsButton() {
    // Stat button for missions status
    const missionsStatBtn = document.getElementById('missionsStatBtn');
    if (missionsStatBtn) {
        missionsStatBtn.addEventListener('click', () => {
            openMissionsStatusModal();
        });
    }

    // Stat button for rewards/medals
    const rewardsStatBtn = document.getElementById('rewardsStatBtn');
    if (rewardsStatBtn) {
        rewardsStatBtn.addEventListener('click', () => {
            openRewardsModal();
        });
    }

    // Close buttons for new modals
    const closeMissionsStatus = document.getElementById('closeMissionsStatus');
    if (closeMissionsStatus) {
        closeMissionsStatus.addEventListener('click', () => {
            closeModal(document.getElementById('missionsStatusModal'));
        });
    }

    const closeMedalAward = document.getElementById('closeMedalAward');
    if (closeMedalAward) {
        closeMedalAward.addEventListener('click', () => {
            closeModal(document.getElementById('medalAwardModal'));
        });
    }

    const continueMissionBtn = document.getElementById('continueMissionBtn');
    if (continueMissionBtn) {
        continueMissionBtn.addEventListener('click', () => {
            closeModal(document.getElementById('medalAwardModal'));
        });
    }
}

/**
 * Show Toast Message
 * @param {string} message - Message to display
 * @param {number} duration - Duration in ms (0 = no auto-hide)
 */
function showToastMessage(message, duration = 5000) {
    const toast = document.getElementById('novaMessageToast');
    const textEl = document.getElementById('novaMessageText');
    
    textEl.textContent = message;
    toast.classList.add('show');
    
    // Also add to messages inbox
    addMessageToInbox(message);
    
    // Auto-hide if duration specified
    if (duration > 0) {
        setTimeout(() => {
            hideToastMessage();
        }, duration);
    }
}

/**
 * Add Message to Info Box Inbox
 * @param {string} message - The message to add
 * @param {string} icon - Optional emoji icon (default: 💭)
 */
function addMessageToInbox(message, icon = '💭') {
    const inboxList = document.getElementById('messagesInbox');
    if (!inboxList) return;
    
    // Create message element
    const messageItem = document.createElement('div');
    messageItem.className = 'message-item';
    messageItem.innerHTML = `
        <span class="message-icon">${icon}</span>
        <div class="message-content">
            <p class="message-text">${message}</p>
            <span class="message-time">ahora</span>
        </div>
    `;
    
    // Add to top of list
    inboxList.insertBefore(messageItem, inboxList.firstChild);
    
    // Keep only last 10 messages
    const messages = inboxList.querySelectorAll('.message-item');
    if (messages.length > 10) {
        messages[messages.length - 1].remove();
    }
}

/**
 * Update System Progress Display
 * @param {number} percentage - Progress percentage (0-100)
 */
function updateSystemProgress(percentage) {
    const progressEl = document.getElementById('systemProgress');
    if (progressEl) {
        progressEl.textContent = Math.min(100, Math.max(0, percentage));
    }
}

/**
 * Hide Toast Message
 */
function hideToastMessage() {
    const toast = document.getElementById('novaMessageToast');
    toast.classList.remove('show');
}

/**
 * Start Automatic Message Rotation
 * Shows contextual messages every 20-30 seconds
 */
function startAutoMessages() {
    if (STATE.messagesMuted) return;
    
    // Clear existing timer
    if (messageTimer) clearTimeout(messageTimer);
    
    // Show first message after 5 seconds
    messageTimer = setTimeout(() => {
        showNextAutoMessage();
    }, 5000);
}

/**
 * Show Next Automatic Message
 * Rotates through messages based on current phase
 */
function showNextAutoMessage() {
    if (STATE.messagesMuted) return;
    
    const phase = STATE.currentPhase;
    const messages = AUTO_TOAST_MESSAGES[phase] || AUTO_TOAST_MESSAGES.activation;
    
    // Get next message (rotate through variations)
    const messageIndex = STATE.lastMessageIndex % messages.length;
    const message = messages[messageIndex];
    
    STATE.lastMessageIndex++;
    
    // Show message
    showToastMessage(message, 6000);
    
    // Schedule next message (random 20-30 seconds)
    const nextDelay = 20000 + Math.random() * 10000;
    messageTimer = setTimeout(() => {
        showNextAutoMessage();
    }, nextDelay);
}

/**
 * Show Progress-Triggered Message
 * Called when specific milestones are reached
 */
function showProgressMessage(type) {
    const message = PROGRESS_MESSAGES[type];
    if (message) {
        showToastMessage(message, 5000);
    }
}

/**
 * ============================================
 * MEDAL & TROPHY SYSTEM
 * ============================================
 */

/**
 * Check if a mission is locked
 * @param {number} missionId - Mission ID (1-4)
 * @returns {boolean} True if mission is locked
 */
function checkMissionLocked(missionId) {
    // Mission 1 is always available
    if (missionId === 1) return false;
    
    // Check if previous mission is completed
    const previousMissionIndex = missionId - 1;
    
    // Check if any activity from the previous mission was completed
    const mission = MISSIONS[previousMissionIndex];
    if (!mission) return true;
    
    // Check if ANY submission from previous mission is completed
    const hasCompletedPrevious = mission.submissions.some(sub => 
        STATE.completedMissions.includes(sub.id)
    );
    
    return !hasCompletedPrevious;
}

/**
 * Check if a mission is fully completed (all activities done)
 * @param {number} missionId - Mission ID
 * @returns {boolean}
 */
function isMissionFullyCompleted(missionId) {
    const mission = MISSIONS[missionId];
    if (!mission || !Array.isArray(mission.submissions)) return false;
    return mission.submissions.every(sub => STATE.completedMissions.includes(sub.id));
}

/**
 * Sync medals/trophy from current progress.
 * Medal i is unlocked when mission i is complete (for missions 1-4).
 * Trophy appears when all medals are unlocked.
 */
function syncRewardsFromProgress() {
    const medalMissionIds = [1, 2, 3, 4];
    STATE.earnedMedals = medalMissionIds.filter(id => isMissionFullyCompleted(id));
    STATE.trophyEarned = STATE.earnedMedals.length === medalMissionIds.length;
}

/**
 * Award medal for mission completion
 * @param {number} missionId - Mission ID (1-4)
 */
function awardMedal(missionId) {
    if (!STATE.earnedMedals.includes(missionId)) {
        STATE.earnedMedals.push(missionId);
        console.log(`🏅 Medal awarded for mission ${missionId}`);
        
        // Show medal award modal
        showMedalAwardModal(missionId);
        
        updateHeaderMedalDisplay();
        saveStateToStorage();
    }
}

/**
 * Award trophy for completing all missions
 */
function awardTrophy() {
    if (!STATE.trophyEarned) {
        STATE.trophyEarned = true;
        console.log(`🏆 TROPHY AWARDED!`);
        showToastMessage(`🏆 ¡TROFEO DESBLOQUEADO!\n¡Has completado todas las misiones!`, 5000);
        updateHeaderMedalDisplay();
        saveStateToStorage();
        
        // Show trophy modal after a moment
        setTimeout(() => {
            openRewardsModal();
        }, 1000);
    }
}

/**
 * Update header medal display
 */
function updateHeaderMedalDisplay() {
    // Update earned medals counter in stat bar
    const earnedMedalsCount = document.getElementById('earnedMedalsCount');
    if (earnedMedalsCount) {
        earnedMedalsCount.textContent = STATE.earnedMedals.length;
    }

    // Update medals in header
    for (let i = 1; i <= 4; i++) {
        const medalEl = document.getElementById(`medal-${i}`);
        if (medalEl) {
            if (STATE.earnedMedals.includes(i)) {
                medalEl.classList.add('earned');
                medalEl.style.opacity = '1';
            } else {
                medalEl.classList.remove('earned');
                medalEl.style.opacity = '0.3';
            }
        }
        
        // Update medal in rewards modal
        const rewardMedalEl = document.getElementById(`reward-medal-${i}`);
        const statusEl = document.getElementById(`reward-status-${i}`);
        if (rewardMedalEl) {
            const img = rewardMedalEl.querySelector('img');
            if (STATE.earnedMedals.includes(i)) {
                rewardMedalEl.classList.add('earned');
                if (img) img.style.opacity = '1';
                if (statusEl) {
                    statusEl.textContent = '✅ Completada';
                    statusEl.style.color = 'var(--color-success)';
                }
            } else {
                rewardMedalEl.classList.remove('earned');
                if (img) img.style.opacity = '0.3';
                if (statusEl) {
                    statusEl.textContent = 'Bloqueada';
                    statusEl.style.color = 'var(--color-text-light)';
                }
            }
        }
    }
    
    // Update trophy in header and rewards modal
    const trophyContainer = document.getElementById('trophy-container');
    const trophyRewardItem = document.getElementById('trophy-reward-item');
    const trophyStatusEl = document.getElementById('trophy-status');
    
    if (STATE.trophyEarned) {
        if (trophyContainer) {
            trophyContainer.style.display = 'flex';
            trophyContainer.style.opacity = '1';
            trophyContainer.classList.add('earned');
        }
        if (trophyRewardItem) {
            trophyRewardItem.style.display = 'flex';
            trophyRewardItem.classList.add('earned');
            const img = trophyRewardItem.querySelector('img');
            if (img) img.style.opacity = '1';
            if (trophyStatusEl) {
                trophyStatusEl.textContent = '✅ ¡HAS DESBLOQUEADO EL TROFEO!';
                trophyStatusEl.style.color = 'var(--color-success)';
            }
        }
    } else {
        const medalsCount = STATE.earnedMedals.length;
        if (trophyStatusEl) {
            trophyStatusEl.textContent = `Completa todas las misiones (${medalsCount}/4)`;
            trophyStatusEl.style.color = 'var(--color-text-light)';
        }
    }
}

/**
 * Open Rewards Modal
 */
function openRewardsModal() {
    const modal = document.getElementById('rewardsModal');
    if (modal) {
        updateHeaderMedalDisplay(); // Refresh medal display
        openModal(modal);
    }
}

/**
 * Show Medal Award Modal (when a medal is earned)
 * @param {number} missionId - Mission ID (1-4)
 */
function showMedalAwardModal(missionId) {
    const modal = document.getElementById('medalAwardModal');
    if (!modal) return;

    // Update modal content
    const title = document.getElementById('medal-award-title');
    const message = document.getElementById('medalAwardMessage');
    const img = document.getElementById('medalAwardImg');
    const progress = document.getElementById('medalAwardProgress');

    if (title) title.textContent = `🏅 ¡MEDALLA ${missionId} DESBLOQUEADA!`;
    if (message) message.textContent = `Has completado con éxito la Misión ${missionId}.`;
    if (img) img.src = `assets/medallas/m${missionId}.png`;
    if (progress) progress.textContent = `Medallas desbloqueadas: ${STATE.earnedMedals.length}/4`;

    openModal(modal);
}

/**
 * Open Missions Status Modal
 */
function openMissionsStatusModal() {
    const modal = document.getElementById('missionsStatusModal');
    if (!modal) return;

    const listContainer = document.getElementById('missionsStatusList');
    if (!listContainer) return;

    // Populate missions status
    let html = '';
    for (let i = 1; i <= 4; i++) {
        const mission = MISSIONS[i];
        if (!mission) continue;

        const isComplete = isMissionFullyCompleted(i);
        const completedActivities = mission.submissions.filter(sub => 
            STATE.completedMissions.includes(sub.id)
        ).length;
        const totalActivities = mission.submissions.length;

        html += `
            <div class="mission-status-item" style="margin-bottom: 1rem; padding: 1rem; background: ${isComplete ? 'rgba(74, 222, 128, 0.1)' : 'rgba(107, 127, 191, 0.05)'}; border-left: 4px solid ${isComplete ? '#4ade80' : '#6b7fbf'}; border-radius: 8px;">
                <h4 style="margin: 0 0 0.5rem 0; display: flex; align-items: center; gap: 0.5rem;">
                    ${isComplete ? '✅' : '🔴'} Misión ${i}: ${mission.title.split(':')[1]?.trim() || mission.title}
                </h4>
                <p style="margin: 0; font-size: 0.9rem; color: var(--color-text-light);">
                    Actividades: ${completedActivities}/${totalActivities} completadas
                </p>
                ${isComplete ? '<p style="margin: 0.5rem 0 0 0; font-weight: 600; color: var(--color-success);">🏅 Medalla desbloqueada</p>' : ''}
            </div>
        `;
    }

    listContainer.innerHTML = html;
    openModal(modal);
}

/**
 * Open Rewards Modal
 */
function openRewardsModal() {
    const modal = document.getElementById('rewardsModal');
    if (modal) {
        updateHeaderMedalDisplay(); // Refresh medal display
        openModal(modal);
    }
}

/**
 * Mission Menu Setup
 */
function setupMissionButtons() {
    console.log('🎯 Setting up mission buttons...');
    // Mission buttons - now with accordion behavior
    for (let i = 1; i <= 4; i++) {
        const missionBtn = document.getElementById(`mission-${i}-btn`);
        console.log(`Mission ${i} button:`, missionBtn ? '✅ Found' : '❌ Not found');
        if (missionBtn) {
            // Remove any existing listeners by cloning
            const newBtn = missionBtn.cloneNode(true);
            missionBtn.parentNode.replaceChild(newBtn, missionBtn);
            
            // Update locked status
            const isLocked = checkMissionLocked(i);
            if (isLocked) {
                newBtn.classList.add('locked');
                newBtn.disabled = true;
            } else {
                newBtn.classList.remove('locked');
                newBtn.disabled = false;
            }
            
            // Add single click listener
            newBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(`🖱️ Mission ${i} button clicked`);
                toggleMissionAccordion(i);
            }, false);
        }
    }
    console.log('✅ Mission buttons setup complete');
}

/**
 * Toggle Mission Accordion
 */
function toggleMissionAccordion(missionId) {
    console.log(`📂 Toggling accordion for mission ${missionId}`);
    
    // Check if mission is locked
    if (checkMissionLocked(missionId)) {
        console.log(`🔒 Mission ${missionId} is locked!`);
        const previousMissionId = missionId - 1;
        showToastMessage(`🔒 Debes completar la Misión ${previousMissionId} primero`, 4000);
        return;
    }
    
    const mission = MISSIONS[missionId];
    const panel = document.getElementById(`mission-${missionId}-panel`);
    const button = document.getElementById(`mission-${missionId}-btn`);
    const activitiesContainer = document.getElementById(`mission-${missionId}-activities`);
    
    console.log(`  Mission data:`, mission ? '✅ Found' : '❌ Not found');
    console.log(`  Panel:`, panel ? '✅ Found' : '❌ Not found');
    console.log(`  Button:`, button ? '✅ Found' : '❌ Not found');
    console.log(`  Activities container:`, activitiesContainer ? '✅ Found' : '❌ Not found');
    
    if (!panel || !button) {
        console.error(`❌ Missing elements for mission ${missionId}`);
        return;
    }
    
    // Check if this panel is already open
    const isOpen = panel.classList.contains('active');
    console.log(`  Panel is currently:`, isOpen ? 'OPEN' : 'CLOSED');
    
    // Close all other panels (only 4 missions now)
    for (let i = 1; i <= 4; i++) {
        const otherPanel = document.getElementById(`mission-${i}-panel`);
        const otherButton = document.getElementById(`mission-${i}-btn`);
        if (otherPanel && otherButton) {
            otherPanel.classList.remove('active');
            otherButton.classList.remove('active');
        }
    }
    
    // If it wasn't open, open this panel
    if (!isOpen) {
        console.log(`  ✅ Opening mission ${missionId} panel...`);
        panel.classList.add('active');
        button.classList.add('active');

        setNovaMoodByMission(missionId);
        
        // Populate activities if empty or refresh
        populateMissionActivities(missionId, mission, activitiesContainer);
        
        // Smooth scroll to the opened mission
        setTimeout(() => {
            button.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    } else {
        console.log(`  ℹ️ Mission ${missionId} panel was already open, now closed`);
    }
}

/**
 * Populate Mission Activities in Accordion
 */
function populateMissionActivities(missionId, mission, container) {
    container.innerHTML = '';
    
    // Add instructions if available
    if (mission.instructions) {
        const instructionsEl = document.createElement('div');
        instructionsEl.className = 'mission-instructions';
        instructionsEl.textContent = mission.instructions;
        container.appendChild(instructionsEl);
    }
    
    // Add activity items
    mission.submissions.forEach((sub, index) => {
        const item = document.createElement('div');
        item.className = 'mission-activity-item';
        
        // Check if already completed
        const isCompleted = STATE.completedMissions.includes(sub.id);
        if (isCompleted) {
            item.classList.add('completed');
        }
        
        item.innerHTML = `
            <div class="activity-icon">${isCompleted ? '✅' : '📝'}</div>
            <div class="activity-info">
                <div class="activity-title">${sub.name}</div>
                <div class="activity-desc">${isCompleted ? 'Completada' : 'Toca para empezar'}</div>
            </div>
            <div class="activity-arrow">›</div>
        `;
        
        item.addEventListener('click', () => {
            openActivity(sub.id, missionId);
        });
        
        container.appendChild(item);
    });
}

/**
 * Update Activity Item UI immediately when marked complete
 * @param {string} submissionId - e.g., '1a', '2b'
 * @param {number} missionId - Mission number
 */
function updateActivityItemUI(submissionId, missionId) {
    // Find the activity container
    const container = document.getElementById(`mission-${missionId}-activities`);
    if (!container) return;
    
    // Find all activity items in this mission
    const activityItems = container.querySelectorAll('.mission-activity-item');
    const mission = MISSIONS[missionId];
    if (!mission) return;
    
    // Find the submission in the mission data
    const submissionIndex = mission.submissions.findIndex(sub => sub.id === submissionId);
    if (submissionIndex === -1) return;
    
    // Update the corresponding activity item
    const activityItem = activityItems[submissionIndex];
    if (!activityItem) return;
    
    // Mark as completed
    activityItem.classList.add('completed');
    
    // Update icon and text
    const iconEl = activityItem.querySelector('.activity-icon');
    const descEl = activityItem.querySelector('.activity-desc');
    
    if (iconEl) iconEl.textContent = '✅';
    if (descEl) descEl.textContent = 'Completada';
}

/**
 * Open Mission Submenu (DEPRECATED - kept for backwards compatibility)
 */
function openMissionSubmenu(missionId) {
    // Redirect to accordion behavior
    toggleMissionAccordion(missionId);
}

/**
 * Close Submenu
 */
function closeSubmenu() {
    const submenu = document.getElementById('submenu');
    submenu.style.display = 'none';
}

/**
 * ============================================
 * ACTIVITY ENGINE
 * ============================================
 * Handles interactive activities for each submission
 */

/**
 * Open Activity Modal
 * @param {string} submissionId - e.g., '1a', '2b'
 * @param {number} missionId - e.g., 1, 2, 3
 */
function openActivity(submissionId, missionId) {
    // Check if already completed
    if (STATE.completedMissions.includes(submissionId)) {
        alert('✓ Ya completaste esta actividad. ¡Excelente trabajo!');
        return;
    }
    
    // Find submission data
    const mission = MISSIONS[missionId];
    const submission = mission.submissions.find(s => s.id === submissionId);
    
    if (!submission) {
        console.error('Submission not found:', submissionId);
        return;
    }
    
    // Set current activity
    STATE.currentActivity = submissionId;
    
    // Initialize interaction tracking
    if (!STATE.activityInteractions[submissionId]) {
        STATE.activityInteractions[submissionId] = {
            opened: Date.now(),
            attempts: 0,
            interactions: []
        };
    }
    
    // Render activity
    renderActivity(submission, mission.phase);
    
    // Open modal
    const activityModal = document.getElementById('activityModal');
    openModal(activityModal);
    
    // Show opening message from NOVA
    if (submission.novaMessage) {
        setTimeout(() => {
            showToastMessage(`💭 NOVA: "${submission.novaMessage}"`, 4000);
        }, 800);
    }
}

/**
 * Render Activity Content
 * @param {object} submission - Submission data
 * @param {string} phase - Learning phase
 */
function renderActivity(submission, phase) {
    // Update title and goal
    document.getElementById('activity-modal-title').textContent = submission.name;
    document.getElementById('activityGoal').textContent = `🎯 ${submission.learningGoal}`;
    
    // Render instructions (if any)
    const instructionsList = document.getElementById('activityInstructionsList');
    instructionsList.innerHTML = '';
    if (submission.instructions && Array.isArray(submission.instructions)) {
        submission.instructions.forEach(inst => {
            const li = document.createElement('li');
            li.textContent = inst;
            instructionsList.appendChild(li);
        });
    } else {
        // Hide instructions section if none
        document.getElementById('activityInstructions').style.display = 'none';
    }
    
    // Render UDL hints
    const hintsList = document.getElementById('activityHintsList');
    hintsList.innerHTML = '';
    if (submission.udlHints && submission.udlHints.length > 0) {
        submission.udlHints.forEach(hint => {
            const li = document.createElement('li');
            li.textContent = hint;
            hintsList.appendChild(li);
        });
        document.getElementById('activityHints').style.display = 'block';
    } else {
        document.getElementById('activityHints').style.display = 'none';
    }
    
    // Reset feedback and buttons BEFORE rendering content
    const feedbackEl = document.getElementById('activityFeedback');
    feedbackEl.style.display = 'none';
    feedbackEl.className = 'activity-feedback'; // Remove any previous state classes
    
    const validateBtn = document.getElementById('validateActivityBtn');
    const completeBtn = document.getElementById('completeActivityBtn');
    validateBtn.style.display = 'none';
    completeBtn.disabled = true;
    completeBtn.classList.remove('enabled');
    
    // Render content based on toolType
    const contentEl = document.getElementById('activityContent');
    contentEl.innerHTML = '';
    
    switch (submission.toolType) {
        case 'quiz':
            renderQuiz(submission, contentEl);
            break;
        case 'classification':
            renderClassification(submission, contentEl);
            break;
        case 'checklist':
            renderChecklist(submission, contentEl);
            break;
        case 'padlet':
            renderPadlet(submission, contentEl);
            break;
        case 'confirmation':
            renderConfirmation(submission, contentEl);
            break;
        case 'verification':
            renderVerification(submission, contentEl);
            break;
        case 'action':
            renderAction(submission, contentEl);
            break;
        case 'celebration':
            renderCelebration(submission, contentEl);
            break;
        default:
            contentEl.innerHTML = '<p>Actividad en desarrollo.</p>';
    }
}

/**
 * Render Quiz Activity
 */
function renderQuiz(submission, container) {
    const quizHTML = `
        <div class="activity-quiz">
            <p class="activity-question"><strong>${submission.question}</strong></p>
            <div class="quiz-options" id="quizOptions">
                ${submission.options.map((opt, i) => `
                    <label class="quiz-option">
                        <input type="radio" name="quiz-answer" value="${i}" data-correct="${opt.correct}">
                        <span>${opt.text}</span>
                    </label>
                `).join('')}
            </div>
        </div>
    `;
    container.innerHTML = quizHTML;
    
    // Show validate button
    document.getElementById('validateActivityBtn').style.display = 'block';
    
    // Enable validation on selection
    const options = container.querySelectorAll('input[type="radio"]');
    options.forEach(opt => {
        opt.addEventListener('change', () => {
            STATE.activityInteractions[STATE.currentActivity].interactions.push('selected-option');
            // Hide previous feedback when user changes selection (allows retry)
            const feedbackEl = document.getElementById('activityFeedback');
            if (feedbackEl.style.display === 'block') {
                feedbackEl.style.display = 'none';
            }
        });
    });
}

/**
 * Render Classification Activity
 */
function renderClassification(submission, container) {
    const classHTML = `
        <div class="activity-classification">
            <div class="classification-example">
                <p><strong>📌 Ejemplo:</strong></p>
                <blockquote>${submission.example}</blockquote>
            </div>
            <p class="activity-question"><strong>${submission.question}</strong></p>
            ${submission.hint ? `<p class="classification-hint">💡 ${submission.hint}</p>` : ''}
            <div class="classification-options">
                <button class="classification-btn" data-answer="function" type="button">
                    🔧 FUNCIÓN<br><small>(lo que hace)</small>
                </button>
                <button class="classification-btn" data-answer="condition" type="button">
                    📋 CONDICIÓN<br><small>(lo que necesita)</small>
                </button>
            </div>
        </div>
    `;
    container.innerHTML = classHTML;
    
    // Add click handlers
    const buttons = container.querySelectorAll('.classification-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove previous selection
            buttons.forEach(b => b.classList.remove('selected'));
            // Mark selected
            btn.classList.add('selected');
            // Track interaction
            STATE.activityInteractions[STATE.currentActivity].interactions.push('classified');
            // Hide previous feedback when user changes selection (allows retry)
            const feedbackEl = document.getElementById('activityFeedback');
            if (feedbackEl.style.display === 'block') {
                feedbackEl.style.display = 'none';
            }
            // Enable validation (show button if hidden)
            document.getElementById('validateActivityBtn').style.display = 'block';
        });
    });
}

/**
 * Render Checklist Activity
 */
function renderChecklist(submission, container) {
    const checkHTML = `
        <div class="activity-checklist">
            <p class="activity-question"><strong>${submission.question}</strong></p>
            <div class="checklist-items">
                ${submission.checklistItems.map((item, i) => `
                    <label class="checklist-item">
                        <input type="checkbox" value="${item.value}" data-index="${i}">
                        <span>${item.text}</span>
                    </label>
                `).join('')}
            </div>
        </div>
    `;
    container.innerHTML = checkHTML;
    
    // Show validate button
    document.getElementById('validateActivityBtn').style.display = 'block';
    
    // Track interactions
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            STATE.activityInteractions[STATE.currentActivity].interactions.push('checked-item');
            // Hide previous feedback when user changes selection (allows retry)
            const feedbackEl = document.getElementById('activityFeedback');
            if (feedbackEl.style.display === 'block') {
                feedbackEl.style.display = 'none';
            }
        });
    });
}

/**
 * Render Padlet Activity
 */
function renderPadlet(submission, container) {
    const hasEmbed = Boolean(submission.embedUrl);
    const padletUrl = submission.padletUrl || submission.embedUrl || 'https://padlet.com';
    const interactionKey = `nova-padlet-${submission.id}`;
    const interactionStored = localStorage.getItem(interactionKey) === '1';

    const padletHTML = `
        <div class="activity-padlet">
            ${submission.instructions ? `
                <div class="padlet-instructions">
                    <h4>📝 Instrucciones:</h4>
                    <ul>
                        ${submission.instructions.map(inst => `<li>${inst}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}

            <div class="padlet-actions">
                <button class="padlet-open-btn" id="openPadletBtn" type="button">
                    🌐 Abrir Padlet
                </button>
                <a class="padlet-fallback-btn" id="fallbackPadletBtn" href="${padletUrl}" target="_blank" rel="noopener">
                    ↗ Abrir Padlet en nueva ventana
                </a>
            </div>

            ${hasEmbed ? `
                <div class="padlet-embed" data-padlet-id="${submission.id}">
                    <iframe
                        src="${submission.embedUrl}"
                        title="${submission.toolLabel || 'Padlet'}"
                        loading="lazy"
                        allow="encrypted-media"
                        referrerpolicy="no-referrer-when-downgrade"
                        allowfullscreen
                    ></iframe>
                </div>
            ` : `
                <div class="padlet-placeholder">
                    <p><strong>🔧 Padlet no disponible para incrustar.</strong></p>
                    <p>Usa el botón "Abrir Padlet" para continuar.</p>
                </div>
            `}
        </div>
    `;
    container.innerHTML = padletHTML;

    const openBtn = container.querySelector('#openPadletBtn');
    const fallbackBtn = container.querySelector('#fallbackPadletBtn');
    const iframe = container.querySelector('.padlet-embed iframe');

    const registerPadletInteraction = (source) => {
        if (!STATE.activityInteractions[STATE.currentActivity]) {
            STATE.activityInteractions[STATE.currentActivity] = {
                opened: Date.now(),
                attempts: 0,
                interactions: []
            };
        }
        if (!STATE.activityInteractions[STATE.currentActivity].interactions.includes(source)) {
            STATE.activityInteractions[STATE.currentActivity].interactions.push(source);
        }

        if (localStorage.getItem(interactionKey) !== '1') {
            localStorage.setItem(interactionKey, '1');
            if (submission.padletOpenMessage) {
                showToastMessage(`💭 NOVA: "${submission.padletOpenMessage}"`, 4000);
            }
        }

        enableCompleteButton();
        showToastMessage('✅ Ahora puedes marcar la actividad como completada', 3000);
    };

    if (openBtn) {
        openBtn.addEventListener('click', () => {
            window.open(padletUrl, '_blank', 'noopener');
            registerPadletInteraction('opened-padlet');
        });
    }

    if (iframe) {
        const showFallback = () => {
            fallbackBtn?.classList.add('is-visible');
        };
        const hideFallback = () => {
            fallbackBtn?.classList.remove('is-visible');
        };

        let loadHandled = false;
        const loadTimer = setTimeout(() => {
            if (!loadHandled) {
                showFallback();
            }
        }, 3500);

        iframe.addEventListener('load', () => {
            loadHandled = true;
            clearTimeout(loadTimer);
            hideFallback();
        });

        iframe.addEventListener('error', () => {
            loadHandled = true;
            clearTimeout(loadTimer);
            showFallback();
        });

        iframe.addEventListener('focus', () => {
            registerPadletInteraction('padlet-focused');
        });

        iframe.addEventListener('pointerdown', () => {
            registerPadletInteraction('padlet-pointer');
        });
    } else if (fallbackBtn) {
        fallbackBtn.classList.add('is-visible');
    }

    if (interactionStored) {
        enableCompleteButton();
    }
}

/**
 * Render Confirmation Activity
 */
function renderConfirmation(submission, container) {
    const confirmHTML = `
        <div class="activity-confirmation">
            <p class="activity-question"><strong>${submission.question}</strong></p>
            <button class="confirm-btn" id="confirmActionBtn" type="button">
                ✅ ${submission.confirmText}
            </button>
        </div>
    `;
    container.innerHTML = confirmHTML;
    
    document.getElementById('confirmActionBtn').addEventListener('click', () => {
        STATE.activityInteractions[STATE.currentActivity].interactions.push('confirmed');
        enableCompleteButton();
        showFeedback('correct', submission.feedback.correct);
    });
}

/**
 * Render Verification Activity
 */
function renderVerification(submission, container) {
    const verifyHTML = `
        <div class="activity-verification">
            <p class="activity-question"><strong>${submission.question}</strong></p>
            <button class="verify-btn" id="verifyBtn" type="button">
                ✓ Sí, verifico
            </button>
        </div>
    `;
    container.innerHTML = verifyHTML;
    
    document.getElementById('verifyBtn').addEventListener('click', () => {
        STATE.activityInteractions[STATE.currentActivity].interactions.push('verified');
        enableCompleteButton();
        showFeedback('correct', submission.feedback.correct);
    });
}

/**
 * Render Action Activity (e.g., Despegue)
 */
function renderAction(submission, container) {
    // Check if previous required
    let canProceed = true;
    if (submission.requiresPrevious) {
        canProceed = STATE.completedMissions.includes(submission.requiresPrevious);
    }
    
    const actionHTML = `
        <div class="activity-action">
            <p class="activity-question"><strong>${submission.question}</strong></p>
            ${!canProceed ? `
                <p class="action-warning">⚠️ Completa la actividad anterior primero (Verificar sistema)</p>
            ` : ''}
            <button class="action-btn ${!canProceed ? 'disabled' : ''}" id="actionBtn" type="button" ${!canProceed ? 'disabled' : ''}>
                ${submission.actionLabel}
            </button>
        </div>
    `;
    container.innerHTML = actionHTML;
    
    if (canProceed) {
        document.getElementById('actionBtn').addEventListener('click', () => {
            STATE.activityInteractions[STATE.currentActivity].interactions.push('action-executed');
            enableCompleteButton();
            showFeedback('correct', submission.feedback.correct);
        });
    }
}

/**
 * Render Celebration Activity
 */
function renderCelebration(submission, container) {
    const celebHTML = `
        <div class="activity-celebration">
            <div class="celebration-content">
                <div class="celebration-emoji">🎉</div>
                <h3>¡Misión Cumplida!</h3>
                <p>Has completado todas las actividades.</p>
                <p><strong>🏆 Puntos totales: ${STATE.rewards + 10}</strong></p>
                <p>💭 NOVA: "${submission.novaMessage}"</p>
            </div>
        </div>
    `;
    container.innerHTML = celebHTML;
    
    // Auto-enable complete button
    setTimeout(() => {
        enableCompleteButton();
    }, 1000);
}

/**
 * Validate Activity (for quizzes, classifications, checklists)
 */
function validateActivity(submissionId) {
    const missionId = parseInt(submissionId.charAt(0));
    const mission = MISSIONS[missionId];
    const submission = mission.submissions.find(s => s.id === submissionId);
    
    if (!STATE.activityInteractions[submissionId]) {
        STATE.activityInteractions[submissionId] = {
            opened: Date.now(),
            attempts: 0,
            interactions: []
        };
    }
    
    STATE.activityInteractions[submissionId].attempts++;
    
    let result = { isValid: false, isCorrect: false, message: '' };
    
    switch (submission.toolType) {
        case 'quiz':
            result = validateQuiz(submission);
            break;
        case 'classification':
            result = validateClassification(submission);
            break;
        case 'checklist':
            result = validateChecklist(submission);
            break;
    }
    
    // Show feedback
    if (!result.isValid) {
        // User hasn't selected anything yet
        showFeedback('incorrect', result.message);
        return;
    }
    
    // Show result feedback
    showFeedback(result.isCorrect ? 'correct' : 'incorrect', result.message);
    
    if (result.isCorrect) {
        enableCompleteButton();
    }
}

/**
 * Validate Quiz
 */
function validateQuiz(submission) {
    const selected = document.querySelector('input[name="quiz-answer"]:checked');
    if (!selected) {
        return { isValid: false, message: 'Por favor selecciona una opción.' };
    }
    const isCorrect = selected.dataset.correct === 'true';
    return { 
        isValid: true, 
        isCorrect: isCorrect, 
        message: isCorrect ? submission.feedback.correct : submission.feedback.incorrect 
    };
}

/**
 * Validate Classification
 */
function validateClassification(submission) {
    const selected = document.querySelector('.classification-btn.selected');
    if (!selected) {
        return { isValid: false, message: 'Por favor selecciona una clasificación.' };
    }
    const isCorrect = selected.dataset.answer === submission.correctAnswer;
    return { 
        isValid: true, 
        isCorrect: isCorrect, 
        message: isCorrect ? submission.explanation.correct : submission.explanation.incorrect 
    };
}

/**
 * Validate Checklist
 */
function validateChecklist(submission) {
    const checked = document.querySelectorAll('.checklist-items input[type="checkbox"]:checked');
    // For simplicity: require at least 2 checked (or as defined in successCondition)
    const minRequired = 2;
    const isCorrect = checked.length >= minRequired;
    return { 
        isValid: true, 
        isCorrect: isCorrect, 
        message: isCorrect ? submission.feedback.correct : submission.feedback.incorrect 
    };
}

/**
 * Show Feedback
 */
function showFeedback(type, message) {
    const feedbackEl = document.getElementById('activityFeedback');
    const feedbackText = document.getElementById('activityFeedbackText');
    
    feedbackEl.className = 'activity-feedback';
    feedbackEl.classList.add(type === 'correct' ? 'feedback-correct' : 'feedback-incorrect');
    feedbackText.textContent = message;
    feedbackEl.style.display = 'block';
    
    // Scroll to feedback
    setTimeout(() => {
        feedbackEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

/**
 * Enable Complete Button
 */
function enableCompleteButton() {
    const btn = document.getElementById('completeActivityBtn');
    btn.disabled = false;
    btn.classList.add('enabled');
}

/**
 * Complete Activity from Modal
 */
function completeActivityFromModal(submissionId) {
    const activityModal = document.getElementById('activityModal');
    const missionId = parseInt(submissionId.charAt(0));
    const mission = MISSIONS[missionId];
    const submission = mission.submissions.find(s => s.id === submissionId);
    
    if (!STATE.completedMissions.includes(submissionId)) {
        STATE.completedMissions.push(submissionId);
        STATE.rewards += 10;
        
        // Save interaction data
        STATE.activityInteractions[submissionId].completed = Date.now();
        
        // Visual feedback
        showToastMessage(`✅ ¡Completado!\n📍 ${submission.name}\n🏆 +10 puntos`, 4000);
        
        // NOVA message
        if (submission.novaMessage) {
            setTimeout(() => {
                showToastMessage(`💭 NOVA: "${submission.novaMessage}"`, 4000);
            }, 2000);
        }
        
        // Progress messages
        if (!STATE.firstSubmissionShown && STATE.completedMissions.length === 1) {
            STATE.firstSubmissionShown = true;
            setTimeout(() => showProgressMessage('firstSubmission'), 3000);
        }
        
        if (STATE.completedMissions.length % 3 === 0) {
            setTimeout(() => showProgressMessage('missionComplete'), 3500);
        }
        
        // Update inbox with progress messages
        updateMessageInboxOnProgress();
        
        saveStateToStorage();
        updateUI();
        updateNOVAMessage();
        
        // Update the activity item UI immediately to show completion check
        updateActivityItemUI(submissionId, missionId);
        
        closeModal(activityModal);
        closeSubmenu();
        STATE.currentActivity = null;
        
        // Restart auto-messages
        startAutoMessages();
        
        // Check final completion
        checkFinalCompletion();
        return;
    }

    closeModal(activityModal);
    closeSubmenu();
    STATE.currentActivity = null;
    showToastMessage('✓ Esta actividad ya estaba completada', 2000);
}

/**
 * ============================================
 * END OF ACTIVITY ENGINE
 * ============================================
 */

/**
 * Close Submenu
 */

document.getElementById('closeSubmenu').addEventListener('click', closeSubmenu);

/**
 * Complete Submission - Enhanced with pedagogical feedback
 */
function completeSubmission(submissionId, submissionName) {
    if (!STATE.completedMissions.includes(submissionId)) {
        STATE.completedMissions.push(submissionId);
        STATE.rewards += 10;
        
        // Check for special missions (Padlet integration)
        if (submissionId === '5a') {
            handlePadletMission();
            return;
        }
        
        // Visual feedback with contextual messaging
        const missionNumber = parseInt(submissionId.charAt(0));
        const mission = MISSIONS[missionNumber];
        const phase = mission.phase;
        
        alert(`✅ ¡Completado!\n📍 ${submissionName}\n🏆 +10 puntos\n\n💭 NOVA: "${getCompletionMessage(phase)}"`);
        
        // Check if all activities in this mission are completed
        const missionComplete = mission.submissions.every(sub => 
            STATE.completedMissions.includes(sub.id)
        );
        
        if (missionComplete) {
            // Award medal for mission completion
            awardMedal(missionNumber);
            
            // Check if all missions are complete
            if (STATE.earnedMedals.length === 4) {
                setTimeout(() => {
                    awardTrophy();
                }, 1000);
            }
            
            // Update mission buttons to reflect new lock status
            setupMissionButtons();
        }
        
        // PROGRESS-TRIGGERED MESSAGES
        // First submission ever
        if (!STATE.firstSubmissionShown && STATE.completedMissions.length === 1) {
            STATE.firstSubmissionShown = true;
            setTimeout(() => showProgressMessage('firstSubmission'), 1500);
        }
        
        // Mission completed (every 3 submissions)
        if (STATE.completedMissions.length % 3 === 0) {
            setTimeout(() => showProgressMessage('missionComplete'), 1500);
        }
        
        // Update inbox with progress messages
        updateMessageInboxOnProgress();
        
        saveStateToStorage();
        updateUI();
        updateNOVAMessage();
        closeSubmenu();
        
        // Restart auto-messages with new context (phase may have changed)
        startAutoMessages();
        
        // Check if mission 6 is complete (final celebration)
        checkFinalCompletion();
    } else {
        alert('✓ Ya completaste esta actividad');
    }
}

/**
 * Get contextual completion message based on phase
 */
function getCompletionMessage(phase) {
    const messages = {
        activation: "Gracias por responder mi llamada.",
        exploration: "Ahora entiendes mi situación.",
        understanding: "Estás aprendiendo cómo funciono.",
        application: "¡Mi sistema se está reparando!",
        collaborative: "Juntos podemos lograrlo.",
        closure: "¡Estoy operativa al 100%! Gracias por restaurar la Torre."
    };
    return messages[phase] || "Progreso registrado.";
}

/**
 * Handle Padlet collaborative mission
 */
function handlePadletMission() {
    const userConfirm = confirm(
        "🚀 MISIÓN COLABORATIVA\n\n" +
        "Se abrirá el Padlet de tu clase.\n" +
        "Contribuye con tus ideas para la restauración de la Torre Stark.\n\n" + //Changed from NOVA reference
        "¿Abrir Padlet ahora?"
    );
    
    if (userConfirm) {
        // Open Padlet (placeholder URL - teacher will configure)
        // window.open('https://padlet.com/tu-clase', '_blank');
        
        // Mark as complete
        STATE.completedMissions.push('5a');
        STATE.rewards += 10;
        
        alert("✅ ¡Misión colaborativa activada!\n🏆 +10 puntos\n\n💭 Recuerda compartir tus ideas en el Padlet.");
        
        saveStateToStorage();
        updateUI();
        updateNOVAMessage();
        closeSubmenu();
    }
}

/**
 * Check if all missions are complete and show final screen
 */
function checkFinalCompletion() {
    const completedMissionsCount = Math.floor(STATE.completedMissions.length / 3);
    
    // Check if mission 6 is fully complete
    const mission6Complete = ['6a', '6b', '6c'].every(id => STATE.completedMissions.includes(id));
    
    if (mission6Complete && !STATE.showedFinalScreen) {
        STATE.showedFinalScreen = true;
        saveStateToStorage();
        
        // Show special "all complete" toast message
        setTimeout(() => showProgressMessage('allComplete'), 1000);
        
        // Show final celebration modal
        setTimeout(() => showFinalCelebration(), 2500);
    }
}

/**
 * Show final celebration screen
 */
function showFinalCelebration() {
    // Record end timestamp
    window.gameEndTime = new Date().toISOString();
    window.gameEndTimestamp = Date.now();
    window.currentRewards = STATE.rewards;
    
    // Update celebration modal with actual data
    document.getElementById('finalMissions').textContent = '6';
    document.getElementById('finalPoints').textContent = STATE.rewards;
    document.getElementById('finalAccuracy').textContent = '100%';
    
    // Populate certificate with timestamps
    populateCertificate();
    
    // Show celebration modal
    const modal = document.getElementById('celebrationModal');
    openModal(modal);
    
    // Optional: Play a small animation or sound effect
    addMessageToInbox('🎉 Sistema restaurado. Medalla desbloqueada: MAESTRO DEL SISTEMA', '🏅');
}

/**
 * Scroll to Submenu
 */
function scrollToSubmenu() {
    const submenu = document.getElementById('submenu');
    setTimeout(() => {
        submenu.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

/**
 * Update UI - Mission Badges, Counters, and Progress
 */
function updateUI() {
    // Keep rewards in sync with actual mission completion
    syncRewardsFromProgress();

    // Update mission counters
    const completedMissionsCount = Math.floor(STATE.completedMissions.length / 3);
    document.getElementById('missionCount').textContent = completedMissionsCount;
    document.getElementById('rewardsCount').textContent = STATE.rewards;
    
    // Update system percentage in info box
    const progressPercent = Math.round((completedMissionsCount / 6) * 100);
    updateSystemProgress(progressPercent);
    
    // Update mission badges using proper completion check
    for (let i = 1; i <= 6; i++) {
        const badge = document.getElementById(`badge-${i}`);
        if (badge) {
            if (isMissionFullyCompleted(i)) {
                badge.textContent = '✓';
                badge.classList.add('completed');
                badge.parentElement.setAttribute('aria-label', `Misión ${i} completada`);
            } else {
                badge.textContent = '○';
                badge.classList.remove('completed');
                badge.parentElement.setAttribute('aria-label', `Misión ${i}`);
            }
        }
    }
    
    // Update current phase
    updateCurrentPhase();

    // Update medals and trophy visibility/state
    updateHeaderMedalDisplay();

    // Sync NOVA mood with overall progress
    updateNovaMoodFromProgress();
}

/**
 * Update current learning phase based on progress
 */
function updateCurrentPhase() {
    const completedMissionsCount = Math.floor(STATE.completedMissions.length / 3);
    const oldPhase = STATE.currentPhase;
    
    const phases = ['activation', 'exploration', 'understanding', 'application', 'collaborative', 'closure'];
    
    if (completedMissionsCount < 6) {
        STATE.currentPhase = phases[completedMissionsCount] || 'activation';
    } else {
        STATE.currentPhase = 'closure';
    }
    
    // Update inbox when phase changes
    if (oldPhase !== STATE.currentPhase) {
        initializeMessageInboxForPhase();
    }
}

/**
 * Update NOVA message in info box based on current phase
 */
function updateJARVISMessage() {
    const stateInfo = document.querySelector('.info-item:nth-child(4)');
    if (stateInfo) {
        const message = JARVIS_MESSAGES[STATE.currentPhase] || JARVIS_MESSAGES.default;
        stateInfo.innerHTML = `<span class="info-label">💭</span> ${message}`;
    }
}

/**
 * Setup Progress Indicator
 */
function setupProgressIndicator() {
    // Progress indicator is handled by the info box system percentage
    // Additional visual feedback can be added here if needed
}

/**
 * State Persistence - Enhanced for new tracking
 */
function saveStateToStorage() {
    localStorage.setItem('novaGameState', JSON.stringify(STATE));
}

function loadStateFromStorage() {
    const saved = localStorage.getItem('novaGameState');
    if (saved) {
        const loaded = JSON.parse(saved);
        STATE.completedMissions = loaded.completedMissions || [];
        STATE.earnedMedals = loaded.earnedMedals || [];
        STATE.trophyEarned = loaded.trophyEarned || false;
        STATE.rewards = loaded.rewards || 0;
        STATE.currentPhase = loaded.currentPhase || 'activation';
        STATE.showedFinalScreen = loaded.showedFinalScreen || false;
        STATE.messagesMuted = loaded.messagesMuted || false;
        STATE.lastMessageIndex = loaded.lastMessageIndex || 0;
        STATE.firstSubmissionShown = loaded.firstSubmissionShown || false;
        STATE.activityInteractions = loaded.activityInteractions || {};
        STATE.readingMode = loaded.readingMode || false;
    }
}

/**
 * Keyboard Navigation Enhancement
 */
function setupKeyboardNavigation() {
    // Allow Enter/Space on menu buttons
    document.querySelectorAll('.menu-button').forEach(button => {
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });
}

/**
 * Touch Enhancement for Mobile
 */
function setupTouchEnhancements() {
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('touchstart', () => {
            button.style.opacity = '0.8';
        });
        button.addEventListener('touchend', () => {
            button.style.opacity = '1';
        });
    });
}

/**
 * Initialize Flip Cards for Concepts
 * Enables interactive flip cards that reveal real-life examples
 */
function initializeFlipCards() {
    const conceptCards = document.querySelectorAll('.concept-card');
    
    conceptCards.forEach(card => {
        // Add click handler for flip interaction
        card.addEventListener('click', (e) => {
            // Prevent event bubbling if clicking on interactive elements
            if (e.target.closest('button') || e.target.closest('a')) {
                return;
            }
            card.classList.toggle('flipped');
        });
        
        // Add keyboard handler for accessibility
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.classList.toggle('flipped');
            }
        });
        
        // Announce flip action to screen readers
        card.addEventListener('click', () => {
            const isFlipped = card.classList.contains('flipped');
            const announcement = isFlipped 
                ? 'Mostrando ejemplos reales' 
                : 'Mostrando definición del concepto';
            announceToScreenReader(announcement);
        });
    });
    
    console.log('✅ Flip cards initialized:', conceptCards.length, 'concepts');
}

/**
 * Announce text to screen readers
 */
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => announcement.remove(), 1000);
}

/**
 * Initialize on DOM Ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Only setup welcome screen here
        // Game initialization happens after user clicks "Begin Mission"
        setupWelcomeScreen();
    });
} else {
    setupWelcomeScreen();
}

/**
 * Cleanup on Page Unload
 */
window.addEventListener('beforeunload', () => {
    saveStateToStorage();
    if (window.characterAnimationInterval) {
        clearTimeout(window.characterAnimationInterval);
    }
});
/**
 * WELCOME SCREEN FUNCTIONALITY
 * Handles the initial landing page before game starts
 */
function setupWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const gameContainer = document.getElementById('gameContainer');
    const startBtn = document.getElementById('startMissionBtn');
    const instructionsBtn = document.getElementById('instructionsBtn');
    const creditsBtn = document.getElementById('creditsBtn');
    const instructionsModal = document.getElementById('instructionsModal');
    const creditsModal = document.getElementById('creditsModal');
    const closeInstructionsBtn = document.getElementById('closeInstructions');
    const closeCreditsBtn = document.getElementById('closeCredits');

    if (!welcomeScreen || !startBtn) {
        console.warn('⚠️ Welcome screen elements not found');
        return;
    }

    // Start Mission Button
    startBtn.addEventListener('click', () => {
        console.log('🎮 Starting JARVIS Repair Mission...');
        
        // Record start timestamp
        window.gameStartTime = new Date().toISOString();
        window.gameStartTimestamp = Date.now();
        
        // Hide welcome screen, show game
        welcomeScreen.style.display = 'none';
        gameContainer.style.display = 'block';
        
        // Initialize game
        initializeGame();
        
        console.log('✅ Mission started at:', window.gameStartTime);
    });

    // Instructions Modal
    instructionsBtn.addEventListener('click', () => {
        console.log('📖 Opening instructions modal...');
        instructionsModal.classList.add('active');
        instructionsModal.setAttribute('aria-hidden', 'false');
    });

    closeInstructionsBtn.addEventListener('click', () => {
        console.log('✖️ Closing instructions modal...');
        instructionsModal.classList.remove('active');
        instructionsModal.setAttribute('aria-hidden', 'true');
    });

    // Credits Modal
    creditsBtn.addEventListener('click', () => {
        console.log('⭐ Opening credits modal...');
        creditsModal.classList.add('active');
        creditsModal.setAttribute('aria-hidden', 'false');
    });

    closeCreditsBtn.addEventListener('click', () => {
        console.log('✖️ Closing credits modal...');
        creditsModal.classList.remove('active');
        creditsModal.setAttribute('aria-hidden', 'true');
    });

    // Close on background click
    instructionsModal.addEventListener('click', (e) => {
        if (e.target === instructionsModal) {
            console.log('🖱️ Closing instructions modal (background click)...');
            instructionsModal.classList.remove('active');
            instructionsModal.setAttribute('aria-hidden', 'true');
        }
    });

    creditsModal.addEventListener('click', (e) => {
        if (e.target === creditsModal) {
            console.log('🖱️ Closing credits modal (background click)...');
            creditsModal.classList.remove('active');
            creditsModal.setAttribute('aria-hidden', 'true');
        }
    });

    console.log('✅ Welcome screen setup complete');
}

/**
 * Populate certificate with student data and timestamps
 */
function populateCertificate() {
    const now = new Date();
    const dateStr = now.toLocaleDateString('es-ES', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    const timeStr = now.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });

    // Calculate duration
    const durationMs = Date.now() - (window.gameStartTimestamp || Date.now());
    const durationMin = Math.floor(durationMs / 60000);
    const durationSec = Math.floor((durationMs % 60000) / 1000);

    // Update certificate
    const nameEl = document.getElementById('certificateName');
    if (nameEl) nameEl.textContent = 'Estudiante';
    
    const dateEl = document.getElementById('certificateDate');
    if (dateEl) dateEl.textContent = dateStr;
    
    const timeEl = document.getElementById('certificateTime');
    if (timeEl) timeEl.textContent = timeStr;
    
    const durationEl = document.getElementById('certificateDuration');
    if (durationEl) durationEl.textContent = `${durationMin}m ${durationSec}s`;
    
    const pointsEl = document.getElementById('certificatePoints');
    if (pointsEl) pointsEl.textContent = window.currentRewards || 0;
    
    const accuracyEl = document.getElementById('certificatePrecision');
    if (accuracyEl) accuracyEl.textContent = '100%';

    // Setup download button
    const downloadBtn = document.getElementById('downloadCertificateBtn');
    if (downloadBtn) {
        downloadBtn.removeEventListener('click', downloadCertificateHandler);
        downloadBtn.addEventListener('click', downloadCertificateHandler);
    }
}

/**
 * Download certificate handler
 */
window.downloadCertificateHandler = function() {
    const now = new Date();
    const printWindow = window.open('', '_blank');
    const dateStr = now.toLocaleDateString('es-ES', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    const timeStr = now.toLocaleTimeString('es-ES');
    const durationMs = Date.now() - (window.gameStartTimestamp || Date.now());
    const durationMin = Math.floor(durationMs / 60000);
    const durationSec = Math.floor((durationMs % 60000) / 1000);

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Certificado JARVIS</title>
            <style>
                body { font-family: Georgia, serif; padding: 2rem; background: #f5f5f5; }
                .certificate { max-width: 800px; margin: 0 auto; background: linear-gradient(135deg, #f5e6d3 0%, #ffe8c6 100%); border: 4px solid #8b7355; border-radius: 20px; padding: 2rem; box-shadow: 0 8px 30px rgba(0,0,0,0.2); text-align: center; }
                .cert-header { font-size: 1.5rem; color: #8b4513; margin-bottom: 1.5rem; font-weight: bold; }
                .cert-title { font-size: 1.4rem; color: #8b4513; margin: 1rem 0; text-decoration: underline; }
                .cert-body { color: #5a4a3a; line-height: 1.8; margin: 1rem 0; }
                .cert-details { margin: 1.5rem 0; }
                .cert-item { margin: 0.5rem 0; }
                .cert-label { font-weight: 600; color: #8b4513; }
                .cert-value { color: #5a4a3a; }
                .cert-footer { margin-top: 2rem; border-top: 2px solid #8b7355; padding-top: 1rem; }
            </style>
        </head>
        <body>
            <div class="certificate">
                <div class="cert-header">🏆 CERTIFICADO DE FINALIZACIÓN</div>
                <p class="cert-body">Ha completado exitosamente:</p>
                <p class="cert-title">Reparación del Sistema JARVIS</p>
                <p style="font-style: italic; color: #a0522d;">Especificación de Requerimientos de Software</p>
                <div class="cert-details">
                    <div class="cert-item">
                        <span class="cert-label">📅 Fecha:</span>
                        <span class="cert-value">${dateStr}</span>
                    </div>
                    <div class="cert-item">
                        <span class="cert-label">🕐 Hora:</span>
                        <span class="cert-value">${timeStr}</span>
                    </div>
                    <div class="cert-item">
                        <span class="cert-label">⏱️ Duración:</span>
                        <span class="cert-value">${durationMin}m ${durationSec}s</span>
                    </div>
                </div>
                <p style="font-size: 0.9rem;">Completado el ${new Date().toLocaleString('es-ES')}</p>
                <div class="cert-footer">
                    <p style="margin: 0; font-weight: 600;">Prof. Marcos Argandoña</p>
                    <p style="margin: 0;">Ingeniero Informático</p>
                </div>
            </div>
        </body>
        </html>
    `);
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); }, 250);
};

// Initialize welcome screen when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupWelcomeScreen);
} else {
    setupWelcomeScreen();
}