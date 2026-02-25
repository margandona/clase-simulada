# 🎓 Guía de Personalización para Docentes
## Cómo Adaptar Actividades a Tu Clase

---

## 🔧 EDICIONES RÁPIDAS (Sin Conocimientos Técnicos)

### 1. Cambiar una Pregunta de Quiz

**Ubicación:** `script.js`, línea 16 (ejemplo para Misión 1a)

**Antes:**
```javascript
question: '¿Quién es NOVA?',
options: [
    { text: 'Una inteligencia artificial varada en órbita', correct: true },
    { text: 'Un astronauta humano perdido', correct: false },
    { text: 'Un satélite de comunicaciones', correct: false }
]
```

**Después (tu versión):**
```javascript
question: '¿Qué tipo de sistema es NOVA?',
options: [
    { text: 'Un sistema con requisitos incompletos', correct: true },
    { text: 'Un sistema completamente funcional', correct: false },
    { text: 'Un sistema sin requisitos', correct: false }
]
```

**Reglas:**
- Solo UNA opción debe tener `correct: true`
- Puedes agregar hasta 4-5 opciones
- Mantén el texto breve (máximo 80 caracteres por opción)

---

### 2. Cambiar Ejemplo de Clasificación

**Ubicación:** `script.js`, línea ~145 (ejemplo para Misión 3a)

**Antes:**
```javascript
example: 'NOVA debe enviar señales de comunicación a la Tierra',
correctAnswer: 'function',
```

**Después (tu ejemplo):**
```javascript
example: 'El sistema debe autenticar usuarios con contraseña',
correctAnswer: 'function',
```

**Valores permitidos para `correctAnswer`:**
- `'function'` → Si es una FUNCIÓN (acción que realiza)
- `'condition'` → Si es una CONDICIÓN (requisito necesario)

---

### 3. Cambiar Items de Checklist

**Ubicación:** `script.js`, línea ~108 (ejemplo para Misión 2b)

**Antes:**
```javascript
checklistItems: [
    { text: 'Funciones del sistema', value: 'functions' },
    { text: 'Condiciones necesarias', value: 'conditions' },
    { text: 'Documentación clara', value: 'documentation' },
    { text: 'Color de la nave', value: 'color' }
]
```

**Después (tu versión):**
```javascript
checklistItems: [
    { text: 'Requisitos funcionales definidos', value: 'functional' },
    { text: 'Requisitos no funcionales especificados', value: 'nonfunctional' },
    { text: 'Casos de uso documentados', value: 'usecases' },
    { text: 'Interfaz de usuario diseñada', value: 'ui' }
]
```

**Nota:** El `value` es solo un identificador interno, no se muestra al estudiante.

---

### 4. Cambiar Mensajes de NOVA

**Ubicación:** Cada actividad tiene un campo `novaMessage`

**Ejemplo (Misión 1a):**
```javascript
novaMessage: 'Gracias por conocerme.'
```

**Personalízalo:**
```javascript
novaMessage: '¡Exacto! Ahora sabes quién soy. Sigamos.'
```

**Ubicaciones de mensajes:**
- Misión 1a, 1b, 1c (líneas ~33, 51, 69)
- Misión 2a, 2b, 2c (líneas ~91, 113, 132)
- Misión 3a, 3b, 3c (líneas ~157, 178, 199)
- Misión 4a, 4b, 4c (líneas ~222, 243, 264)
- Misión 5a, 5b, 5c (líneas ~294, 316, 337)
- Misión 6a, 6b, 6c (líneas ~361, 379, 400)

---

## 📝 EDICIONES INTERMEDIAS (Conocimientos Básicos)

### 5. Agregar Tips (udlHints) Personalizados

Los `udlHints` son los tips pedagógicos que aparecen en cada actividad.

**Ejemplo:**
```javascript
udlHints: [
    'Lee la historia arriba para encontrar la respuesta',
    'Piensa en el problema de NOVA',
    'No hay respuestas incorrectas, solo aprendizaje'
]
```

**Recomendaciones:**
- 2-3 tips máximo
- Frases cortas (máximo 60 caracteres)
- Usa lenguaje simple y directo
- Incluye estrategias cognitivas (ej: "Compara con...", "Piensa en...")

---

### 6. Cambiar Objetivo de Aprendizaje

Cada actividad tiene un `learningGoal` que se muestra al estudiante.

**Antes:**
```javascript
learningGoal: 'Identificar a NOVA como personaje protagonista'
```

**Después:**
```javascript
learningGoal: 'Comprender el contexto y problema de NOVA'
```

**Buenas prácticas:**
- Usa verbos de acción (identificar, clasificar, analizar, aplicar)
- Sé específico pero breve (máximo 80 caracteres)
- Alinea con tu objetivo pedagógico real

---

### 7. Personalizar Feedback

Cada actividad con validación tiene campos `feedback` o `explanation`.

**Quizzes (feedback):**
```javascript
feedback: {
    correct: '¡Correcto! NOVA es una IA que necesita tu ayuda.',
    incorrect: 'Revisa la historia arriba y vuelve a intentar.'
}
```

**Clasificaciones (explanation):**
```javascript
explanation: {
    correct: '¡Perfecto! "Enviar señales" es una FUNCIÓN.',
    incorrect: 'No del todo. "Enviar señales" es una acción = FUNCIÓN.'
}
```

**Recomendaciones para feedback:**
- **Correcto:** Refuerza positivamente + pequeña explicación
- **Incorrecto:** No desanimes + da una pista o estrategia

---

## 🎯 EDICIONES AVANZADAS (Docentes con Experiencia)

### 8. Crear una Nueva Actividad

**Plantilla para Quiz:**
```javascript
{
    id: 'NuevaID',  // Ej: '7a', '7b', '7c'
    name: 'Actividad: Nombre Descriptivo',
    toolType: 'quiz',
    learningGoal: 'Objetivo claro y específico',
    udlHints: ['Tip 1', 'Tip 2'],
    successCondition: 'Responde correctamente',
    question: '¿Tu pregunta aquí?',
    options: [
        { text: 'Opción A', correct: false },
        { text: 'Opción B (correcta)', correct: true },
        { text: 'Opción C', correct: false }
    ],
    feedback: {
        correct: 'Mensaje de éxito',
        incorrect: 'Mensaje de ayuda'
    },
    novaMessage: 'Mensaje de NOVA al completar'
}
```

**Plantilla para Clasificación:**
```javascript
{
    id: 'NuevaID',
    name: 'Clasificar: [Nombre]',
    toolType: 'classification',
    learningGoal: 'Aplicar clasificación a casos reales',
    udlHints: ['Tip sobre cómo decidir'],
    successCondition: 'Clasifica correctamente',
    example: 'Tu ejemplo/caso aquí...',
    question: '¿FUNCIÓN o CONDICIÓN?',
    correctAnswer: 'function',  // o 'condition'
    explanation: {
        correct: 'Mensaje si acertó',
        incorrect: 'Mensaje si falló'
    },
    hint: 'Pista breve (opcional)',
    novaMessage: 'Mensaje de NOVA'
}
```

---

### 9. Agregar una Nueva Misión Completa

**Paso 1: Define la estructura**
```javascript
7: {
    title: 'Misión 7: [Tu Tema]',
    description: 'Breve descripción de esta misión',
    phase: 'advanced',  // O usa una fase existente
    instructions: '🔥 Instrucción general para las 3 actividades:',
    submissions: [
        // Agrega 3 actividades aquí (usa plantillas de arriba)
    ]
}
```

**Paso 2: Actualiza el HTML**
Agrega un botón en `index.html` (línea ~163):

```html
<button class="menu-button" id="mission-7-btn" type="button">
    <span class="menu-emoji">🔥</span>
    Misión 7: [Tu Tema]
    <span class="mission-badge" id="badge-7">○</span>
</button>
```

**Paso 3: Wire el botón en JS**
En `setupMissionButtons()` (línea ~433), cambia:

```javascript
for (let i = 1; i <= 6; i++) {  // Cambia 6 por 7
```

---

### 10. Configurar Padlet Embed (Incrustado)

**Opción A: Enlace externo (actual)**
```javascript
{ 
    id: '5a',
    toolType: 'padlet',
    embedUrl: 'DOCENTE: Pega aquí tu URL',
    // ...
}
```

**Opción B: Iframe incrustado**
```javascript
{ 
    id: '5a',
    toolType: 'padlet',
    embedUrl: 'https://padlet.com/embed/TU_PADLET_ID',
    // ...
}
```

**Cómo obtener URL de embed:**
1. Abre tu Padlet
2. Clic en ⚙️ (configuración) → Compartir/Exportar
3. Copia la URL de "Insertar" (embed)
4. Pégala en `embedUrl`

---

## 🎨 PERSONALIZACIÓN VISUAL

### 11. Cambiar Colores de Feedback

**Ubicación:** `styles.css`, línea ~XXX

**Feedback Correcto (Verde):**
```css
.activity-feedback.feedback-correct {
    background: #4ade80;  /* Cambia este código de color */
    color: #ffffff;
}
```

**Feedback Incorrecto (Rojo):**
```css
.activity-feedback.feedback-incorrect {
    background: #ffebee;
    color: #c62828;  /* Cambia este código */
}
```

**Generador de colores:** https://coolors.co/

---

### 12. Cambiar Estilo de Botones de Clasificación

**Ubicación:** `styles.css`, línea ~XXX

**Actual:**
```css
.classification-btn {
    background: var(--color-bg);
    border: 3px solid var(--color-status-bg);
    font-size: var(--font-size-lg);
    min-height: 100px;
}
```

**Ajustes posibles:**
- `min-height: 120px;` → Botones más altos
- `font-size: 1.5rem;` → Texto más grande
- `border: 4px solid ...` → Bordes más gruesos

---

## 🧪 TESTING Y VALIDACIÓN

### Checklist Después de Editar

- [ ] **Guarda el archivo** (`Ctrl+S`)
- [ ] **Recarga la página** (`Ctrl+Shift+R` para forzar recarga)
- [ ] **Prueba la actividad modificada**
- [ ] **Verifica que el feedback aparezca**
- [ ] **Confirma que se puede completar**
- [ ] **Revisa en móvil** (F12 → Toggle Device Toolbar)

---

## 🆘 ERRORES COMUNES Y SOLUCIONES

### Error 1: "Actividad no abre"
**Causa:** Error de sintaxis en `script.js`
**Solución:**
1. F12 → Console (busca errores rojos)
2. Verifica que todas las comillas cierren: `'texto'`
3. Verifica que todas las llaves cierren: `{ ... }`
4. Usa un validador JSON: https://jsonlint.com/

### Error 2: "Feedback no aparece"
**Causa:** Campos `feedback` o `explanation` mal escritos
**Solución:** Verifica que:
```javascript
feedback: {
    correct: 'Texto aquí',      // ← Comas correctas
    incorrect: 'Texto aquí'     // ← Sin coma al final
}
```

### Error 3: "Botón Completar no se habilita"
**Causa:** `correctAnswer` mal definido
**Solución:** 
- Quizzes: Una opción debe tener `correct: true`
- Clasificaciones: `correctAnswer: 'function'` o `'condition'`

### Error 4: "Se pierde el progreso"
**Causa:** Modo incógnito del navegador
**Solución:** Usa modo normal (localStorage no funciona en incógnito)

---

## 📚 EJEMPLOS DE USO POR ASIGNATURA

### Para Requisitos de Software (actual)
✅ Ya implementado

### Para Base de Datos
```javascript
{
    id: '1a',
    name: 'Clasificar: Entidad vs Atributo',
    toolType: 'classification',
    example: 'Un estudiante tiene un nombre',
    question: '¿ENTIDAD o ATRIBUTO?',
    correctAnswer: 'condition',  // "nombre" es atributo
    // ...
}
```

### Para Programación
```javascript
{
    id: '2a',
    name: 'Quiz: Sintaxis de Python',
    toolType: 'quiz',
    question: '¿Cómo se define una función en Python?',
    options: [
        { text: 'def nombre():', correct: true },
        { text: 'function nombre():', correct: false },
        { text: 'func nombre():', correct: false }
    ],
    // ...
}
```

### Para Diseño UX/UI
```javascript
{
    id: '3a',
    name: 'Clasificar: Usabilidad vs Estética',
    toolType: 'classification',
    example: 'Los botones deben ser fáciles de presionar',
    question: '¿USABILIDAD o ESTÉTICA?',
    correctAnswer: 'function',
    // ...
}
```

---

## 💡 TIPS DE DISEÑO PEDAGÓGICO

### 1. Progresión de Dificultad
- **Misión 1-2:** Reconocimiento simple (quiz de opciones)
- **Misión 3-4:** Aplicación (clasificaciones)
- **Misión 5-6:** Síntesis y colaboración

### 2. Feedback Constructivo
**Malo:**  
❌ "Incorrecto. Intenta de nuevo."

**Bueno:**  
✅ "No del todo. Recuerda: las funciones describen ACCIONES. Revisa el ejemplo y vuelve a intentar."

### 3. Tips Efectivos
**Malo:**  
❌ "Lee con atención"

**Bueno:**  
✅ "Busca verbos de acción para identificar funciones"
✅ "Pregúntate: ¿Describe LO QUE HACE o LO QUE NECESITA?"

---

## 🌟 RECURSOS ADICIONALES

- **Tutorial de JSON:** https://www.w3schools.com/js/js_json_intro.asp
- **Guía de Colores Accesibles:** https://webaim.org/resources/contrastchecker/
- **Banco de Emojis:** https://emojipedia.org/

---

## 📞 SOPORTE

Si necesitas ayuda adicional:
1. Revisa `ACTIVITY_SYSTEM_GUIDE.md` (documentación técnica)
2. Revisa `PEDAGOGICAL_GUIDE.md` (guía pedagógica)
3. Usa el validador de JSON para verificar sintaxis
4. Documenta el error que ves en la consola (F12)

---

**¡Estás listo para personalizar NOVA para tu clase!** 🚀
