# Segunda pasada del índice: localiza la página de cada título del .toc.json
# dentro del PDF renderizado (los títulos van en Arial/Liberation negrita,
# lo que los distingue de las líneas del propio índice, en Times).
import json, re, sys
import fitz  # PyMuPDF

pdf_path, toc_path, out_path = sys.argv[1], sys.argv[2], sys.argv[3]

def norm(s):
    return re.sub(r"\s+", " ", s).strip()

doc = fitz.open(pdf_path)
# bloques de texto "de título" por página: todas sus spans Arial-negrita >=10.5pt
page_blocks = []  # (página 1-based, texto normalizado del bloque)
for pno in range(len(doc)):
    d = doc[pno].get_text("dict")
    for block in d.get("blocks", []):
        if block.get("type") != 0:
            continue
        spans = [s for line in block["lines"] for s in line["spans"] if norm(s["text"])]
        if not spans:
            continue
        headingish = [
            s for s in spans
            if ("Arial" in s["font"] or "Liberation" in s["font"]) and (s["flags"] & 16) and s["size"] >= 10
        ]
        if headingish and len(headingish) >= len(spans) - 1:  # tolera algún span raro
            page_blocks.append((pno + 1, norm(" ".join(s["text"] for s in headingish))))

entries = json.load(open(toc_path, encoding="utf8"))
pages, missing = {}, []
for e in entries:
    text = norm(e["text"])
    hit = next((p for p, blocktext in page_blocks if text in blocktext), None)
    if hit:
        pages[e["text"]] = hit
    else:
        missing.append(e["text"])

json.dump(pages, open(out_path, "w", encoding="utf8"), ensure_ascii=False, indent=1)
print(f"{len(pages)}/{len(entries)} títulos localizados")
if missing:
    print("SIN LOCALIZAR:", *missing, sep="\n  - ")
