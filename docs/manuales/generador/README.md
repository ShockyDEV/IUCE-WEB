# Generador de la documentación del proyecto

Los PDF de `docs/manuales/` (Memoria + Anexos A–D + volumen `Anexos.pdf`) se
generan con estos scripts. Los `.docx` de `docs/manuales/docx/` son la salida
editable; para retoques pequeños basta editarlos en Word y reexportar a PDF.
Para regenerar desde cero:

```bash
# Requisitos: docx-js global (NODE_PATH), LibreOffice, Python con PyMuPDF,
# pdftoppm (Poppler). Rutas de este equipo dentro de build.sh.
./build.sh memoria Memoria
./build.sh anexo-a Anexo_A_Especificacion_de_Requisitos
./build.sh anexo-b Anexo_B_Especificacion_de_Diseno
./build.sh anexo-c Anexo_C_Documentacion_Tecnica
./build.sh anexo-d Anexo_D_Documentacion_de_Usuario   # necesita shots-doc/
./build.sh anexos-todos Anexos                        # volumen combinado
```

Cada build hace **dos pasadas**: genera el DOCX, lo convierte a PDF, localiza
la página real de cada título (`toc_pages.py`, los títulos van en Arial
negrita) y regenera el DOCX con el índice paginado.

- `lib.js` — estilos comunes (portada, índice con puntos, tablas azul marino,
  pies «Tabla N. / Figura N.») replicados de la documentación del TFG de
  IUCE Reservas.
- `shots.js` — capturas reales para el Anexo D con puppeteer-core + Chrome.
  Necesita la web corriendo en `localhost:3000` con la base de datos poblada.
  Las capturas se reducen después a JPEG 1500 px (carpeta `shots-doc/`).
- `repair-db.js` — repone lo que los scripts de datos no cubren tras
  reconstruir la BD: la fila que oculta `/estadisticas` y los registros de los
  documentos internos cuyos ficheros viven en `storage/intranet/`.
