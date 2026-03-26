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
    0: {
        title: 'Fase 0: System Diagnosis',
        description: 'Alerta crítica: sin diagnóstico estructural, la Torre Stark no puede recuperar sus sistemas.',
        phase: 'diagnosis',
        instructions: '🧭 Protocolo de emergencia: ejecuta el diagnóstico base para reconstruir el mapa mental de JARVIS.',
        narrativeBeats: [
            '🔴 Estado del sistema: JARVIS perdió dominio, límites y criterios de requerimientos.',
            '⚠️ Riesgo activo: decisiones sin contexto pueden agravar la caída operativa.',
            '🛠️ Objetivo de fase: restaurar comprensión antes de intentar reparar funciones.',
            '🔓 Al completar esta fase se habilita la recuperación progresiva de Stark Industries.'
        ],
        submissions: [
            {
                id: '0a',
                name: 'Mentimeter: Diagnóstico Inicial',
                toolType: 'mentimeter',
                learningGoal: 'Explorar ideas previas sobre dominio, límites y requerimientos',
                udlHints: ['Participa con una idea clara', 'Escucha respuestas de tus compañeros'],
                successCondition: 'Registrar participación en Mentimeter',
                activityPrompt: 'Escaneo inicial: identifica señales de falla conceptual en tiempo real.',
                instructions: [
                    'Haz clic en "Abrir Mentimeter".',
                    'Ingresa el código de la actividad compartido por el docente.',
                    'Responde al menos una pregunta del diagnóstico.',
                    'Vuelve y presiona "Ya participé".'
                ],
                questionExamples: [
                    '¿Qué es el dominio de un sistema?',
                    '¿Qué ocurre si el límite del sistema es ambiguo?',
                    '¿Quién define los requerimientos de usuario?'
                ],
                mentimeterUrl: 'https://www.menti.com/alq9usss1qw7',
                feedback: {
                    correct: 'Excelente. Tu diagnóstico inicial quedó registrado.',
                    incorrect: 'Marca tu participación para continuar.'
                },
                novaMessage: 'No solo perdí mis condiciones... perdí por completo la comprensión de mi sistema. Ya no sé cuál es mi dominio, dónde empieza y termina mi sistema, qué restricciones me limitan, quiénes son mis usuarios ni qué debo hacer por ellos. Antes de reparar mis funciones, debemos reconstruir mi entendimiento.'
            },
            {
                id: '0b',
                name: 'Mini interacción: Reconstrucción Conceptual',
                toolType: 'kahoot',
                learningGoal: 'Comprender dominio, frontera, restricciones y diferencia usuario/sistema',
                udlHints: ['Lee cada definición y conéctala con la falla de JARVIS'],
                successCondition: 'Revisar y confirmar comprensión conceptual',
                activityPrompt: 'Prueba bajo presión: valida decisiones críticas del sistema.',
                instructions: [
                    'Haz clic en "Abrir Kahoot".',
                    'Ingresa el PIN 06527434 o abre el challenge indicado.',
                    'Responde todas las preguntas del bloque conceptual.',
                    'Vuelve y presiona "Ya participé".'
                ],
                kahootUrl: 'https://kahoot.it/challenge/06527434?challenge-id=d8760083-d46f-4c29-b088-030eded85ba0_1774249548621',
                kahootPin: '06527434',
                jarvisFailureContext: 'Ya no sé cuál es mi dominio, dónde empieza/termina mi sistema, qué restricciones me limitan, quiénes son mis usuarios y qué debo hacer por ellos.',
                definitions: [
                    {
                        concept: 'Dominio de aplicación',
                        definition: 'Contexto real del problema que el sistema resuelve (entorno, procesos y lenguaje del negocio).'
                    },
                    {
                        concept: 'Límite del sistema',
                        definition: 'Frontera que separa qué pertenece al sistema y qué queda fuera de él.'
                    },
                    {
                        concept: 'Restricciones del sistema',
                        definition: 'Condiciones técnicas, legales, de tiempo o recursos que limitan cómo se diseña o ejecuta.'
                    },
                    {
                        concept: 'Requerimientos de usuario',
                        definition: 'Necesidades y objetivos que las personas usuarias esperan resolver con el sistema.'
                    },
                    {
                        concept: 'Requerimientos del sistema',
                        definition: 'Especificaciones concretas y verificables que el sistema debe implementar para responder al usuario.'
                    }
                ],
                reflectionPrompt: 'Si JARVIS confunde el límite del sistema, podría intentar controlar procesos que están fuera de su responsabilidad.',
                feedback: {
                    correct: 'Conceptos reconstruidos. JARVIS recupera su mapa mental del sistema.',
                    incorrect: 'Revisa las definiciones antes de continuar.'
                },
                novaMessage: 'Antes de reparar funciones, debemos reconstruir mi entendimiento.'
            },
            {
                id: '0c',
                name: 'Validación rápida (Forms): Clasificar enunciados',
                toolType: 'forms',
                learningGoal: 'Aplicar clasificación conceptual en enunciados reales',
                udlHints: ['Clasifica cada enunciado en su categoría correcta'],
                successCondition: 'Clasificar correctamente dominio, restricción y requerimientos',
                activityPrompt: 'Cierre de diagnóstico: deja evidencia trazable para desbloquear recuperación.',
                instructions: [
                    'Haz clic en "Abrir Formulario".',
                    'Completa todas las preguntas de clasificación.',
                    'Envía el formulario para registrar tus respuestas.',
                    'Vuelve y presiona "Ya respondí el formulario".'
                ],
                formsProvider: 'microsoft',
                formsUrl: 'https://forms.office.com/r/Ai6qbwdVMt',
                statements: [
                    {
                        text: 'El sistema opera en la gestión académica universitaria.',
                        correctCategory: 'domain'
                    },
                    {
                        text: 'Debe responder cada consulta en menos de 2 segundos.',
                        correctCategory: 'constraint'
                    },
                    {
                        text: 'El estudiante necesita ver su avance por misión.',
                        correctCategory: 'userRequirement'
                    },
                    {
                        text: 'El sistema debe guardar progreso en almacenamiento local.',
                        correctCategory: 'systemRequirement'
                    }
                ],
                categories: [
                    { value: 'domain', label: 'Dominio' },
                    { value: 'constraint', label: 'Restricción' },
                    { value: 'userRequirement', label: 'Req. de usuario' },
                    { value: 'systemRequirement', label: 'Req. del sistema' }
                ],
                feedback: {
                    correct: 'Validación completada. La Fase 0 está lista para desbloquear la recuperación de JARVIS.',
                    incorrect: 'Hay clasificaciones incorrectas. Ajusta y vuelve a verificar.'
                },
                novaMessage: 'Ahora vuelvo a distinguir qué piden mis usuarios y qué debe implementar mi sistema.'
            }
        ]
    },
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
                name: 'Educaplay: Veracidad de los requerimientos',
                toolType: 'external',
                learningGoal: 'Contrastar ideas iniciales sobre veracidad y calidad de requerimientos',
                udlHints: ['Completa la actividad completa en Educaplay', 'Revisa tu resultado antes de confirmar'],
                successCondition: 'Finalizar actividad de Educaplay y confirmar participación',
                instructions: [
                    'Haz clic en "Abrir actividad".',
                    'Completa la actividad de Educaplay hasta el final.',
                    'Revisa tu puntaje o retroalimentación obtenida.',
                    'Vuelve y presiona "Ya participé".'
                ],
                externalLabel: 'Educaplay',
                externalButtonText: '🌐 Abrir actividad',
                externalUrl: 'https://es.educaplay.com/recursos-educativos/28379550-veracidad_de_los_requerimientos.html',
                feedback: {
                    correct: 'Actividad completada. Tu validación fortalece la activación del sistema.',
                    incorrect: 'Abre y finaliza la actividad externa para continuar.'
                },
                novaMessage: 'Cada respuesta me ayuda a recuperar mi comprensión del sistema.'
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
                name: 'Educaplay: Reconstrucción de requerimientos',
                toolType: 'external',
                learningGoal: 'Diagnosticar requerimientos faltantes mediante actividad guiada',
                udlHints: ['Completa toda la secuencia en Educaplay', 'Confirma al regresar al sistema'],
                successCondition: 'Completar actividad de exploración en Educaplay',
                instructions: [
                    'Haz clic en "Abrir actividad".',
                    'Resuelve la actividad de reconstrucción de requerimientos.',
                    'Verifica tu resultado final en Educaplay.',
                    'Vuelve y presiona "Ya participé".'
                ],
                externalLabel: 'Educaplay',
                externalButtonText: '🌐 Abrir actividad',
                externalUrl: 'https://es.educaplay.com/recursos-educativos/28379604-mision_2_reconstruccion_de_requerimientos.html',
                feedback: {
                    correct: 'Actividad registrada. Diagnóstico de exploración completado.',
                    incorrect: 'Completa la actividad externa para continuar.'
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
                name: 'Kahoot: Diferencias clave en contexto',
                toolType: 'kahoot',
                kahootUrl: 'https://kahoot.it/challenge/07319347?challenge-id=d8760083-d46f-4c29-b088-030eded85ba0_1774508012137',
                kahootPin: '07319347',
                learningGoal: 'Consolidar función vs condición con interacción competitiva',
                udlHints: ['Ingresa al Kahoot y responde en tiempo real', 'Confirma participación al terminar'],
                successCondition: 'Participar y finalizar el Kahoot de consolidación',
                instructions: [
                    'Haz clic en "Abrir Kahoot".',
                    'Ingresa el PIN 07319347 o abre el challenge de la fase de comprensión.',
                    'Responde todas las preguntas para consolidar conceptos.',
                    'Vuelve y presiona "Ya participé".'
                ],
                jarvisFailureContext: 'Necesito validar rápidamente si puedes distinguir acciones del sistema y condiciones operativas bajo presión.',
                definitions: [
                    {
                        concept: 'Pregunta tipo 1',
                        definition: 'Identificar si un enunciado expresa una acción del sistema (función).'
                    },
                    {
                        concept: 'Pregunta tipo 2',
                        definition: 'Identificar si un enunciado expresa una necesidad o restricción (condición).'
                    },
                    {
                        concept: 'Pregunta tipo 3',
                        definition: 'Diferenciar requerimiento de usuario vs requerimiento del sistema en casos breves.'
                    }
                ],
                reflectionPrompt: 'Si respondes con precisión, mi reconstrucción conceptual queda estable.',
                feedback: {
                    correct: 'Kahoot completado. Tu desempeño fortalece la fase de comprensión.',
                    incorrect: 'Participa en el Kahoot para continuar.'
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
                name: 'Forms: Decisión final de recuperación',
                toolType: 'forms',
                formsProvider: 'microsoft',
                formsUrl: 'https://forms.office.com/r/ieUGtxNAku',
                learningGoal: 'Aplicar criterios finales y justificar decisiones de recuperación',
                udlHints: ['Responde todas las preguntas de cierre', 'Envía el formulario antes de confirmar'],
                successCondition: 'Responder la actividad de cierre en Forms',
                instructions: [
                    'Haz clic en "Abrir Formulario".',
                    'Responde el bloque final de decisión de recuperación.',
                    'Envía el formulario con tu identificador.',
                    'Vuelve y presiona "Ya respondí el formulario".'
                ],
                feedback: {
                    correct: 'Respuesta final registrada. Aplicación completada con evidencia para analítica.',
                    incorrect: 'Completa el formulario para cerrar la fase.'
                },
                novaMessage: 'Tu análisis repara mi sistema de coordinación. Otro módulo conectado.'
            }
        ]
    }
};

const MISSION_SEQUENCE = [0, 1, 2, 3, 4];
const TOTAL_MISSIONS = MISSION_SEQUENCE.length;

// Dynamic JARVIS messages based on learning phase
const JARVIS_MESSAGES = {
    diagnosis: "Protocolo activo: mi mapa de requerimientos está fragmentado. Necesito diagnóstico estructural.",
    activation: "Señal restablecida. Soy JARVIS. Activemos identidad de sistema y alcance operativo.",
    exploration: "Diagnóstico parcial completado. Ahora debes aislar por qué mis módulos no coordinan.",
    understanding: "Núcleo conceptual en recuperación: función es acción; condición es requisito operativo.",
    application: "Fase final de reparación: clasifica, justifica y estabiliza decisiones críticas.",
    default: "Analizando sistemas de Stark Industries..."
};

// Auto-toast message variations (for periodic display)
// These rotate automatically every 20-30 seconds
const AUTO_TOAST_MESSAGES = {
    diagnosis: [
        "Alerta crítica: sin dominio claro, mis decisiones pierden precisión.",
        "Riesgo activo: un límite ambiguo puede provocar acciones fuera de alcance.",
        "Primero diagnóstico estructural. Luego recuperación operativa."
    ],
    activation: [
        "Soy JARVIS, IA de Stark Industries. Señal de control restablecida.",
        "Mi sistema conserva potencia, pero aún carece de coherencia de requerimientos.",
        "La Torre Stark depende de que restablezcamos criterios de diseño confiables."
    ],
    exploration: [
        "Tengo funciones completas, pero faltan condiciones para sincronizarlas.",
        "Sin requerimientos claros, incluso un sistema avanzado queda paralizado.",
        "Explorar no es adivinar: es rastrear causas del fallo estructural."
    ],
    understanding: [
        "FUNCIÓN: verbos de acción (calcular, transmitir, ejecutar).",
        "CONDICIÓN: necesidades operativas (requiere, necesita, debe tener).",
        "Si confundes estos niveles, el diseño se vuelve inestable."
    ],
    application: [
        "Clasifica y justifica: ahora cada decisión impacta recuperación real.",
        "¿Es FUNCIÓN o CONDICIÓN? Tu criterio define la estabilidad final.",
        "Cada clasificación correcta me acerca a la recuperación completa."
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
    diagnosis: [
        "🧭 Diagnóstico activo: mi mapa de requerimientos está fragmentado.",
        "📌 Reconstruye dominio, límite, restricciones y tipos de requerimientos.",
        "⚠️ Cada respuesta reduce riesgo sistémico en Stark Industries.",
        "🔓 Esta fase habilita la recuperación funcional por misiones."
    ],
    activation: [
        "🔧 Soy JARVIS. Sistema de Stark Industries.",
        "⚙️ Mi hardware funciona. Mi software está incompleto.",
        "❓ ¿Entiendes qué diferencia FUNCIÓN y CONDICIÓN?",
        "💡 Tony necesita que repares mi sistema."
    ],
    exploration: [
        "🔍 Correcto. Estás investigando mi problema central.",
        "⚙️ Tengo funciones pero faltan condiciones.",
        "📋 Sin ambas especificadas, cualquier sistema cae.",
        "🚨 Necesito que identifiques ambos tipos de requerimientos."
    ],
    understanding: [
        "✅ ¡Lo comprendes! FUNCIÓN vs CONDICIÓN.",
        "🧠 FUNCIÓN: lo que EJECUTO (verbos de acción).",
        "CONDICIÓN: lo que NECESITO (requisitos previos).",
        "💪 Ahora lo aplicaremos en ejemplos reales."
    ],
    application: [
        "🎯 Clasifica: ¿FUNCIÓN o CONDICIÓN?",
        "🔧 Cada decisión correcta me repara.",
        "⚡ Esto son casos reales de Stark Industries.",
        "🌠 Casi lo logramos. Continúa."
    ]
};

// State Management - Enhanced for pedagogical tracking
const STATE = {
    completedMissions: [],
    earnedMedals: [],           // Track earned medals [1, 2, 3, 4]
    trophyEarned: false,        // Track if trophy earned
    characterFrame: 0,
    rewards: 0,
    currentPhase: 'diagnosis', // Track learning phase
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
    const messages = CONTEXTUAL_MESSAGES_BY_PHASE[phase] || CONTEXTUAL_MESSAGES_BY_PHASE.diagnosis;
    
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
        addMessageToInbox("🧭 Fase 0 completada. Diagnóstico listo para desbloquear la recuperación.", '✅');
    } else if (completedCount === 2) {
        addMessageToInbox("🎯 Misión 1 completada. JARVIS vuelve a activarse.", '⚙️');
    } else if (completedCount === 3) {
        addMessageToInbox("⚡ Dos misiones de recuperación completadas. Continúa.", '⚡');
    } else if (completedCount === 4) {
        addMessageToInbox("🧠 Ya dominas tres misiones de recuperación. Casi listo.", '🧠');
    } else if (completedCount === 5) {
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
    loadStateFromStorage();
    setupModals();
    setupMissionButtons();
    setupMessageSystem();         // Auto-toast messages
    setupMuteToggle();            // Mute toggle button
    setupRewardsButton();         // Rewards/Medals button
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
        showToastMessage("💡 Estos conceptos son clave para ayudar a JARVIS.", 3000);
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
        closeModal(celebrationModal);
        resetGameProgress();
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

    const resetProgressBtn = document.getElementById('resetProgressBtn');
    if (resetProgressBtn) {
        resetProgressBtn.addEventListener('click', () => {
            resetGameProgress();
        });
    }
}

/**
 * Full game reset (back to zero)
 */
function resetGameProgress() {
    const userConfirmed = confirm('¿Seguro que quieres reiniciar TODO el juego y volver a cero?');
    if (!userConfirmed) return;

    STATE.completedMissions = [];
    STATE.earnedMedals = [];
    STATE.trophyEarned = false;
    STATE.rewards = 0;
    STATE.currentPhase = 'diagnosis';
    STATE.showedFinalScreen = false;
    STATE.lastPhaseInInbox = null;
    STATE.firstSubmissionShown = false;
    STATE.activityInteractions = {};
    STATE.currentActivity = null;

    saveStateToStorage();
    closeAllModals();

    document.querySelectorAll('.mission-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    document.querySelectorAll('.mission-header').forEach(button => {
        button.classList.remove('active');
    });

    setupMissionButtons();
    updateUI();
    updateJARVISMessage();
    initializeMessageInboxForPhase();
    updateHeaderMedalDisplay();

    showToastMessage('🔄 Juego reiniciado. Progreso en cero.', 3000);
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

    const bounded = Math.min(100, Math.max(0, percentage));
    const reconstructionPercent = document.getElementById('systemReconstructionPercent');
    const reconstructionFill = document.getElementById('systemReconstructionFill');
    const reconstructionBar = document.querySelector('.system-reconstruction-bar');
    const reconstructionNote = document.getElementById('systemReconstructionNote');
    const diagnosisIntegrityPercent = document.getElementById('diagnosisIntegrityPercent');
    const diagnosisIntegrityFill = document.getElementById('diagnosisIntegrityFill');
    const diagnosisIntegrityBar = document.querySelector('.diagnosis-integrity-bar');
    const diagnosisIntegrityLabel = document.getElementById('diagnosisIntegrityLabel');

    if (reconstructionPercent) {
        reconstructionPercent.textContent = `${bounded}%`;
    }
    if (reconstructionFill) {
        reconstructionFill.style.width = `${bounded}%`;
    }
    if (reconstructionBar) {
        reconstructionBar.setAttribute('aria-valuenow', String(Math.round(bounded)));
    }

    if (reconstructionNote) {
        const phaseZeroComplete = isMissionFullyCompleted(0);
        reconstructionNote.textContent = phaseZeroComplete
            ? 'Diagnóstico completado. JARVIS puede iniciar su recuperación funcional.'
            : 'Completa la Fase 0 para desbloquear la recuperación de JARVIS.';
    }

    // Mini progression tracker only for Fase 0 integrity
    const phaseZeroSubmissions = (MISSIONS[0] && Array.isArray(MISSIONS[0].submissions)) ? MISSIONS[0].submissions : [];
    const phaseZeroCompleted = phaseZeroSubmissions.filter((sub) => STATE.completedMissions.includes(sub.id)).length;
    const phaseZeroTotal = phaseZeroSubmissions.length || 3;
    const phaseZeroPercent = Math.round((phaseZeroCompleted / phaseZeroTotal) * 100);

    if (diagnosisIntegrityPercent) {
        diagnosisIntegrityPercent.textContent = `${phaseZeroCompleted}/${phaseZeroTotal}`;
    }
    if (diagnosisIntegrityFill) {
        diagnosisIntegrityFill.style.width = `${phaseZeroPercent}%`;
    }
    if (diagnosisIntegrityBar) {
        diagnosisIntegrityBar.setAttribute('aria-valuenow', String(phaseZeroCompleted));
        diagnosisIntegrityBar.setAttribute('aria-valuemax', String(phaseZeroTotal));
    }
    if (diagnosisIntegrityLabel) {
        if (phaseZeroCompleted === 0) {
            diagnosisIntegrityLabel.textContent = 'Sin diagnóstico validado todavía.';
        } else if (phaseZeroCompleted < phaseZeroTotal) {
            diagnosisIntegrityLabel.textContent = 'Diagnóstico en curso: consolidando mapa mental de JARVIS.';
        } else {
            diagnosisIntegrityLabel.textContent = 'Integridad de diagnóstico estable: recuperación desbloqueada.';
        }
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
 * @param {number} missionId - Mission ID
 * @returns {boolean} True if mission is locked
 */
function checkMissionLocked(missionId) {
    const missionPosition = MISSION_SEQUENCE.indexOf(missionId);
    if (missionPosition === -1) return true;
    if (missionPosition === 0) return false;

    const previousMissionId = MISSION_SEQUENCE[missionPosition - 1];
    return !isMissionFullyCompleted(previousMissionId);
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
 * COMPREHENSIVE VALIDATION AND SYNC
 * Verifies data consistency and fixes any discrepancies
 * Call after major state changes
 */
function validateAndSyncGameState() {
    console.log('🔍 Validating and syncing game state...');
    
    // VALIDATION 1: Check completedMissions for invalid entries
    const validSubmissionIds = new Set();
    for (let missionId of Object.keys(MISSIONS)) {
        const mission = MISSIONS[missionId];
        if (Array.isArray(mission.submissions)) {
            mission.submissions.forEach(sub => {
                validSubmissionIds.add(sub.id);
            });
        }
    }
    
    // Filter out any invalid IDs
    const invalidMissions = STATE.completedMissions.filter(id => !validSubmissionIds.has(id));
    if (invalidMissions.length > 0) {
        console.warn(`⚠️ Invalid submission IDs found: ${invalidMissions.join(', ')}`);
        STATE.completedMissions = STATE.completedMissions.filter(id => validSubmissionIds.has(id));
    }
    
    // VALIDATION 2: Verify rewards match completion count
    const expectedRewards = STATE.completedMissions.length * 10;
    if (STATE.rewards !== expectedRewards) {
        console.warn(`⚠️ Rewards mismatch. Expected: ${expectedRewards}, Got: ${STATE.rewards}`);
        STATE.rewards = expectedRewards;
    }
    
    // VALIDATION 3: Sync medals based on actual completion
    syncRewardsFromProgress();
    
    // VALIDATION 4: Check earnedMedals for valid values
    STATE.earnedMedals = STATE.earnedMedals.filter(id => id >= 1 && id <= 4);
    
    // VALIDATION 5: Verify trophy state matches medals
    if (STATE.earnedMedals.length === 4 && !STATE.trophyEarned) {
        console.log(`🏆 Trophy should be earned, enabling...`);
        STATE.trophyEarned = true;
    } else if (STATE.earnedMedals.length < 4 && STATE.trophyEarned) {
        console.warn(`⚠️ Trophy claimed but not all medals earned, disabling...`);
        STATE.trophyEarned = false;
    }
    
    // Save verified state
    saveStateToStorage();
    
    console.log(`✅ State validation complete`);
    console.log(`   - Completed missions: ${STATE.completedMissions.length}`);
    console.log(`   - Rewards: ${STATE.rewards}`);
    console.log(`   - Earned medals: ${STATE.earnedMedals.length}`);
    console.log(`   - Trophy earned: ${STATE.trophyEarned}`);
}

/**
 * Award medal for mission completion
 * @param {number} missionId - Mission ID (1-4)
 */
function awardMedal(missionId) {
    // VALIDATION: Check if valid medal ID
    if (missionId < 1 || missionId > 4) {
        console.warn(`⚠️ Invalid mission ID for medal: ${missionId}`);
        return;
    }
    
    // VALIDATION: Check if already earned
    if (STATE.earnedMedals.includes(missionId)) {
        console.log(`ℹ️ Medal ${missionId} already earned`);
        return;
    }
    
    // ===== AWARD THE MEDAL =====
    STATE.earnedMedals.push(missionId);
    saveStateToStorage();
    console.log(`🏅 Medal awarded for mission ${missionId}`);
    
    // Update display IMMEDIATELY
    updateHeaderMedalDisplay();
    
    // Show toast notification with celebration
    const celebrationText = missionId === 4 ? 
        `👑 TROFEO FINAL DESBLOQUEADO!\n¡Has completado TODAS las misiones!`:
        `🏅 Medalla ${missionId} desbloqueada!\nHas completado la Misión ${missionId}`;
    
    showToastMessage(celebrationText, 4000);
    
    // Show medal award modal with guaranteed visibility
    setTimeout(() => {
        showMedalAwardModal(missionId);
    }, 800);
}

/**
 * Award trophy for completing all missions
 */
function awardTrophy() {
    // VALIDATION: Check if already earned
    if (STATE.trophyEarned) {
        console.log(`ℹ️ Trophy already earned`);
        return;
    }
    
    // VALIDATION: Check if all medals earned
    if (STATE.earnedMedals.length !== 4) {
        console.warn(`⚠️ Cannot award trophy: only ${STATE.earnedMedals.length}/4 medals earned`);
        return;
    }
    
    // ===== AWARD THE TROPHY =====
    STATE.trophyEarned = true;
    saveStateToStorage();
    console.log(`🏆 TROPHY AWARDED!`);
    
    // Show prominent toast notification
    showToastMessage(`🏆 ¡TROFEO DESBLOQUEADO!\n¡Has completado todas las misiones!`, 5000);
    
    // Update display IMMEDIATELY
    updateHeaderMedalDisplay();
    
    // Show trophy modal with delay for drama
    setTimeout(() => {
        openRewardsModal();
    }, 2000);
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
            trophyStatusEl.textContent = `Completa todas las misiones de recuperación (${medalsCount}/4)`;
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
    if (!modal) {
        console.warn('medalAwardModal not found');
        return;
    }

    console.log('Displaying medal modal for mission ' + missionId);
    
    // Close any other modals first
    closeAllModals();
    
    // Update modal content
    const title = document.getElementById('medal-award-title');
    const message = document.getElementById('medalAwardMessage');
    const img = document.getElementById('medalAwardImg');
    const progress = document.getElementById('medalAwardProgress');

    const celebrationMessages = {
        1: 'Has desbloqueado la primera medalla! Tu aventura hacia la maestria ha comenzado.',
        2: 'La segunda medalla es tuya! Vas ganando experiencia en el sistema.',
        3: 'Tres medallas conquistadas! Ya dominas el sistema JARVIS.',
        4: 'MEDALLA FINAL DESBLOQUEADA! MAESTRO DEL SISTEMA!'
    };

    if (title) title.textContent = 'MISION ' + missionId + ' COMPLETADA';
    if (message) message.textContent = celebrationMessages[missionId] || ('Has completado con exito la Mision ' + missionId);
    if (img) img.src = 'assets/medallas/m' + missionId + '.png';
    if (progress) progress.textContent = 'Medallas desbloqueadas: ' + STATE.earnedMedals.length + '/4';

    console.log('Opening medal modal - Earned medals: ' + STATE.earnedMedals.length + '/4');
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
    for (const i of MISSION_SEQUENCE) {
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
                    ${isComplete ? '✅' : '🔴'} ${mission.title}
                </h4>
                <p style="margin: 0; font-size: 0.9rem; color: var(--color-text-light);">
                    Actividades: ${completedActivities}/${totalActivities} completadas
                </p>
                ${isComplete && i > 0 ? '<p style="margin: 0.5rem 0 0 0; font-weight: 600; color: var(--color-success);">🏅 Medalla desbloqueada</p>' : ''}
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
    for (const i of MISSION_SEQUENCE) {
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
        const missionPosition = MISSION_SEQUENCE.indexOf(missionId);
        const previousMissionId = MISSION_SEQUENCE[missionPosition - 1];
        const previousMission = MISSIONS[previousMissionId];
        const previousLabel = previousMission ? previousMission.title : `Misión ${previousMissionId}`;
        showToastMessage(`🔒 Debes completar primero: ${previousLabel}`, 4000);
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
    
    // Close all other panels
    for (const i of MISSION_SEQUENCE) {
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

    // Add narrative beats for highly contextual phases (e.g., Fase 0)
    if (Array.isArray(mission.narrativeBeats) && mission.narrativeBeats.length > 0) {
        const narrativeEl = document.createElement('div');
        narrativeEl.className = 'mission-narrative-block';

        const titleEl = document.createElement('p');
        titleEl.className = 'mission-narrative-title';
        titleEl.textContent = 'Estado de misión';
        narrativeEl.appendChild(titleEl);

        const listEl = document.createElement('ul');
        listEl.className = 'mission-narrative-list';
        mission.narrativeBeats.forEach((beat) => {
            const li = document.createElement('li');
            li.textContent = beat;
            listEl.appendChild(li);
        });
        narrativeEl.appendChild(listEl);

        container.appendChild(narrativeEl);
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
        
        const pendingText = sub.activityPrompt || 'Toca para empezar';

        item.innerHTML = `
            <div class="activity-icon">${isCompleted ? '✅' : '📝'}</div>
            <div class="activity-info">
                <div class="activity-title">${sub.name}</div>
                <div class="activity-desc">${isCompleted ? 'Completada' : pendingText}</div>
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
    // VALIDATION: Check if activity is actually in completed list
    if (!STATE.completedMissions.includes(submissionId)) {
        console.warn(`⚠️ updateActivityItemUI: ${submissionId} is not in completedMissions`);
        return;
    }

    // Find the activity container
    let container = document.getElementById(`mission-${missionId}-activities`);
    
    // FALLBACK: If container not found, try to open the accordion to render it
    if (!container) {
        console.warn(`⚠️ updateActivityItemUI: Container not found for mission ${missionId}, attempting to re-render accordion...`);
        
        // Get the accordion panel and button
        const panel = document.getElementById(`mission-${missionId}-panel`);
        const button = document.getElementById(`mission-${missionId}-btn`);
        const mission = MISSIONS[missionId];
        
        // If accordian available, open it and render activities
        if (panel && button && mission) {
            // Ensure the accordion is open
            if (!panel.classList.contains('active')) {
                panel.classList.add('active');
                button.classList.add('active');
            }
            
            // Get or create container
            container = document.getElementById(`mission-${missionId}-activities`);
            if (!container) {
                console.error(`❌ Failed to get activities container for mission ${missionId}`);
                return;
            }
            
            // Re-render all activities for this mission
            populateMissionActivities(missionId, mission, container);
            
            // Wait for DOM to update, then try again
            setTimeout(() => {
                const activityItems = container.querySelectorAll('.mission-activity-item');
                const submissionIndex = mission.submissions.findIndex(sub => sub.id === submissionId);
                
                if (submissionIndex >= 0 && activityItems[submissionIndex]) {
                    const activityItem = activityItems[submissionIndex];
                    activityItem.classList.add('completed');
                    
                    const iconEl = activityItem.querySelector('.activity-icon');
                    const descEl = activityItem.querySelector('.activity-desc');
                    
                    if (iconEl) iconEl.textContent = '✅';
                    if (descEl) descEl.textContent = 'Completada';
                    
                    // Add animation
                    activityItem.style.animation = 'slideIn 0.4s ease-out';
                    console.log(`✅ Activity ${submissionId} updated with fallback re-render`);
                }
            }, 50);
            return;
        } else {
            console.error(`❌ Cannot re-render accordion for mission ${missionId}: missing elements`);
            return;
        }
    }
    
    // Find all activity items in this mission
    const activityItems = container.querySelectorAll('.mission-activity-item');
    const mission = MISSIONS[missionId];
    if (!mission) {
        console.error(`❌ Mission ${missionId} not found`);
        return;
    }
    
    // Find the submission in the mission data
    const submissionIndex = mission.submissions.findIndex(sub => sub.id === submissionId);
    if (submissionIndex === -1) {
        console.warn(`⚠️ Submission ${submissionId} not found in mission ${missionId}`);
        return;
    }
    
    // Update the corresponding activity item
    const activityItem = activityItems[submissionIndex];
    if (!activityItem) {
        console.warn(`⚠️ Activity item at index ${submissionIndex} not found`);
        return;
    }
    
    // Mark as completed with animation
    activityItem.classList.add('completed');
    
    // Update icon and text
    const iconEl = activityItem.querySelector('.activity-icon');
    const descEl = activityItem.querySelector('.activity-desc');
    
    if (iconEl) {
        iconEl.textContent = '✅';
    }
    if (descEl) {
        descEl.textContent = 'Completada';
    }
    
    // Add visual animation
    activityItem.style.animation = 'none';
    setTimeout(() => {
        activityItem.style.animation = 'slideIn 0.4s ease-out';
    }, 10);
    
    console.log(`✅ Activity ${submissionId} updated successfully`);
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
            showToastMessage(`💭 JARVIS: "${submission.novaMessage}"`, 4000);
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
    const instructionsSection = document.getElementById('activityInstructions');
    instructionsList.innerHTML = '';
    if (submission.instructions && Array.isArray(submission.instructions)) {
        submission.instructions.forEach(inst => {
            const li = document.createElement('li');
            li.textContent = inst;
            instructionsList.appendChild(li);
        });
        if (instructionsSection) {
            instructionsSection.style.display = 'block';
        }
    } else {
        // Hide instructions section if none
        if (instructionsSection) {
            instructionsSection.style.display = 'none';
        }
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
        case 'mentimeter':
            renderMentimeter(submission, contentEl);
            break;
        case 'kahoot':
            renderKahoot(submission, contentEl);
            break;
        case 'forms':
            renderForms(submission, contentEl);
            break;
        case 'external':
            renderExternal(submission, contentEl);
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
                showToastMessage(`💭 JARVIS: "${submission.padletOpenMessage}"`, 4000);
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
 * Render Mentimeter Activity
 */
function renderMentimeter(submission, container) {
    const examples = submission.questionExamples || [];
    const mentimeterUrl = submission.mentimeterUrl || 'https://www.mentimeter.com/';

    container.innerHTML = `
        <div class="activity-mentimeter">
            <p class="activity-question"><strong>${submission.name}</strong></p>
            <p>Participa en Mentimeter y reflexiona con el grupo:</p>
            <ul>
                ${examples.map(example => `<li>${example}</li>`).join('')}
            </ul>
            <div class="padlet-actions" style="margin-top: 1rem;">
                <button class="padlet-open-btn" id="openMentimeterBtn" type="button">🌐 Abrir Mentimeter</button>
                <button class="activity-action-btn activity-complete-btn" id="markMentimeterDoneBtn" type="button">✅ Ya participé</button>
            </div>
        </div>
    `;

    const openBtn = container.querySelector('#openMentimeterBtn');
    const doneBtn = container.querySelector('#markMentimeterDoneBtn');

    openBtn?.addEventListener('click', () => {
        window.open(mentimeterUrl, '_blank', 'noopener');
        STATE.activityInteractions[STATE.currentActivity].interactions.push('opened-mentimeter');
    });

    doneBtn?.addEventListener('click', () => {
        STATE.activityInteractions[STATE.currentActivity].interactions.push('mentimeter-confirmed');
        showFeedback('correct', submission.feedback.correct);
        enableCompleteButton();
    });
}

/**
 * Render Conceptual Interaction Activity
 */
function renderKahoot(submission, container) {
    const definitions = submission.definitions || [];
    const kahootUrl = submission.kahootUrl || 'https://kahoot.it/';

    container.innerHTML = `
        <div class="activity-kahoot">
            <p class="activity-question"><strong>${submission.name}</strong></p>
            <blockquote>${submission.jarvisFailureContext || ''}</blockquote>
            <div class="checklist-items">
                ${definitions.map(item => `
                    <div class="checklist-item" style="display: block;">
                        <strong>${item.concept}</strong>
                        <p style="margin: 0.3rem 0 0;">${item.definition}</p>
                    </div>
                `).join('')}
            </div>
            <p style="margin-top: 0.8rem;"><em>${submission.reflectionPrompt || ''}</em></p>
            <div class="padlet-actions" style="margin-top: 0.8rem;">
                <button class="padlet-open-btn" id="openKahootBtn" type="button">🌐 Abrir Kahoot</button>
                <button class="activity-action-btn" id="confirmConceptsBtn" type="button">✅ Ya participé</button>
            </div>
        </div>
    `;

    const openKahootBtn = container.querySelector('#openKahootBtn');
    const confirmBtn = container.querySelector('#confirmConceptsBtn');

    openKahootBtn?.addEventListener('click', () => {
        window.open(kahootUrl, '_blank', 'noopener');
        STATE.activityInteractions[STATE.currentActivity].interactions.push('opened-kahoot');
    });

    confirmBtn?.addEventListener('click', () => {
        STATE.activityInteractions[STATE.currentActivity].interactions.push('concepts-confirmed');
        showFeedback('correct', submission.feedback.correct);
        enableCompleteButton();
    });
}

/**
 * Render Forms-style Classification Activity
 */
function renderForms(submission, container) {
    const formsUrl = submission.formsUrl || submission.formUrl || null;
    if (formsUrl) {
        container.innerHTML = `
            <div class="activity-forms">
                <p class="activity-question"><strong>${submission.name}</strong></p>
                <p>Completa la validación en el formulario externo y luego confirma tu participación.</p>
                <div class="padlet-actions" style="margin-top: 0.8rem;">
                    <button class="padlet-open-btn" id="openFormsBtn" type="button">🌐 Abrir Formulario</button>
                    <button class="activity-action-btn" id="confirmFormsBtn" type="button">✅ Ya respondí el formulario</button>
                </div>
            </div>
        `;

        const openFormsBtn = container.querySelector('#openFormsBtn');
        const confirmFormsBtn = container.querySelector('#confirmFormsBtn');

        openFormsBtn?.addEventListener('click', () => {
            window.open(formsUrl, '_blank', 'noopener');
            STATE.activityInteractions[STATE.currentActivity].interactions.push('opened-forms');
        });

        confirmFormsBtn?.addEventListener('click', () => {
            STATE.activityInteractions[STATE.currentActivity].interactions.push('forms-confirmed');
            showFeedback('correct', submission.feedback.correct || 'Formulario registrado correctamente.');
            enableCompleteButton();
        });

        return;
    }

    const categories = submission.categories || [];
    const statements = submission.statements || [];

    container.innerHTML = `
        <div class="activity-forms">
            <p class="activity-question"><strong>${submission.question || 'Clasifica cada enunciado'}</strong></p>
            <div class="forms-statements">
                ${statements.map((statement, index) => `
                    <label class="checklist-item" style="display: block; margin-bottom: 0.8rem;">
                        <span style="display: block; margin-bottom: 0.4rem;">${index + 1}. ${statement.text}</span>
                        <select class="forms-select" data-index="${index}">
                            <option value="">Selecciona una categoría</option>
                            ${categories.map(category => `<option value="${category.value}">${category.label}</option>`).join('')}
                        </select>
                    </label>
                `).join('')}
            </div>
        </div>
    `;

    document.getElementById('validateActivityBtn').style.display = 'block';

    const selects = container.querySelectorAll('.forms-select');
    selects.forEach(select => {
        select.addEventListener('change', () => {
            STATE.activityInteractions[STATE.currentActivity].interactions.push('forms-selected');
            const feedbackEl = document.getElementById('activityFeedback');
            if (feedbackEl.style.display === 'block') {
                feedbackEl.style.display = 'none';
            }
        });
    });
}

/**
 * Render Generic External Activity (Educaplay and similar tools)
 */
function renderExternal(submission, container) {
    const externalUrl = submission.externalUrl || '#';
    const externalLabel = submission.externalLabel || 'actividad externa';
    const externalButtonText = submission.externalButtonText || '🌐 Abrir actividad';

    container.innerHTML = `
        <div class="activity-forms">
            <p class="activity-question"><strong>${submission.name}</strong></p>
            <p>Completa la actividad en ${externalLabel} y luego confirma tu participación.</p>
            <div class="padlet-actions" style="margin-top: 0.8rem;">
                <button class="padlet-open-btn" id="openExternalBtn" type="button">${externalButtonText}</button>
                <button class="activity-action-btn" id="confirmExternalBtn" type="button">✅ Ya participé</button>
            </div>
        </div>
    `;

    const openExternalBtn = container.querySelector('#openExternalBtn');
    const confirmExternalBtn = container.querySelector('#confirmExternalBtn');

    openExternalBtn?.addEventListener('click', () => {
        window.open(externalUrl, '_blank', 'noopener');
        STATE.activityInteractions[STATE.currentActivity].interactions.push('opened-external');
    });

    confirmExternalBtn?.addEventListener('click', () => {
        STATE.activityInteractions[STATE.currentActivity].interactions.push('external-confirmed');
        showFeedback('correct', submission.feedback.correct || 'Actividad registrada correctamente.');
        enableCompleteButton();
    });
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
        case 'forms':
            if (submission.formsUrl || submission.formUrl) {
                result = { isValid: true, isCorrect: true, message: submission.feedback.correct || 'Formulario registrado correctamente.' };
            } else {
                result = validateForms(submission);
            }
            break;
        case 'mentimeter':
        case 'kahoot':
        case 'external':
            result = { isValid: true, isCorrect: true, message: submission.feedback.correct };
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
    
    // VALIDATION: Check if mission and submission exist
    if (!mission || !submission) {
        console.error(`❌ Invalid submission: ${submissionId}`);
        closeModal(activityModal);
        return;
    }
    
    // VALIDATION: Check if already completed
    if (STATE.completedMissions.includes(submissionId)) {
        closeModal(activityModal);
        closeSubmenu();
        STATE.currentActivity = null;
        showToastMessage('✓ Esta actividad ya estaba completada', 2000);
        return;
    }
    
    // ===== COMPLETE THE ACTIVITY =====
    STATE.completedMissions.push(submissionId);
    STATE.rewards += 10;
    
    // Save interaction data
    if (STATE.activityInteractions[submissionId]) {
        STATE.activityInteractions[submissionId].completed = Date.now();
    }
    
    // ===== CHECK IF MISSION IS COMPLETE =====
    const missionComplete = mission.submissions.every(sub => 
        STATE.completedMissions.includes(sub.id)
    );
    
    // ===== SAVE STATE EARLY =====
    saveStateToStorage();
    
    // ===== UPDATE UI =====
    updateUI();
    
    // ===== AWARD MEDAL IF MISSION COMPLETE =====
    if (missionComplete) {
        // Award medal AFTER updateUI so badges are already updated
        awardMedal(missionId);

        // Unlock next mission immediately
        setupMissionButtons();
        
        // Check if all missions complete
        if (STATE.earnedMedals.length === 4) {
            setTimeout(() => {
                awardTrophy();
            }, 1500);
        }
    }
    
    // ===== UPDATE UI VISUAL FEEDBACK =====
    // Update the activity item UI immediately to show completion check
    updateActivityItemUI(submissionId, missionId);
    
    // Visual feedback
    showToastMessage(`✅ ¡Completado!\n📍 ${submission.name}\n🏆 +10 puntos`, 4000);
    
    // NOVA message
    if (submission.novaMessage) {
        setTimeout(() => {
            showToastMessage(`💭 JARVIS: "${submission.novaMessage}"`, 4000);
        }, 2000);
    }
    
    // ===== PROGRESS MESSAGES =====
    if (!STATE.firstSubmissionShown && STATE.completedMissions.length === 1) {
        STATE.firstSubmissionShown = true;
        setTimeout(() => showProgressMessage('firstSubmission'), 3000);
    }
    
    if (STATE.completedMissions.length % 3 === 0) {
        setTimeout(() => showProgressMessage('missionComplete'), 3500);
    }
    
    // Update inbox with progress messages
    updateMessageInboxOnProgress();
    updateJARVISMessage();
    
    // ===== CLOSE MODAL AND CLEANUP =====
    closeModal(activityModal);
    closeSubmenu();
    STATE.currentActivity = null;
    
    // Restart auto-messages
    startAutoMessages();
    
    // Check final completion
    checkFinalCompletion();
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
    // VALIDATION: Check if already completed
    if (STATE.completedMissions.includes(submissionId)) {
        showToastMessage('✓ Esta actividad ya estaba completada', 2000);
        return;
    }
    
    // VALIDATION: Parse and check mission exists
    const missionNumber = parseInt(submissionId.charAt(0));
    const mission = MISSIONS[missionNumber];
    if (!mission) {
        console.error(`❌ Mission ${missionNumber} not found`);
        showToastMessage('❌ Error: Misión no encontrada', 2000);
        return;
    }
    
    // VALIDATION: Check submission exists
    const submission = mission.submissions.find(s => s.id === submissionId);
    if (!submission) {
        console.error(`❌ Submission ${submissionId} not found in mission ${missionNumber}`);
        showToastMessage('❌ Error: Actividad no encontrada', 2000);
        return;
    }
    
    // ===== COMPLETE THE ACTIVITY =====
    STATE.completedMissions.push(submissionId);
    STATE.rewards += 10;
    
    // Check for special missions (Padlet integration)
    // ===== SAVE STATE EARLY =====
    saveStateToStorage();
    
    // ===== UPDATE UI =====
    updateUI();
    updateJARVISMessage();
    
    // ===== CHECK IF MISSION IS COMPLETE =====
    const missionComplete = mission.submissions.every(sub => 
        STATE.completedMissions.includes(sub.id)
    );
    
    // ===== AWARD MEDAL IF MISSION COMPLETE =====
    if (missionComplete) {
        // Award medal AFTER updateUI so badges are already updated
        awardMedal(missionNumber);
        
        // Check if all missions complete
        if (STATE.earnedMedals.length === 4) {
            setTimeout(() => {
                awardTrophy();
            }, 1500);
        }
        
        // Update mission buttons to reflect new lock status
        setupMissionButtons();
    }
    
    // ===== VISUAL FEEDBACK WITH CONTEXTUAL MESSAGING =====
    const phase = mission.phase;
    showToastMessage(
        `✅ ¡Completado!\n📍 ${submissionName}\n🏆 +10 puntos\n\n` +
        `💭 JARVIS: "${getCompletionMessage(phase)}"`, 
        4000
    );
    
    // ===== PROGRESS-TRIGGERED MESSAGES =====
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
    
    // Restart auto-messages with new context (phase may have changed)
    startAutoMessages();
    
    // Check if final mission is complete (final celebration)
    checkFinalCompletion();
}

/**
 * Get contextual completion message based on phase
 */
function getCompletionMessage(phase) {
    const messages = {
        diagnosis: "Diagnóstico completado. Mi comprensión del sistema vuelve a estar en línea.",
        activation: "Gracias por responder mi llamada.",
        exploration: "Ahora entiendes mi situación.",
        understanding: "Estás aprendiendo cómo funciono.",
        application: "¡Mi sistema se está reparando!"
    };
    return messages[phase] || "Progreso registrado.";
}

/**
 * Check if all missions are complete and show final screen
 */
function checkFinalCompletion() {
    const mission4Complete = ['4a', '4b', '4c'].every(id => STATE.completedMissions.includes(id));

    if (mission4Complete && !STATE.showedFinalScreen) {
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
    document.getElementById('finalMissions').textContent = String(TOTAL_MISSIONS);
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
    const missionCountEl = document.getElementById('missionCount');
    const rewardsCountEl = document.getElementById('rewardsCount');
    const earnedMedalsCountEl = document.getElementById('earnedMedalsCount');

    if (missionCountEl) {
        missionCountEl.textContent = completedMissionsCount;
    }

    if (rewardsCountEl) {
        rewardsCountEl.textContent = STATE.rewards;
    }

    if (earnedMedalsCountEl) {
        earnedMedalsCountEl.textContent = STATE.earnedMedals.length;
    }
    
    // Update system percentage in info box
    const progressPercent = Math.round((completedMissionsCount / TOTAL_MISSIONS) * 100);
    updateSystemProgress(progressPercent);
    
    // Update mission badges using proper completion check
    for (const i of MISSION_SEQUENCE) {
        const badge = document.getElementById(`badge-${i}`);
        if (badge) {
            const isComplete = isMissionFullyCompleted(i);
            const wasComplete = badge.classList.contains('completed');
            
            if (isComplete && !wasComplete) {
                // TRANSITION: Badge changed from incomplete to complete
                badge.textContent = '✓';
                badge.classList.add('completed');
                if (badge.parentElement) {
                    const missionTitle = MISSIONS[i]?.title || `Misión ${i}`;
                    badge.parentElement.setAttribute('aria-label', `${missionTitle} completada`);
                }
                
                // Add animation
                badge.style.animation = 'none';
                setTimeout(() => {
                    badge.style.animation = 'badgePulse 0.6s ease-out';
                }, 10);
                
                console.log(`✅ Badge ${i} completed with animation`);
            } else if (isComplete) {
                // Already complete
                badge.textContent = '✓';
                badge.classList.add('completed');
                if (badge.parentElement) {
                    const missionTitle = MISSIONS[i]?.title || `Misión ${i}`;
                    badge.parentElement.setAttribute('aria-label', `${missionTitle} completada`);
                }
            } else {
                // Not complete
                badge.textContent = '○';
                badge.classList.remove('completed');
                if (badge.parentElement) {
                    const missionTitle = MISSIONS[i]?.title || `Misión ${i}`;
                    badge.parentElement.setAttribute('aria-label', missionTitle);
                }
            }
        }
    }
    
    // Update current phase
    updateCurrentPhase();

    // Update medals and trophy visibility/state
    updateHeaderMedalDisplay();

    // Sync NOVA mood with overall progress
    updateNovaMoodFromProgress();
    
    console.log(`✅ UI updated - ${completedMissionsCount}/${TOTAL_MISSIONS} missions completed`);
}

/**
 * Update current learning phase based on progress
 */
function updateCurrentPhase() {
    const completedMissionsCount = Math.floor(STATE.completedMissions.length / 3);
    const oldPhase = STATE.currentPhase;
    
    const phases = ['diagnosis', 'activation', 'exploration', 'understanding', 'application'];

    if (completedMissionsCount < TOTAL_MISSIONS) {
        STATE.currentPhase = phases[completedMissionsCount] || 'diagnosis';
    } else {
        STATE.currentPhase = 'application';
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
        try {
            const loaded = JSON.parse(saved);
            STATE.completedMissions = loaded.completedMissions || [];
            STATE.earnedMedals = loaded.earnedMedals || [];
            STATE.trophyEarned = loaded.trophyEarned || false;
            STATE.rewards = loaded.rewards || 0;
            STATE.currentPhase = loaded.currentPhase || 'diagnosis';
            STATE.showedFinalScreen = loaded.showedFinalScreen || false;
            STATE.messagesMuted = loaded.messagesMuted || false;
            STATE.lastMessageIndex = loaded.lastMessageIndex || 0;
            STATE.firstSubmissionShown = loaded.firstSubmissionShown || false;
            STATE.activityInteractions = loaded.activityInteractions || {};
            STATE.readingMode = loaded.readingMode || false;
            
            // Validate and sync the loaded state
            validateAndSyncGameState();
            console.log('✅ State loaded and validated from storage');
        } catch (error) {
            console.error('❌ Error parsing saved state:', error);
            // Fall back to defaults
            localStorage.removeItem('novaGameState');
        }
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

/**
 * Validate Forms-style classification
 */
function validateForms(submission) {
    const selects = document.querySelectorAll('.forms-select');
    if (!selects.length) {
        return { isValid: false, isCorrect: false, message: 'No se encontraron enunciados para clasificar.' };
    }

    let allSelected = true;
    let allCorrect = true;

    selects.forEach(select => {
        const index = parseInt(select.dataset.index, 10);
        const selectedValue = select.value;
        const expectedValue = submission.statements[index]?.correctCategory;

        if (!selectedValue) {
            allSelected = false;
            return;
        }

        if (selectedValue !== expectedValue) {
            allCorrect = false;
        }
    });

    if (!allSelected) {
        return { isValid: false, isCorrect: false, message: 'Completa la clasificación de todos los enunciados.' };
    }

    return {
        isValid: true,
        isCorrect: allCorrect,
        message: allCorrect ? submission.feedback.correct : submission.feedback.incorrect
    };
}