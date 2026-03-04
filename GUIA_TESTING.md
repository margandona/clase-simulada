# 🧪 GUÍA DE TESTING - Verificar que los 3 problemas están resueltos

**Objetivo:** Verificar que cada uno de los 3 problemas se ha solucionado correctamente.

---

## TEST 1: Verificar que la misión marca como completada ✓

### Paso a paso:

1. **Abre la aplicación** en el navegador
2. **Inicia la misión** - Click en "COMENZAR MISIÓN"
3. **Abre la Misión 1** - Click en el botón de misión 1
4. **Completa las 3 actividades:**
   - **Actividad 1a (Quiz):**
     - Click en "¿Quién es JARVIS?"
     - Selecciona la respuesta correcta: "La IA que controla Stark Industries"
     - Click en "Verificar Respuesta"
     - Click en "Marcar como Completada"
   
   - **Actividad 1b (Padlet):**
     - Click en "Padlet: ¿Cómo ayudarías?"
     - Click en "Abrir Padlet" (se abre en nueva ventana)
     - Click en "Marcar como Completada"
   
   - **Actividad 1c (Padlet/CSV):**
     - Click en la tercera actividad
     - Completa lo que se pida
     - Click en "Marcar como Completada"

### Verificación:
✅ **El badge de la Misión 1 debe CAMBIAR A ✓ (con animación verde)**

**Señales esperadas:**
- El logo circular junto a "Misión 1" muestra "✓" en lugar de "–"
- Color verde claro con sombra
- Animación de pulso al completarse

---

## TEST 2: Verificar que el check aparece con automáticamente en submenu

### Paso a paso:

1. **Abre la aplicación** y comienza
2. **Click en Misión 1** para abrir el submenu
3. **Abre la primera actividad** (1a - Quiz)
4. **Responde correctamente** la pregunta
5. **Click en "Marcar como Completada"** (sin cerrar el submenu)
6. **Observa el submenu** mientras se cierra la actividad

### Verificación:
✅ **El elemento "Quiz: ¿Quién es JARVIS?" debe mostrar ✅ al lado**

**Señales esperadas:**
- El checkmark ✅ aparece inmediatamente
- El texto "Toca para empezar" cambia a "Completada"
- El fondo del item se tiñe ligeramente verde
- Hay una pequeña animación de slide

---

## TEST 3: Verificar que aparece modal de medalla

### Paso a paso:

1. **Abre la aplicación** y comienza
2. **Completa todas las actividades de la Misión 1:**
   - Actividad 1a (Quiz)
   - Actividad 1b (Padlet)
   - Actividad 1c (otra)
3. **Después de completar la 3ra actividad (cuando completedCount === 3)**

### Verificación:
✅ **Debe aparecer un MODAL DE MEDALLA con:**

**Contenido esperado del modal:**
- 🏅 Emoji de medalla flotante
- Título: "🏅 Misión 1 Completada"
- Mensaje: "¡Éxito! Has completado la primera misión de reparación."
- Imagen de la medalla (assets/medallas/m1.png)
- Texto: "Medallas desbloqueadas: 1/4"
- Botón "✅ Continuar" (opcional)

**Comportamiento esperado:**
- NOVA celebra (animación de baile)
- El modal se abre después de 500ms
- Se cierra automáticamente después de 4 segundos
- Se puede cerrar manualmente con el botón X

---

## TEST 4: Verificar segunda medalla (Misión 2)

### Paso a paso:

1. En el mismo juego, **completa todas las actividades de la Misión 2**
2. **Después de completar la 6ta actividad general** (3ra de misión 2)

### Verificación:
✅ **Debe aparecer OTRO MODAL DE MEDALLA:**

**Contenido esperado:**
- Título: "🥈 Misión 2 Completada"
- Mensaje: "¡Vas bien! Dos misiones reparadas con éxito."
- Imagen: assets/medallas/m2.png
- Texto: "Medallas desbloqueadas: 2/4"

---

## TEST 5: Prueba completa - 3 misiones

Para una prueba más completa:

1. Completa **Misión 1** → Modal medalla 1/4
2. Completa **Misión 2** → Modal medalla 2/4
3. Completa **Misión 3** → Modal medalla 3/4

**Verificación final:**
✅ Todos los badges muestran ✓
✅ Todos los items en submenu muestran ✅
✅ Todos los modales aparecieron correctamente

---

## CHECKLIST DE DEBUGGING SI ALGO NO FUNCIONA

### Si el badge no muestra ✓:
```javascript
// En la consola del navegador (F12):
const gs = GameState.getInstance();
console.log(gs.get('completedMissions')); // Debe mostrar ['1a', '1b', '1c']
console.log(gs.getCompletedMissionsCount()); // Debe mostrar 1 (misiones completadas)

// Verificar si la función se llamó:
// Agregar log en updateMissionBadges()
```

### Si el checkmark no aparece en submenu:
```javascript
// Verificar que el elemento existe en el DOM:
document.querySelector('[data-submission-id="1a"]');
// Debe retornar el elemento, no null

// Verificar clases del elemento:
document.querySelector('[data-submission-id="1a"]').classList;
// Debe incluir 'completed'
```

### Si el modal de medalla no aparece:
```javascript
// Verificar que las medallas se registran:
const gs = GameState.getInstance();
console.log(gs.get('earnedMedals')); // Debe mostrar [1]
console.log(gs.get('medalsShown')); // Debe mostrar [1]

// Abrir consola de desarrollador (F12)
// Ver si hay errores en la consola
```

---

## COMANDOS DE CONSOLA ÚTILES PARA TESTING

```javascript
// Ver estado completo del juego
const gs = GameState.getInstance();
console.log(gs.getState());

// Marcar todas las actividades como completadas (para testing rápido)
gs.state.completedMissions = ['1a', '1b', '1c', '2a', '2b', '2c'];
gs.state.earnedMedals = [1, 2];

// Verificar badges
gs.getCompletedMissionsCount(); // Número de misiones

// Verificar medallas
gs.hasMedal(1); // true/false
gs.isMedalModalShown(1); // true/false
```

---

## RESULTADO ESPERADO

### Antes de las correcciones:
- ❌ Badge no cambiaba a ✓
- ❌ Checkmark no aparecía en submenu
- ❌ Modal de medalla nunca se abría

### Después de las correcciones:
- ✅ Badge cambia a ✓ con animación verde
- ✅ Checkmark aparece inmediatamente en submenu
- ✅ Modal de medalla aparece cada 3 actividades completadas
- ✅ Medalla 1 después de 3 actividades
- ✅ Medalla 2 después de 6 actividades
- ✅ Medalla 3 después de 9 actividades
- ✅ Medalla 4 después de 12 actividades (o solo hasta 6 si solo hay 2 misiones)

---

## 💡 NOTAS

1. **Las imágenes de medallas** deben estar en:
   - `assets/medallas/m1.png`
   - `assets/medallas/m2.png`
   - `assets/medallas/m3.png`
   - `assets/medallas/m4.png`

2. **El modal se auto-cierra** después de 4 segundos
   - Si quieres cerrarlo antes, haz click en el botón X

3. **Los datos persisten** en localStorage
   - Si recargues la página, las medallas ganadas se mantienen

4. **El sistema es agnóstico** a qué tipo de actividad sea
   - Aplica para quiz, padlet, clasificación, etc.

---

✅ **Si todos los tests pasan, los 3 problemas están RESUELTOS.**

