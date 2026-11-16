# Gen-Eco en Ruta: Guardianes Alfa — versión 2.0

Juego web (HTML/CSS/JS puro) para GitHub Pages. Base: versión 3 del juego aplicado en el colegio. Versión 2.0 para validación por jueces y uso en casa.

## Qué cambió respecto a la versión aplicada
1. **Guardado y recuperación de progreso**: el avance se guarda en el servidor (Google Apps Script) con el código anónimo. Si el estudiante cambia de dispositivo o borra datos, escribe el mismo código y continúa. Si no hay internet, juega igual y se sincroniza después.
2. **Misión 1 (Cinta de residuos) más accesible**: meta 60 → 45 aciertos y cinta más lenta al inicio.
3. **Misión 3 (Corredor ecológico) más accesible**: 5 especies (meta 10 hábitats, antes 12) y serpiente más lenta.
4. **Ayuda al reintentar**: si una misión se abandonó, el juego sugiere el ritmo "Tranquilo".
5. **Textos más cortos**: el prólogo pasó de 10 a 4 pantallas.
6. **Estilo de guardián explicado**: aclara que no es un test, no suma puntos y solo cambia el mensaje y el título final.
7. **Pantalla "Antes de empezar"** para jugar en casa (duración, guardado con código, sonido, responder por uno mismo).
8. **Récord personal opcional**: al repetir una estación aparece "Tu récord". Sigue sin ranking entre estudiantes.
9. **Preguntas de uso en casa** (opcionales, al final): sesiones, tiempo total, dispositivo y si alguien ayudó a responder. Se envían con el registro final.
10. **Registros con versión y contexto** (`v`, `ctx` = casa/aula) para separar la Fase 1 de la Fase 2 al analizar.
11. **Panel docente**: la clave ya no está en texto plano (se guarda su huella SHA-256).
12. **Tutorial con práctica**: la primera vez en cada estación hay una práctica de hasta 30 s, sin puntos y sin envío de datos.
13. **Niveles Bronce / Plata / Oro** por estación, ligados al aprendizaje (preguntas de comprensión correctas + calidad de la decisión). Se puede repetir para subir de nivel; da monedas extra.
14. **Colección "Datos de la Ruta"** (12 datos): cada estación completada regala uno al azar (dos con nivel Oro). Es una recompensa variable y un motivo para repetir.
15. **Reto del curso**: barra compartida con los fragmentos recuperados entre todos, sin ranking individual (requiere el guardado en servidor y `meta` en nube.js).
16. Sin cambios en la EMEA (los 20 ítems validados no se tocaron).

## Puesta en marcha (≈15 minutos)
1. **Sube TODOS los archivos** a la raíz de tu repositorio de GitHub Pages (reemplaza los anteriores), incluida la carpeta `fonts/`.
2. **Activa el guardado de progreso** (opcional pero muy recomendado):
   a. En la hoja de cálculo de respuestas del proyecto: Extensiones → Apps Script. Pega el contenido de `progreso.gs`.
   b. Implementar → Nueva implementación → tipo "Aplicación web". Ejecutar como: **yo**. Quién tiene acceso: **cualquier persona**.
   c. Copia la URL que termina en `/exec` y pégala en `nube.js`: `{"progreso":{"url":"AQUÍ","meta":160}, ...  (meta = 4 × número de estudiantes participantes)`.
   d. Prueba: juega con un código de prueba, ábrelo en otro navegador con el mismo código y verifica que recupera el avance. Verás una hoja nueva llamada "progreso".
3. **Clave del panel docente** (admin.html): ver mensaje de entrega. Cámbiala generando el SHA-256 de tu nueva clave y reemplazando `PH` en admin.html.
4. **Códigos de prueba**: usa un código tipo `PRUEBA1` y bórralo después de las hojas "progreso" y de respuestas para que no contamine los datos.

## URLs
- Juego (casa): `https://TU-USUARIO.github.io/GENECO/`
- Juego en aula: añade `?ctx=aula`
- Pretest: `?fase=pre` · Postest 1: `?fase=post` · **Postest 2: `?fase=post2`** (se guarda con fase `post2`)
- Con el código prellenado: `?fase=post2&cod=B018`. El juego ya trae un botón "Responder el cuestionario final" que abre este enlace con el código del estudiante.
- **Modo demostración: `?demo=1`** (para compañeros, profesores o pruebas): no envía nada a Google Forms ni al servidor, no muestra el reto del curso ni el botón del cuestionario, y muestra un aviso amarillo.
- Panel docente: `admin.html`

## Códigos de participante
El juego normaliza el código: `c1`, `C01` y `CO13` pasan a `C001`, `C001` y `C013` (una letra + tres dígitos; la letra O dentro del número se cambia por cero). Pide a los estudiantes usar **el mismo código de la fase 1** para poder emparejar sus mediciones.

## Limitaciones conocidas
- El guardado en servidor no tiene autenticación: cualquiera que conozca un código puede ver o continuar ese avance. Por eso solo se guardan códigos anónimos y avance de juego, nada personal.
- La recuperación en otro dispositivo depende de que la URL de Apps Script esté bien desplegada; sin ella el juego usa solo el navegador.
- Prueba hecha con un servidor simulado (guardar, recuperar en otro navegador, falla de conexión); falta probar con tu Apps Script real.
