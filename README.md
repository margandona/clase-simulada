# 🚀 NOVA - Plataforma Educativa Gamificada

## Itinerario de Aprendizaje de 30 Minutos

**NOVA** es una experiencia de aprendizaje interactiva diseñada para enseñar conceptos de **requerimientos de software** (funciones vs. condiciones) a estudiantes de primer año de informática.

---

## 🎯 ¿Qué es NOVA?

NOVA es una IA varada en órbita terrestre que necesita ayuda para regresar a casa. Su problema: **su sistema de requerimientos está incompleto**. Los estudiantes la ayudarán identificando funciones y condiciones para restaurar su sistema.

---

## ⚡ Inicio Rápido para Docentes

### 1. Preparación (5 minutos antes de clase)

```bash
# Opción A: Abrir el archivo localmente
# Simplemente abre index.html en cualquier navegador

# Opción B: Servir desde un servidor local
# Si tienes Python instalado:
python -m http.server 8000
# Luego abre: http://localhost:8000

# Opción C: Subir a un servidor web
# Sube todos los archivos a tu hosting
```

### 2. Compartir con Estudiantes

- **Método 1:** Comparte la URL (si está en servidor)
- **Método 2:** Comparte el enlace de localhost (todos en la misma red)
- **Método 3:** Envía los archivos por email/drive para que abran localmente

### 3. Configurar el Padlet (Misión 5)

1. Ve a https://padlet.com y crea un nuevo Padlet
2. Pregunta sugerida: *"¿Qué otras funciones y condiciones necesita NOVA para viajar?"*
3. Comparte el enlace con los estudiantes cuando lleguen a la Misión 5
4. **Opcional:** Integra el enlace en el código (ver `PEDAGOGICAL_GUIDE.md`)

---

## 📚 Estructura del Itinerario

| Fase | Misión | Tiempo | Objetivo |
|------|--------|--------|----------|
| 🎬 **Activación** | Historia de NOVA | 5 min | Introducir el problema |
| 🔍 **Exploración** | Comprender el Problema | 5 min | Identificar la situación |
| 🧠 **Comprensión** | Conceptos Clave | 8 min | Definir funciones vs. condiciones |
| 🔧 **Aplicación** | Reparar el Sistema | 7 min | Clasificar ejemplos |
| 🤝 **Colaboración** | Misión Colaborativa | 3 min | Contribuir ideas (Padlet) |
| 🎉 **Cierre** | Lanzamiento Final | 2 min | Celebrar logros |

**Total:** ~30 minutos

---

## 🎮 Características Principales

### ✅ Gamificación Educativa
- Sistema de puntos (+10 por actividad)
- Badges de progreso visual
- Mensajes dinámicos de NOVA
- Celebración final automatizada

### ✅ Diseño Pedagógico
- Basado en constructivismo
- Aprendizaje activo
- Feedback inmediato
- Progreso visible

### ✅ Accesibilidad
- Lenguaje claro y simple
- Iconos de apoyo visual
- Botones grandes (táctil optimizado)
- Alto contraste
- Compatible con neurodiversidad

### ✅ Tecnología Simple
- No requiere frameworks
- Funciona offline (excepto Padlet)
- Se guarda progreso automáticamente
- Responsive (funciona en móvil y computadora)

---

## 📁 Archivos del Proyecto

```
gamificación/
├── index.html              # Interfaz principal
├── script.js               # Lógica del juego y misiones
├── styles.css              # Estilos y diseño responsive
├── README.md               # Este archivo (inicio rápido)
├── PEDAGOGICAL_GUIDE.md    # Guía completa para docentes
├── DOCUMENTACION.md        # Documentación técnica original
└── GUIA_GPT.md            # Guía para adaptar con IA
```

---

## 🎯 Objetivos de Aprendizaje

Al finalizar la actividad, los estudiantes serán capaces de:

1. ✅ **Definir** qué es una función del sistema
2. ✅ **Definir** qué es una condición del sistema
3. ✅ **Diferenciar** entre funciones y condiciones
4. ✅ **Clasificar** ejemplos de requisitos correctamente
5. ✅ **Aplicar** estos conceptos en contextos reales

---

## 💻 Requisitos Técnicos

### Para el Docente:
- Proyector o pantalla compartida
- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Conexión a internet (solo para Padlet)

### Para los Estudiantes:
- Smartphone, tablet o computadora
- Navegador web
- Conexión a internet (opcional si trabajas local)

---

## 🚀 Flujo de Uso en Clase

### Antes de Empezar (2 min)
1. Proyecta NOVA en la pantalla
2. Pide a estudiantes que abran la URL en sus dispositivos
3. Explica brevemente: "Vamos a ayudar a NOVA a regresar a casa"

### Durante las Misiones (25 min)
- **Guía cada fase** según PEDAGOGICAL_GUIDE.md
- **Monitorea progreso** caminando por el aula
- **Facilita discusión** en momentos clave
- **Valida aprendizaje** con preguntas

### Al Finalizar (3 min)
- **Celebra logros** cuando completen Misión 6
- **Refuerza conceptos:** "¿Qué aprendimos?"
- **Conecta con próxima clase**

---

## 🔧 Personalización Rápida

### Cambiar el mensaje de bienvenida
Edita `index.html`, línea ~217 (dentro del modal Story)

### Ajustar los puntos por actividad
Edita `script.js`, línea ~224:
```javascript
STATE.rewards += 10; // Cambia el 10 por otro valor
```

### Modificar las misiones
Edita `script.js`, líneas ~10-83 (objeto MISSIONS)

### Ver guía completa de personalización
Lee `PEDAGOGICAL_GUIDE.md` (sección "Instrucciones Técnicas")

---

## 📊 Seguimiento del Progreso

### Ver el progreso de un estudiante:

**Pide al estudiante que:**
1. Presione F12 (abrir DevTools)
2. Vaya a la pestaña "Console"
3. Escriba: `JSON.parse(localStorage.getItem('novaGameState'))`
4. Presione Enter

Verá:
```javascript
{
  completedMissions: ["1a", "1b", "1c"],
  rewards: 30,
  currentPhase: "exploration",
  showedFinalScreen: false
}
```

---

## 🔄 Reiniciar el Juego

### Si un estudiante quiere empezar de nuevo:

**Método 1: Desde el navegador**
- F12 → Console → `localStorage.clear()` → Recargar página

**Método 2: Borrar datos del sitio**
- Configuración del navegador → Borrar datos del sitio → Recargar

---

## ♿ Accesibilidad

NOVA está diseñado siguiendo principios de diseño universal:

- ✅ Navegación por teclado
- ✅ Etiquetas ARIA para lectores de pantalla
- ✅ Alto contraste (WCAG 2.1 AA)
- ✅ Tamaño de botones táctiles (>44px)
- ✅ Lenguaje simple (nivel B1)
- ✅ Feedback multimodal (visual + texto)

---

## 🐛 Solución de Problemas

### "No se guarda mi progreso"
**Solución:** Verifica que el navegador no esté en modo incógnito. localStorage no funciona en modo privado.

### "El Padlet no se abre"
**Solución:** Comparte el enlace manualmente. O integra el URL en `script.js` línea ~235.

### "NOVA no se anima"
**Solución:** Recarga la página. Si persiste, verifica que JavaScript esté habilitado.

### "Los botones no responden"
**Solución:** Asegúrate de que todos los archivos (HTML, CSS, JS) estén en la misma carpeta.

---

## 📈 Evaluación Sugerida

### Formativa (durante la clase):
- Observa participación
- Revisa respuestas en Misión 4
- Lee contribuciones del Padlet

### Sumativa (opcional):
- Quiz post-clase (5 preguntas)
- Proyecto: Documentar requisitos de una app favorita
- Autoevaluación: "¿Qué aprendí?"

**Ejemplo de preguntas:**
1. ¿Cuál es una función de WhatsApp? (Ej: Enviar mensajes)
2. ¿Cuál es una condición de WhatsApp? (Ej: Requiere internet)
3. ¿Por qué es importante diferenciarlos?

---

## 🎓 Fundamento Pedagógico

NOVA integra:
- **Constructivismo** (Piaget, Vygotsky)
- **Aprendizaje Significativo** (Ausubel)
- **Gamificación Educativa** (Kapp, Deterding)
- **Diseño Universal para el Aprendizaje** (CAST)

Ver fundamentación completa en `PEDAGOGICAL_GUIDE.md`

---

## 📞 Soporte

### Documentación Detallada:
- **Para docentes:** `PEDAGOGICAL_GUIDE.md`
- **Para desarrolladores:** `DOCUMENTACION.md`
- **Para personalizar con IA:** `GUIA_GPT.md`

### Problemas Técnicos:
- Revisa la consola del navegador (F12)
- Verifica que todos los archivos estén presentes
- Asegúrate de usar un navegador actualizado

---

## 🌟 Próximos Pasos

Después de esta sesión, puedes:

1. **Profundizar conceptos**
   - Requisitos no-funcionales
   - Documentación formal
   - Historias de usuario

2. **Proyectos aplicados**
   - Documentar requisitos de una app
   - Analizar sistemas existentes
   - Crear especificaciones técnicas

3. **Expandir NOVA**
   - Agregar más misiones
   - Crear niveles de dificultad
   - Conectar con base de datos

---

## 📝 Checklist Pre-Clase

- [ ] Proyector funcionando
- [ ] URL/archivos compartidos con estudiantes
- [ ] Padlet creado y URL lista
- [ ] Testear que NOVA funciona en tu navegador
- [ ] Leer `PEDAGOGICAL_GUIDE.md` (fases del itinerario)
- [ ] Preparar preguntas de discusión
- [ ] Timer/cronómetro para controlar tiempos

---

## 🎨 Créditos

**NOVA** fue diseñado con:
- ❤️ Pasión por la educación
- 🧠 Fundamentos pedagógicos sólidos
- ♿ Compromiso con la accesibilidad
- 🎮 Gamificación significativa

**Tecnologías:**
- HTML5, CSS3, JavaScript vanilla
- Sin dependencias externas
- Código abierto y modificable

---

## 🚀 ¡Comienza Ahora!

1. Abre `index.html` en tu navegador
2. Lee `PEDAGOGICAL_GUIDE.md` 
3. Prepara tu Padlet
4. **¡Que tengas una excelente clase!**

---

**Versión:** 2.0 - Itinerario Pedagógico de 30 minutos  
**Última actualización:** Febrero 2026  
**Licencia:** Uso educativo libre  

---

💬 *"Transformando el aprendizaje de requisitos de software, una misión a la vez."*
