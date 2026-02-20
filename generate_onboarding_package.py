#!/usr/bin/env python3
"""Generate a simple onboarding package (HTML + PDF + TXT) from prompts."""

from __future__ import annotations

import argparse
import datetime as dt
import os
import re
import sys
import shutil
import csv
import json
import urllib.request
import urllib.error
from string import Template

DEFAULT_CSV_PATH = os.path.join(os.path.dirname(__file__), "newcomers info list.csv")
DEFAULT_CSV_FIELDS = [
    "name",
    "team",
    "start_date",
    "account_email",
    "account_password",
    "video_url",
    "welcome_url",
    "slack_email",
]

HTML_TEMPLATE = Template(
    """<!doctype html>
<html lang=\"en\">
<head>
  <meta charset=\"utf-8\">
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
  <title>Welcome, $name</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 32px; color: #1f2937; background: #fff7ed; }
    .card { border: 1px solid #fde68a; border-radius: 16px; padding: 28px; max-width: 900px; background: #ffffff; box-shadow: 0 10px 30px rgba(251, 191, 36, 0.12); }
    h1 { margin-top: 0; }
    .meta { color: #6b7280; }
    .section { margin-top: 24px; }
    ul { padding-left: 20px; }
    .checklist { list-style: none; padding-left: 0; }
    .checklist li { margin: 12px 0; padding: 12px 14px; background: #fff7ed; border: 1px solid #fed7aa; border-radius: 12px; }
    .checklist .item-title { font-weight: 600; }
    .checklist .item-sub { margin-top: 6px; color: #6b7280; }
    .pill { display: inline-block; background: #ffedd5; color: #9a3412; padding: 4px 12px; border-radius: 999px; font-size: 12px; }
    .cta { margin-top: 16px; }
  </style>
</head>
<body>
  <div class=\"card\">
    <div class=\"pill\">Onboarding Package ✨</div>
    <h1>Welcome, $name 👋</h1>
    <p class=\"meta\">Team: $team • Start date: $start_date</p>

    <div class=\"section\">
      <h2>1) Watch the onboarding video 🎬</h2>
      <p>Video link: <a href=\"$video_url\">$video_url</a></p>
      <video controls style=\"max-width:100%; margin-top: 12px; border-radius: 12px;\">
        <source src=\"$video_url\" type=\"video/mp4\">
      </video>
      <p class=\"meta\">Approx. duration: $video_duration</p>
    </div>

    $ot_script_section

    <div class=\"section\">
      <h2>$checklist_heading ✅</h2>
      <ul class="checklist">
        $checklist_items
      </ul>
    </div>

    <div class=\"section\">
      <h2>$account_heading 🔐</h2>
      <ul>
        $account_items
      </ul>
    </div>

    <div class=\"section\">
      <h2>$contacts_heading 🤝</h2>
      <p>Managing Director: $managing_director</p>
      <p>HR Manager: $manager</p>
    </div>

    <div class=\"section cta\">
      <strong>Need help?</strong> If you need HR support or have questions, please find Irene on Slack and reach out. We’re happy to help! 💙
    </div>
  </div>
</body>
</html>
"""
)

TXT_TEMPLATE = Template(
    """Welcome, $name
Team: $team
Start date: $start_date

1) Onboarding video
- $video_url
(Duration: $video_duration)

${ot_script_text_block}2) First-week checklist
$checklist_text

3) Account details
$account_text

4) Contacts
- Managing Director: $managing_director
- HR Manager: $manager
"""
)


DEFAULT_CHECKLIST_HTML = [
    "<div class=\"item-title\">① Basic settings: Set up 2FA</div>"
    "<div class=\"item-sub\">Please check <a href=\"https://docs.google.com/presentation/d/1lZ1MjgkiJMm6nD_Ln4auBNyf2zF_44MkdyLlA-E9s1c/edit?slide=id.g25eac3a2538_3_87#slide=id.g25eac3a2538_3_87\">[PPT]</a> and proceed it (Google/Slack/Github).</div>"
    "<div class=\"item-sub\">Please enable Two-Factor Authentication (2FA) for enhanced account security. If not completed within a week after you onboarded, the account will be suspended.</div>",
    "<div class=\"item-title\">② Set up your profile with pictures</div>"
    "<div class=\"item-sub\">Please update your profile on Google and Slack.</div>",
    "<div class=\"item-title\">③ Personal Information Consent & Verification Submission</div>"
    "<div class=\"item-sub\">Check <a href=\"https://share.note.sx/op3a89uv#8riSv3+Tecs2qyZBzdC/kQJNDWZW2LtXK5CBFE0TJAc\">[Obsidian]</a> and submit.</div>",
    "<div class=\"item-title\">④ General Guide book of HR</div>"
    "<div class=\"item-sub\">Please review this material to understand the company culture and the minimum rules, and be sure to check it. <a href=\"https://docs.google.com/presentation/d/1Jg8I8YWXIr44O5tGgRhXvmI67hhzHom6-yI5zwRCMac/edit?slide=id.g2cf9870a132_1_3#slide=id.g2cf9870a132_1_3\">[link]</a></div>",
]

DEFAULT_CHECKLIST_TEXT = [
    "1) Basic settings: Set up 2FA. Please check [PPT] and proceed it (Google/Slack/Github). Please enable Two-Factor Authentication (2FA) for enhanced account security. If not completed within a week after you onboarded, the account will be suspended.",
    "PPT link: https://docs.google.com/presentation/d/1lZ1MjgkiJMm6nD_Ln4auBNyf2zF_44MkdyLlA-E9s1c/edit?slide=id.g25eac3a2538_3_87#slide=id.g25eac3a2538_3_87",
    "2) Set up your profile with pictures on Google & Slack.",
    "3) Personal Information Consent & Verification Submission [Obsidian].",
    "Obsidian link: https://share.note.sx/op3a89uv#8riSv3+Tecs2qyZBzdC/kQJNDWZW2LtXK5CBFE0TJAc",
    "4) General Guide book of HR [link].",
    "Please review this material to understand the company culture and the minimum rules, and be sure to check it.",
    "Guide link: https://docs.google.com/presentation/d/1Jg8I8YWXIr44O5tGgRhXvmI67hhzHom6-yI5zwRCMac/edit?slide=id.g2cf9870a132_1_3#slide=id.g2cf9870a132_1_3",
]

DEFAULT_ACCOUNT_EMAIL = "alex@tokamak.network"
DEFAULT_ACCOUNT_PASSWORD = "12345"

DEFAULT_OT_SCRIPT = [
    "Hi there, and welcome to Tokamak Network.",
    "We're truly excited to have you with us.",
    "Tokamak Network is an on-demand Ethereum Layer 2 platform that enables the seamless building and connection of Layer 2 networks.",
    "By leveraging Rollup and Zero-Knowledge (ZK) technologies, we provide infrastructure that significantly enhances the speed, scalability, and security of blockchain platforms.",
    "Our vision is to bridge the gap between the crypto economy and the real economy.",
    "By connecting people with decentralized applications in a more intuitive and accessible way, we aim to create an environment where blockchain technology can be used effortlessly in everyday life.",
    "We believe blockchain should not remain a niche technology, but rather become a foundational layer embedded throughout society.",
    "Through Tokamak Network, we strive to improve quality of life and integrate blockchain everywhere - making it a natural part of the world we live in.",
    "At Tokamak Network, we actively encourage not only team-based projects, but also individual initiatives.",
    "We want to support you in expanding your personal impact in the AI-driven era.",
    "If you have ideas related to expanding Tokamak Network's services, feel free to share them - even in the form of a simple prototype.",
    "We're excited to see your creative and experimental work.",
    "Finally, please make sure to complete the onboarding checklist by this weekend.",
    "You can find the checklist on this page, and if you have any questions, don't hesitate to reach out to the HR team.",
    "Once again, welcome to Tokamak Network.",
    "We're excited to build the future together with you.",
]


def prompt(text: str, default: str | None = None) -> str:
    if default:
        text = f"{text} [{default}] "
    else:
        text = f"{text} "
    value = input(text).strip()
    return value or (default or "")


def sanitize_filename(name: str) -> str:
    name = name.strip()
    name = re.sub(r"\s+", "_", name)
    name = re.sub(r"[^\w\-\u0080-\uFFFF]", "", name)
    return name or "employee"

def append_to_csv(csv_path: str, row: dict[str, str]) -> bool:
    fieldnames = DEFAULT_CSV_FIELDS
    rows: list[dict[str, str]] = []
    if os.path.exists(csv_path):
        with open(csv_path, newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            fieldnames = reader.fieldnames or DEFAULT_CSV_FIELDS
            rows = list(reader)

    new_row = {key: "" for key in fieldnames}
    for key, value in row.items():
        if key in new_row:
            new_row[key] = value

    if rows and all(rows[-1].get(key, "") == new_row.get(key, "") for key in fieldnames):
        return False

    file_exists = os.path.exists(csv_path)
    with open(csv_path, "a" if file_exists else "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
        if not file_exists:
            writer.writeheader()
        writer.writerow(new_row)
    return True


def to_bullets(items: list[str]) -> str:
    return "\n        ".join(f"<li>{item}</li>" for item in items)

def to_numbered(items: list[str]) -> str:
    return "\n        ".join(f"<li>{item}</li>" for item in items)


def to_text_bullets(items: list[str]) -> str:
    return "\n".join(f"- {item}" for item in items)

def build_ot_script_section(items: list[str]) -> str:
    if not items:
        return ""
    return (
        "<div class=\"section\">"
        "<h2>2) OT script (3-minute demo) 📝</h2>"
        "<p class=\"meta\">Use this script to generate the avatar video.</p>"
        "<ol>"
        f"{to_numbered(items)}"
        "</ol>"
        "</div>"
    )

def build_ot_script_text_block(items: list[str]) -> str:
    if not items:
        return ""
    return "2) OT script (3-minute demo)\n" + to_text_bullets(items) + "\n\n"

def build_headings(include_script: bool) -> tuple[str, str, str]:
    if include_script:
        return ("3) Your first-week checklist", "4) Account details", "5) Contacts")
    return ("2) Your first-week checklist", "3) Account details", "4) Contacts")

def slack_api_call(token: str, endpoint: str, payload: dict) -> dict:
    url = f"https://slack.com/api/{endpoint}"
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json; charset=utf-8",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req) as resp:
            body = resp.read().decode("utf-8")
            return json.loads(body)
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8")
        raise RuntimeError(f"Slack API error: {e.code} {body}") from e

def slack_lookup_user_id(token: str, email: str) -> str | None:
    resp = slack_api_call(token, "users.lookupByEmail", {"email": email})
    if not resp.get("ok"):
        return None
    return resp.get("user", {}).get("id")

def slack_open_dm(token: str, user_id: str) -> str | None:
    resp = slack_api_call(token, "conversations.open", {"users": user_id})
    if not resp.get("ok"):
        return None
    return resp.get("channel", {}).get("id")

def slack_send_dm(token: str, channel_id: str, text: str) -> bool:
    resp = slack_api_call(token, "chat.postMessage", {"channel": channel_id, "text": text})
    return bool(resp.get("ok"))

def get_drive_service(credentials_path: str, token_path: str):
    try:
        from googleapiclient.discovery import build
        from google.oauth2.credentials import Credentials
        from google_auth_oauthlib.flow import InstalledAppFlow
        from google.auth.transport.requests import Request
    except ImportError as e:
        raise RuntimeError(
            "Missing Google client libraries. Install: "
            "python3 -m pip install google-api-python-client google-auth-httplib2 google-auth-oauthlib"
        ) from e

    scopes = ["https://www.googleapis.com/auth/drive.file"]
    creds = None
    if os.path.exists(token_path):
        creds = Credentials.from_authorized_user_file(token_path, scopes)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(credentials_path, scopes)
            creds = flow.run_local_server(port=0)
        with open(token_path, "w", encoding="utf-8") as f:
            f.write(creds.to_json())
    return build("drive", "v3", credentials=creds)

def drive_upload_file(service, file_path: str, file_name: str, folder_id: str) -> str:
    try:
        from googleapiclient.http import MediaFileUpload
    except ImportError as e:
        raise RuntimeError(
            "Missing Google client libraries. Install: "
            "python3 -m pip install google-api-python-client google-auth-httplib2 google-auth-oauthlib"
        ) from e

    file_metadata = {"name": file_name, "parents": [folder_id]}
    media = MediaFileUpload(file_path, resumable=True)
    created = service.files().create(body=file_metadata, media_body=media, fields="id,webViewLink").execute()
    return created["id"]

def drive_set_anyone_with_link(service, file_id: str) -> None:
    permission = {"type": "anyone", "role": "reader"}
    service.permissions().create(fileId=file_id, body=permission).execute()

def drive_get_webview_link(service, file_id: str) -> str:
    info = service.files().get(fileId=file_id, fields="webViewLink").execute()
    return info.get("webViewLink", "")

def drive_direct_link(file_id: str) -> str:
    return f"https://drive.google.com/uc?export=download&id={file_id}"

def build_ot_script_section(items: list[str]) -> str:
    if not items:
        return ""
    return (
        "<div class=\"section\">"
        "<h2>2) OT script (3-minute demo) 📝</h2>"
        "<p class=\"meta\">Use this script to generate the avatar video.</p>"
        "<ol>"
        f"{to_numbered(items)}"
        "</ol>"
        "</div>"
    )

def build_ot_script_text_block(items: list[str]) -> str:
    if not items:
        return ""
    return "2) OT script (3-minute demo)\n" + to_text_bullets(items) + "\n\n"

def build_headings(include_script: bool) -> tuple[str, str, str]:
    if include_script:
        return ("3) Your first-week checklist", "4) Account details", "5) Contacts")
    return ("2) Your first-week checklist", "3) Account details", "4) Contacts")


def ascii_safe(text: str) -> str:
    return text.encode("ascii", errors="replace").decode("ascii")


def write_minimal_pdf(path: str, lines: list[str]) -> None:
    # Minimal single-page PDF with Helvetica. Only ASCII is safe.
    safe_lines = [ascii_safe(line) for line in lines]
    content_lines = [f"72 {720 - i * 16} Td ({line}) Tj" for i, line in enumerate(safe_lines)]
    content = "\n".join(["BT", "/F1 12 Tf", "72 720 Td"] + content_lines + ["ET"])
    content_bytes = content.encode("ascii", errors="replace")

    objects = []
    objects.append(b"1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj\n")
    objects.append(b"2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj\n")
    objects.append(
        b"3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj\n"
    )
    objects.append(
        f"4 0 obj << /Length {len(content_bytes)} >> stream\n".encode("ascii")
        + content_bytes
        + b"\nendstream endobj\n"
    )
    objects.append(b"5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj\n")

    xref_positions = []
    output = bytearray()
    output.extend(b"%PDF-1.4\n")
    for obj in objects:
        xref_positions.append(len(output))
        output.extend(obj)

    xref_start = len(output)
    output.extend(f"xref\n0 {len(objects) + 1}\n".encode("ascii"))
    output.extend(b"0000000000 65535 f \n")
    for pos in xref_positions:
        output.extend(f"{pos:010d} 00000 n \n".encode("ascii"))
    output.extend(
        f"trailer << /Size {len(objects) + 1} /Root 1 0 R >>\nstartxref\n{xref_start}\n%%EOF\n".encode("ascii")
    )

    with open(path, "wb") as f:
        f.write(output)


def generate_one(
    *,
    name: str,
    team: str,
    start_date: str,
    video_url: str,
    output_dir: str,
    video_duration: str,
    account_email: str,
    account_password: str,
    manager: str,
    managing_director: str,
    include_script: bool,
    video_file: str | None,
    drive_service=None,
    drive_folder_id: str | None = None,
    prep_deploy: bool = False,
) -> int:
    if video_file and not os.path.exists(video_file):
        print(f"Video file not found: {video_file}", file=sys.stderr)
        return 1, ""

    if drive_service and drive_folder_id and video_file:
        video_id = drive_upload_file(
            drive_service,
            video_file,
            os.path.basename(video_file),
            drive_folder_id,
        )
        drive_set_anyone_with_link(drive_service, video_id)
        video_url = drive_direct_link(video_id)
    elif video_file:
        video_basename = os.path.basename(video_file)
        os.makedirs(output_dir, exist_ok=True)
        dst_path = os.path.join(output_dir, video_basename)
        if os.path.abspath(video_file) != os.path.abspath(dst_path):
            shutil.copy2(video_file, dst_path)
        video_url = video_basename

    if not video_url:
        video_url = "TBD"

    checklist_items = DEFAULT_CHECKLIST_HTML
    account_items = [
        f"Account: {account_email}",
        f"Password: {account_password}",
    ]
    ot_script_items = DEFAULT_OT_SCRIPT if include_script else []
    checklist_heading, account_heading, contacts_heading = build_headings(include_script)

    html = HTML_TEMPLATE.substitute(
        name=name,
        team=team,
        start_date=start_date,
        video_url=video_url,
        video_duration=video_duration,
        ot_script_section=build_ot_script_section(ot_script_items),
        checklist_heading=checklist_heading,
        account_heading=account_heading,
        contacts_heading=contacts_heading,
        checklist_items=to_bullets(checklist_items),
        account_items=to_bullets(account_items),
        manager=manager,
        managing_director=managing_director,
    )

    txt = TXT_TEMPLATE.substitute(
        name=name,
        team=team,
        start_date=start_date,
        video_url=video_url,
        video_duration=video_duration,
        ot_script_text_block=build_ot_script_text_block(ot_script_items),
        checklist_text=to_text_bullets(DEFAULT_CHECKLIST_TEXT),
        account_text=to_text_bullets(account_items),
        manager=manager,
        managing_director=managing_director,
    )

    base = f"welcome_{sanitize_filename(name)}"
    os.makedirs(output_dir, exist_ok=True)
    html_path = os.path.join(output_dir, f"{base}.html")
    txt_path = os.path.join(output_dir, f"{base}.txt")
    pdf_path = os.path.join(output_dir, f"{base}.pdf")

    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html)
    with open(txt_path, "w", encoding="utf-8") as f:
        f.write(txt)

    # PDF generation is ASCII-only; non-ASCII will be replaced with '?'.
    pdf_lines = [
        f"Welcome, {name}",
        f"Team: {team}",
        f"Start date: {start_date}",
        "",
        "Onboarding video:",
        f"- {video_url}",
        f"- Duration: {video_duration}",
        "",
        "Checklist:",
        *[f"- {item}" for item in checklist_items],
        "",
        "Account details:",
        *[f"- {item}" for item in account_items],
        "",
        f"Managing Director: {managing_director}",
        f"HR Manager: {manager}",
    ]
    if ot_script_items:
        script_lines = ["OT script (3-minute demo):", *[f"- {item}" for item in ot_script_items], ""]
        pdf_lines[8:8] = script_lines
    write_minimal_pdf(pdf_path, pdf_lines)

    non_ascii_found = any(any(ord(ch) > 127 for ch in line) for line in pdf_lines)
    if non_ascii_found:
        print("Note: PDF is ASCII-only; non-ASCII characters were replaced with '?'.")

    print(f"Generated: {html_path}")
    print(f"Generated: {pdf_path}")
    print(f"Generated: {txt_path}")

    if prep_deploy:
        deploy_dir = os.path.join(output_dir, f"deploy_{sanitize_filename(name)}")
        os.makedirs(deploy_dir, exist_ok=True)
        index_path = os.path.join(deploy_dir, "index.html")
        shutil.copy2(html_path, index_path)
        if video_file and os.path.exists(video_file):
            shutil.copy2(video_file, os.path.join(deploy_dir, os.path.basename(video_file)))
        elif video_url and os.path.exists(video_url):
            shutil.copy2(video_url, os.path.join(deploy_dir, os.path.basename(video_url)))
        print(f"Prepared deploy folder: {deploy_dir}")

    if drive_service and drive_folder_id:
        html_id = drive_upload_file(drive_service, html_path, os.path.basename(html_path), drive_folder_id)
        drive_set_anyone_with_link(drive_service, html_id)
        welcome_url = drive_get_webview_link(drive_service, html_id)
        return 0, welcome_url

    return 0, ""


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate onboarding package files.")
    parser.add_argument("--name")
    parser.add_argument("--team")
    parser.add_argument("--start-date")
    parser.add_argument("--video-url")
    parser.add_argument("--video-duration", default="3 minutes")
    parser.add_argument("--manager", default="Irene (irene@tokamak.network)")
    parser.add_argument("--managing-director", default="Jaden (jaden@tokamak.network)")
    parser.add_argument("--account-email", default=DEFAULT_ACCOUNT_EMAIL)
    parser.add_argument("--account-password", default=DEFAULT_ACCOUNT_PASSWORD)
    parser.add_argument("--video-file", help="Local MP4 file to copy into output dir.")
    parser.add_argument("--csv", help="CSV file for bulk generation.")
    parser.add_argument("--output-dir", default=".")
    parser.add_argument(
        "--prep-deploy",
        action="store_true",
        default=True,
        help="Create deploy_<name> folder with index.html + mp4 for drag-and-drop hosting (default: on).",
    )
    parser.add_argument(
        "--no-prep-deploy",
        action="store_true",
        help="Disable deploy folder creation.",
    )
    parser.add_argument("--drive-upload", action="store_true", help="Upload HTML/video to Google Drive.")
    parser.add_argument("--drive-folder-id", help="Google Drive folder ID for uploads.")
    parser.add_argument(
        "--drive-credentials",
        default="credentials.json",
        help="OAuth client credentials JSON for Drive API.",
    )
    parser.add_argument(
        "--drive-token",
        default="token.json",
        help="Token cache path for Drive API.",
    )
    parser.add_argument(
        "--live",
        action="store_true",
        help="Run in a loop for live demo (regenerates files each time).",
    )
    parser.add_argument(
        "--include-script",
        action="store_true",
        help="Include OT script section in outputs.",
    )
    parser.add_argument(
        "--send-slack",
        action="store_true",
        help="Send Slack DM after generating (requires SLACK_BOT_TOKEN).",
    )
    parser.add_argument(
        "--auto-csv-path",
        default=DEFAULT_CSV_PATH,
        help="CSV file to auto-append when using single entry.",
    )
    parser.add_argument(
        "--no-auto-csv",
        action="store_true",
        help="Disable auto-append to default CSV when using single entry.",
    )
    args = parser.parse_args()
    if args.no_prep_deploy:
        args.prep_deploy = False

    slack_token = os.getenv("SLACK_BOT_TOKEN") if args.send_slack else None
    if args.send_slack and not slack_token:
        print("Missing SLACK_BOT_TOKEN env var for Slack DM.", file=sys.stderr)
        return 1

    drive_service = None
    if args.drive_upload:
        if not args.drive_folder_id:
            print("Missing --drive-folder-id for Drive upload.", file=sys.stderr)
            return 1
        drive_service = get_drive_service(args.drive_credentials, args.drive_token)

    if args.csv:
        with open(args.csv, newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            fieldnames = reader.fieldnames or []
            rows = list(reader)
            for row in rows:
                name = (row.get("name") or "").strip()
                if not name:
                    continue
                team = (row.get("team") or "").strip()
                start_date = (row.get("start_date") or "").strip() or dt.date.today().isoformat()
                video_url = (row.get("video_url") or "").strip()
                account_email = (row.get("account_email") or args.account_email).strip()
                account_password = (row.get("account_password") or args.account_password).strip()
                manager = args.manager
                managing_director = args.managing_director
                slack_email = account_email
                welcome_url = (row.get("welcome_url") or "").strip()
                video_file = args.video_file
                if not video_file and video_url and os.path.exists(video_url):
                    video_file = video_url

                _, uploaded_welcome_url = generate_one(
                    name=name,
                    team=team,
                    start_date=start_date,
                    video_url=video_url,
                    output_dir=args.output_dir,
                    video_duration=args.video_duration,
                    account_email=account_email,
                    account_password=account_password,
                    manager=manager,
                    managing_director=managing_director,
                    include_script=args.include_script,
                    video_file=video_file,
                    drive_service=drive_service,
                    drive_folder_id=args.drive_folder_id,
                    prep_deploy=args.prep_deploy,
                )
                if uploaded_welcome_url and "welcome_url" in fieldnames:
                    row["welcome_url"] = uploaded_welcome_url
                if args.send_slack:
                    if not welcome_url:
                        if uploaded_welcome_url:
                            welcome_url = uploaded_welcome_url
                        else:
                            print(f"Skipping Slack DM for {name}: missing welcome_url", file=sys.stderr)
                            continue
                    if not welcome_url:
                        continue
                    user_id = slack_lookup_user_id(slack_token, slack_email)
                    if not user_id:
                        print(f"Skipping Slack DM for {name}: user not found for {slack_email}", file=sys.stderr)
                        continue
                    channel_id = slack_open_dm(slack_token, user_id)
                    if not channel_id:
                        print(f"Skipping Slack DM for {name}: cannot open DM channel", file=sys.stderr)
                        continue
                    message = (
                        f"Hi {name}! Welcome to Tokamak Network. "
                        f"Here is your onboarding package: {welcome_url}"
                    )
                    if not slack_send_dm(slack_token, channel_id, message):
                        print(f"Failed to send Slack DM to {name} ({slack_email})", file=sys.stderr)
        if drive_service and fieldnames and "welcome_url" in fieldnames:
            with open(args.csv, "w", newline="", encoding="utf-8") as f:
                writer = csv.DictWriter(f, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(rows)
        return 0

    while True:
        name = args.name or prompt("New hire name:")
        team = args.team or prompt("Team:")
        start_date = args.start_date or prompt("Start date (YYYY-MM-DD):", dt.date.today().isoformat())
        video_url = args.video_url or prompt("Onboarding video URL:", "TBD")

        _, uploaded_welcome_url = generate_one(
            name=name,
            team=team,
            start_date=start_date,
            video_url=video_url,
            output_dir=args.output_dir,
            video_duration=args.video_duration,
            account_email=args.account_email,
            account_password=args.account_password,
            manager=args.manager,
            managing_director=args.managing_director,
            include_script=args.include_script,
            video_file=args.video_file,
            drive_service=drive_service,
            drive_folder_id=args.drive_folder_id,
            prep_deploy=args.prep_deploy,
        )
        if not args.no_auto_csv:
            append_to_csv(
                args.auto_csv_path,
                {
                    "name": name,
                    "team": team,
                    "start_date": start_date,
                    "account_email": args.account_email or "",
                    "account_password": args.account_password or "",
                    "video_url": video_url,
                    "welcome_url": uploaded_welcome_url or "",
                    "slack_email": "",
                },
            )

        if not args.live and args.name and args.team and args.start_date and (args.video_url or args.video_file):
            return 0
        if not args.live:
            return 0

        again = prompt("Generate another? (y/N):", "N").lower()
        if again != "y":
            return 0


if __name__ == "__main__":
    raise SystemExit(main())
