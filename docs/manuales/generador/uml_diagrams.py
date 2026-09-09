# -*- coding: utf-8 -*-
"""
Diagramas UML de la documentación de iuce-web, replicando la notación de las
figuras del TFG de IUCE Reservas (casos de uso con actores y generalización,
DFD de contexto, modelo de datos estilo herramienta de BD, statechart,
secuencia con líneas de vida y componentes UML). Salida: diagrams/uml-*.png.
"""
import os
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import (FancyBboxPatch, Ellipse, Circle,
                                FancyArrowPatch, Rectangle, Polygon)

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "diagrams")
os.makedirs(OUT, exist_ok=True)

NAVY = "#1F4257"
INK = "#2D3748"
GRAYT = "#6B7683"
# paleta (relleno, borde) al estilo de las figuras del TFG
GRAY = ("#EDEDED", "#666666")
BLUE = ("#DAE8FC", "#6C8EBF")
TEAL = ("#D9F2EE", "#2E8C82")
GREEN = ("#D5E8D4", "#82B366")
ORANGE = ("#FFE6CC", "#D79B00")
PURPLE = ("#E1D5E7", "#9673A6")
RED = ("#F8CECC", "#B85450")
NOTE = ("#FFF2CC", "#D6B656")
PANEL = ("#F6F9FB", "#C3CCD4")

plt.rcParams["font.family"] = "DejaVu Sans"


def fig_ax(w_units, h_units, scale=0.095):
    fig, ax = plt.subplots(figsize=(w_units * scale, h_units * scale))
    ax.set_xlim(0, w_units)
    ax.set_ylim(0, h_units)
    ax.set_aspect("equal")
    ax.axis("off")
    return fig, ax


def save(fig, name):
    path = os.path.join(OUT, name)
    fig.savefig(path, dpi=210, bbox_inches="tight", facecolor="white",
                pad_inches=0.14)
    plt.close(fig)
    print("ok", name)


def rbox(ax, x, y, w, h, fill, edge, lw=1.3, r=1.0, ls="-", z=2):
    p = FancyBboxPatch((x, y), w, h,
                       boxstyle=f"round,pad=0,rounding_size={r}",
                       facecolor=fill, edgecolor=edge, linewidth=lw,
                       linestyle=ls, zorder=z)
    ax.add_patch(p)
    return p


def arrow(ax, x1, y1, x2, y2, color=GRAYT, lw=1.2, ls="-", rad=0.0,
          style="-|>", ms=11, z=3):
    a = FancyArrowPatch((x1, y1), (x2, y2), arrowstyle=style,
                        connectionstyle=f"arc3,rad={rad}", linestyle=ls,
                        color=color, linewidth=lw, mutation_scale=ms,
                        zorder=z, shrinkA=0, shrinkB=0)
    ax.add_patch(a)
    return a


def stickman(ax, cx, cy, h=7.0, color=INK, lw=1.5):
    """Monigote UML centrado en cx, con los pies en cy."""
    r = h * 0.16
    head_c = cy + h - r
    ax.add_patch(Circle((cx, head_c), r, facecolor="white",
                        edgecolor=color, linewidth=lw, zorder=4))
    neck = head_c - r
    hip = cy + h * 0.30
    ax.plot([cx, cx], [neck, hip], color=color, lw=lw, zorder=4)
    ax.plot([cx - h * 0.26, cx + h * 0.26],
            [neck - h * 0.16, neck - h * 0.16], color=color, lw=lw, zorder=4)
    ax.plot([cx, cx - h * 0.22], [hip, cy], color=color, lw=lw, zorder=4)
    ax.plot([cx, cx + h * 0.22], [hip, cy], color=color, lw=lw, zorder=4)


def hollow_triangle(ax, x, y, size=1.6, up=True, color=INK):
    """Punta de generalización UML (triángulo hueco) apuntando arriba/abajo."""
    s = size
    pts = [(x - s * 0.75, y - s), (x + s * 0.75, y - s), (x, y)] if up else \
          [(x - s * 0.75, y + s), (x + s * 0.75, y + s), (x, y)]
    ax.add_patch(Polygon(pts, closed=True, facecolor="white",
                         edgecolor=color, linewidth=1.3, zorder=5))


# ═════════════════════════════ 1 · CASOS DE USO ════════════════════════════
def casos_de_uso():
    W, H = 118, 122
    fig, ax = fig_ax(W, H)
    ax.text(W / 2, H - 2, "Diagrama de casos de uso por rol",
            ha="center", va="top", fontsize=11.5, fontweight="bold",
            color=NAVY)

    # frontera del sistema
    bx, by, bw, bh = 30, 6, 84, 106
    rbox(ax, bx, by, bw, bh, "white", NAVY, lw=1.5, r=1.6, z=1)
    ax.text(bx + 2.8, by + bh - 2.6, "Web institucional del IUCE",
            ha="left", va="top", fontsize=9.5, fontweight="bold", color=NAVY)

    # actores (cadena de generalización de arriba abajo, ▷ apunta al heredado)
    actores = [("Visitante", 101), ("Miembro\ndel IUCE", 75),
               ("Administrador", 45), ("Super-\nadministrador", 15)]
    ax_x = 13
    for nombre, fy in actores:
        stickman(ax, ax_x, fy, h=7.2)
        ax.text(ax_x, fy - 1.6, nombre, ha="center", va="top", fontsize=8.2,
                fontweight="bold", color=INK)
    for (_, fy_top), (_, fy_low) in zip(actores, actores[1:]):
        top_feet = fy_top - 6.5          # bajo el nombre del actor de arriba
        low_head = fy_low + 7.2 + 1.0    # sobre la cabeza del actor de abajo
        ax.plot([ax_x, ax_x], [low_head, top_feet - 1.7], color=INK,
                lw=1.2, zorder=3)
        hollow_triangle(ax, ax_x, top_feet, size=1.7, up=True)

    def uc(cx, cy, texto, fs=7.6, ew=34, eh=9.4):
        ax.add_patch(Ellipse((cx, cy), ew, eh, facecolor="#F3F7FA",
                             edgecolor=NAVY, linewidth=1.2, zorder=3))
        ax.text(cx, cy, texto, ha="center", va="center", fontsize=fs,
                color=INK, zorder=4)
        return cx - ew / 2, cy

    c1, c2 = 52, 92
    enlaces = []  # (actor_y, elipse_izq_x, elipse_y)
    # Visitante
    enlaces.append((104.6,) + uc(c1, 104, "Consultar el sitio\npúblico (ES / EN)"))
    enlaces.append((104.6,) + uc(c2, 104, "Buscar y leer\nnoticias"))
    enlaces.append((104.6,) + uc(c1, 92.5, "Enviar un mensaje\nde contacto"))
    # Miembro
    enlaces.append((78.6,) + uc(c2, 81, "Acceder con enlace\nde un solo uso"))
    enlaces.append((78.6,) + uc(c1, 74.5, "Consultar documentos\ny noticias internas"))
    enlaces.append((78.6,) + uc(c2, 68, "Editar su perfil\npúblico"))
    # Administrador
    enlaces.append((48.6,) + uc(c1, 53, "Gestionar contenidos\n(noticias, miembros, grupos…)"))
    enlaces.append((48.6,) + uc(c2, 46.5, "Editar las páginas\npor bloques y listas"))
    enlaces.append((48.6,) + uc(c1, 40, "Ocultar páginas\no secciones"))
    enlaces.append((48.6,) + uc(c2, 33.5, "Gestionar el área\nde miembros"))
    # Superadministrador
    enlaces.append((18.6,) + uc(c1, 15.5, "Gestionar cuentas\nde administración"))

    for ay, ex, ey in enlaces:
        ax.plot([ax_x + 3.4, ex], [ay, ey], color=GRAYT, lw=1.0, zorder=2)

    ax.text(W / 2, 1.2,
            "Asociación actor–caso de uso (línea continua) · Generalización de "
            "roles (el triángulo apunta al rol heredado). Cada actor añade sus "
            "casos a los del rol del que hereda;\nla sesión de miembro no da "
            "acceso al panel de administración, que exige rol propio.",
            ha="center", va="bottom", fontsize=6.8, style="italic",
            color=GRAYT)
    save(fig, "uml-casos-uso.png")


# ═════════════════════════════ 2 · DFD CONTEXTO ════════════════════════════
def dfd_contexto():
    W, H = 118, 74
    fig, ax = fig_ax(W, H)
    ax.text(W / 2, H - 1.5, "Diagrama de flujo de datos — contexto (nivel 0)",
            ha="center", va="top", fontsize=10.5, fontweight="bold",
            color=NAVY)

    cx, cy, r = W / 2, 36, 14
    ax.add_patch(Circle((cx, cy), r, facecolor="#E8F0F8", edgecolor=NAVY,
                        linewidth=1.6, zorder=3))
    ax.text(cx, cy + 4.5, "0", ha="center", va="center", fontsize=10,
            fontweight="bold", color=NAVY)
    ax.text(cx, cy - 1.5, "Web institucional\ndel IUCE", ha="center",
            va="center", fontsize=8.6, fontweight="bold", color=NAVY)

    def entidad(x, y, texto, dashed=False):
        w, h = 26, 8.5
        rbox(ax, x - w / 2, y - h / 2, w, h, NAVY, NAVY, lw=1.2, r=0.6,
             ls="--" if dashed else "-")
        ax.text(x, y, texto, ha="center", va="center", fontsize=7.6,
                fontweight="bold", color="white", zorder=4)
        return x, y

    def flujo(x1, y1, x2, y2, texto, tx, ty, dashed=False, rad=0.0):
        arrow(ax, x1, y1, x2, y2, color=GRAYT, lw=1.1,
              ls="--" if dashed else "-", rad=rad, ms=10)
        ax.text(tx, ty, texto, ha="center", va="center", fontsize=6.2,
                color=GRAYT,
                bbox=dict(facecolor="white", edgecolor="none", pad=0.6))

    vis = entidad(17, 63, "Visitante")
    mie = entidad(17, 36, "Miembro del IUCE")
    adm = entidad(17, 9, "Administración")
    res = entidad(101, 63, "Servicio de correo\n(Resend)")
    orc = entidad(101, 36, "API pública\nde ORCID")
    dee = entidad(101, 9, "DeepL (opcional)", dashed=True)

    flujo(30, 61.5, 48.5, 45, "consultas, búsquedas,\nmensajes de contacto", 34, 57)
    flujo(46, 48.5, 30, 64.5, "páginas ES/EN,\nnoticias, RSS", 45, 60)
    flujo(30, 37.5, cx - r, 37.5, "correo de acceso,\nedición de su perfil", 36.5, 41.5)
    flujo(cx - r, 34.5, 30, 34.5, "enlace de un solo uso,\ndocumentos internos", 36.5, 30.5)
    flujo(30, 10.5, 48.5, 27, "contenidos, visibilidad,\ncuentas", 33.5, 15)
    flujo(46, 24, 30, 8, "avisos de contacto,\nrecuentos del panel", 45.5, 12.5)
    flujo(cx + r - 1.5, 45, 88, 61.5, "peticiones de envío\n(enlaces, avisos, acuses)", 84, 57)
    flujo(cx + r, 37.5, 88, 37.5, "consulta de perfiles\nde la dirección", 81.5, 41.5)
    flujo(88, 34.5, cx + r, 34.5, "últimas obras\n(caché de 24 h)", 81.5, 30.5)
    flujo(cx + r - 1.5, 27, 88, 10.5, "textos a traducir /\ntraducciones EN", 84.5, 15, dashed=True)

    ax.text(W / 2, 0.6,
            "Las entidades externas delimitan la frontera del sistema y los "
            "datos que la cruzan. PostgreSQL y el disco (uploads, storage) son "
            "internos al sistema.",
            ha="center", va="bottom", fontsize=6.6, style="italic", color=GRAYT)
    save(fig, "uml-dfd-contexto.png")


# ═════════════════════════ 3 · MODELO DE DATOS (ER) ════════════════════════
def tabla(ax, x, ytop, w, titulo, color, filas, fs=6.0, rh=2.9, hh=4.0):
    """Tabla estilo herramienta de BD: cabecera coloreada + filas campo/tipo."""
    h = hh + rh * len(filas)
    rbox(ax, x, ytop - h, w, h, "white", color, lw=1.4, r=0.9)
    rbox(ax, x, ytop - hh, w, hh, color, color, lw=1.4, r=0.9)
    ax.add_patch(Rectangle((x, ytop - hh - 0.01), w, hh / 2 + 0.01,
                           facecolor=color, edgecolor="none", zorder=3))
    ax.text(x + w / 2, ytop - hh / 2, titulo, ha="center", va="center",
            fontsize=7.2, fontweight="bold", color="white", zorder=4)
    for i, (campo, tipo, extra) in enumerate(filas):
        yy = ytop - hh - rh * (i + 0.5)
        ax.text(x + 1.6, yy, campo, ha="left", va="center", fontsize=fs,
                color=INK, zorder=4)
        ax.text(x + w * 0.52, yy, tipo, ha="left", va="center", fontsize=fs,
                color=GRAYT, zorder=4)
        if extra:
            ax.text(x + w - 1.4, yy, extra, ha="right", va="center",
                    fontsize=fs - 0.4, fontweight="bold", color=NAVY, zorder=4)
        if i:
            ax.plot([x + 0.8, x + w - 0.8],
                    [ytop - hh - rh * i, ytop - hh - rh * i],
                    color="#EDEDED", lw=0.5, zorder=3)
    return x, ytop, w, h


def modelo_datos():
    W, H = 152, 108
    fig, ax = fig_ax(W, H, scale=0.093)
    ax.text(W / 2, H - 1.2, "Modelo de datos — Web institucional del IUCE",
            ha="center", va="top", fontsize=11.5, fontweight="bold", color=NAVY)

    NEWSC, CBC, MEMC = "#3E8E5A", "#3B6FC4", "#2E8C82"
    RGC, PRC, EVC = "#D79B00", "#9673A6", NAVY

    tabla(ax, 4, 100, 34, "News (noticias)", NEWSC, [
        ("id", "String cuid", "PK"),
        ("slug", "String", "UNIQUE"),
        ("title · titleEn", "String · String?", ""),
        ("excerpt · excerptEn", "String? · String?", ""),
        ("content (HTML TipTap)", "String", ""),
        ("contentEn", "String?", "NULL"),
        ("coverImage", "String?", "NULL"),
        ("category", "String", ""),
        ("status", "NewsStatus", "enum"),
        ("internal (interna)", "Boolean", ""),
        ("publishedAt", "DateTime?", "NULL"),
        ("createdAt · updatedAt", "DateTime", ""),
    ])
    tabla(ax, 4, 56, 34, "ContentBlock (piezas editables)", CBC, [
        ("id", "String cuid", "PK"),
        ("pageSlug", "String", ""),
        ("blockKey", "String", ""),
        ("content (texto o JSON)", "String", ""),
        ("(pageSlug, blockKey)", "", "UNIQUE"),
        ("sufijo «:en» = traducción", "", ""),
        ("prefijo «list:» = lista", "", ""),
    ])
    tabla(ax, 42, 100, 34, "Member (miembros)", MEMC, [
        ("id", "String cuid", "PK"),
        ("name", "String", ""),
        ("area · role (cargo)", "String?", "NULL"),
        ("email · extension", "String?", "NULL"),
        ("photo", "String?", "NULL"),
        ("portalUrl · orcid · scopus", "String?", "NULL"),
        ("active", "Boolean", ""),
        ("order", "Int", ""),
        ("groupId", "String?", "FK"),
    ])
    tabla(ax, 42, 62, 34, "ResearchGroup (grupos)", RGC, [
        ("id", "String cuid", "PK"),
        ("acronym", "String", ""),
        ("name · nameEn", "String · String?", ""),
        ("lead (responsable)", "String?", "NULL"),
        ("url · logo", "String?", "NULL"),
        ("chip («UIC 081»)", "String?", "NULL"),
    ])
    tabla(ax, 80, 100, 34, "Project (proyectos)", PRC, [
        ("id", "String cuid", "PK"),
        ("title", "String", ""),
        ("funder · ip · line", "String?", "NULL"),
        ("scope (ámbito)", "String?", "NULL"),
        ("amount · period (texto)", "String?", "NULL"),
        ("startYear · endYear", "Int?", "NULL"),
        ("active (visible)", "Boolean", ""),
        ("iuceLed («del IUCE»)", "Boolean", ""),
    ])
    tabla(ax, 80, 62, 34, "Event (eventos)", EVC, [
        ("id", "String cuid", "PK"),
        ("title · titleEn", "String · String?", ""),
        ("type", "String", ""),
        ("startsAt · endsAt", "DateTime · ?", ""),
        ("location · url · image", "String?", "NULL"),
        ("status", "EventStatus", "enum"),
    ])

    # relación Member N:1 ResearchGroup
    arrow(ax, 59, 69.4, 59, 62.1, color=INK, lw=1.3, ms=10)
    ax.text(60.2, 67.6, "N", fontsize=7, fontweight="bold", color=INK)
    ax.text(60.2, 63.2, "1", fontsize=7, fontweight="bold", color=INK)
    ax.text(66.5, 65.8, "pertenece a\n(groupId, opcional)", fontsize=5.8,
            color=GRAYT, ha="center")

    # paneles laterales (como la Figura 15 del TFG)
    rbox(ax, 118, 62, 30, 38, *PANEL, lw=1.1, r=1.0)
    ax.text(120, 97.6, "Relaciones y reglas", fontsize=7.4, fontweight="bold",
            color=NAVY)
    for i, txt in enumerate([
        "Member N:1 ResearchGroup\n(groupId → id, opcional);\núnica relación del modelo",
        "Proyectos públicos:\nactive ∧ iuceLed",
        "Noticia interna: solo en el\nárea de miembros",
        "Eventos: próximo/celebrado\nse deriva de las fechas;\nstatus manual solo\npara CANCELLED",
    ]):
        ax.text(119.6, 93.8 - i * 8.2, "•", fontsize=7, color=NAVY)
        ax.text(121.4, 93.8 - i * 8.2, txt, fontsize=5.8, color=INK,
                va="top", linespacing=1.25)

    rbox(ax, 118, 31, 30, 27, *PANEL, lw=1.1, r=1.0)
    ax.text(120, 55.6, "Unicidades e índices", fontsize=7.4,
            fontweight="bold", color=NAVY)
    for i, txt in enumerate([
        "News.slug  UNIQUE",
        "ContentBlock (pageSlug,\n   blockKey)  UNIQUE",
        "User.email  UNIQUE",
        "IntranetUser.email  UNIQUE",
        "IntranetToken.token  UNIQUE",
    ]):
        ax.text(119.6, 51.8 - i * 4.4, "•", fontsize=7, color=NAVY)
        ax.text(121.4, 51.8 - i * 4.4, txt, fontsize=5.8, color=INK,
                va="top", linespacing=1.25)

    # bandas inferiores: soporte y área de miembros (compactas)
    rbox(ax, 4, 8, 68, 22, *PANEL, lw=1.1, r=1.0)
    ax.text(6, 27.6, "SOPORTE", fontsize=7.4, fontweight="bold", color=NAVY)
    soporte = [
        ("User", "email UNIQUE · passwordHash · role (ADMIN | SUPER_ADMIN)"),
        ("FileAsset", "biblioteca de archivos: filename · mimeType · size · url"),
        ("ContactMessage", "mensajes del formulario · status NEW | REPLIED"),
        ("PageVisibility", "slug PK · hidden (páginas y secciones ocultables)"),
        ("PageView", "analítica ligera: path · referrer · visitorId · date"),
    ]
    for i, (nom, desc) in enumerate(soporte):
        yy = 25.2 - i * 3.5
        ax.text(6.4, yy, nom, fontsize=6.0, fontweight="bold", color=INK)
        ax.text(24, yy, desc, fontsize=5.7, color=GRAYT)

    rbox(ax, 76, 8, 72, 22, *PANEL, lw=1.1, r=1.0)
    ax.text(78, 27.6, "ÁREA DE MIEMBROS", fontsize=7.4, fontweight="bold",
            color=NAVY)
    area = [
        ("IntranetUser", "email UNIQUE · active (falso = vetado) · lastLogin"),
        ("IntranetToken", "token UNIQUE de un solo uso · expires (30 min)"),
        ("IntranetDocument", "título · descripción · fichero en storage/intranet"),
    ]
    for i, (nom, desc) in enumerate(area):
        yy = 24.6 - i * 4.6
        ax.text(78.4, yy, nom, fontsize=6.0, fontweight="bold", color=INK)
        ax.text(97, yy, desc, fontsize=5.7, color=GRAYT)

    ax.text(4, 4.6, "Leyenda:  PK clave primaria · FK clave foránea · UNIQUE "
                    "índice único · NULL opcional (tipo con «?») · enums: "
                    "Role, NewsStatus, EventStatus",
            fontsize=6.0, style="italic", color=GRAYT)
    ax.text(4, 1.6, "Esquema completo en prisma/schema.prisma (fuente única "
                    "de verdad; sincronización con prisma db push).",
            fontsize=6.0, style="italic", color=GRAYT)
    save(fig, "uml-er-datos.png")


# ═══════════════════════ 4 · ESTADOS DE UNA NOTICIA ════════════════════════
def estados_noticia():
    W, H = 112, 62
    fig, ax = fig_ax(W, H)
    ax.text(W / 2, H - 1.5, "Diagrama de estados de una noticia",
            ha="center", va="top", fontsize=10.5, fontweight="bold",
            color=NAVY)

    def estado(x, y, w, h, nombre, sub, fill, edge, tcolor):
        rbox(ax, x, y, w, h, fill, edge, lw=1.6, r=1.4)
        ax.text(x + w / 2, y + h * 0.62, nombre, ha="center", va="center",
                fontsize=9.5, fontweight="bold", color=tcolor, zorder=4)
        ax.text(x + w / 2, y + h * 0.28, sub, ha="center", va="center",
                fontsize=6.4, style="italic", color=GRAYT, zorder=4)

    def etiqueta(x, y, texto):
        ax.text(x, y, texto, ha="center", va="center", fontsize=5.9,
                color=INK, zorder=5,
                bbox=dict(facecolor="white", edgecolor="#C3CCD4",
                          boxstyle="round,pad=0.32", linewidth=0.7))

    y0, bh, bw = 36, 12, 24
    ax.add_patch(Circle((7, y0 + bh / 2), 1.5, facecolor=INK,
                        edgecolor=INK, zorder=4))
    arrow(ax, 8.5, y0 + bh / 2, 14, y0 + bh / 2, color=INK, lw=1.3)
    etiqueta(10.8, y0 + bh / 2 + 3.4, "crear")

    estado(14, y0, bw, bh, "BORRADOR", "no visible", *ORANGE, "#B45309")
    estado(48, y0, bw, bh, "PUBLICADA", "web · RSS · sitemap", *GREEN, "#2F6B3C")
    estado(82, y0, bw, bh, "ARCHIVADA", "retirada, sin borrar", *GRAY, "#4A5568")

    arrow(ax, 38, y0 + bh * 0.72, 48, y0 + bh * 0.72, color=GRAYT, lw=1.2)
    etiqueta(43, y0 + bh * 0.72 + 3.2, "publicar\n[fija publishedAt si no existía]")
    arrow(ax, 48, y0 + bh * 0.28, 38, y0 + bh * 0.28, color=GRAYT, lw=1.2)
    etiqueta(43, y0 + bh * 0.28 - 3.4, "volver a borrador")
    arrow(ax, 72, y0 + bh * 0.72, 82, y0 + bh * 0.72, color=GRAYT, lw=1.2)
    etiqueta(77, y0 + bh * 0.72 + 3.2, "archivar")
    arrow(ax, 82, y0 + bh * 0.28, 72, y0 + bh * 0.28, color=GRAYT, lw=1.2)
    etiqueta(77, y0 + bh * 0.28 - 3.4, "restaurar")

    rbox(ax, 8, 6, 96, 22, *PANEL, lw=1.0, r=1.0)
    notas = [
        "El estado se cambia desde el editor del panel (DRAFT · PUBLISHED · ARCHIVED); no hay estados terminales: una archivada puede restaurarse.",
        "Al publicar por primera vez se fija la fecha de publicación (publishedAt); las noticias del histórico conservan su fecha original.",
        "La marca «interna» es ortogonal al estado: una noticia interna publicada solo se muestra en el área\nde miembros y queda fuera de la web pública, del RSS y del sitemap.",
    ]
    for i, n in enumerate(notas):
        ax.text(10.5, 24.4 - i * 6.2, "•", fontsize=8, color=NAVY)
        ax.text(12.5, 24.4 - i * 6.2, n, fontsize=6.2, color=INK, va="top",
                wrap=True, linespacing=1.3)
    save(fig, "uml-estados-noticia.png")


# ═══════════════════ 5 · SECUENCIA DEL ACCESO (MAGIC LINK) ═════════════════
def secuencia_acceso():
    W, H = 126, 84
    fig, ax = fig_ax(W, H)
    ax.text(W / 2, H - 1.2,
            "Diagrama de secuencia — acceso al área de miembros (magic link)",
            ha="center", va="top", fontsize=10.5, fontweight="bold", color=NAVY)

    parts = [
        ("Miembro", "correo @usal.es", 11, GRAY),
        ("Web (/miembros)", "formulario de acceso", 37, BLUE),
        ("Servidor", "regla de acceso · NextAuth", 66, TEAL),
        ("Base de datos", "Prisma", 93, ORANGE),
        ("Resend", "email", 115, PURPLE),
    ]
    top, bottom = H - 6, 13.5
    X = {}
    for nombre, sub, x, (fill, edge) in parts:
        X[nombre] = x
        rbox(ax, x - 10, top - 8, 20, 8, fill, edge, lw=1.4, r=1.0)
        ax.text(x, top - 3.1, nombre, ha="center", va="center", fontsize=7.4,
                fontweight="bold", color=INK, zorder=4)
        ax.text(x, top - 6.2, sub, ha="center", va="center", fontsize=5.6,
                color=GRAYT, zorder=4)
        ax.plot([x, x], [bottom, top - 8], color="#B9C2CB", lw=1.0,
                ls=(0, (4, 3)), zorder=1)

    def msg(y, a, b, texto, dashed=False):
        x1, x2 = X[a], X[b]
        arrow(ax, x1, y, x2, y, color=INK, lw=1.1,
              ls=(0, (4, 3)) if dashed else "-", ms=10)
        ax.text((x1 + x2) / 2, y + 1.5, texto, ha="center", va="bottom",
                fontsize=6.0, color=INK,
                bbox=dict(facecolor="white", edgecolor="none", pad=0.5))

    def nota(y, cx, texto, w=40):
        rbox(ax, cx - w / 2, y - 2.6, w, 5.2, *NOTE, lw=1.0, r=0.7, z=4)
        ax.text(cx, y, texto, ha="center", va="center", fontsize=5.8,
                color="#7A5C00", zorder=5)

    y = top - 12
    msg(y, "Miembro", "Web (/miembros)", "introduce su correo institucional"); y -= 6
    msg(y, "Web (/miembros)", "Servidor",
        "POST /api/intranet/request-link  [límite de tasa]"); y -= 6.5
    nota(y, X["Servidor"] + 6,
         "regla de acceso: veto · autorizado · miembro con correo en su ficha",
         w=52); y -= 5.5
    msg(y, "Servidor", "Base de datos",
        "consulta IntranetUser / Member  ·  alta automática si procede"); y -= 6
    msg(y, "Servidor", "Base de datos",
        "crea IntranetToken (un solo uso · caduca en 30 min)"); y -= 6
    msg(y, "Servidor", "Resend", "envía el correo con el enlace"); y -= 6
    msg(y, "Resend", "Miembro",
        "correo «Tu enlace de acceso» (plantilla institucional)", dashed=True); y -= 6.5
    msg(y, "Miembro", "Servidor",
        "abre el enlace → callback del proveedor «intranet» (NextAuth)"); y -= 6
    msg(y, "Servidor", "Base de datos",
        "consume el token (se borra al usarse)"); y -= 6
    msg(y, "Servidor", "Miembro",
        "sesión JWT con rol INTRANET → Documentos · Noticias internas · Mi perfil",
        dashed=True)

    rbox(ax, 6, 2.5, 114, 6, "#F1F4F7", "#C3CCD4", lw=0.9, r=0.8)
    ax.text(W / 2, 5.5,
            "El rol INTRANET nunca da acceso al panel. Un enlace caducado o ya "
            "usado permite pedir otro. En desarrollo, /api/intranet/dev-access "
            "inicia sesión directamente (404 en producción).",
            ha="center", va="center", fontsize=6.0, style="italic",
            color=GRAYT)
    save(fig, "uml-secuencia-acceso.png")


# ═══════════════════════════ 6 · COMPONENTES ═══════════════════════════════
def comp_icon(ax, x, y, s=1.8, color=INK):
    """Icono UML de componente (rectángulo con dos pestañas)."""
    ax.add_patch(Rectangle((x, y), s, s * 1.15, facecolor="white",
                           edgecolor=color, linewidth=0.9, zorder=6))
    for dy in (0.25, 0.65):
        ax.add_patch(Rectangle((x - s * 0.35, y + s * dy), s * 0.7, s * 0.3,
                               facecolor="white", edgecolor=color,
                               linewidth=0.9, zorder=7))


def componente(ax, x, y, w, h, titulo, sub, fs=7.0):
    rbox(ax, x, y, w, h, "white", INK, lw=1.2, r=0.7, z=4)
    comp_icon(ax, x + w - 3.4, y + h - 3.4)
    ax.text(x + (w - 3.5) / 2, y + h - 2.6, titulo, ha="center", va="center",
            fontsize=fs, fontweight="bold", color=INK, zorder=5)
    ax.text(x + w / 2, y + (h - 4.6) / 2, sub, ha="center", va="center",
            fontsize=5.6, color=GRAYT, zorder=5, linespacing=1.3)


def componentes():
    W, H = 132, 96
    fig, ax = fig_ax(W, H)
    ax.text(W / 2, H - 1.2, "Diagrama de componentes del sistema",
            ha="center", va="top", fontsize=10.5, fontweight="bold",
            color=NAVY)

    # contenedores
    rbox(ax, 3, 40, 26, 34, "white", "#3B6FC4", lw=1.5, r=1.2, z=2)
    rbox(ax, 3, 69.5, 26, 4.5, "#3B6FC4", "#3B6FC4", lw=1.5, r=1.2, z=3)
    ax.text(16, 71.7, "Cliente (navegador)", ha="center", va="center",
            fontsize=7.0, fontweight="bold", color="white", zorder=4)

    rbox(ax, 33, 8, 62, 78, "white", "#2E8C82", lw=1.5, r=1.2, z=2)
    rbox(ax, 33, 81.5, 62, 4.5, "#2E8C82", "#2E8C82", lw=1.5, r=1.2, z=3)
    ax.text(64, 83.7, "Servidor · Next.js 14", ha="center", va="center",
            fontsize=7.0, fontweight="bold", color="white", zorder=4)

    rbox(ax, 100, 8, 29, 78, "white", "#9673A6", lw=1.5, r=1.2, z=2)
    rbox(ax, 100, 81.5, 29, 4.5, "#9673A6", "#9673A6", lw=1.5, r=1.2, z=3)
    ax.text(114.5, 83.7, "Servicios externos", ha="center", va="center",
            fontsize=7.0, fontweight="bold", color="white", zorder=4)

    componente(ax, 6, 50, 20, 15, "Interfaz web",
               "páginas RSC + componentes\nde cliente · ES / EN\n(tema claro/oscuro)")

    componente(ax, 38, 70, 52, 9.5, "Middleware",
               "idioma /en (x-locale) · autorización de /backstage y APIs privadas")
    componente(ax, 38, 52, 24, 12, "Rutas API",
               "admin/* · intranet/*\ncontact · auth")
    componente(ax, 66, 52, 24, 12, "Autenticación",
               "NextAuth v5 · credenciales\n+ proveedor «intranet» · JWT")
    componente(ax, 38, 30, 24, 16, "Lógica de dominio",
               "servicios lib/: contenido ·\nnoticias · proyectos · visibilidad\n· acceso al área · ORCID ·\nvalidaciones (Zod) · tasa")
    componente(ax, 66, 30, 24, 16, "Correo",
               "plantillas HTML con logo\nincrustado · acceso, avisos\ny acuses (email.ts)")
    componente(ax, 38, 12, 52, 12, "Acceso a datos",
               "Prisma Client (ORM) · schema.prisma como fuente única de verdad")

    componente(ax, 103, 68, 23, 12, "Resend", "API de email\ntransaccional")
    componente(ax, 103, 52, 23, 12, "API de ORCID",
               "pública, sin clave · últimos\nartículos de la dirección")
    componente(ax, 103, 36, 23, 12, "DeepL (opcional)",
               "traducción ES→EN\nal guardar")
    componente(ax, 103, 20, 23, 12, "PostgreSQL 16",
               "base de datos\n(Docker)")
    componente(ax, 103, 9, 23, 8, "Disco",
               "public/uploads · storage/")

    def flecha(x1, y1, x2, y2, texto, tx, ty, dashed=False, rad=0.0):
        arrow(ax, x1, y1, x2, y2, color=GRAYT, lw=1.1,
              ls=(0, (4, 3)) if dashed else "-", rad=rad, ms=9)
        ax.text(tx, ty, texto, ha="center", va="center", fontsize=5.6,
                color=GRAYT,
                bbox=dict(facecolor="white", edgecolor="none", pad=0.5))

    flecha(26, 62, 38, 74, "HTTPS", 31, 70.5)
    flecha(60, 70, 52, 64, "rutas protegidas", 54, 67.3)
    flecha(62, 58, 66, 58, "sesión", 64, 59.8)
    flecha(50, 52, 50, 46, "usa", 51.8, 49)
    flecha(62, 38, 66, 38, "envíos", 64, 39.8)
    flecha(50, 30, 50, 24, "consultas", 53.3, 27)
    flecha(62, 44.5, 103, 58, "HTTPS · caché 24 h", 96.5, 66)
    flecha(90, 40, 103, 72, "API REST", 98.2, 60, rad=-0.25)
    flecha(62, 31, 103, 44, "", 0, -5, dashed=True, rad=-0.22)
    ax.text(96.5, 50, "opcional", fontsize=5.4, color=GRAYT, ha="center",
            bbox=dict(facecolor="white", edgecolor="none", pad=0.4))
    flecha(90, 18, 103, 25, "SQL / TCP", 96.5, 23.2)
    flecha(90, 15, 103, 13, "ficheros", 96.5, 12.6)

    save(fig, "uml-componentes.png")


if __name__ == "__main__":
    casos_de_uso()
    dfd_contexto()
    modelo_datos()
    estados_noticia()
    secuencia_acceso()
    componentes()
    print("LISTO")
