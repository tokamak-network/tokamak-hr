#!/usr/bin/env python3
"""Generate a simple onboarding package (HTML + PDF + TXT) from prompts."""

from __future__ import annotations

import argparse
import datetime as dt
import os
import re
import sys
from string import Template


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
      <p class=\"meta\">Approx. duration: $video_duration</p>
    </div>

    <div class=\"section\">
      <h2>OT script (3-minute demo) 📝</h2>
      <p class=\"meta\">Use this script to generate the avatar video.</p>
      <ol>
        $ot_script_items
      </ol>
    </div>

    <div class=\"section\">
      <h2>2) Your first-week checklist ✅</h2>
      <ul class="checklist">
        $checklist_items
      </ul>
    </div>

    <div class=\"section\">
      <h2>3) Account details 🔐</h2>
      <ul>
        $account_items
      </ul>
    </div>

    <div class=\"section\">
      <h2>4) Contacts 🤝</h2>
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

2) OT script (3-minute demo)
$ot_script_text

3) First-week checklist
$checklist_text

4) Account details
$account_text

5) Contacts
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
    "<div class=\"item-sub\">Submit via <a href=\"https://www.notion.so/tokamak/Identity-Address-and-Salary-Wallet-Verification-Guide-206d96a400a38021aa45dd7095ea134c\">[Notion]</a>.</div>",
    "<div class=\"item-title\">④ Review projects & express interest</div>"
    "<div class=\"item-sub\">Please review <a href=\"https://www.notion.so/tokamak/Tokamak-Network-Onboarding-523bc627bd374326b5dfbec3d3b0a8e1\">all the projects</a> and reach out to any project leader you want to join.</div>",
]

DEFAULT_CHECKLIST_TEXT = [
    "1) Basic settings: Set up 2FA. Please check [PPT] and proceed it (Google/Slack/Github). Please enable Two-Factor Authentication (2FA) for enhanced account security. If not completed within a week after you onboarded, the account will be suspended.",
    "PPT link: https://docs.google.com/presentation/d/1lZ1MjgkiJMm6nD_Ln4auBNyf2zF_44MkdyLlA-E9s1c/edit?slide=id.g25eac3a2538_3_87#slide=id.g25eac3a2538_3_87",
    "2) Set up your profile with pictures on Google & Slack.",
    "3) Personal Information Consent & Verification Submission [Notion].",
    "Notion link: https://www.notion.so/tokamak/Identity-Address-and-Salary-Wallet-Verification-Guide-206d96a400a38021aa45dd7095ea134c",
    "4) Please review all the projects and reach out to the leader of any project that interests you to express your intention to participate.",
    "All projects link: https://www.notion.so/tokamak/Tokamak-Network-Onboarding-523bc627bd374326b5dfbec3d3b0a8e1",
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


def to_bullets(items: list[str]) -> str:
    return "\n        ".join(f"<li>{item}</li>" for item in items)

def to_numbered(items: list[str]) -> str:
    return "\n        ".join(f"<li>{item}</li>" for item in items)


def to_text_bullets(items: list[str]) -> str:
    return "\n".join(f"- {item}" for item in items)


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
    parser.add_argument("--output-dir", default=".")
    parser.add_argument(
        "--live",
        action="store_true",
        help="Run in a loop for live demo (regenerates files each time).",
    )
    args = parser.parse_args()

    while True:
        name = args.name or prompt("New hire name:")
        team = args.team or prompt("Team:")
        start_date = args.start_date or prompt("Start date (YYYY-MM-DD):", dt.date.today().isoformat())
        video_url = args.video_url or prompt("Onboarding video URL:", "TBD")

        checklist_items = DEFAULT_CHECKLIST_HTML
        account_items = [
            f"Account: {args.account_email}",
            f"Password: {args.account_password}",
        ]
        ot_script_items = DEFAULT_OT_SCRIPT

        html = HTML_TEMPLATE.substitute(
            name=name,
            team=team,
            start_date=start_date,
            video_url=video_url,
            video_duration=args.video_duration,
            ot_script_items=to_numbered(ot_script_items),
            checklist_items=to_bullets(checklist_items),
            account_items=to_bullets(account_items),
            manager=args.manager,
            managing_director=args.managing_director,
        )

        txt = TXT_TEMPLATE.substitute(
            name=name,
            team=team,
            start_date=start_date,
            video_url=video_url,
            video_duration=args.video_duration,
            ot_script_text=to_text_bullets(ot_script_items),
            checklist_text=to_text_bullets(DEFAULT_CHECKLIST_TEXT),
            account_text=to_text_bullets(account_items),
            manager=args.manager,
            managing_director=args.managing_director,
        )

        base = f"welcome_{sanitize_filename(name)}"
        os.makedirs(args.output_dir, exist_ok=True)
        html_path = os.path.join(args.output_dir, f"{base}.html")
        txt_path = os.path.join(args.output_dir, f"{base}.txt")
        pdf_path = os.path.join(args.output_dir, f"{base}.pdf")

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
            f"- Duration: {args.video_duration}",
            "",
            "OT script (3-minute demo):",
            *[f"- {item}" for item in ot_script_items],
            "",
            "Checklist:",
            *[f"- {item}" for item in checklist_items],
            "",
            "Account details:",
            *[f"- {item}" for item in account_items],
            "",
            f"Managing Director: {args.managing_director}",
            f"HR Manager: {args.manager}",
        ]
        write_minimal_pdf(pdf_path, pdf_lines)

        non_ascii_found = any(any(ord(ch) > 127 for ch in line) for line in pdf_lines)
        if non_ascii_found:
            print("Note: PDF is ASCII-only; non-ASCII characters were replaced with '?'.")

        print(f"Generated: {html_path}")
        print(f"Generated: {pdf_path}")
        print(f"Generated: {txt_path}")

        if not args.live and args.name and args.team and args.start_date and args.video_url:
            return 0
        if not args.live:
            return 0

        again = prompt("Generate another? (y/N):", "N").lower()
        if again != "y":
            return 0


if __name__ == "__main__":
    raise SystemExit(main())
