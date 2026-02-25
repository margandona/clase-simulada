# 🚀 NOVA - Plataforma Educativa Gamificada v2.0

[![Versión](https://img.shields.io/badge/versión-2.0-blue.svg)](https://github.com)
[![Arquitectura](https://img.shields.io/badge/arquitectura-modular-green.svg)](ARQUITECTURA.md)
[![Código](https://img.shields.io/badge/código-ES6%20modules-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

**NOVA** es una experiencia de aprendizaje interactiva gamificada que enseña conceptos de **ingeniería de requerimientos de software** (funciones vs. condiciones) a estudiantes de primer año de informática.

---

## ✨ **Nueva Versión 2.0 - Arquitectura Modular**

El código ha sido completamente refactorizado siguiendo las mejores prácticas de la industria:

- 🏗️ **Arquitectura modular** con 13 módulos ES6
- 🎯 **Principios SOLID** aplicados
- 🧪 **Código testeable** y mantenible
- 📚 **Documentación completa** (2500+ líneas)
- 🚀 **Rendimiento optimizado**

---

## 🎯 ¿Qué es NOVA?

NOVA es una inteligencia artificial varada en órbita terrestre que necesita ayuda para regresar a casa. Su problema: **su sistema de requerimientos está incompleto**.

Los estudiantes ayudarán a NOVA completando 6 misiones con 18 actividades interactivas, aprendiendo a diferenciar entre:
- ⚙️ **Funciones** (lo que el sistema HACE)
- ✅ **Condiciones** (lo que el sistema NECESITA)

---

## ⚡ Inicio Rápido

### Para Docentes

**1. Servidor Local (Recomendado)**
```bash
# Opción 1: Python
python -m http.server 8000
# Abrir: http://localhost:8000

# Opción 2: Node.js
npx serve
# Abrir: http://localhost:3000

# Opción 3: VS Code Live Server
# Click derecho en index.html > "Open with Live Server"
```

**2. Compartir con Estudiantes**
- Comparte la URL del servidor local (misma red)
- O sube los archivos a tu hosting web
- O distribuye los archivos para apertura local

**3. Configurar Padlet (Opcional - Misión 5)**
1. Crea un Padlet en https://padlet.com
2. Edita `js/data/missions.js` línea ~380
3. Cambia `embedUrl` por tu URL de Padlet

---

## 📁 Estructura del Proyecto

```
gamificación/
├── index.html              # Estructura HTML
├── styles.css              # Estilos visuales
│
├── js/                     # 🆕 Código modular
│   ├── app.js             # 🎯 Punto de entrada
│   ├── data/              # 📊 Configuración
│   ├── models/            # 🎮 Estado del juego
│   ├── services/          # ⚙️ Lógica de negocio
│   ├── ui/                # 🖼️ Controladores UI
│   └── utils/             # 🔧 Utilidades
│
└── Documentación/          # 📚 Guías completas
    ├── ARQUITECTURA.md    # Arquitectura detallada
    ├── MIGRACION.md       # Guía de migración
    ├── GUIA_RAPIDA.md     # Referencia rápida
    └── ...
```

---

## 📚 Itinerario Pedagógico (30 minutos)

| Fase | Misión | Tiempo | Objetivo Pedagógico |
|------|--------|--------|---------------------|
| **Activación** | Misión 1 | 5 min | Conocer a NOVA y el problema |
| **Exploración** | Misión 2 | 5 min | Identificar sistema incompleto |
| **Comprensión** | Misión 3 | 5 min | Diferenciar funciones/condiciones |
| **Aplicación** | Misión 4 | 5 min | Clasificar casos reales |
| **Colaboración** | Misión 5 | 7 min | Trabajo en equipo (Padlet) |
| **Cierre** | Misión 6 | 3 min | Celebración y despegue |

**Total:** 6 misiones, 18 actividades, 30 minutos

---

## 🎮 Características

### Experiencia de Juego
- 🎭 **Personaje animado** (NOVA con 3 frames de animación)
- 💭 **Mensajes contextuales** automáticos cada 20-30 segundos
- 🏆 **Sistema de puntos** (10 puntos por actividad = 180 total)
- 📊 **Barra de progreso** visual del sistema
- 🔕 **Control de notificaciones** (silenciar/activar)
- 💾 **Persistencia de estado** (localStorage)

### Tipos de Actividades
1. 📝 **Quiz** - Preguntas de opción múltiple
2. 🎯 **Clasificación** - Función vs Condición
3. ☑️ **Checklist** - Listas de verificación
4. 🤝 **Padlet** - Colaboración en equipo
5. ✅ **Confirmación** - Autorizaciones
6. 🎉 **Celebración** - Pantalla final

### Accesibilidad (UDL)
- ♿ **Navegación por teclado** completa
- 📱 **Diseño responsive** (móvil y desktop)
- 🎨 **Modo lectura fácil** (simplificado)
- 💡 **Pistas contextuales** en cada actividad
- 🔊 **Preparado para audio** (próximamente)

---

## 🏗️ Arquitectura Técnica

### Patrón Modular ES6
```javascript
// app.js - Punto de entrada
import GameState from './models/GameState.js';
import MessageService from './services/MessageService.js';
// ...

const game = new NOVAGame();
game.init();
```

### Capas de la Aplicación

```
┌─────────────────────────────────────┐
│         app.js (Coordinador)        │
├─────────────────────────────────────┤
│  UI Controllers                     │
│  - Modales, Animación, Renderizado │
├─────────────────────────────────────┤
│  Services                           │
│  - Actividades, Mensajes, Storage  │
├─────────────────────────────────────┤
│  Models                             │
│  - GameState (Singleton)            │
├─────────────────────────────────────┤
│  Data                               │
│  - Missions, Messages               │
└─────────────────────────────────────┘
```

**Ver [ARQUITECTURA.md](ARQUITECTURA.md) para detalles completos**

---

## 📖 Documentación

### Guías Disponibles

| Documento | Descripción | Cuándo Usar |
|-----------|-------------|-------------|
| [🏗️ ARQUITECTURA.md](ARQUITECTURA.md) | Arquitectura completa del código | Entender cómo funciona todo |
| [🔄 MIGRACION.md](MIGRACION.md) | Guía de migración v1→v2 | Migrar o verificar cambios |
| [⚡ GUIA_RAPIDA.md](GUIA_RAPIDA.md) | Tareas comunes y snippets | Hacer cambios rápidos |
| [📋 RESUMEN_REFACTORIZACION.md](RESUMEN_REFACTORIZACION.md) | Resumen ejecutivo | Ver qué cambió |
| [📦 INDICE_PROYECTO.md](INDICE_PROYECTO.md) | Índice completo de archivos | Vista general del proyecto |

---

## 🛠️ Personalización

### Cambios Comunes

**1. Agregar Nueva Misión**
```javascript
// js/data/missions.js
export const MISSIONS = {
    7: {
        title: 'Misión 7: Tu Misión',
        phase: 'advanced',
        submissions: [...]
    }
};
```

**2. Modificar Mensajes de NOVA**
```javascript
// js/data/messages.js
export const NOVA_MESSAGES = {
    activation: "Tu nuevo mensaje aquí"
};
```

**3. Cambiar Puntos por Actividad**
```javascript
// js/services/ActivityService.js (línea ~191)
this.gameState.addRewards(20); // Cambiar de 10 a 20
```

**Ver [GUIA_RAPIDA.md](GUIA_RAPIDA.md) para más ejemplos**

---

## 🔧 Extensibilidad

### Agregar Nuevo Tipo de Actividad

**Paso 1: Crear renderer**
```javascript
// js/ui/ActivityRenderer.js
renderNuevoTipo(submission, container, callbacks) {
    const html = `<div class="activity-nuevo">...</div>`;
    container.innerHTML = html;
    // Setup event listeners
}
```

**Paso 2: Agregar validación**
```javascript
// js/services/ActivityService.js
validateNuevoTipo(submission, container) {
    return { isValid: true, isCorrect: true, message: '...' };
}
```

**Paso 3: Registrar tipo**
```javascript
// En render() de ActivityRenderer
const renderers = {
    'nuevoTipo': this.renderNuevoTipo.bind(this)
};
```

---

## 🧪 Testing (Sugerido)

### Setup con Jest
```bash
npm init -y
npm install --save-dev jest
```

### Ejemplo de Test
```javascript
// tests/models/GameState.test.js
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

## 📊 Requisitos Técnicos

### Navegadores Soportados
- ✅ Chrome 61+ (2017)
- ✅ Firefox 60+ (2018)
- ✅ Safari 11+ (2017)
- ✅ Edge 79+ (2020)

### JavaScript
- ES6 Modules (import/export)
- LocalStorage API
- Fetch API (futuro)

### Servidor
- Necesario para evitar errores CORS con módulos ES6
- Cualquier servidor HTTP sirve (Python, Node, Apache, Nginx)

---

## 🐛 Troubleshooting

### Error: "Module not found"
**Solución:** Verifica que todas las rutas empiecen con `./` o `../`

### Error: CORS Policy
**Solución:** Usa un servidor local (ver [Inicio Rápido](#-inicio-rápido))

### Estado no se guarda
**Solución:** Verifica que localStorage esté habilitado (no modo privado)

**Ver [MIGRACION.md - Troubleshooting](MIGRACION.md#-troubleshooting) para más detalles**

---

## 📈 Roadmap

### v2.1 (Próximo)
- [ ] Tests unitarios con Jest
- [ ] Linter con ESLint
- [ ] CI/CD con GitHub Actions

### v2.2 (Futuro)
- [ ] TypeScript migration
- [ ] Bundler (Vite)
- [ ] PWA support
- [ ] Audio system

### v3.0 (Largo plazo)
- [ ] Backend integration
- [ ] Multi-user sessions
- [ ] Analytics dashboard
- [ ] Teacher admin panel

---

## 🤝 Contribuir

### Cómo Contribuir

1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m 'Add nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

### Guía de Estilo
- Usa nombres descriptivos en español
- Sigue los principios SOLID
- Agrega JSDoc a todas las funciones
- Escribe tests para nuevas features

---

## 📄 Licencia

Este proyecto es de uso educativo. Siéntete libre de usar, modificar y distribuir para fines académicos.

---

## 👥 Autores

- **Diseño Pedagógico:** Equipo Docente
- **Desarrollo Original:** [Tu Nombre]
- **Refactorización v2.0:** [Tu Nombre]

---

## 🎓 Contexto Académico

Este proyecto está diseñado para:
- **Curso:** Introducción a la Ingeniería de Software
- **Año:** Primer año universitario
- **Duración:** 30 minutos (1 clase)
- **Tema:** Requerimientos de Software (Funcionales vs No Funcionales)

---

## 📞 Soporte

### Recursos
- 📧 Email: [tu-email@ejemplo.com]
- 📚 Documentación completa: Ver carpeta `/`
- 🐛 Reportar bugs: [Issues en GitHub]

### Links Útiles
- [MDN - ES6 Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [JavaScript.info](https://javascript.info/)
- [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)

---

## 🌟 Agradecimientos

Gracias a todos los estudiantes y docentes que han probado y dado feedback sobre NOVA.

---

## 📊 Estadísticas del Proyecto

- **Líneas de código:** ~3000
- **Líneas de documentación:** ~2500
- **Módulos:** 13
- **Actividades:** 18
- **Misiones:** 6
- **Tiempo de desarrollo:** 12+ horas
- **Versión:** 2.0

---

**¿Listo para ayudar a NOVA? ¡Abre `index.html` y comienza la aventura! 🚀**

---

*Última actualización: 25 de Febrero, 2026*  
*Versión: 2.0 - Arquitectura Modular*
