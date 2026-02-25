# ⚡ Guía Rápida de Referencia - NOVA Game

> **Respuestas rápidas a tareas comunes**

---

## 🎯 Tareas Comunes

### 1. Agregar Nueva Misión

**Archivo:** `js/data/missions.js`

```javascript
export const MISSIONS = {
    // ... misiones existentes ...
    7: {
        title: 'Misión 7: Tu Título',
        description: 'Descripción de la misión',
        phase: 'nueva-fase',
        instructions: '💡 Instrucciones',
        submissions: [
            {
                id: '7a',
                name: 'Actividad',
                toolType: 'quiz',
                learningGoal: 'Objetivo',
                question: '¿Pregunta?',
                options: [
                    { text: 'Opción 1', correct: true },
                    { text: 'Opción 2', correct: false }
                ],
                feedback: {
                    correct: '¡Bien!',
                    incorrect: 'Intenta de nuevo'
                },
                novaMessage: 'Mensaje de NOVA'
            }
        ]
    }
};
```

**Después agregar botón en `index.html`:**
```html
<button class="menu-button" id="mission-7-btn">
    <span class="menu-emoji">🌟</span> Misión 7: Tu Título
    <span class="mission-badge" id="badge-7">○</span>
</button>
```

**Y actualizar loop en `app.js` (línea ~135):**
```javascript
for (let i = 1; i <= 7; i++) { // Cambiar 6 a 7
```

---

### 2. Cambiar Mensaje de NOVA

**Archivo:** `js/data/messages.js`

```javascript
export const NOVA_MESSAGES = {
    activation: "Tu nuevo mensaje aquí",
    // ...
};
```

---

### 3. Agregar Nuevo Tipo de Quiz

**Archivo:** `js/data/missions.js`

```javascript
{
    id: '3d',
    toolType: 'quiz',
    question: '¿Tu pregunta?',
    options: [
        { text: 'Respuesta 1', correct: false },
        { text: 'Respuesta 2', correct: true },
        { text: 'Respuesta 3', correct: false }
    ],
    feedback: {
        correct: 'Correcto!',
        incorrect: 'Incorrecto'
    }
}
```

---

### 4. Modificar Puntos por Actividad

**Archivo:** `js/services/ActivityService.js` (línea ~191)

```javascript
completeActivity(submissionId) {
    // ...
    this.gameState.addRewards(20); // Cambiar de 10 a 20
    // ...
}
```

**Y en `app.js` (línea ~291):**
```javascript
this.messageService.show(
    `✅ ¡Completado!\n🏆 +20 puntos`, // Cambiar aquí también
    4000
);
```

---

### 5. Cambiar Tiempo de Mensajes Automáticos

**Archivo:** `js/services/MessageService.js`

```javascript
// Cambiar delay inicial (línea ~93)
this.messageTimer = setTimeout(() => {
    this.showNextAutoMessage();
}, 10000); // Era 5000 (5 seg), ahora 10000 (10 seg)

// Cambiar intervalo entre mensajes (línea ~116)
const nextDelay = 30000 + Math.random() * 10000; 
// Era 20-30 seg, ahora 30-40 seg
```

---

### 6. Desactivar Animación de NOVA

**Archivo:** `js/ui/CharacterController.js`

```javascript
start() {
    // Comentar todo el método
    // this.animationTimer = setTimeout(() => {
    //     this.animateFrame();
    // }, 2500);
}
```

O en `app.js`:
```javascript
setupCharacter() {
    // Comentar estas líneas
    // const frames = $$('.character-frame');
    // if (frames.length > 0) {
    //     this.characterController.initialize(frames);
    // }
}
```

---

### 7. Cambiar Colores del Tema

**Archivo:** `styles.css` (líneas 1-30)

```css
:root {
    --color-primary: #5b4b9f;       /* Color principal */
    --color-accent: #4a9eff;        /* Color de acento */
    --color-bg: #f5f3fa;            /* Fondo general */
    --color-success: #4ade80;       /* Color de éxito */
    /* ... */
}
```

---

### 8. Agregar Sonidos (Futuro)

**Crear:** `js/services/AudioService.js`

```javascript
class AudioService {
    constructor() {
        this.sounds = {
            complete: new Audio('sounds/complete.mp3'),
            error: new Audio('sounds/error.mp3')
        };
    }
    
    play(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName].play();
        }
    }
}

export default AudioService;
```

**Usar en `app.js`:**
```javascript
constructor() {
    this.audioService = new AudioService();
}

handleActivityComplete() {
    this.audioService.play('complete');
    // ...
}
```

---

### 9. Resetear Progreso del Juego

**Opción 1: En consola del navegador (F12)**
```javascript
localStorage.removeItem('novaGameState');
location.reload();
```

**Opción 2: Botón en la UI**

Agregar en `index.html`:
```html
<button id="resetBtn" class="menu-button menu-button-purple">
    🔄 Resetear Progreso
</button>
```

En `app.js`:
```javascript
setupMissionButtons() {
    // ...
    byId('resetBtn')?.addEventListener('click', () => {
        if (confirm('¿Resetear todo el progreso?')) {
            StorageService.clear();
            this.gameState.reset();
            this.uiController.updateAll();
            location.reload();
        }
    });
}
```

---

### 10. Ver Estado Actual del Juego

**En consola del navegador (F12):**
```javascript
// Ver todo el estado
const state = window.__novaState || 
    JSON.parse(localStorage.getItem('novaGameState'));
console.log(state);

// Ver misiones completadas
console.log(state.completedMissions);

// Ver puntos
console.log(state.rewards);
```

---

## 🔧 Debugging Rápido

### Error: "Module not found"

**Causa:** Ruta incorrecta

**Solución:**
```javascript
// ✅ Correcto
import GameState from './models/GameState.js';

// ❌ Incorrecto
import GameState from 'models/GameState.js';
```

### Error: CORS Policy

**Solución:**
```bash
# Usar servidor local
python -m http.server 8000
# O
npx serve
```

### NOVA no se anima

**Debug:**
```javascript
// En consola
const frames = document.querySelectorAll('.character-frame');
console.log(frames.length); // Debe ser 3
```

### Estado no persiste

**Debug:**
```javascript
// Verificar localStorage
console.log(localStorage.getItem('novaGameState'));

// Probar guardado manual
localStorage.setItem('test', 'works');
console.log(localStorage.getItem('test')); // Debe mostrar 'works'
```

---

## 📁 Ubicaciones Importantes

| Qué Modificar | Dónde |
|---------------|-------|
| Misiones y actividades | `js/data/missions.js` |
| Mensajes de NOVA | `js/data/messages.js` |
| Lógica de validación | `js/services/ActivityService.js` |
| Renderizado UI | `js/ui/ActivityRenderer.js` |
| Estado del juego | `js/models/GameState.js` |
| Estilos visuales | `styles.css` |
| Estructura HTML | `index.html` |

---

## 🎨 Patrones de Código

### Obtener Estado
```javascript
import GameState from './models/GameState.js';
const gameState = GameState.getInstance();
const value = gameState.get('property');
```

### Guardar Estado
```javascript
import StorageService from './services/StorageService.js';
StorageService.save(state);
```

### Mostrar Mensaje
```javascript
this.messageService.show('Tu mensaje', 3000);
```

### Abrir Modal
```javascript
this.modalController.open('nombreModal');
```

### Actualizar UI
```javascript
this.uiController.updateAll();
```

---

## 🚀 Comandos Útiles

### Servidor Local
```bash
# Python
python -m http.server 8000

# Node
npx serve

# VS Code
# Click derecho en index.html > "Open with Live Server"
```

### Git (Si usas control de versiones)
```bash
# Guardar cambios
git add .
git commit -m "Descripción del cambio"

# Ver cambios
git diff

# Deshacer último cambio
git reset --soft HEAD~1
```

---

## 🔍 Snippets Útiles

### Crear Nueva Actividad de Quiz
```javascript
{
    id: 'XY', // X = misión, Y = letra
    name: 'Nombre',
    toolType: 'quiz',
    learningGoal: 'Objetivo',
    udlHints: ['Pista 1', 'Pista 2'],
    question: '¿Pregunta?',
    options: [
        { text: 'Opción 1', correct: true },
        { text: 'Opción 2', correct: false }
    ],
    feedback: {
        correct: 'Correcto',
        incorrect: 'Incorrecto'
    },
    novaMessage: 'Mensaje de NOVA'
}
```

### Crear Nueva Actividad de Clasificación
```javascript
{
    id: 'XY',
    name: 'Nombre',
    toolType: 'classification',
    learningGoal: 'Objetivo',
    example: 'Ejemplo a clasificar',
    question: '¿FUNCIÓN o CONDICIÓN?',
    correctAnswer: 'function', // o 'condition'
    explanation: {
        correct: 'Correcto porque...',
        incorrect: 'Incorrecto porque...'
    },
    hint: 'Pista opcional',
    novaMessage: 'Mensaje de NOVA'
}
```

---

## 💡 Tips Pro

### 1. Usar Console Logs Estratégicos
```javascript
// En desarrollo
console.log('🎯 Estado actual:', gameState.getState());
console.log('✅ Misión completada:', submissionId);
```

### 2. Breakpoints en Chrome DevTools
```
F12 > Sources > Buscar archivo > Click en número de línea
```

### 3. Live Reload con VS Code
```
Instalar extensión "Live Server"
Click derecho en index.html > "Open with Live Server"
```

### 4. Validar JSON
```javascript
// Verificar estructura de missions
console.log(JSON.stringify(MISSIONS, null, 2));
```

---

## 📞 Checklist Antes de Publicar

- [ ] Probar todas las misiones
- [ ] Verificar en Chrome, Firefox, Safari
- [ ] Probar en móvil
- [ ] Verificar persistencia de estado
- [ ] Sin errores en consola
- [ ] Mensaje final de celebración funciona
- [ ] Actualizar documentación si hay cambios

---

## 🎓 Recursos Rápidos

- **MDN:** https://developer.mozilla.org/
- **JavaScript.info:** https://javascript.info/
- **Clean Code JS:** https://github.com/ryanmcdermott/clean-code-javascript

---

**Última actualización: 2026-02-25**

*¿Necesitas algo más específico? Revisa ARQUITECTURA.md para detalles completos.*
