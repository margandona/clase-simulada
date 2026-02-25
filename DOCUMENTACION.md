# NOVA - Plataforma Educativa Gamificada
## Documentación Técnica y Pedagógica

---

## 📋 DESCRIPCIÓN GENERAL

**NOVA** es una plataforma educativa interactiva diseñada para enseniar conceptos de software y requisitos del sistema a estudiantes de primer año de informática. 

- **Tema:** Requerimientos de software (funciones y condiciones)
- **Público:** Estudiantes de primer año de computer science
- **Formato:** Aplicación web responsive, accesible, sin frameworks
- **Tecnología:** HTML5, CSS3, JavaScript vanilla
- **Narrativa:** Los estudiantes ayudan a NOVA (mascota IA) a reconstruir su sistema para regresar a casa

---

## 🎮 ESTRUCTURA GENERAL DE LA INTERFAZ

### Layout Principal (Mobile-First)

```
┌─────────────────────────────────────┐
│  HEADER CON PERSONAJE               │
│  ├─ Título: "NOVA - Nivel 1"        │
│  ├─ Stats: [0 misiones] [⭐ Nivel] [0 recompensas]
│  ├─ NOVA (Mascota Animada)          │
│  │  └─ Anima: Pestañeo + Boca       │
│  └─ Info Box (Metadata del juego)   │
├─────────────────────────────────────┤
│  STATUS CARDS (Grid 2x2)            │
│  ├─ ❤️ Motivación                   │
│  ├─ ⚡ Energía                      │
│  ├─ 😊 Felicidad                    │
│  └─ 🎯 Progreso                     │
├─────────────────────────────────────┤
│  MAIN CONTENT                       │
│  ├─ 📖 Historia de NOVA (Botón)    │
│  ├─ Menú de Misiones (6 botones)    │
│  │  ├─ 🔧 Construir Funciones       │
│  │  ├─ 📋 Identificar Condiciones   │
│  │  ├─ 🎮 Aventuras del Sistema     │
│  │  ├─ 📦 Recopilatorio             │
│  │  ├─ 💰 Recompensas               │
│  │  └─ 🗺️ Explorar Más               │
│  └─ Submenu Expandible (3 items)    │
└─────────────────────────────────────┘
```

### Componentes Clave

#### 1. **NOVA Character (Mascota Animada)**
- Ubicación: Centro del header
- Tamaño: 200px × 220px
- Animaciones:
  - Frame 0: Ojos abiertos, boca cerrada (normal)
  - Frame 1: Ojos cerrados, boca cerrada (pestañeo)
  - Frame 2: Ojos abiertos, boca abierta (expresión)
- Ciclo: 2.5s reposo → 100ms frame 1 → 100ms frame 2 → 100ms frame 0 → repite

#### 2. **Stats Bar**
```javascript
{
  "missionCount": 0,      // Misiones completadas
  "level": "Nivel 1",     // Nivel actual
  "rewardsCount": 0       // Puntos acumulados
}
```

#### 3. **Info Box**
Muestra metadata del sistema:
- Hora/Timestamp
- Ubicación (Órbita Terrestre)
- Porcentaje del sistema
- Estado actual

#### 4. **Status Cards** (4 cajas)
Cards interactivos que representan el "estado emocional" de NOVA:
- Pueden conectarse a métricas específicas
- Colors: Azul claro (`#d4e5f7`)
- Hover effect: Cambio de color + transformación

---

## 🎯 SISTEMA DE MISIONES

### Estructura de Datos

```javascript
const MISSIONS = {
  missionId: {
    title: "Título de la Misión",
    description: "Descripción corta",
    submissions: [
      { id: "1a", name: "Nombre de Submisión 1" },
      { id: "1b", name: "Nombre de Submisión 2" },
      { id: "1c", name: "Nombre de Submisión 3" }
    ]
  }
}
```

### Las 6 Misiones Base

| ID | Título | Emoji | Submisiones |
|---|---|---|---|
| 1 | Construir Funciones | 🔧 | Func. Comunicación, Diagnóstico, Navegación |
| 2 | Identificar Condiciones | 📋 | Req. Energía, Conectividad, Procesamiento |
| 3 | Aventuras del Sistema | 🎮 | Viaje Estelar, Crisis en Órbita, Rescate |
| 4 | Recopilatorio | 📦 | Doc. Funciones, Condiciones, Integrado |
| 5 | Recompensas | 💰 | Insignia Explorador, Ingeniero, Maestro |
| 6 | Explorar Más | 🗺️ | Desafío Optimización, Escalabilidad, Seguridad |

### Flujo de Interacción

1. **Usuario hace click en botón de Misión**
   - Se abre Submenu expandible
   - Muestra 3 submisiones de esa misión

2. **Usuario selecciona una Submisión**
   - Se marca como completada
   - +10 puntos de recompensa
   - Badge actualizado (○ → ✓)
   - Estado guardado en localStorage

3. **Cuando se completan 3 submisiones de una misión**
   - Badge de misión muestra ✓ (checkmark)
   - Contador de misiones aumenta
   - Datos actualizados en UI

### Persistencia de Estado

```javascript
localStorage.setItem('novaGameState', JSON.stringify({
  completedMissions: ["1a", "1b", "2a", ...],
  rewards: 30,
  characterFrame: 0
}));
```

---

## 🔧 ARQUITECTURA TÉCNICA

### Archivos del Proyecto

```
gamificación/
├── index.html          # Estructura HTML semantic
├── styles.css          # Diseño responsive + CSS variables
├── script.js           # Lógica de juego
└── DOCUMENTACION.md    # Este archivo
```

### Variables CSS Principales

```css
--color-primary: #5b4b9f;           /* Púrpura principal */
--color-primary-light: #7b6bbf;     /* Púrpura claro */
--color-accent: #4a9eff;            /* Azul */
--color-status-bg: #d4e5f7;         /* Fondo de status cards */
--color-text: #2a2a2a;              /* Texto oscuro */
--color-text-inverse: #ffffff;      /* Blanco */
--color-success: #4ade80;           /* Verde de éxito */

/* Responsive breakpoints */
@media (min-width: 640px)  { ... }  /* Tablet */
@media (min-width: 1024px) { ... }  /* Desktop */
```

### Funciones JavaScript Clave

```javascript
// Inicialización
initApp()                           // Inicia todo
setupCharacterAnimation()           // Anima NOVA
setupModals()                       // Abre/cierra modales
setupMissionButtons()               // Event listeners de misiones

// Gestión de Misiones
openMissionSubmenu(missionId)       // Abre submenu
completeSubmission(subId, name)     // Marca como completada

// Estado
saveStateToStorage()                // Guarda progreso
loadStateFromStorage()              // Carga progreso
updateUI()                          // Actualiza UI

// Utilidades
closeAllModals()                    // Cierra todos los modales
scrollToSubmenu()                   // Scroll automático
```

---

## 📱 RESPONSIVIDAD

### Mobile (< 640px)
- Una columna
- Botones full-width
- Header expandido
- Status cards: 2x2 grid

### Tablet (640px - 1023px)
- Ancho máximo: 500px
- Padding aumentado
- Mejor espaciado

### Desktop (1024px+)
- Centering automático
- Mejor distribución del espacio

---

## 🎨 SISTEMA DE COLORES

| Variable | Hex | Uso |
|---|---|---|
| Primary | #5b4b9f | Botones, titles, borders |
| Primary Light | #7b6bbf | Hover states |
| Accent | #4a9eff | Acentos, NOVA |
| Background | #f5f3fa | Fondo general |
| Success | #4ade80 | Checkmarks, badges completadas |
| Status BG | #d4e5f7 | Tarjetas de estado |

---

## 🎭 NARRATIVA Y CONTEXTO

### Historia Principal de NOVA

> NOVA está varada en la órbita terrestre.
> Su nave no está dañada, pero su **sistema de requerimientos está incompleto**.
> Sin requerimientos claros, NOVA no puede viajar.
> Sin requerimientos, el sistema no puede funcionar.
> **Necesita tu ayuda.**

### Línea de Aprendizaje

Los estudiantes aprenden:
1. **Funciones** = ¿Qué debe HACER el sistema?
2. **Condiciones** = ¿QUÉ se necesita para que funcione?
3. **Integración** = Juntar todo en un documento
4. **Aventuras** = Aplicar conocimiento en escenarios
5. **Mastereo** = Desafíos avanzados

---

## 🎮 ELEMENTOS DE GAMIFICACIÓN

### ¿QUÉ ES GAMIFICACIÓN EN NOVA?

Gamificación = Usar elementos típicos de videojuegos en un contexto educativo para aumentar motivación y engagement.

NOVA implementa estas mecánicas:

---

### 1. **PUNTOS (Rewards System)**

**Mecánica:**
- Cada submisión completada = **+10 puntos**
- Los puntos se acumulan en `STATE.rewards`
- Visible en el header en todo momento: `🏆 [número]`

**Psicología detrás:**
- **Feedback inmediato** → Los estudiantes ven instantáneamente su progreso
- **Acumulación visible** → Genera sensación de logro
- **Motivación extrínseca** → Incentiva completar más actividades

**Ejemplo en código:**
```javascript
if (!STATE.completedMissions.includes(submissionId)) {
    STATE.completedMissions.push(submissionId);
    STATE.rewards += 10;  // ← Suma puntos
    
    alert('✅ ¡Completado!\n📍 [Actividad]\n🏆 +10 puntos');
    saveStateToStorage();
    updateUI();  // ← Actualiza counter en header
}
```

**Cómo expandir:**
```javascript
// Puntos variables por dificultad
if (dificultad === 'fácil') STATE.rewards += 5;
if (dificultad === 'media') STATE.rewards += 10;
if (dificultad === 'difícil') STATE.rewards += 20;

// O bonificación por velocidad
if (tiempoCompleción < 300) STATE.rewards += 5; // Bonus
```

---

### 2. **BADGES Y LOGROS (Achievement System)**

**Mecánica:**
- Cada misión tiene un **badge indicador** visual
- Badge inicial: `○` (círculo vacío = sin completar)
- Badge completizado: `✓` (checkmark = misión 100% lista)
- Se muestra en color verde cuando está completo: `🟢 ✓`

**Dónde aparece:**
```html
<span class="mission-badge" id="badge-1">○</span>
<!-- Cuando se completan 3/3 submisiones → ✓ en color success -->
```

**Psicología detrás:**
- **Progreso visual** → Ver qué falta reduce ansiedad
- **Milestones claros** → 3 submisiones = 1 misión cerrada
- **Orgullo de logros** → El ✓ representa un hito alcanzado

**Sistema actual:**
```javascript
function updateUI() {
    const completedByType = {};
    
    // Contar submisiones por tipo
    STATE.completedMissions.forEach(subId => {
        const type = subId.charAt(0);  // "1" de "1a"
        completedByType[type] = (completedByType[type] || 0) + 1;
    });
    
    // Si 3/3 completadas → mostrar checkmark
    for (let i = 1; i <= 6; i++) {
        const badge = document.getElementById(`badge-${i}`);
        if (completedByType[i] && completedByType[i] === 3) {
            badge.textContent = '✓';
            badge.classList.add('completed');  // ← Color verde
        }
    }
}
```

**Expandir con más badges:**
```javascript
// Meta-badges por logros especiales
if (STATE.rewards >= 60) unlockBadge("🏅 Maestro del Sistema");
if (STATE.completedMissions.length === 18) unlockBadge("⭐ Completionista");
if (hasZeroErrors) unlockBadge("💎 Perfección");
```

---

### 3. **CONTADOR DE MISIONES (Progress Tracking)**

**Mecánica:**
- Header muestra: `📊 [X] misiones completadas`
- Se actualiza automáticamente cuando se completa una misión (3/3 submisiones)

**Ubicación:**
```html
<span class="stat-item">📊 <span id="missionCount">0</span></span>
```

**Psicología detrás:**
- **Visibilidad del progreso** → Los estudiantes saben dónde están
- **Metas cuantificables** → "Completar 6 misiones" es claro
- **Competencia amigable** → Pueden comparar con compañeros

**Código:**
```javascript
document.getElementById('missionCount').textContent = STATE.completedMissions.length / 3;
// Resultado: 0, 1, 2, 3... (misiones completadas, no submisiones)
```

---

### 4. **NARRATIVA Y CONTEXTO (Story-Driven Gamification)**

**Mecánica:**
- NOVA es una mascota/personaje que los estudiantes "ayudan"
- Cada misión es un paso en la historia de "traer a NOVA a casa"
- Las submisiones tienen nombres narrativos, no aburridos

**Ejemplos narrativos vs. Aburridos:**

❌ Aburrido:
```
- Actividad 1
- Actividad 2
- Actividad 3
```

✅ Narrativo (NOVA):
```
- Función de Comunicación (NOVA necesita hablar)
- Función de Diagnóstico (NOVA necesita auto-evaluarse)
- Función de Navegación (NOVA necesita viajar a casa)
```

**Psicología detrás:**
- **Immersion** → Los estudiantes se sienten parte de una aventura
- **Propósito** → No estudian "por estudiar", sino para "salvar a NOVA"
- **Empatía** → Conectan emocionalmente con el personaje

**La narrativa crea:**
```
Tarea + Contexto = Motivación

"Completa una función" 
≠ 
"Ayuda a NOVA a poder comunicarse"
```

---

### 5. **MASCOTA ANIMADA (Virtual Pet Mechanic)**

**Mecánica:**
- NOVA pestañea y abre la boca automáticamente
- Es el centro visual de la interfaz
- Da sensación de "vida" al tener animación

**Animación:**
```javascript
// Frame 0: Normal
// Frame 1: Pestañeo (ojos cerrados)
// Frame 2: Boca abierta (expresión)
// Ciclo: 2.5s reposo → 100ms x 3 frames → repite
```

**Psicología detrás:**
- **Presencia emocional** → Una mascota anima a cuidarla
- **Feedback no-verbal** → Los estudiantes "sienten" que NOVA los ve
- **Gamification clásica** → Sistema de mascotas virtuales (Tamagotchi)

**Expandir mascota:**
- Agregar más frames (tristeza, alegría, confusión)
- Cambiar expresión basado en progreso:
  ```javascript
  if (STATE.rewards >= 50) NOVA_STATE = "happy";  // Más animado
  if (STATE.rewards < 10) NOVA_STATE = "sad";     // Triste
  ```

---

### 6. **STATUS CARDS (Emotional State Tracking)**

**Mecánica:**
- 4 tarjetas que representan el "estado emocional" de NOVA
- Cards: ❤️ Motivación, ⚡ Energía, 😊 Felicidad, 🎯 Progreso

**Ubicación visual:**
```html
<section class="status-cards">
    <div class="status-card">❤️ Motivación</div>
    <div class="status-card">⚡ Energía</div>
    <div class="status-card">😊 Felicidad</div>
    <div class="status-card">🎯 Progreso</div>
</section>
```

**Psicología detrás:**
- **Anthropomorphism** → Ver a NOVA como ser vivo con emociones
- **Responsibility** → Los estudiantes sienten que deben "cuidar" a NOVA
- **Engagement sostenido** → No es solo completar tareas, es mantener a NOVA feliz

**Expandir status:**
```javascript
// Actualizar estados basado en progreso
function updateNOVAStatus() {
    const completion = STATE.rewards / 180;  // Max 180 puntos
    
    setStatus('motivation', Math.min(100, completion * 100));
    setStatus('energy', hasCompletedToday() ? 100 : 60);
    setStatus('happiness', completion > 0.5 ? 80 : 40);
    setStatus('progress', completion * 100);
}
```

---

### 7. **PERSISTENCIA (Save & Progress)**

**Mecánica:**
- El progreso se guarda automáticamente en `localStorage`
- Al volver, el estudiante ve su progreso intacto
- Genera sentimiento de "inversión" en el juego

**Código:**
```javascript
// Guardar automáticamente cada vez que completa
localStorage.setItem('novaGameState', JSON.stringify(STATE));

// Restaurar al recargar
const saved = localStorage.getItem('novaGameState');
if (saved) {
    const loaded = JSON.parse(saved);
    STATE.completedMissions = loaded.completedMissions;
    STATE.rewards = loaded.rewards;
}
```

**Psicología detrás:**
- **Loss Aversion** → Los estudiantes no quieren "perder" su progreso
- **Long-term engagement** → Pueden volver días después
- **Accountability** → Sus acciones tienen continuidad

---

### 8. **FEEDBACK INMEDIATO (Real-time Reinforcement)**

**Mecánica:**
- Cuando completan una submisión aparece un modal con:
  - ✅ Confirmación visual
  - 📍 Nombre de lo completado
  - 🏆 Puntos ganados

**Ejemplo:**
```javascript
alert('✅ ¡Completado!\n📍 Función de Comunicación\n🏆 +10 puntos');
```

**Psicología detrás:**
- **Operant Conditioning** → Refuerzo inmediato = comportamiento reforzado
- **Dopamine hit** → El feedback dispara liberación de dopamina
- **Motivation Loop** → Acción → Recompensa → Más acciones

**Mejorar feedback:**
```javascript
function completeMissionWithFeedback(subId, name) {
    STATE.rewards += 10;
    
    // Feedback visual mejorado
    showCelebration();           // Efectos visuales
    playSound('complete.mp3');   // Audio
    vibrate([100]);              // Haptic feedback en móvil
    
    alert(`✅ ¡Completado!\n📍 ${name}\n🏆 +10 puntos\n💡 Tip: ${getTip(subId)}`);
}
```

---

## 📊 PIRAMIDE GAMIFICACIÓN EN NOVA

```
                    🏆 RECOMPENSAS
                    (Puntos, Badges)
                          △
                         ╱ ╲
                        ╱   ╲
                       ╱     ╲
                    ◆─────────◆
                   PROGRESO   NARRATIVA
               (Contadores)  (Historia NOVA)
                   ╱             ╲
                  ╱               ╲
                 ╱                 ╲
              ◇──────────────────────◇
           MECÁNICAS            EMOTIVIDAD
        (Misiones/Submisiones)  (Mascota)
                 ╲                 ╱
                  ╲               ╱
                   ╲             ╱
                    ╲           ╱
                     ◆─────────◆
                   ENGAGEMENT SOSTENIDO
```

---

## 🎯 ESTRATEGIA GAMIFICACIÓN EDUCATIVA

### Las 3 Capas:

**1. MOTIVACIÓN EXTRÍNSECA** (Primero)
- Puntos, badges, contadores
- Genera "gancho" inicial
- Atrae a estudiantes desenganchados

**2. MOTIVACIÓN INTRÍNSECA** (Luego)
- Narrativa, progreso visible
- Genera propósito
- Los estudiantes quieren aprender "por NOVA"

**3. COMPETENCIA** (Sostenible)
- Metas claras, feedback constante
- Estudiantes notan mejora
- Autoeficacia aumenta

---

## 💡 CÓMO INTEGRAR MÁS GAMIFICACIÓN

### Rápido (5 min):
```javascript
// Agregar mensajes personalizados por nivel
if (STATE.rewards >= 100) {
    if (STATE.rewards >= 50) console.log("¡Eres un INGENIERO!");
    if (STATE.rewards >= 25) console.log("¡Eres un EXPLORADOR!");
}
```

### Medio (30 min):
```javascript
// Sistema de niveles
const LEVELS = [
    { min: 0, name: "Novato", emoji: "🌱" },
    { min: 25, name: "Aprendiz", emoji: "📚" },
    { min: 50, name: "Ingeniero", emoji: "⚙️" },
    { min: 75, name: "Maestro", emoji: "🏆" }
];

function getCurrentLevel() {
    return LEVELS.find(l => STATE.rewards >= l.min);
}

// Mostrar nivel en UI
document.getElementById('playerLevel').textContent = getCurrentLevel().emoji + " " + getCurrentLevel().name;
```

### Avanzado (1-2 horas):
```javascript
// Leaderboard colaborativo
// Sistema de desafíos diarios
// Achievements desbloquables específicos
// Animaciones de celebración personalizadas
// Sonidos y haptic feedback
// Progresión de dificultad dinámica
```

---

## 🚨 CUIDADOS CON GAMIFICACIÓN

### ⚠️ NO HACER:
- ❌ Usar SOLO recompensas extrínsecas (mata motivación intrínseca)
- ❌ Puntos sin contexto (son números vacíos)
- ❌ Competencia destructiva (comparación negativa entre estudiantes)
- ❌ Gamificación sin propósito educativo (distrae del aprendizaje)

### ✅ HACER:
- ✅ Combinar extrínseca + intrínseca
- ✅ Dar puntos por el APRENDIZAJE, no por "participar"
- ✅ Colaboración > Competencia
- ✅ Mecánicas alineadas con objetivos pedagógicos

---

## 💾 CÓMO ADAPTAR ACTIVIDADES

### Plantilla para Nueva Misión

```javascript
// Agregar al objeto MISSIONS en script.js
7: {
  title: "Nombre de Tu Misión",
  description: "Descripción breve de qué deben hacer",
  submissions: [
    { id: "7a", name: "Actividad 1" },
    { id: "7b", name: "Actividad 2" },
    { id: "7c", name: "Actividad 3" }
  ]
}
```

### Plantilla para Nueva Actividad (Submisión)

```javascript
// En completSubmission() - agregar contenido personalizado
completeSubmission(submissionId, submissionName) {
  if (!STATE.completedMissions.includes(submissionId)) {
    STATE.completedMissions.push(submissionId);
    STATE.rewards += 10;  // Puntos por completar
    
    // Mensaje personalizado
    alert('✅ ¡Completado!\n📍 ' + submissionName + '\n🏆 +10 puntos');
    
    // Guardar y actualizar
    saveStateToStorage();
    updateUI();
    closeSubmenu();
  }
}
```

---

## 🎓 EJEMPLOS DE INTEGRACIÓN EDUCATIVA

### Ejemplo 1: Misión "Construir Funciones"

**Objetivo Pedagógico:** Que estudiantes identifiquen funciones de un sistema

```javascript
1: {
  title: "Construir Funciones",
  description: "Identifica funciones principales del sistema de NOVA",
  submissions: [
    { id: "1a", name: "Función de Comunicación" },
    { id: "1b", name: "Función de Diagnóstico" },
    { id: "1c", name: "Función de Navegación" }
  ]
}

// Cuando completan 1a:
alert('✅ ¡Completado!\n📍 Función de Comunicación\n' +
      '💡 Una función es lo que el sistema DEBE HACER\n' +
      '🏆 +10 puntos');
```

### Ejemplo 2: Misión "Identificar Condiciones"

**Objetivo Pedagógico:** Que desarrollen identificación de requerimientos

```javascript
2: {
  title: "Identificar Condiciones",
  description: "Define condiciones necesarias para que el sistema funcione",
  submissions: [
    { id: "2a", name: "Requisitos de Energía" },
    { id: "2b", name: "Requisitos de Conectividad" },
    { id: "2c", name: "Requisitos de Procesamiento" }
  ]
}

// Cuando completan 2a:
alert('✅ ¡Completado!\n📍 Requisitos de Energía\n' +
      '💡 Una condición es lo que se NECESITA para que el sistema exista\n' +
      '🏆 +10 puntos');
```

### Ejemplo 3: Agregar Aventura Interactiva

Se puede expandir para tener una **actividad más compleja**:

```javascript
3: {
  title: "Aventuras del Sistema",
  description: "Participa en escenarios para reforzar aprendizaje",
  submissions: [
    { id: "3a", name: "Aventura: El Viaje Estelar" },
    { id: "3b", name: "Aventura: Crisis en la Órbita" },
    { id: "3c", name: "Aventura: Rescate Final" }
  ]
}

// Podrías expandir completeSubmission() para:
// - Abrir un modal con más contenido
// - Mostrar escenarios
// - Recopilar respuestas en un JSON
// - Calcular puntos basado en corrección
```

---

## 🔄 FLUJO COMPLETO DE USUARIO

```
1. Usuario accede a index.html
   ↓
2. Se cargan archivos CSS y JS
   ↓
3. initApp() ejecuta:
   - setupCharacterAnimation() → NOVA pestañea
   - setupModals() → Prepara modales
   - setupMissionButtons() → Prepara botones
   - loadStateFromStorage() → Restaura progreso previo
   - updateUI() → Muestra stats actualizados
   ↓
4. Usuario ve interfaz con NOVA animada
   ↓
5. Usuario puede:
   a) Hacer click en "📖 Historia de NOVA" → Lee narrativa
   b) Hacer click en botón de Misión → Ver submisiones
   c) Hacer click en Submisión → Completa actividad
   ↓
6. Sistema actualiza:
   - completedMissions array
   - Contador de rewards
   - Badges de visual progress
   - Persistencia en localStorage
   ↓
7. Al recargar página → Progreso se restaura automáticamente
```

---

## 🎯 PUNTOS DE EXTENSIÓN

### Fácil (sin cambios de código):
- Editar titles y descriptions de misiones
- Cambiar names de submisiones
- Ajustar emojis

### Medio (requiere editar script.js):
- Agregar nuevas misiones (ID 7, 8, etc.)
- Cambiar puntos por submisión (rewards)
- Modificar lógica de badges

### Avanzado (requiere diseño nuevo):
- Agregar modales de contenido para cada submisión
- Crear cuestionarios/evaluaciones
- Integrar con backend para guardar respuestas
- Agregar más frames de animación a NOVA
- Crear sistema de niveles múltiples

---

## 🎁 SISTEMA DE RECOMPENSAS

### Puntos
- Cada submisión: **+10 puntos**
- Se acumulan en `STATE.rewards`
- Se visualizan en el header

### Badges de Misión
- Se muestran como indicadores en cada botón de misión
- Inicial: `○` (vacío)
- Completada (3/3 submisiones): `✓` (checkmark verde)

### Potencial para Expandir
```javascript
// Ejemplo: Badges adicionales por puntos
if (STATE.rewards >= 100) unlock("🏅 Insignia Maestro");
if (STATE.rewards >= 50) unlock("🥈 Insignia Ingeniero");
if (STATE.rewards >= 25) unlock("🥉 Insignia Explorador");
```

---

## 📊 ESTRUCTURA DE DATOS COMPLETA

### STATE Object
```javascript
const STATE = {
  completedMissions: [     // Array de IDs completados
    "1a", "1b", "1c",      // Misión 1 completada
    "2a",                  // Parcial misión 2
    ...
  ],
  characterFrame: 0,       // Frame actual de animación
  rewards: 30              // Puntos totales
}
```

### localStorage
```
Key: "novaGameState"
Value: JSON.stringify(STATE)

Ejemplo guardado:
{
  "completedMissions": ["1a", "1b", "2a", "3a", "3b"],
  "characterFrame": 0,
  "rewards": 50
}
```

---

## 🌐 SOBRE ACCESIBILIDAD

El proyecto incluye:
- ✅ Semántica HTML correcta
- ✅ ARIA labels en elementos interactivos
- ✅ Soporte keyboard navigation (Tab, Enter, Escape)
- ✅ Respeta preferencias `prefers-reduced-motion`
- ✅ Respeta tema oscuro/claro del SO
- ✅ Contraste de colores adecuado
- ✅ Párrafos cortos y claros (accesibilidad cognitiva)

---

## 🚀 PRÓXIMOS PASOS

### Para Implementar Actividades Reales:

1. **Definir Objetivos de Aprendizaje** por misión
2. **Crear contenido educativo** (textos, ejemplos, diagramas)
3. **Diseñar cuestionarios** o actividades de evaluación
4. **Conectar a submisiones** mediante modales expandibles
5. **Agregar retroalimentación personalizada** por respuesta
6. **Opcional: Backend** para guardar respuestas y generar reportes

---

## 📧 NOTAS PARA COMPARTIR CON GPT

Al usar este documento con ChatGPT para diseñar actividades:

1. **Especifica el objetivo pedagógico** de la nueva actividad
2. **Indica el nivel de dificultad** (introductorio, intermedio, avanzado)
3. **Proporciona contexto** sobre qué deben aprender
4. **Incluye ejemplos** de cómo debería verse
5. **Solicita el código** en formato JavaScript/JSON
6. **Pide retroalimentación** pedagógica y narrativa

**Prompt Ejemplo:**
```
Soy un docente diseñando un curso gamificado sobre requerimientos de software.
Tengo una plataforma llamada NOVA con este sistema de misiones:
[INCLUIR ESTA DOCUMENTACIÓN]

Necesito crear una nueva misión llamada "Validación de Requerimientos"
Objetivo: Que estudiantes aprendan a validar si un requisito es correcto
Nivel: Intermedio (segundo mes del curso)
Tipo: 3 submisiones colaborativas

¿Cómo estructuro esto en la plataforma?
```

---

## 📝 LICENCIA Y USO

Este documento describe la arquitectura de **NOVA - Plataforma Educativa Gamificada**.

Puede ser usado libremente para:
- Crear nuevas actividades educativas
- Adaptar a otros contextos de enseñanza
- Compartir con equipos docentes
- Mejorar y expandir funcionalidades

---

**Última actualización:** Febrero 2026
**Versión:** 1.0
