# 🎮 Sistema de Actividades Interactivas - NOVA
## Guía de Implementación y Uso

---

## 📋 RESUMEN DE CAMBIOS

Se ha refactorizado completamente el proyecto NOVA para transformar cada "submisión" de un simple "click = completar" a **actividades interactivas reales** con validación, feedback inmediato y adaptaciones UDL (Universal Design for Learning).

### ✨ Nuevas Características

#### 1. **Modal de Actividad Reutilizable**
- Un único modal (`#activityModal`) que se adapta dinámicamente al tipo de actividad
- 8 tipos de actividades implementadas
- Sistema de validación antes de completar
- Feedback inmediato con mensajes de NOVA

#### 2. **Tipos de Actividades Implementadas**

| Tipo | Descripción | Usado en Misiones |
|------|-------------|-------------------|
| **quiz** | Preguntas de opción múltiple con radio buttons | 1a, 1b, 1c, 2a, 2c, 3c |
| **classification** | Clasificar ejemplos como "Función" o "Condición" | 3a, 3b, 4a, 4b, 4c |
| **checklist** | Lista de verificación con checkboxes | 2b, 5b |
| **padlet** | Integración colaborativa (embed o link externo) | 5a |
| **confirmation** | Botón de confirmación simple | 5c |
| **verification** | Verificación de estado del sistema | 6a |
| **action** | Acción especial (ej: botón de despegue) | 6b |
| **celebration** | Pantalla de celebración final | 6c |

#### 3. **Adaptaciones UDL / Neurodivergencia**

✅ **Modo Lectura Fácil**
- Toggle para simplificar el contenido
- Oculta metadata y hints opcionales
- Aumenta tamaño de fuente y espaciado
- Activación: Botón "📖 Lectura fácil" en cada actividad

✅ **Audio Opcional**
- Placeholder UI para futura implementación TTS
- Botón "🔊 Audio" presente en todas las actividades

✅ **Lenguaje Simple**
- Instrucciones en bullets (máximo 4 pasos)
- Frases cortas y directas
- Ejemplos guiados incluidos

✅ **Progreso Visual**
- Feedback inmediato con colores y emojis
- Sin temporizadores estrictos
- Botón "Completar" se habilita solo tras interacción válida

✅ **Respeta `prefers-reduced-motion`**
- Animaciones desactivables automáticamente

---

## 🏗️ ESTRUCTURA TÉCNICA

### 1. Objeto MISSIONS Expandido

Cada `submission` ahora incluye:

```javascript
{
    id: '1a',
    name: 'Actividad: ¿Quién es NOVA?',
    toolType: 'quiz',              // Tipo de actividad
    learningGoal: 'Identificar...',  // Objetivo pedagógico
    udlHints: ['Tip 1', 'Tip 2'],  // Tips para estudiantes
    successCondition: 'Responde correctamente',
    question: '¿Quién es NOVA?',
    options: [...],                 // Para quizzes
    feedback: { correct: '', incorrect: '' },
    novaMessage: 'Gracias por conocerme.' // Mensaje de NOVA
}
```

### 2. Activity Engine (script.js)

**Funciones Principales:**

- `openActivity(submissionId, missionId)` → Abre modal de actividad
- `renderActivity(submission, phase)` → Renderiza contenido según toolType
- `validateActivity(submissionId)` → Valida respuesta del estudiante
- `enableCompleteButton()` → Habilita botón "Completar" tras validación exitosa
- `completeActivityFromModal(submissionId)` → Marca como completada y actualiza todo

**Renderizadores por Tipo:**
- `renderQuiz(submission, container)`
- `renderClassification(submission, container)`
- `renderChecklist(submission, container)`
- `renderPadlet(submission, container)`
- `renderConfirmation(submission, container)`
- `renderVerification(submission, container)`
- `renderAction(submission, container)`
- `renderCelebration(submission, container)`

### 3. Estado Expandido (STATE)

```javascript
STATE = {
    completedMissions: [],
    rewards: 0,
    currentPhase: 'activation',
    activityInteractions: {},   // NUEVO: Trackea interacciones
    currentActivity: null,      // NUEVO: Actividad actual abierta
    readingMode: false,         // NUEVO: Modo lectura fácil
    messagesMuted: false,
    showedFinalScreen: false,
    // ...
}
```

### 4. HTML: Modal Reutilizable

```html
<div class="modal" id="activityModal">
    <div class="modal-content activity-modal-content">
        <!-- Header con título y objetivo -->
        <!-- UDL Controls (Lectura fácil, Audio) -->
        <!-- Instrucciones y Hints -->
        <!-- Contenido dinámico (quiz, classification, etc.) -->
        <!-- Feedback inmediato -->
        <!-- Botones: Validar, Completar, Cancelar -->
    </div>
</div>
```

### 5. CSS: Estilos por Tipo de Actividad

- `.activity-quiz` → Opciones de quiz estilizadas
- `.activity-classification` → Botones grandes de clasificación
- `.activity-checklist` → Checkboxes con hover effects
- `.activity-padlet` → Placeholder + iframe integrado
- `.activity-celebration` → Gradiente animado
- `.reading-mode` → Modificador para modo lectura fácil

---

## 🎯 FLUJO DE USO (Usuario)

### Antes (Sistema Antiguo)
1. Estudiante hace clic en submisión → ✅ Completado (sin interacción)

### Ahora (Sistema Nuevo)
1. Estudiante hace clic en submisión
2. → Se abre modal con actividad específica
3. → Lee instrucciones y tips
4. → Interactúa con la actividad (responde quiz, clasifica, marca checklist, etc.)
5. → Hace clic en "Verificar Respuesta"
6. → Recibe feedback inmediato (correcto/incorrecto)
7. → Si es correcto, se habilita botón "✓ Marcar como Completada"
8. → Hace clic en "Completar" → +10 puntos, mensaje de NOVA, se cierra modal
9. → Progreso guardado en localStorage

---

## 📚 ITINERARIO DE 30 MINUTOS (Sin Cambios)

El sistema de actividades **no modifica el itinerario pedagógico** original:

| Tiempo | Misión | Actividades |
|--------|--------|-------------|
| 0-5 min | Activación | 3 quizzes simples |
| 5-10 min | Exploración | Quiz + checklist + quiz |
| 10-18 min | Conceptos | 2 clasificaciones + 1 quiz |
| 18-25 min | Aplicación | 3 clasificaciones |
| 25-28 min | Colaboración | Padlet + checklist + confirmación |
| 28-30 min | Cierre | Verificación + acción + celebración |

**Cambio clave:** Cada actividad ahora es **guiada, validada y retroalimentada**.

---

## 🔧 CONFIGURACIÓN PARA DOCENTES

### 1. Configurar Padlet (Misión 5a)

En `script.js`, línea ~195:

```javascript
{ 
    id: '5a', 
    name: 'Abrir Padlet Colaborativo',
    toolType: 'padlet',
    embedUrl: 'https://padlet.com/TU_USUARIO/TU_PADLET',  // ← Pega tu URL aquí
    // ...
}
```

**Opciones:**
- **Con URL:** Se incrusta en iframe dentro del modal
- **Sin URL:** Muestra placeholder con botón "Abrir Padlet" (abre en nueva pestaña)

### 2. Personalizar Mensajes de NOVA

Cada actividad tiene un campo `novaMessage`:

```javascript
novaMessage: 'Gracias por conocerme.'
```

Puedes editarlos para adaptarlos a tu contexto.

### 3. Ajustar Validaciones

**Checklist (Misión 2b, 5b):**
```javascript
// En validateChecklist(), línea ~XXX
const minRequired = 2; // Cambia el mínimo de items requeridos
```

**Quiz:** Respuesta correcta marcada con `correct: true` en el array `options`.

**Classification:** Respuesta correcta en `correctAnswer: 'function'` o `'condition'`.

---

## ♿ ACCESIBILIDAD IMPLEMENTADA

- ✅ **ARIA labels** en todos los modales
- ✅ **Focus trap** al abrir modal (Escape para cerrar)
- ✅ **Targets táctiles mínimos** (44px) en todos los botones
- ✅ **Alto contraste** (WCAG 2.1 AA)
- ✅ **Navegación por teclado** funcional
- ✅ **Feedback multimodal** (visual + texto)
- ✅ **Prefers reduced motion** respetado

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### Problema: "El botón Completar no se habilita"
**Causa:** No se validó la respuesta correctamente.
**Solución:** Asegúrate de:
1. Seleccionar una opción en quiz
2. Hacer clic en "Verificar Respuesta"
3. La respuesta debe ser correcta

### Problema: "El Padlet no se muestra"
**Causa:** URL no configurada o inválida.
**Solución:** 
1. Ve a `script.js`, línea ~195
2. Reemplaza `'DOCENTE: Pega aquí tu URL de Padlet'` con tu URL real
3. Asegúrate de usar la URL de embed (no de compartir)

### Problema: "No se guarda el progreso"
**Causa:** Navegador en modo incógnito o localStorage deshabilitado.
**Solución:** Usa modo normal del navegador.

### Problema: "Modo lectura fácil no funciona"
**Causa:** JavaScript deshabilitado.
**Solución:** Habilita JavaScript en el navegador.

---

## 📊 DATOS DE INTERACCIÓN GUARDADOS

El sistema trackea (en `STATE.activityInteractions[submissionId]`):

```javascript
{
    '1a': {
        opened: 1677849600000,        // Timestamp de apertura
        attempts: 1,                  // Número de intentos
        interactions: ['selected-option'], // Acciones realizadas
        completed: 1677849650000      // Timestamp de completado
    }
}
```

**Futuro:** Estos datos pueden exportarse para análisis pedagógico.

---

## 🎨 PERSONALIZACIÓN VISUAL

### Cambiar Colores del Feedback

En `styles.css`, líneas ~XXX:

```css
.activity-feedback.feedback-correct {
    background: var(--color-success); /* Verde */
}

.activity-feedback.feedback-incorrect {
    background: #ffebee; /* Rojo claro */
    color: #c62828;
}
```

### Cambiar Animaciones

```css
.activity-complete-btn.enabled {
    animation: pulseButton 2s infinite;
}
```

Cambia `2s` por la duración deseada o remueve completamente.

---

## 🚀 PRÓXIMOS PASOS SUGERIDOS

### Mejoras Futuras:
1. **Audio real con TTS (Text-to-Speech)**
   - Integrar Web Speech API o servicio externo
   - Activar desde el botón "🔊 Audio"

2. **Exportar datos de interacción**
   - Botón para docente que descargue JSON con `STATE.activityInteractions`
   - Análisis de tiempo por actividad, intentos, etc.

3. **Más tipos de actividades**
   - Drag & drop para ordenar requisitos
   - Matching game (emparejar funciones con condiciones)
   - Simulador de sistema (actividad tipo sandbox)

4. **Gamificación adicional**
   - Insignias por logros específicos
   - Tabla de líderes (opcional, con consentimiento)
   - Efectos de sonido al completar (con toggle)

5. **Backend opcional**
   - Guardar progreso en servidor
   - Dashboard para docentes
   - Colaboración en tiempo real

---

## 📖 RECURSOS ADICIONALES

- **Documentación completa:** `DOCUMENTACION.md`
- **Guía pedagógica:** `PEDAGOGICAL_GUIDE.md`
- **Referencia rápida:** `QUICK_REFERENCE.md`
- **Guía para GPT:** `GUIA_GPT.md`

---

## 💡 PRINCIPIOS DE DISEÑO APLICADOS

1. **Baja exigencia cognitiva:** Actividades guiadas paso a paso
2. **Feedback inmediato:** Validación antes de continuar
3. **Autonomía del estudiante:** Control sobre lectura fácil y audio
4. **Sin penalizaciones:** Pueden intentar múltiples veces
5. **Progreso visible:** Siempre saben dónde están
6. **Contextualización:** Narrativa de NOVA presente en todo momento

---

## ✅ CHECKLIST DE VERIFICACIÓN

Antes de usar con estudiantes:

- [ ] Probado en dispositivo móvil
- [ ] Probado en tablet
- [ ] Probado en desktop
- [ ] URL de Padlet configurada (Misión 5a)
- [ ] Modo lectura fácil probado
- [ ] Todas las actividades completables
- [ ] Celebración final funciona (Misión 6c)
- [ ] localStorage guarda progreso
- [ ] Mensajes de NOVA aparecen correctamente

---

**🌟 ¡El sistema está listo para transformar el aprendizaje de tus estudiantes!**

---

**Última actualización:** 25 de febrero de 2026  
**Versión:** 2.0 - Sistema de Actividades Interactivas
