/**
 * NOVA Game - Interactive Educational Game
 * Character animation, modals, and mission management
 * 
 * PEDAGOGICAL ITINERARY (30-minute classroom session)
 * Aligned with constructivist learning theory
 */

/**
 * Audio Service - Simple Text-to-Speech using Web Speech API
 */
class AudioService {
    constructor() {
        this.speechSynthesis = window.speechSynthesis;
        this.SpeechSynthesisUtterance = window.SpeechSynthesisUtterance || window.webkitSpeechSynthesisUtterance;
        this.isPlaying = false;
        this.currentUtterance = null;
        
        console.log('🎵 AudioService initialized');
    }
    
    speak(text) {
        if (!this.speechSynthesis || !this.SpeechSynthesisUtterance) {
            console.error('❌ Web Speech API not supported');
            return false;
        }
        
        if (!text || text.trim().length === 0) {
            console.warn('⚠️ Empty text');
            return false;
        }
        
        try {
            // Cancel any ongoing speech
            this.speechSynthesis.cancel();
            
            // Create utterance
            this.currentUtterance = new this.SpeechSynthesisUtterance(text);
            this.currentUtterance.lang = 'es-ES';
            this.currentUtterance.rate = 1.0;
            this.currentUtterance.pitch = 1.0;
            this.currentUtterance.volume = 1.0;
            
            // Handle end event
            this.currentUtterance.onend = () => {
                this.isPlaying = false;
                console.log('🏁 Speech finished');
            };
            
            this.currentUtterance.onerror = (event) => {
                console.error('❌ Speech error:', event.error);
                this.isPlaying = false;
            };
            
            // Speak
            this.isPlaying = true;
            this.speechSynthesis.speak(this.currentUtterance);
            console.log('🎵 Speaking:', text.substring(0, 50) + '...');
            
            return true;
        } catch (error) {
            console.error('❌ Error in speak():', error);
            return false;
        }
    }
    
    stop() {
        if (this.speechSynthesis) {
            this.speechSynthesis.cancel();
            this.isPlaying = false;
            console.log('⏹️ Speech stopped');
        }
    }
    
    isPlaying_status() {
        return this.isPlaying;
    }
}

// Initialize Global Audio Service
const audioService = new AudioService();

// Mission Data - Expanded with Activity Metadata
const MISSIONS = {
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

// Dynamic NOVA messages based on learning phase
const NOVA_MESSAGES = {
    activation: "Nueva señal detectada… necesito ayuda.",
    exploration: "Mi nave no está dañada… mi sistema está incompleto.",
    understanding: "Funciones me permiten actuar. Condiciones me permiten existir.",
    application: "Tu decisión repara mi sistema.",
    collaborative: "Necesito tu ayuda final para despegar.",
    closure: "Sistema restaurado. Preparando lanzamiento.",
    default: "Analizando sistemas..."
};

// Auto-toast message variations (for periodic display)
// These rotate automatically every 20-30 seconds
const AUTO_TOAST_MESSAGES = {
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

// Progress-triggered special messages
const PROGRESS_MESSAGES = {
    firstSubmission: "✅ Primer avance logrado. +10 puntos. Seguimos.",
    missionComplete: "⭐ Misión completada. Tu ayuda fue clave.",
    allComplete: "🎉 ¡Sistema restaurado al 100%! Despegue inminente."
};

/**
 * Contextual Messages by Phase and Progress
 * Shows messages that evolve with the student's learning journey
 * @type {Object.<string, Array>}
 */
const CONTEXTUAL_MESSAGES_BY_PHASE = {
    activation: [
        "🌟 Soy NOVA, una IA varada en órbita terrestre.",
        "📡 Mi nave está intacta, pero mi sistema no funciona.",
        "❓ ¿Puedes ayudarme a entender qué me falta?",
        "💡 Tal vez tú sepas qué necesito para volver a casa."
    ],
    exploration: [
        "🔍 Veo que estás investigando mi problema.",
        "⚙️ Mi nave tiene funciones, pero le faltan condiciones.",
        "📋 Sin requerimientos claros, cualquier sistema falla.",
        "🚨 Necesito que identifiques qué me hace falta."
    ],
    understanding: [
        "✅ ¡Ahora lo entiendes! Hay funciones y condiciones.",
        "🧠 Una función es lo que hago. Una condición es lo que necesito.",
        "🔗 Los dos conceptos están conectados en todo software.",
        "💪 Estás progresando. Sigue así."
    ],
    application: [
        "🎯 Ahora debes clasificar qué es función y qué es condición.",
        "🔧 Cada clasificación correcta me acerca al despegue.",
        "⚡ Tu decisión repara mi sistema.",
        "🌠 Casi lo logras. Un poco más."
    ],
    collaborative: [
        "🤝 Necesito tu ayuda final para despegar.",
        "👥 La colaboración en software es clave.",
        "🎪 Todos los sistemas dependen de trabajo en equipo.",
        "🚀 Juntos podemos lograrlo."
    ],
    closure: [
        "✨ Mi sistema está restaurado.",
        "🎉 ¡Gracias por tu ayuda, estudiante!",
        "🌌 Estoy lista para viajar de regreso.",
        "👋 Nunca olvidaré lo que aprendiste conmigo."
    ]
};

// State Management - Enhanced for pedagogical tracking
const STATE = {
    completedMissions: [],
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
        addMessageToInbox("🚀 ¡DESPEGUE! Sistema restaurado al 100%.", '🎉');
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
    loadStateFromStorage();
    setupNovaSpriteSystem();
    updateUI();
    updateNOVAMessage(); // Display contextual message
    setupProgressIndicator();
    initializeMessageInboxForPhase(); // Initialize inbox with contextual messages
    startAutoMessages();          // Start automatic message rotation
}

/**
 * NOVA Sprite System - Moods and blink animation
 */
const NOVA_SPRITES = {
    neutral: {
        frames: ['assets/nova/nova1.png', 'assets/nova/nova2.png'],
        alt: 'NOVA neutral'
    },
    pensativo: {
        frames: ['assets/nova/pensativo1.png', 'assets/nova/pensativo2.png'],
        alt: 'NOVA pensativo'
    },
    preocupado: {
        frames: ['assets/nova/preocupado1.png', 'assets/nova/preocupado2.png'],
        alt: 'NOVA preocupado'
    },
    feliz: {
        frames: ['assets/nova/feliz1.png', 'assets/nova/feliz2.png'],
        alt: 'NOVA feliz'
    },
    celebrando: {
        frames: ['assets/nova/celebrando1.png', 'assets/nova/celebrando2.png'],
        alt: 'NOVA celebrando'
    }
};

const NOVA_MISSION_MOOD = {
    1: 'neutral',
    2: 'pensativo',
    3: 'pensativo',
    4: 'preocupado',
    5: 'feliz',
    6: 'celebrando'
};

const novaSpriteState = {
    mood: 'neutral',
    blinkTimeoutId: null,
    isBlinking: false,
    preloaded: false
};

function setupNovaSpriteSystem() {
    const sprite = document.getElementById('novaSprite');
    if (!sprite) return;

    preloadNovaSprites();
    sprite.dataset.src = sprite.getAttribute('src') || '';
    updateNovaMoodFromProgress();
    scheduleNovaBlink(true);
}

function preloadNovaSprites() {
    if (novaSpriteState.preloaded) return;
    Object.values(NOVA_SPRITES).forEach((mood) => {
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
    if (!NOVA_SPRITES[mood]) return;
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
    const completedMissionsCount = Math.floor(STATE.completedMissions.length / 3);
    const missionId = Math.min(completedMissionsCount + 1, 6);
    setNovaMoodByMission(missionId);
}

function updateNovaSpriteAlt(mood) {
    const sprite = document.getElementById('novaSprite');
    if (!sprite) return;
    sprite.alt = NOVA_SPRITES[mood].alt || 'NOVA';
}

function updateNovaSpriteFrame(frameIndex, withFade) {
    const sprite = document.getElementById('novaSprite');
    if (!sprite) return;

    const frames = NOVA_SPRITES[novaSpriteState.mood]?.frames || [];
    const frameSrc = frames[frameIndex];
    if (!frameSrc) return;
    if (sprite.dataset.src === frameSrc) return;

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

    const delay = 2000 + Math.random() * 2000;
    novaSpriteState.blinkTimeoutId = setTimeout(() => {
        runNovaBlink();
    }, delay);
}

function runNovaBlink() {
    if (novaSpriteState.isBlinking) return;
    novaSpriteState.isBlinking = true;

    updateNovaSpriteFrame(1, false);
    setTimeout(() => {
        updateNovaSpriteFrame(0, false);
        novaSpriteState.isBlinking = false;
        scheduleNovaBlink(false);
    }, 120);
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
            
            console.log('🖱️ Story audio button clicked');
            
            const storyText = document.querySelector('#storyModal .modal-text');
            if (storyText) {
                const isPlaying = audioService.isPlaying_status();
                
                if (isPlaying) {
                    audioService.stop();
                    storyAudioBtn.textContent = '🔊 Escuchar';
                } else {
                    // Extract clean text
                    const clone = storyText.cloneNode(true);
                    clone.querySelectorAll('script, style').forEach(el => el.remove());
                    const text = clone.textContent.replace(/\s+/g, ' ').trim();
                    
                    console.log('📝 Text length:', text.length);
                    audioService.speak(text);
                    storyAudioBtn.textContent = '⏹️ Detener';
                    
                    // Reset button text when finished
                    setTimeout(() => {
                        if (!audioService.isPlaying_status()) {
                            storyAudioBtn.textContent = '🔊 Escuchar';
                        }
                    }, 100);
                }
            }
        });
    }
    
    // Audio Button - Concepts Modal
    const conceptsAudioBtn = document.querySelector('#conceptsModal .audio-btn-concepts');
    if (conceptsAudioBtn) {
        conceptsAudioBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🖱️ Concepts audio button clicked');
            
            const conceptsText = document.querySelector('#conceptsModal .modal-text');
            if (conceptsText) {
                const isPlaying = audioService.isPlaying_status();
                
                if (isPlaying) {
                    audioService.stop();
                    conceptsAudioBtn.textContent = '🔊 Escuchar';
                } else {
                    // Extract clean text
                    const clone = conceptsText.cloneNode(true);
                    clone.querySelectorAll('script, style').forEach(el => el.remove());
                    const text = clone.textContent.replace(/\s+/g, ' ').trim();
                    
                    console.log('📝 Text length:', text.length);
                    audioService.speak(text);
                    conceptsAudioBtn.textContent = '⏹️ Detener';
                    
                    // Reset button text when finished
                    setTimeout(() => {
                        if (!audioService.isPlaying_status()) {
                            conceptsAudioBtn.textContent = '🔊 Escuchar';
                        }
                    }, 100);
                }
            }
        });
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
 * Mission Menu Setup
 */
function setupMissionButtons() {
    // Mission buttons - now with accordion behavior
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`mission-${i}-btn`).addEventListener('click', () => {
            toggleMissionAccordion(i);
        });
    }
}

/**
 * Toggle Mission Accordion
 */
function toggleMissionAccordion(missionId) {
    const mission = MISSIONS[missionId];
    const panel = document.getElementById(`mission-${missionId}-panel`);
    const button = document.getElementById(`mission-${missionId}-btn`);
    const activitiesContainer = document.getElementById(`mission-${missionId}-activities`);
    
    // Check if this panel is already open
    const isOpen = panel.classList.contains('active');
    
    // Close all other panels
    for (let i = 1; i <= 6; i++) {
        const otherPanel = document.getElementById(`mission-${i}-panel`);
        const otherButton = document.getElementById(`mission-${i}-btn`);
        if (otherPanel && otherButton) {
            otherPanel.classList.remove('active');
            otherButton.classList.remove('active');
        }
    }
    
    // If it wasn't open, open this panel
    if (!isOpen) {
        panel.classList.add('active');
        button.classList.add('active');

        setNovaMoodByMission(missionId);
        
        // Populate activities if empty or refresh
        populateMissionActivities(missionId, mission, activitiesContainer);
        
        // Smooth scroll to the opened mission
        setTimeout(() => {
            button.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
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
        
        // Close modal and submenu
        const activityModal = document.getElementById('activityModal');
        closeModal(activityModal);
        closeSubmenu();
        
        // Restart auto-messages
        startAutoMessages();
        
        // Check final completion
        checkFinalCompletion();
    }
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
        closure: "¡Estoy lista para despegar!"
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
        "Contribuye con tus ideas para el lanzamiento de NOVA.\n\n" +
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
    // Update celebration modal with actual data
    document.getElementById('finalMissions').textContent = '6';
    document.getElementById('finalPoints').textContent = STATE.rewards;
    
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
    // Update mission counters
    const completedMissionsCount = Math.floor(STATE.completedMissions.length / 3);
    document.getElementById('missionCount').textContent = completedMissionsCount;
    document.getElementById('rewardsCount').textContent = STATE.rewards;
    
    // Update system percentage in info box
    const progressPercent = Math.round((completedMissionsCount / 6) * 100);
    updateSystemProgress(progressPercent);
    
    // Update mission badges
    const completedByType = {};
    STATE.completedMissions.forEach(subId => {
        const type = subId.charAt(0);
        completedByType[type] = (completedByType[type] || 0) + 1;
    });
    
    for (let i = 1; i <= 6; i++) {
        const badge = document.getElementById(`badge-${i}`);
        if (completedByType[i] && completedByType[i] === 3) {
            badge.textContent = '✓';
            badge.classList.add('completed');
            badge.parentElement.setAttribute('aria-label', `Misión ${i} completada`);
        }
    }
    
    // Update current phase
    updateCurrentPhase();

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
function updateNOVAMessage() {
    const stateInfo = document.querySelector('.info-item:nth-child(4)');
    if (stateInfo) {
        const message = NOVA_MESSAGES[STATE.currentPhase] || NOVA_MESSAGES.default;
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
 * Initialize on DOM Ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initApp();
        setupKeyboardNavigation();
        setupTouchEnhancements();
    });
} else {
    initApp();
    setupKeyboardNavigation();
    setupTouchEnhancements();
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
