# Rellena Member.orcid con el ORCID real de cada miembro, extraído de su
# página en produccioncientifica.usal.es (una pasada única y educada).
# Uso: python -X utf8 scripts/fetch-orcids.py > scripts/data/orcids.json
import json
import re
import ssl
import subprocess
import sys
import time
import urllib.request

CTX = ssl.create_default_context()
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}

# Miembros con portal desde la BD (docker psql, salida name|portalUrl)
rows = subprocess.run(
    [
        "docker", "exec", "iuce-web-postgres", "psql", "-U", "iuce",
        "-d", "iuce_web", "-A", "-t", "-c",
        'SELECT name, "portalUrl" FROM "Member" WHERE "portalUrl" IS NOT NULL ORDER BY name;',
    ],
    capture_output=True, text=True, encoding="utf-8",
).stdout

members = [line.split("|", 1) for line in rows.strip().splitlines() if "|" in line]
print(f"{len(members)} miembros con portal", file=sys.stderr)

found = {}
missing = []
for i, (name, url) in enumerate(members, 1):
    try:
        req = urllib.request.Request(url, headers=UA)
        html = urllib.request.urlopen(req, timeout=25, context=CTX).read().decode("utf-8", "replace")
        ids = sorted(set(re.findall(r"orcid\.org/(\d{4}-\d{4}-\d{4}-\d{3}[\dX])", html)))
        if len(ids) == 1:
            found[name] = f"https://orcid.org/{ids[0]}"
            print(f"[{i}/{len(members)}] {name}: {ids[0]}", file=sys.stderr)
        elif len(ids) > 1:
            # Varias coincidencias (enlaces a coautores): nos quedamos sin asignar
            missing.append((name, f"ambiguo: {ids}"))
            print(f"[{i}/{len(members)}] {name}: AMBIGUO {ids}", file=sys.stderr)
        else:
            missing.append((name, "sin orcid en la página"))
            print(f"[{i}/{len(members)}] {name}: sin ORCID", file=sys.stderr)
    except Exception as e:  # noqa: BLE001
        missing.append((name, f"error: {e}"))
        print(f"[{i}/{len(members)}] {name}: ERROR {e}", file=sys.stderr)
    time.sleep(0.4)

print(json.dumps({"found": found, "missing": missing}, ensure_ascii=False, indent=1))
print(f"OK: {len(found)} · sin dato: {len(missing)}", file=sys.stderr)
