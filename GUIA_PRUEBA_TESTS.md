# 🧪 GUÍA DE PRUEBA RÁPIDA - Verificar que TODO funciona

## ⚡ Versión Rápida (2 minutos)

### Test 1: Ticket Inmediato ✅
**Objetivo:** Verificar que el checkmark aparece sin recargar

**Pasos:**
```
1. Abre index.html en el navegador
2. Haz clic en "Misión 1"
3. Se abre el accordion con 3 actividades
4. Haz clic en la actividad "1a"
5. Completa la actividad (termina el quiz/test)
6. Haz clic en "Completar"
7. ⭐ RESULTADO ESPERADO:
   ✅ Verás un mensaje "¡Completado!"
   ✅ Verás el checkmark ✅ en la actividad 1a INMEDIATAMENTE
   ✅ NO necesitas recargar la página
```

### Test 2: Badge con Animación ✅
**Objetivo:** Verificar que los badges se animan

**Pasos:**
```
1. (Continuando del test anterior)
2. Cierra la modal (click X)
3. Inicia actividad "1b" en el mismo accordion
4. Complétala
5. Repite con "1c"
6. CUANDO COMPLETES "1c":
   ⭐ RESULTADO ESPERADO:
   ✅ En la parte superior verás el badge "1"
   ✅ Cambiará de "○" a "✓"
   ✅ Verás una animación de pulsado/brillo
   ✅ Aparecerá un modal de "Medalla Desbloqueada"
```

### Test 3: Medalla Visible ✅
**Objetivo:** Verificar que la medalla aparece en el header

**Pasos:**
```
1. (Continuando - ya completaste misión 1)
2. Cierra el modal de medalla
3. Mira en la parte superior del header
4. ⭐ RESULTADO ESPERADO:
   ✅ Verás el medalero (4 medallas)
   ✅ La medalla "1" estará de color (earned)
   ✅ Las medallas 2-4 estarán grises (locked)
   ✅ El contador mostrará "1/4 medallas"
```

---

## 📋 Versión Completa (5 minutos)

### Test C1: Orden de Operaciones
**Verificar que todo ocurre en el orden correcto**

```javascript
// Abre la consola: F12
// Ve a la tab "Console"

// Completa una actividad 
// DEBES VER logs en este orden:
1. "🔍 Validating and syncing game state..." [al cargar]
2. "✅ Activity X updated successfully" [cuando completas]
3. "✅ UI updated - N/6 missions completed" [después de updateUI]
4. "✅ Badge X completed with animation" [cuando badge cambia]
```

### Test C2: Validación que Funciona
```javascript
// En consola:
validateAndSyncGameState()

// DEBE MOSTRAR algo como:
✅ State validation complete
   - Completed missions: 3
   - Rewards: 30
   - Earned medals: 1
   - Trophy earned: no
```

### Test C3: Fallback del Accordion
**Objetivo:** Verificar que funciona si accordion está cerrado

```
1. Complete una actividad de la Misión 1
2. Cierra el accordion 1 (click en el botón)
3. Haz clic en "Misión 2"
4. Completa una actividad de Misión 2
5. Ahora abre de nuevo Misión 1
6. ⭐ RESULTADO ESPERADO:
   ✅ Las actividades completadas ESTÁN MARCADAS ✅
   ✅ Aunque el accordion estaba cerrado
   ✅ Esto funciona gracias al fallback que abre el accordion
```

### Test C4: Persistencia de Datos
**Objetivo:** Verificar que se guarda todo correctamente

```
1. Complete 5-6 actividades diferentes
2. Anota:
   - Número de badges con ✓
   - Medallas ganadas
   - Puntos totales
3. RECARGA LA PÁGINA (F5 o Ctrl+R)
4. ⭐ RESULTADO ESPERADO:
   ✅ Se mantienen todos tus progreso
   ✅ Los checkmarks siguen visible
   ✅ Las medallas siguen ganadas
   ✅ Los puntos son los mismos
```

### Test C5: Sincronización Manual
```javascript
// En consola, completa unas actividades
// Luego ejecuta:
saveStateToStorage()
// Recarga
F5
// Ejecuta:
validateAndSyncGameState()

// DEBE MOSTRAR que todo está sincronizado
```

---

## 🔴 PROBLEMAS QUE DEBERÍA VER ARREGLADOS

### ❌ ANTES (Estos problemas han sido ELIMINADOS):
- 🔴 Completabas actividad → No veías checkmark → Tenías que recargar
- 🔴 Completabas 3 actividades → Badge no tenía animación → Confuso
- 🔴 Medalla no se desbloqueaba claramente
- 🔴 Al recargar, a veces faltaban checkmarks

### ✅ AHORA (Esto es lo que DEBE PASAR):
- 🟢 Completas actividad → Ves checkmark INMEDIATAMENTE ✅
- 🟢 Completas 3 actividades → Badge anima y cambia a ✓ 🎉
- 🟢 Medalla se ofrece con notificación clara
- 🟢 Al recargar, TODO se mantiene perfecto

---

## 🐛 Si Algo Falla...

### Symptom 1: No ves el checkmark
```
✓ Abre consola: F12
✓ Busca errores rojos (error logs)
✓ Completa una actividad
✓ Busca "Activity X updated successfully"
✓ Si ves WARNING en lugar de success:
  → El fallback se activó, pero algo falla
  → Check el accordion está visible
```

### Symptom 2: Badge no anima
```
✓ Completa 3 actividades de una misión
✓ En consola mira:
✓ Busca "Badge X completed with animation"
✓ Si no ves ese log:
  → updateUI() no se llamó correctamente
  → Verifica que saveStateToStorage() funcionó
```

### Symptom 3: Estado no persiste
```
✓ Completa actividades
✓ Abre consola: F12
✓ Ejecuta: console.log(localStorage.novaGameState)
✓ Si es undefined:
  → saveStateToStorage() no guardó
  → Check localStorage no está deshabilitado
```

---

## 📱 Test en Móvil (Opcional)

**Usar DevTools:**
```
1. F12 → Ctrl+Shift+M (Device Toggle)
2. Selecciona iPhone 12
3. Repite los tests de arriba
4. DEBE FUNCIONAR igual en mobile
```

---

## ✅ CHECKLIST DE VALIDACIÓN

Marca ✓ cuando verifiques cada cosa:

- [ ] Checkmarks aparecen sin recargar
- [ ] Badges se animan cuando misión se completa
- [ ] Medallas se desbloquean visualmente
- [ ] Contador de medallas actualiza
- [ ] Todo persiste al recargar
- [ ] Consola no muestra errores
- [ ] Validación ejecuta correctamente
- [ ] Fallback funciona con accordion cerrado

**SI todo tiene ✓: ¡PERFECTO! Todo está funcionando! 🎉**

---

## 🚀 Comando de Debug Rápido

Si necesitas verificar estado rápidamente, ejecuta en consola:

```javascript
console.log({
  missions: STATE.completedMissions.length,
  rewards: STATE.rewards,
  medals: STATE.earnedMedals,
  trophy: STATE.trophyEarned,
  phase: STATE.currentPhase
})
```

Esto mostrará todo el estado en una línea.

---

**Fecha:** Marzo 4, 2026  
**¡Listo para probar! 🚀**
