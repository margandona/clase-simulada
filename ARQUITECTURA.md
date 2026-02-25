# 🏗️ Arquitectura del Código - NOVA Game

## 📁 Estructura de Carpetas

```
js/
├── data/                   # Datos y configuración
│   ├── missions.js        # Configuración de misiones
│   └── messages.js        # Mensajes de NOVA
│
├── models/                # Modelos de datos
│   └── GameState.js       # Estado del juego (Singleton)
│
├── services/              # Lógica de negocio
│   ├── StorageService.js  # Persistencia (localStorage)
│   ├── MessageService.js  # Sistema de mensajes/notificaciones
│   └── ActivityService.js # Lógica de actividades
│
├── ui/                    # Controladores de interfaz
│   ├── ModalController.js    # Gestión de modales
│   ├── CharacterController.js # Animación de NOVA
│   ├── ActivityRenderer.js   # Renderizado de actividades
│   └── UIController.js       # Actualizaciones de UI
│
├── utils/                 # Utilidades
│   ├── helpers.js        # Funciones auxiliares
│   └── dom.js            # Manipulación DOM
│
└── app.js                # Punto de entrada principal
```

---

## 🎯 Principios de Diseño Aplicados

### 1. **Separación de Responsabilidades (SRP)**
Cada módulo tiene una única responsabilidad clara:
- **Data**: Solo contiene configuración
- **Models**: Solo gestiona el estado
- **Services**: Solo lógica de negocio
- **UI**: Solo presentación y eventos
- **Utils**: Solo funciones auxiliares

### 2. **Patrón Singleton (GameState)**
```javascript
const gameState = GameState.getInstance();
```
Un único punto de acceso al estado del juego desde cualquier módulo.

### 3. **Inyección de Dependencias**
```javascript
class UIController {
    constructor(messageService) {
        this.messageService = messageService;
    }
}
```
Facilita testing y reduce acoplamiento.

### 4. **Módulos ES6**
```javascript
import GameState from './models/GameState.js';
export default GameState;
```
Código modular, mantenible y reutilizable.

---

## 🔄 Flujo de Datos

```
Usuario Interactúa
        ↓
    app.js (Coordinador)
        ↓
   ┌────────────────┐
   │  UI Controllers │ → Capturan eventos
   └────────────────┘
        ↓
   ┌────────────────┐
   │    Services    │ → Procesan lógica
   └────────────────┘
        ↓
   ┌────────────────┐
   │   GameState    │ → Actualiza estado
   └────────────────┘
        ↓
   ┌────────────────┐
   │ StorageService │ → Persiste datos
   └────────────────┘
        ↓
   UI se actualiza automáticamente
```

---

## 📦 Módulos Principales

### **app.js** - Coordinador Principal
```javascript
class NOVAGame {
    init() {
        // 1. Cargar estado
        // 2. Inicializar servicios
        // 3. Configurar UI
        // 4. Iniciar el juego
    }
}
```

**Responsabilidades:**
- Inicializar todos los módulos
- Coordinar comunicación entre servicios
- Gestionar el ciclo de vida de la aplicación

---

### **GameState.js** - Estado Global
```javascript
const gameState = GameState.getInstance();
gameState.addCompletedMission('1a');
gameState.getProgressPercentage(); // 16
```

**Métodos clave:**
- `get(key)` / `set(key, value)` - Acceso a propiedades
- `addCompletedMission(id)` - Agregar misión completada
- `calculateCurrentPhase()` - Calcular fase actual
- `getProgressPercentage()` - Obtener progreso

---

### **StorageService.js** - Persistencia
```javascript
StorageService.save(state);
const savedState = StorageService.load();
```

**Características:**
- Manejo de errores robusto
- Serialización/deserialización automática
- Métodos estáticos (sin instanciación)

---

### **MessageService.js** - Sistema de Mensajes
```javascript
messageService.show("Mensaje", 3000);
messageService.startAutoMessages();
messageService.toggleMute();
```

**Funcionalidades:**
- Toast notifications
- Mensajes automáticos rotativos
- Sistema de silenciado
- Mensajes contextuales por fase

---

### **ActivityService.js** - Lógica de Actividades
```javascript
activityService.validateActivity(id, container);
activityService.completeActivity(id);
activityService.checkFinalCompletion();
```

**Validaciones soportadas:**
- Quiz (selección única)
- Classification (función vs condición)
- Checklist (múltiple selección)

---

### **ModalController.js** - Gestión de Modales
```javascript
modalController.register('story', element, closeBtn);
modalController.open('story');
modalController.close('story');
```

**Características:**
- Registro dinámico de modales
- Cierre con Escape
- Gestión de aria-hidden
- Control de scroll del body

---

### **CharacterController.js** - Animación NOVA
```javascript
characterController.initialize(frames);
characterController.start();
characterController.stop();
```

**Animación:**
- Secuencia: [Normal, Blink, Normal, Mouth, Normal]
- Tiempos: Blink=100ms, Mouth=200ms, Idle=2500ms

---

### **ActivityRenderer.js** - Renderizado Dinámico
```javascript
activityRenderer.render(submission, container, {
    onSelectionChange: () => {},
    onComplete: () => {},
    onFeedback: (type, msg) => {}
});
```

**Tipos de actividades:**
- `quiz` - Preguntas de opción múltiple
- `classification` - Función vs Condición
- `checklist` - Lista de verificación
- `padlet` - Integración colaborativa
- `confirmation` - Confirmación simple
- `verification` - Verificación de estado
- `action` - Acción con botón
- `celebration` - Pantalla de celebración

---

### **UIController.js** - Actualizaciones de UI
```javascript
uiController.updateAll();
uiController.showActivityFeedback('correct', 'Bien!');
uiController.enableCompleteButton();
```

**Responsabilidades:**
- Actualizar contadores y badges
- Mostrar/ocultar submenús
- Gestionar feedback de actividades
- Controlar estados de botones

---

## 🛠️ Utilidades

### **helpers.js**
```javascript
import { scrollToElement, debounce, wait } from './utils/helpers.js';

scrollToElement(element, 'start');
const debouncedFn = debounce(fn, 300);
await wait(1000);
```

**Funciones:**
- `scrollToElement()` - Scroll suave
- `debounce()` / `throttle()` - Control de frecuencia
- `getRandomInt()` / `clamp()` - Matemáticas
- `formatTime()` - Formato de tiempo
- `safeJSONParse()` - Parse seguro

### **dom.js**
```javascript
import { $, $$, byId, createElement } from './utils/dom.js';

const el = byId('myId');
const all = $$('.my-class');
const newEl = createElement('div', { className: 'test' }, 'Content');
```

**Funciones:**
- `$()` / `$$()` - Query selectors
- `byId()` - getElementById
- `createElement()` - Crear elementos
- `addClass()` / `removeClass()` - Clases
- `show()` / `hide()` - Visibilidad
- `on()` / `off()` - Event listeners

---

## 🚀 Cómo Extender el Juego

### Agregar Nueva Misión

1. **Editar `js/data/missions.js`:**
```javascript
export const MISSIONS = {
    // ... misiones existentes
    7: {
        title: 'Nueva Misión',
        phase: 'advanced',
        submissions: [...]
    }
};
```

2. **Agregar mensajes en `js/data/messages.js`:**
```javascript
export const NOVA_MESSAGES = {
    // ... mensajes existentes
    advanced: "Mensaje de la nueva fase"
};
```

3. **Agregar botón en `index.html`:**
```html
<button class="menu-button" id="mission-7-btn">
    <span class="menu-emoji">🌟</span> Misión 7: Nueva
    <span class="mission-badge" id="badge-7">○</span>
</button>
```

4. **Registrar en `app.js`:**
```javascript
// Ya se maneja automáticamente con el loop for (let i = 1; i <= 6; i++)
// Solo cambiar el límite a i <= 7
```

### Agregar Nuevo Tipo de Actividad

1. **Crear renderer en `ActivityRenderer.js`:**
```javascript
renderNuevoTipo(submission, container, callbacks) {
    const html = `<div class="activity-nuevo">...</div>`;
    container.innerHTML = html;
    // Setup event listeners
}
```

2. **Registrar en el switch:**
```javascript
render(submission, container, callbacks) {
    const renderers = {
        // ... existentes
        'nuevoTipo': this.renderNuevoTipo.bind(this)
    };
}
```

3. **Agregar validación en `ActivityService.js`:**
```javascript
validateNuevoTipo(submission, container) {
    // Lógica de validación
    return { isValid: true, isCorrect: true, message: '...' };
}
```

### Agregar Nueva Funcionalidad

1. **Crear nuevo servicio en `js/services/`:**
```javascript
class NuevoServicio {
    // Tu lógica aquí
}
export default NuevoServicio;
```

2. **Inicializar en `app.js`:**
```javascript
constructor() {
    this.nuevoServicio = new NuevoServicio();
}
```

3. **Usar en los métodos:**
```javascript
handleAlgo() {
    this.nuevoServicio.hacerAlgo();
}
```

---

## 🧪 Testing (Recomendado)

### Estructura sugerida:
```
tests/
├── models/
│   └── GameState.test.js
├── services/
│   ├── StorageService.test.js
│   └── ActivityService.test.js
└── utils/
    └── helpers.test.js
```

### Ejemplo con Jest:
```javascript
import GameState from '../js/models/GameState.js';

describe('GameState', () => {
    test('should add completed mission', () => {
        const state = GameState.getInstance();
        state.addCompletedMission('1a');
        expect(state.isMissionCompleted('1a')).toBe(true);
    });
});
```

---

## 📊 Beneficios de la Refactorización

### ✅ Antes vs Después

| Aspecto | Antes | Después |
|---------|-------|---------|
| **Líneas por archivo** | 1693 | ~200-300 promedio |
| **Acoplamiento** | Alto | Bajo |
| **Testabilidad** | Difícil | Fácil |
| **Mantenibilidad** | Compleja | Simple |
| **Reutilización** | Baja | Alta |
| **Escalabilidad** | Limitada | Excelente |

### 🎯 Mejoras Clave

1. **Código más legible**: Cada archivo tiene un propósito claro
2. **Fácil de mantener**: Bugs se encuentran y arreglan rápido
3. **Testeable**: Cada módulo se puede probar independientemente
4. **Extensible**: Agregar features es sencillo
5. **Reutilizable**: Módulos se pueden usar en otros proyectos
6. **Documentado**: JSDoc en cada función

---

## 🎓 Patrones y Buenas Prácticas Implementadas

### Patrones de Diseño:
- ✅ **Singleton** (GameState)
- ✅ **Service Layer** (Services)
- ✅ **Controller Pattern** (UI Controllers)
- ✅ **Strategy Pattern** (ActivityRenderer)
- ✅ **Observer Pattern** (Event system)

### Principios SOLID:
- ✅ **S**ingle Responsibility
- ✅ **O**pen/Closed
- ✅ **L**iskov Substitution
- ✅ **I**nterface Segregation
- ✅ **D**ependency Inversion

### Clean Code:
- ✅ Nombres descriptivos
- ✅ Funciones pequeñas y enfocadas
- ✅ No repetición de código (DRY)
- ✅ Comentarios JSDoc
- ✅ Manejo de errores

---

## 🔧 Herramientas Recomendadas

### Desarrollo:
- **VS Code** con extensiones:
  - ESLint
  - Prettier
  - JavaScript (ES6) code snippets

### Build Tools (opcional):
- **Webpack** o **Vite** para bundling
- **Babel** para compatibilidad con navegadores antiguos

### Testing:
- **Jest** para unit tests
- **Playwright** para E2E tests

---

## 📝 Próximos Pasos Sugeridos

1. ✅ Agregar TypeScript para type safety
2. ✅ Implementar unit tests
3. ✅ Agregar linter (ESLint)
4. ✅ Configurar bundler (Webpack/Vite)
5. ✅ Agregar CI/CD pipeline
6. ✅ Documentar API con JSDoc
7. ✅ Agregar logs y analytics

---

## 📚 Recursos Adicionales

- [ES6 Modules - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [JavaScript Design Patterns](https://www.patterns.dev/)
- [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)

---

## 🤝 Contribuir

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -m 'Add nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

---

**¡Disfruta del código limpio y mantenible! 🚀**
