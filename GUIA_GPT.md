# NOVA - Guía para Adaptaciones Educativas con GPT
## Cómo usar esta plataforma para tu clase

---

## 📌 INSTRUCCIONES PARA USAR CON GPT

### Paso 1: El Contexto
Cuando compartas esto con GPT, empieza con:

```
"Tengo una plataforma educativa gamificada llamada NOVA para mi clase de [TU ASIGNATURA/TEMA].

Aquí está la estructura técnica y pedagógica:
[PEGA ESTA DOCUMENTACIÓN]

Mi clase se llama: [NOMBRE CLASE]
Tema de estudio: [TEMA ESPECÍFICO]
Nivel de estudiantes: [1er año? 2do? Universitarios?]
Duración: [Cuánto tiempo tienen?]
Objetivos de aprendizaje: [Qué quieres enseñar?]

Necesito que crees [número] nuevas misiones/actividades que:
1. Se adapten a mi temática
2. Sigan la estructura NOVA
3. Incluyan gamificación apropiada

¿Puedes generar el código JavaScript y la estructura?"
```

### Paso 2: Proporciona Contexto Específico

Reemplaza los corchetes arriba con tu información:

**Ejemplo Real:**
```
Mi clase se llama: "Introducción a Requerimientos de Software"
Tema de estudio: Funciones vs. Condiciones en sistemas
Nivel de estudiantes: 1er año de Ingeniería Informática
Duración: 4 semanas
Objetivos de aprendizaje:
- Distinguir entre funciones (qué hace) y condiciones (qué necesita)
- Documentar requisitos de forma clara
- Trabajar colaborativamente en especificaciones
```

### Paso 3: Especifica Qué Necesitas

```
Crea para mí:
[ ] 3 nuevas misiones (ID 7, 8, 9)
[ ] Cada una con 3 submisiones
[ ] Con contenido pedagogico para [tu tema]
[ ] Código JavaScript listo para copiar
[ ] Instrucciones de integración

¿Puedes incluir también:
- Tips para los estudiantes?
- Criterios de evaluación?
- Cómo sé si aprendieron?
```

---

## 🎮 ESTRUCTURA GAMIFICACIÓN EN NOVA

### Elementos Gamificados (8 pilares)

| Elemento | Qué es | Por qué motiva | Cómo se ve |
|----------|--------|----------------|-----------|
| **Puntos** | +10 por submisión | Feedback numérico claro | 🏆 30 puntos en header |
| **Badges** | ○ → ✓ al completar | Progreso tangible | Checkmark verde en misión |
| **Contador** | Misiones 0/6 | Visibilidad de metas | 📊 3 misiones completadas |
| **Narrativa** | Historia de NOVA | Propósito emocional | "Ayuda a NOVA a ir a casa" |
| **Mascota** | NOVA pestañea | Conexión con AI | Animación constante |
| **Status** | ❤️⚡😊🎯 cards | "Cuidar" a NOVA | 4 tarjetas de estado |
| **Persistencia** | localStorage | No pierden progreso | Datos guardados siempre |
| **Feedback** | Alertas inmediatas | Refuerzo operante | "✅ +10 puntos" |

---

## 🏗️ ESTRUCTURA TÉCNICA PARA ADAPTACIONES

### Cómo funciona internamente

```javascript
// 1. DATOS (En script.js)
const MISSIONS = {
    1: {
        title: "Nombre Misión",
        description: "Descripción breve",
        submissions: [
            { id: "1a", name: "Submisión 1" },
            { id: "1b", name: "Submisión 2" },
            { id: "1c", name: "Submisión 3" }
        ]
    }
}

// 2. ESTADO (Guarda progreso)
const STATE = {
    completedMissions: [],      // ["1a", "1b", "2a", ...]
    rewards: 0,                 // Puntos acumulados
    characterFrame: 0           // Animación frame
}

// 3. INTERACCIÓN (Lo que el estudiante hace)
function completeSubmission(subId, name) {
    STATE.completedMissions.push(subId);
    STATE.rewards += 10;
    saveStateToStorage();        // Guarda progreso
    updateUI();                  // Actualiza visualmente
    alert(`✅ ¡Completado!\n📍 ${name}\n🏆 +10 puntos`);
}

// 4. INTERFACE (Botones y opciones)
// HTML generado automáticamente basado en MISSIONS
```

---

## 📚 CÓMO TRADUCIR TU CONTENIDO A NOVA

### Estructura Pedagógica Estándar

Tu contenido debe seguir esta estructura:

```
MISIÓN (Tema Grande)
├── SUBMISIÓN 1 (Subtema A)
├── SUBMISIÓN 2 (Subtema B)
└── SUBMISIÓN 3 (Subtema C)
```

### Ejemplos de Adaptación

#### EJEMPLO 1: Tema = Funciones del Sistema

```javascript
1: {
    title: "Construir Funciones",
    description: "Identifica y documenta qué debe HACER el sistema",
    submissions: [
        { id: "1a", name: "Función de Entrada" },
        { id: "1b", name: "Función de Procesamiento" },
        { id: "1c", name: "Función de Salida" }
    ]
}

// Submisones pueden ser:
// - Leer documentación
// - Completar un cuestionario
// - Mapear funciones en un diagrama
// - Proponer una función nueva
```

#### EJEMPLO 2: Tema = Requerimientos No-Funcionales

```javascript
2: {
    title: "Identificar Condiciones",
    description: "Define QUÉ se necesita para que el sistema exista",
    submissions: [
        { id: "2a", name: "Requisitos de Performance" },
        { id: "2b", name: "Requisitos de Seguridad" },
        { id: "2c", name: "Requisitos de Usabilidad" }
    ]
}
```

#### EJEMPLO 3: Tema = Documentación y Colaboración

```javascript
4: {
    title: "Recopilatorio Integrado",
    description: "Reúne todos los requisitos en un documento único",
    submissions: [
        { id: "4a", name: "Especificación Técnica" },
        { id: "4b", name: "Matriz de Trazabilidad" },
        { id: "4c", name: "Documento de Entrega" }
    ]
}
```

---

## 🎯 PLANTILLA PARA CREAR NUEVAS MISIONES

Usa esta plantilla cuando le pidas a GPT:

```javascript
// NUEVA MISIÓN: [Tu Tema]
// Objetivo Pedagógico: [Qué aprenderán]
// Duración: [Cuánto tiempo]

{
    title: "[Nombre atractivo]",
    description: "[Explicación clara]",
    submissions: [
        { 
            id: "[XYa]",     // X=número misión, Y=submisión
            name: "[Subtema 1 - Forma narrativa]"
        },
        { 
            id: "[XYb]", 
            name: "[Subtema 2 - Forma narrativa]"
        },
        { 
            id: "[XYc]", 
            name: "[Subtema 3 - Forma narrativa]"
        }
    ]
}

// CONTENIDO EDUCATIVO (opcional pero recomendado):
// - ¿Qué debe aprender el estudiante?
// - ¿Cómo lo evaluamos?
// - ¿Qué feedback dar?
```

---

## 🎓 ALINEACIÓN CON OBJETIVOS PEDAGÓGICOS

### Cómo conectar NOVA con tus objetivos

**Paso 1: Define tus objetivos**
```
Mis estudiantes deben aprender a:
1. [Objetivo 1]
2. [Objetivo 2]
3. [Objetivo 3]
```

**Paso 2: Crea una misión por objetivo**
```
Misión 1 → Objetivo 1
Misión 2 → Objetivo 2
Misión 3 → Objetivo 3
```

**Paso 3: Desglosalo en submisiones**
```
Cada misión tiene 3 submisiones que son pasos hacia el objetivo
```

**Ejemplo Completo:**

Objetivo: "El estudiante debe evaluar si un requisito es SMART (Específico, Medible, Alcanzable, Relevante, Temporal)"

```javascript
5: {
    title: "Validar Requisitos SMART",
    description: "Aprende a evaluar si los requisitos son válidos",
    submissions: [
        {
            id: "5a",
            name: "Especificidad: ¿Es claro el requisito?"
            // → Actividad: Analizar requisito vago vs. específico
        },
        {
            id: "5b",
            name: "Medibilidad: ¿Se puede medir?"
            // → Actividad: Agregar métricas a requisito
        },
        {
            id: "5c",
            name: "Validación Completa: ¿Pasa los 5 criterios?"
            // → Actividad: Evaluar 5 requisitos reales
        }
    ]
}
```

---

## 💡 PROMPTS LISTOS PARA COPIAR A GPT

### Prompt 1: Crear una misión individual

```
Estoy diseñando una clase gamificada con NOVA.

Necesito una nueva MISIÓN sobre: [TU TEMA]
Objetivo pedagógico: [Qué deben aprender]
Nivel: [Introductorio/Intermedio/Avanzado]
Contexto: [Brief descripción]

Crea para mí:
1. ID y nombre de la misión
2. Descripción clara en 1 línea
3. Tres submisiones relacionadas con estos subtemas:
   - [Subtema A]
   - [Subtema B]
   - [Subtema C]

Formato exacto:
{
    title: "...",
    description: "...",
    submissions: [
        { id: "Xa", name: "..." },
        { id: "Xb", name: "..." },
        { id: "Xc", name: "..." }
    ]
}

También dame:
- Una línea de cómo se evalúa cada submisión
- Un tip pedagógico para cada una
```

### Prompt 2: Crear contenido para submisiones

```
Tengo esta submisión en mi plataforma NOVA:

Misión: [Nombre]
Submisión: [id] - [Nombre]

Necesito crear el contenido educativo para esta actividad.
Mi clase es: [Nombre clase]
Nivel: [Año académico]

¿Puedes generar:
1. Una descripción del concepto (5 líneas max)
2. Un ejemplo práctico y simple
3. 3 preguntas de reflexión para los estudiantes
4. Un criterio de evaluación claro
5. Feedback positivo si lo completan bien

Mantén lenguaje simple y accesible para [nivel].
Incluye emojis para que sea más atractivo visualmente.
```

### Prompt 3: Crear un set de misiones completo

```
Necesito crear un MÓDULO COMPLETO de 3 misiones para NOVA.

Tema del módulo: [TU TEMA]
Duración esperada: [Semanas/Horas]
Objetivo general: [Qué dominarán los estudiantes]

La progresión debe ser:
Misión 1 (IDs 7-9): [Nivel intro] - [Qué aprenderán]
Misión 2 (IDs 10-12): [Nivel intermedio] - [Qué aprenderán]
Misión 3 (IDs 13-15): [Nivel avanzado] - [Qué aprenderán]

Para CADA misión dame:
- Título atractivo
- Descripción clara
- 3 submisiones progresivas
- Cómo evalúo si completaron cada submisión

Formato: JavaScript puro, listo para copiar a script.js
```

### Prompt 4: Crear retroalimentación personalizada

```
En mi plataforma NOVA, cuando los estudiantes completan una submisión,
ven un mensaje: "✅ ¡Completado!\n📍 [Nombre]\n🏆 +10 puntos"

Quiero hacer esto MÁS EDUCATIVO.

Para la misión: [Nombre]
Submisión: [id] - [Nombre]

Crea TRES versiones de retroalimentación:
1. Si lo completó bien (mensaje positivo)
2. Si lo hizo pero falta algo (consejo mejorador)
3. Si recurre 2+ veces (reconocimiento del esfuerzo)

Ej:
"✅ ¡Excelente! Has identificado la función de [X].
💡 Ahora piensa: ¿Cuál sería su condición para existir?
🏆 +10 puntos + 🎯 Bonus: Avance al siguiente concepto"
```

---

## 🏆 SISTEMA DE PUNTOS Y BADGES

### Valores Recomendados

```javascript
// Puntos por dificultad
- Submisión Básica = 10 puntos
- Submisión Intermedia = 15 puntos
- Submisión Avanzada = 20 puntos

// Bonificadores opcionales
- Completar 3 submisiones de una misión = +5 bonus
- Completar en tiempo = +5 bonus
- Respuesta correcta a la primera = +5 bonus

// Ejemplo
STATE.rewards += 10;  // Por completar
if (completedFast) STATE.rewards += 5;
if (isFirstTry) STATE.rewards += 5;
```

### Badges Especiales

```javascript
// Desbloqueables por hitos
if (STATE.rewards >= 30) unlock("🌱 Germinator");
if (STATE.rewards >= 60) unlock("📚 Scholar");
if (STATE.rewards >= 100) unlock("🏆 Master");
if (STATE.completedMissions.length === 6) unlock("⭐ Completionista");
```

---

## 🔧 INTEGRACIÓN TÉCNICA

### Dónde agregar nuevas misiones

**En `script.js`, línea ~5-45, busca:**

```javascript
const MISSIONS = {
    1: { ... },
    2: { ... },
    3: { ... },
    4: { ... },
    5: { ... },
    6: { ... }
    
    // AQUÍ AGREGAR NUEVAS:
    // 7: { ... },
    // 8: { ... },
    // etc.
};
```

### Paso a paso para agregar

1. Copia el JavaScript que GPT genera
2. En `script.js`, encuentra `const MISSIONS = {`
3. Después de la misión 6, agrega una coma
4. Pega el nuevo objeto misión
5. Asegúrate IDs sean únicos: "7a", "7b", "7c", etc.
6. Guarda el archivo
7. Recarga la web en navegador
8. ¡Nuevas misiones aparecen automáticamente!

---

## 📊 CÓMO HACER SEGUIMIENTO DEL APRENDIZAJE

### Lo que NOVA registra automáticamente

```javascript
localStorage.novaGameState = {
    completedMissions: ["1a", "1b", "2a", ...],  // Qué hicieron
    rewards: 45,                                  // Puntos totales
    characterFrame: 0                             // Metadata
}
```

### Cómo usar esto para evaluación

**Método 1: Auditar manualmente**
- Abre DevTools (F12)
- Console → `JSON.parse(localStorage.novaGameState)`
- Ves exactamente qué completó cada estudiante

**Método 2: Exportar datos**
```javascript
// En consola:
copy(JSON.stringify(JSON.parse(localStorage.novaGameState), null, 2))
// Pega en Excel/Sheets
```

**Método 3: Crear un sistema de exportación** (avanzado)
```javascript
// Agregar botón en HTML que descargue JSON
// O exportar a Google Forms
// O conectar a una base de datos
```

---

## 🚀 EJEMPLO COMPLETO: DE CERO A FUNCIONAL

### Escenario: Clase de "Análisis de Requerimientos"

**Mi clase:**
```
Nombre: Análisis de Requerimientos Ágil
Semanas: 6
Tema: Cómo escribir requerimientos claros para proyectos software
Nivel: 1er año Ingeniería
Estudiantes: 30 personas
```

**Mis objetivos:**
1. Diferenciar requisitos funcionales de no-funcionales
2. Escribir requisitos en formato user story
3. Validar que un requisito sea SMART
4. Documentar en una matriz de trazabilidad
5. Presentar especificación técnica
6. Trabajar colaborativamente en equipo

**Plan NOVA (6 misiones = 6 semanas):**

```javascript
const MISSIONS = {
    // Misión 1: Conceptos Básicos
    1: {
        title: "Entender Qué es un Requisito",
        description: "Aprende diferencias entre funcionales y no-funcionales",
        submissions: [
            { id: "1a", name: "¿Funcional o No-Funcional?" },   // Quiz
            { id: "1b", name: "Mapea requisitos de un app real" }, // Análisis
            { id: "1c", name: "Explica a un compañero" }          // Peer teaching
        ]
    },
    
    // Misión 2: User Stories
    2: {
        title: "Redactar User Stories",
        description: "Escribe requisitos en formato 'Como... Quiero... Porque...'",
        submissions: [
            { id: "2a", name: "Escribe 3 user stories" },        // Producción
            { id: "2b", name: "Revisa stories de compañeros" },  // Feedback
            { id: "2c", name: "Refina tus stories" }              // Mejora
        ]
    },
    
    // Misión 3: Validación SMART
    3: {
        title: "Validar Requisitos SMART",
        description: "Evalúa si los requisitos son válidos",
        submissions: [
            { id: "3a", name: "Aprende criterios SMART" },       // Conceptual
            { id: "3b", name: "Valida 5 requisitos reales" },    // Análisis
            { id: "3c", name: "Propone mejoras a requisitos" }   // Síntesis
        ]
    },
    
    // Misión 4: Matriz de Trazabilidad
    4: {
        title: "Crear Matriz de Trazabilidad",
        description: "Documenta relaciones entre requisitos y pruebas",
        submissions: [
            { id: "4a", name: "Entiende matriz de trazabilidad" }, // Conceptual
            { id: "4b", name: "Crea una para proyecto ejemplo" },  // Aplicación
            { id: "4c", name: "Revisa matriz de equipo" }          // Colaboración
        ]
    },
    
    // Misión 5: Especificación Técnica
    5: {
        title: "Documentar Especificación Técnica",
        description: "Integra todos los requisitos en documento formal",
        submissions: [
            { id: "5a", name: "Estudio: Partes de especificación" }, // Lectura
            { id: "5b", name: "Redacta especificación completa" },   // Producción
            { id: "5c", name: "Presenta a stakeholders" }             // Comunicación
        ]
    },
    
    // Misión 6: Proyecto Integrador
    6: {
        title: "Proyecto Final: Análisis Real",
        description: "Analiza requisitos de un proyecto real o ficticio",
        submissions: [
            { id: "6a", name: "Selecciona proyecto y analiza" },
            { id: "6b", name: "Documenta en formato profesional" },
            { id: "6c", name: "Defiende tus requisitos en clase" }
        ]
    }
}
```

**Resultado:**
- Estudiantes aprenden 6 conceptos clave
- 18 actividades en 6 semanas (3 por semana)
- Gamificación mantiene engagement
- Progreso visible en real-time
- Evaluación automática registrada

---

## ⚡ RESUMEN RÁPIDO

### Para compartir con GPT, necesitas decirle:

```
1. CONTEXTO
   - Mi clase se llama: [nombre]
   - Tema: [qué enseño]
   - Nivel: [año académico]
   - Duración: [tiempo disponible]

2. OBJETIVOS
   - Quiero que mis estudiantes aprendan: [lista 3-6 conceptos]

3. ESTRUCTURA
   - Crea misiones para cada concepto
   - Cada misión = 3 submisiones
   - Submisiones = pequenas actividades

4. CONTENIDO
   - Dame JavaScript listo para copiar
   - Dame instrucciones de evaluación
   - Dame tips pedagógicos

5. FORMATO
   - Lenguaje simple y accesible
   - Narrativa motivante
   - Emojis para visualidad
```

### Resultado que recibirás:

```
✅ Código JavaScript para script.js
✅ Estructura de datos completa
✅ Criterios de evaluación
✅ Retroalimentación personalizada
✅ Tips para estudiantes
✅ Instrucciones de integración
```

---

## 🎭 LA MAGIA DE NOVA

**Resume en una frase:**

> "NOVA transforma tareas académicas aburridas en una aventura emocionante donde ayudas a salvar una IA, mientras aprendes exactamente lo que necesitas."

**Por eso funciona:**
- 🎮 Gamificación engancha emocionalmente
- 📖 Narrativa da propósito
- 🏆 Puntos celebran logros
- 🤖 Mascota anima a cuidarla
- 💾 Progreso se ve y se guarda
- 🔧 Flexible para cualquier tema

---

**¿Listo para adaptarlo a tu clase?** 
Copia el "Prompt 1", "Prompt 2" o "Prompt 3" arriba y pégalo en ChatGPT modificando los campos.

¡GPT entenderá exactamente qué hacer! 🚀
