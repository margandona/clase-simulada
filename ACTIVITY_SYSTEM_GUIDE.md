# Sistema de Actividades Interactivas - JARVIS

## Resumen

La estructura oficial actual usa un modal reutilizable para actividades y una progresión de 4 misiones.

Tipos de actividad oficiales en uso:
- `quiz`
- `padlet`
- `checklist`
- `classification`

---

## Flujo de actividad

1. El estudiante abre una actividad desde una misión.
2. Se carga el modal de actividad.
3. Se renderiza el contenido según `toolType`.
4. El estudiante interactúa.
5. La app valida la respuesta o interacción.
6. Se habilita completar.
7. Se guarda progreso, se actualiza UI y se muestra feedback.

---

## Renderizado actual

En `script.js` el sistema renderiza según el tipo:
- `renderQuiz(...)`
- `renderPadlet(...)`
- `renderChecklist(...)`
- `renderClassification(...)`

---

## Validación actual

Tipos con validación directa:
- `quiz`
- `checklist`
- `classification`

Caso especial:
- `padlet` requiere interacción registrada para habilitar completar

---

## Datos mínimos por actividad

### Quiz
- `question`
- `options`
- `feedback`

### Checklist
- `question`
- `checklistItems`
- `feedback`

### Classification
- `example`
- `question`
- `correctAnswer`
- `explanation`
- `hint`

### Padlet
- `toolLabel`
- `embedUrl`
- `padletUrl`
- `instructions`
- `padletOpenMessage`

---

## Feedback al estudiante

El sistema entrega feedback en tres niveles:
- mensaje inmediato de validación
- mensaje contextual de JARVIS
- actualización visual de progreso, medallas y trofeo

---

## Estado relacionado a actividades

En `STATE` se registran al menos estos datos:
- `completedMissions`
- `activityInteractions`
- `currentActivity`
- `rewards`
- `currentPhase`

---

## Si quieres agregar un tipo nuevo

No lo agregues solo en la misión.

Debes actualizar también:
- renderizado en `script.js`
- validación en `script.js`
- feedback si corresponde
- documentación en este archivo
- `GUIA_GPT.md` si quieres que GPT lo use correctamente

---

## Recomendación

Mientras el proyecto siga usando `script.js` como runtime principal, considera este archivo como la referencia oficial del sistema de actividades.
