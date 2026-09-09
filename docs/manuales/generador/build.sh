#!/bin/bash
# Uso: ./build.sh memoria Memoria  → out/Memoria.docx + out/Memoria.pdf con índice paginado
set -e
cd "$(dirname "$0")"
SCRIPT="$1"; BASE="$2"
export NODE_PATH="C:/Users/USUARIO/AppData/Roaming/npm/node_modules"
export PYTHONUTF8=1 PYTHONIOENCODING=utf-8
SOFFICE="C:/Program Files/LibreOffice/program/soffice.exe"

node "$SCRIPT.js"
"$SOFFICE" --headless --convert-to pdf --outdir out "out/$BASE.docx" >/dev/null
python toc_pages.py "out/$BASE.pdf" "out/$BASE.toc.json" "out/$BASE.pages.json"
node "$SCRIPT.js" "out/$BASE.pages.json"
"$SOFFICE" --headless --convert-to pdf --outdir out "out/$BASE.docx" >/dev/null
echo "LISTO out/$BASE.pdf"
