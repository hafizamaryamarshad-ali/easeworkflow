from __future__ import annotations

import json
import re
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from html import escape
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer


PROJECT_ID = "1nesg9s4"
DATASET = "production"
API_VERSION = "2025-02-19"
OUTPUT_DIR = Path(__file__).resolve().parents[1] / "case-studies-backup"

QUERY = r'''
*[_type == "caseStudy"] | order(_createdAt asc){
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  "slug": slug.current,
  summary,
  metaTitle,
  metaDescription,
  tags,
  client,
  industry,
  problem,
  solution,
  explanation,
  problemSections,
  problemCards,
  solutionCards,
  keyFeatures,
  tools,
  results,
  "featuredImageUrl": featuredImage.asset->url,
  "galleryImageUrls": galleryImages[].asset->url,
  "videoUrls": videos[].asset->url
}
'''.strip()


def normalize(value: object) -> str:
    text = "" if value is None else str(value)
    return (
        text.replace("\u2018", "'")
        .replace("\u2019", "'")
        .replace("\u201c", '"')
        .replace("\u201d", '"')
        .replace("\u2013", "-")
        .replace("\u2014", "-")
        .replace("\u2026", "...")
        .replace("\u00a0", " ")
    )


def portable_text(value: object) -> str:
    if isinstance(value, str):
        return normalize(value).strip()
    if not isinstance(value, list):
        return ""

    paragraphs: list[str] = []
    for item in value:
        if isinstance(item, dict) and item.get("_type") == "block":
            children = item.get("children") or []
            text = "".join(
                normalize(child.get("text", ""))
                for child in children
                if isinstance(child, dict)
            ).strip()
            if text:
                paragraphs.append(text)
        elif isinstance(item, str) and item.strip():
            paragraphs.append(normalize(item).strip())
    return "\n\n".join(paragraphs)


def titled_items(value: object) -> str:
    if not isinstance(value, list):
        return ""
    entries: list[str] = []
    for item in value:
        if not isinstance(item, dict):
            continue
        title = normalize(item.get("title") or "Untitled item").strip()
        body = portable_text(item.get("content") or item.get("description"))
        entries.append(f"{title}\n{body}".strip())
    return "\n\n".join(filter(None, entries))


def safe_filename(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return slug or "case-study"


def fetch_case_studies() -> list[dict]:
    encoded_query = urllib.parse.quote(QUERY, safe="")
    url = (
        f"https://{PROJECT_ID}.api.sanity.io/v{API_VERSION}/data/query/"
        f"{DATASET}?query={encoded_query}"
    )
    request = urllib.request.Request(url, headers={"User-Agent": "EaseWorkflow-Backup/1.0"})
    with urllib.request.urlopen(request, timeout=30) as response:
        payload = json.load(response)
    studies = payload.get("result")
    if not isinstance(studies, list):
        raise RuntimeError("Sanity did not return a case-study list.")
    return studies


def build_pdf(study: dict, output_path: Path, generated_at: str) -> None:
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        "BackupTitle",
        parent=styles["Title"],
        fontName="Helvetica-Bold",
        fontSize=22,
        leading=27,
        textColor=colors.HexColor("#0f172a"),
        alignment=TA_CENTER,
        spaceAfter=8 * mm,
    )
    eyebrow_style = ParagraphStyle(
        "BackupEyebrow",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=9,
        leading=12,
        textColor=colors.HexColor("#4f46e5"),
        alignment=TA_CENTER,
        spaceAfter=3 * mm,
    )
    heading_style = ParagraphStyle(
        "BackupHeading",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=13,
        leading=16,
        textColor=colors.HexColor("#4f46e5"),
        spaceBefore=5 * mm,
        spaceAfter=2 * mm,
    )
    body_style = ParagraphStyle(
        "BackupBody",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=10,
        leading=15,
        textColor=colors.HexColor("#334155"),
        spaceAfter=2 * mm,
    )

    document = SimpleDocTemplate(
        str(output_path),
        pagesize=A4,
        rightMargin=18 * mm,
        leftMargin=18 * mm,
        topMargin=18 * mm,
        bottomMargin=18 * mm,
        title=f"{normalize(study.get('title'))} - Case Study Backup",
        author="EaseWorkflow",
        subject="Sanity case-study backup",
    )

    sections = [
        ("Backup details", f"Sanity document ID: {study.get('_id', '')}\nSlug: {study.get('slug', '')}\nGenerated: {generated_at}\nLast updated in Sanity: {study.get('_updatedAt', '')}"),
        ("Client", normalize(study.get("client"))),
        ("Industry", normalize(study.get("industry"))),
        ("Meta title", normalize(study.get("metaTitle"))),
        ("Meta description", normalize(study.get("metaDescription"))),
        ("Tags", ", ".join(study.get("tags") or [])),
        ("Summary", portable_text(study.get("summary"))),
        ("Problem overview", portable_text(study.get("problem"))),
        ("Problem sections", titled_items(study.get("problemSections"))),
        ("Problem cards", titled_items(study.get("problemCards"))),
        ("Solution overview", portable_text(study.get("solution"))),
        ("Workflow explanation", portable_text(study.get("explanation"))),
        ("Solution cards", titled_items(study.get("solutionCards"))),
        ("Key features", titled_items(study.get("keyFeatures"))),
        ("Results", portable_text(study.get("results"))),
        ("Tools", ", ".join(study.get("tools") or [])),
        (
            "Media references",
            "\n".join(
                filter(
                    None,
                    [study.get("featuredImageUrl")]
                    + (study.get("galleryImageUrls") or [])
                    + (study.get("videoUrls") or []),
                )
            ),
        ),
    ]

    story = [
        Paragraph("EASEWORKFLOW CASE STUDY BACKUP", eyebrow_style),
        Paragraph(escape(normalize(study.get("title") or "Untitled Case Study")), title_style),
    ]
    for label, value in sections:
        clean_value = normalize(value).strip()
        if not clean_value:
            continue
        story.append(Paragraph(escape(label), heading_style))
        for paragraph in clean_value.split("\n"):
            if paragraph.strip():
                story.append(Paragraph(escape(paragraph.strip()), body_style))
            else:
                story.append(Spacer(1, 1.5 * mm))

    def add_page_number(canvas, doc):
        canvas.saveState()
        canvas.setFont("Helvetica", 8)
        canvas.setFillColor(colors.HexColor("#64748b"))
        canvas.drawString(18 * mm, 9 * mm, "EaseWorkflow case-study backup")
        canvas.drawRightString(A4[0] - 18 * mm, 9 * mm, f"Page {doc.page}")
        canvas.restoreState()

    document.build(story, onFirstPage=add_page_number, onLaterPages=add_page_number)


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    studies = fetch_case_studies()
    if len(studies) != 6:
        raise RuntimeError(f"Expected 6 case studies, received {len(studies)}. Backup stopped.")

    generated_at = datetime.now(timezone.utc).isoformat()
    snapshot = {
        "projectId": PROJECT_ID,
        "dataset": DATASET,
        "generatedAt": generated_at,
        "caseStudies": studies,
    }
    (OUTPUT_DIR / "case-studies-sanity-snapshot.json").write_text(
        json.dumps(snapshot, indent=2, ensure_ascii=False), encoding="utf-8"
    )

    outputs: list[str] = []
    for study in studies:
        base = safe_filename(study.get("slug") or study.get("title") or "case-study")
        output_path = OUTPUT_DIR / f"{base}-backup.pdf"
        build_pdf(study, output_path, generated_at)
        outputs.append(output_path.name)

    manifest = {
        "generatedAt": generated_at,
        "count": len(outputs),
        "pdfs": outputs,
        "structuredSnapshot": "case-studies-sanity-snapshot.json",
    }
    (OUTPUT_DIR / "backup-manifest.json").write_text(
        json.dumps(manifest, indent=2), encoding="utf-8"
    )
    print(json.dumps(manifest, indent=2))


if __name__ == "__main__":
    main()
