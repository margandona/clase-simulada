# Arquitectura del Proyecto JARVIS

## Resumen

El proyecto tiene dos capas alineadas a la misma experiencia pedagógica:
- un runtime principal activo
- una arquitectura modular de referencia

Ambas quedaron normalizadas a:
- narrativa JARVIS
- 4 misiones
- aprendizaje de funciones y condiciones

---

## 1. Runtime principal activo

Archivos:
- `index.html`
- `styles.css`
- `script.js`

Características:
- carga directa en navegador
- manipulación de DOM sin framework
- persistencia con `localStorage`
- flujo completo de bienvenida, misiones, actividades, medallas y cierre

Responsabilidades:
- `index.html`: estructura visual y modales
- `styles.css`: layout, tema visual y responsive
- `script.js`: datos, estado, eventos, validación y progreso

---

## 2. Arquitectura modular de referencia

Carpeta:
- `js/`

Objetivo:
- servir como base para una futura migración ordenada
- separar responsabilidades por módulo
- facilitar mantenimiento y trabajo asistido con GPT

Capas:
- `data/`: mensajes y misiones
- `models/`: estado de juego
- `services/`: lógica de negocio
- `ui/`: actualización y renderizado de interfaz
- `utils/`: helpers y acceso a DOM
- `app.js`: coordinador principal

---

## Flujo del runtime activo

```text
Usuario
  -> index.html
  -> eventos en script.js
  -> validación de actividad
  -> actualización del STATE
  -> guardado en localStorage
  -> actualización visual y mensajes
```

---

## Flujo de la arquitectura modular

```text
Usuario
  -> app.js
  -> UI controllers
  -> services
  -> GameState
  -> StorageService
  -> UIController
```

---

## Modelo oficial de misión

La estructura oficial es:

```text
4 misiones
3 actividades por misión
12 actividades en total
```

Fases:
- `activation`
- `exploration`
- `understanding`
- `application`

---

## Fuente de verdad

Si hay duda entre archivos:

1. Para comportamiento actual real:
- `index.html`
- `script.js`
- `styles.css`

2. Para refactor o migración:
- `js/`
- `README_v2.md`

---

## Decisión recomendada para trabajo futuro

Mientras no migres el index principal a módulos, toma como oficial el runtime activo.

Si más adelante quieres reducir complejidad en `script.js`, la ruta correcta es:
1. replicar comportamiento en `js/`
2. validar equivalencia
3. recién después conectar `index.html` a la versión modular
