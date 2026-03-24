# Guía de Personalización

## Alcance

Esta guía asume la estructura oficial actual:
- narrativa JARVIS
- 4 misiones
- runtime activo en `script.js`

---

## Qué puedes cambiar rápido

### 1. Textos de bienvenida

Editar en:
- `index.html`

Puedes cambiar:
- título
- subtítulo
- descripción narrativa
- texto de botones
- créditos

### 2. Misiones y actividades

Editar en:
- `script.js`

Busca el objeto:

```javascript
const MISSIONS = { ... }
```

Cada misión contiene 3 actividades con campos como:
- `id`
- `name`
- `toolType`
- `question`
- `options`
- `feedback`
- `example`
- `hint`
- `checklistItems`
- `novaMessage`

Nota:
- el nombre del campo `novaMessage` se mantiene por compatibilidad interna
- el contenido debe escribirse con voz de JARVIS

### 3. Padlet

Editar en:
- `script.js`

Campos a cambiar:
- `embedUrl`
- `padletUrl`
- `padletOpenMessage`

### 4. Puntos y progresión

Editar en:
- `script.js`

Busca la suma de recompensas:

```javascript
STATE.rewards += 10;
```

### 5. Mensajes del personaje

Editar en:
- `script.js`
- `js/data/messages.js` si trabajas en la versión modular

---

## Tipos de actividad oficiales

Usa solo estos tipos en la estructura actual:
- `quiz`
- `padlet`
- `checklist`
- `classification`

---

## Reglas para agregar nuevas actividades

### Quiz

Usa:

```javascript
{
  id: '1a',
  name: 'Actividad: ejemplo',
  toolType: 'quiz',
  question: 'Pregunta',
  options: [
    { text: 'Opción correcta', correct: true },
    { text: 'Distractor', correct: false }
  ],
  feedback: {
    correct: 'Mensaje correcto',
    incorrect: 'Mensaje incorrecto'
  },
  novaMessage: 'Mensaje de JARVIS'
}
```

### Checklist

Usa:

```javascript
{
  id: '2b',
  name: 'Actividad: checklist',
  toolType: 'checklist',
  question: '¿Qué requiere el sistema?',
  checklistItems: [
    { text: 'Item 1', value: 'item1' },
    { text: 'Item 2', value: 'item2' }
  ],
  feedback: {
    correct: 'Bien',
    incorrect: 'Revisa de nuevo'
  },
  novaMessage: 'Mensaje de JARVIS'
}
```

### Classification

Usa:

```javascript
{
  id: '3a',
  name: 'Actividad: clasificar',
  toolType: 'classification',
  example: 'El sistema debe transmitir datos',
  question: '¿Función o condición?',
  correctAnswer: 'function',
  explanation: {
    correct: 'Correcto',
    incorrect: 'Incorrecto'
  },
  hint: 'Busca si es acción o requisito',
  novaMessage: 'Mensaje de JARVIS'
}
```

### Padlet

Usa:

```javascript
{
  id: '1b',
  name: 'Actividad: Padlet',
  toolType: 'padlet',
  toolLabel: 'Padlet de Activación',
  embedUrl: 'https://padlet.com/...',
  padletUrl: 'https://padlet.com/...',
  instructions: [
    'Paso 1',
    'Paso 2'
  ],
  padletOpenMessage: 'Mensaje de JARVIS',
  novaMessage: 'Mensaje de JARVIS'
}
```

---

## Qué no conviene tocar sin revisar todo

- la clave `novaGameState` en `localStorage`
- la cantidad oficial de misiones si no vas a actualizar también UI y documentación
- ids de actividades ya publicadas si existen datos persistidos

---

## Si quieres expandir el sistema

Si vas a pasar de 4 misiones a otra estructura, primero actualiza en conjunto:
- `index.html`
- `script.js`
- `README.md`
- `DOCUMENTACION.md`
- `GUIA_GPT.md`

Si no haces eso, el proyecto vuelve a quedar inconsistente.
