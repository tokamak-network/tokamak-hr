#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
generator="$script_dir/generate_onboarding_package.py"

if [[ ! -f "$generator" ]]; then
  echo "Missing generate_onboarding_package.py in $script_dir" >&2
  exit 1
fi

python3 - "$generator" <<'PY'
import re
import sys
from pathlib import Path
import subprocess

generator = Path(sys.argv[1])

def prompt(label: str) -> str:
    return input(f"{label}: ").strip()

def parse_block(text: str) -> dict[str, str]:
    mapping = {
        "name": "name",
        "team": "team",
        "start_date": "start_date",
        "account_email": "account_email",
        "account_password": "account_password",
        "video_url": "video_url",
    }
    result: dict[str, str] = {}
    for line in text.splitlines():
        line = line.strip()
        if not line:
            continue
        # Strip leading bullets and quotes
        line = re.sub(r"^[>\-\*•]+\s*", "", line)
        for key, field in mapping.items():
            m = re.match(rf"{re.escape(key)}\s*:\s*(.+)$", line, re.IGNORECASE)
            if m:
                result[field] = m.group(1).strip()
                break
    return result

if sys.stdin.isatty():
    data = {
        "name": prompt("name"),
        "team": prompt("team"),
        "start_date": prompt("start_date (YYYY-MM-DD)"),
        "account_email": prompt("account_email"),
        "account_password": prompt("account_password"),
        "video_url": prompt("video_url"),
    }
else:
    block = sys.stdin.read()
    data = parse_block(block)
    missing = [k for k in ("name", "team", "start_date", "account_email", "account_password", "video_url") if not data.get(k)]
    if missing:
        raise SystemExit(f"Missing fields in input: {', '.join(missing)}")

cmd = [
    "python3",
    str(generator),
    "--name", data["name"],
    "--team", data["team"],
    "--start-date", data["start_date"],
    "--account-email", data["account_email"],
    "--account-password", data["account_password"],
    "--video-url", data["video_url"],
]
raise SystemExit(subprocess.call(cmd))
PY
