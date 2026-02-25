import base64
import os
import re
import time
from datetime import timedelta
from datetime import datetime
from email import encoders
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path

from flask import Flask, jsonify, request
from flask_cors import CORS
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
import requests

SCOPES = ["https://www.googleapis.com/auth/gmail.send"]
BASE_DIR = Path(__file__).resolve().parent
SECRETS_DIR = BASE_DIR / ".secrets"
CREDENTIALS_PATH = SECRETS_DIR / "credentials.json"
TOKEN_PATH = SECRETS_DIR / "token.json"
ENV_PATH = BASE_DIR / ".env"


def load_env(path: Path) -> None:
    if not path.exists():
        return
    for line in path.read_text().splitlines():
        raw = line.strip()
        if not raw or raw.startswith("#") or "=" not in raw:
            continue
        key, value = raw.split("=", 1)
        key = key.strip()
        value = value.strip().strip("\"").strip("'")
        if key and key not in os.environ:
            os.environ[key] = value


load_env(ENV_PATH)

SENDER_EMAIL = "irene@tokamak.network"
ATTACHMENT_PATH = Path(
    "/Users/irene/Desktop/Personal Information Usage Agreement_Tokamak Network PTE.LTD.).pdf"
)

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "")
OPENAI_MODEL = os.environ.get("OPENAI_MODEL", "gpt-4o-mini")
GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN", "")


def github_error_message(response):
    if response is None:
        return "GitHub request failed."
    status = response.status_code
    rate_remaining = response.headers.get("X-RateLimit-Remaining", "")
    try:
        payload = response.json()
        detail = payload.get("message", "")
    except ValueError:
        detail = ""

    if status == 401:
        return "GitHub unauthorized. Check that your token is valid."
    if status == 403:
        if rate_remaining == "0":
            return "GitHub rate limit exceeded. Try again later or use a token with higher limits."
        return "GitHub forbidden. The token likely lacks access to this repo or required scopes."
    if detail:
        return f"GitHub error {status}: {detail}"
    return f"GitHub error {status}."

EMAIL_TEMPLATES = [
    {
        "subject": "[Tokamak Network] 1. Onboarding Documents",
        "body": """Dear {Name},
This is HR from Tokamak Network :)

Now, there are some documents you need to share with us in advance before we proceed with the contract process.

1. Personal Information Collection and Usage Agreement (attached)
- Please sign it through the drawing function in PDF

2. Certificate of graduation(or Certificate of the expectant graduation)

3. Attestation of qualifications and awards you included on your resume

4. Passport scan copy(Passport(ID) photo(.png))

5. First Name / Last(Family) Name

6. Nationality

7. Date of birth

8. Telephone number 

9. Emergency Contact

10. Personal Email

11. Address of living + Postal code

12. Metamask Erc 20 address


Could you prepare these within 1week? (But the sooner the better.)

Best Regards,
Tokamak Network.""",
        "attach": True,
    },
    {
        "subject": "[Tokamak Network] 2. Onboarding Process",
        "body": """Hi  {Name},

Welcome to the team! The entire team of Tokamak Network is thrilled to welcome you on board.
The procedure for working contracts and employee registration is as follows.


[Following Step]

1. Information related company tools and To do list
* Your ID is: {WorkEmail}
* Your PW is : hellotokamak


1-1). Please download Chrome(*All crews always  work with Google Chrome) 
: Please Check your Google emails. Login with your company account


1-2). Google Drive and Google Calendar: Please sign in to Gmail with your company account
: We always use Google Drive & Google Calendars as working tools
- Please check calendar invitations in the mailbox and add all calendars on your Google calendar by accepting all.


1-3). Please download the Slack and login with your company account ID
- We always use slack as a communication app with team members.
- You can check the invitation mail from Slack(Jaden&Irene) in your mailbox 
- Please accept and join all channels that we invited you to.


2. Onboarding day
2-1). Start date: {StartDate}
2-2). Your working hours : It's up to you (Regular working hours : 9/10am-6/7pm)


See you on onboarding day! :)


Best Regards,
Tokamak Network.""",
        "attach": False,
    },
    {
        "subject": "[Tokamak Network] 3. Welcome package",
        "body": """Dear {Name},

We are delighted to welcome you to the team and look forward to working with you soon. 
As part of your onboarding, our HR team will be preparing and sending your Tokamak welcome package.

To ensure smooth delivery, kindly provide the following information at your earliest convenience:
Name : 
Passport Name : 
Full Address (including country and city) : 
Postal Code (Zip Code) : 
Phone Number : 
Personal Email Address : 
Your T-shirt size : 

Please double-check each detail to ensure accurate delivery.

Once you receive the welcome package, we would appreciate it if you could notify the HR team to confirm receipt.

Should you have any questions during this process, feel free to reach out at any time. 
We are here to support you every step of the way, and we are excited to have you with us soon.

Warm regards,
Tokamak Network.""",
        "attach": False,
    },
]

app = Flask(__name__)
CORS(app)


def parse_pr_url(pr_url):
    match = re.match(r"https://github.com/([^/]+)/([^/]+)/pull/(\\d+)", pr_url)
    if not match:
        raise ValueError("Invalid GitHub PR URL.")
    owner, repo, number = match.groups()
    return owner, repo, int(number)


def parse_commit_url(commit_url):
    match = re.match(r"https://github.com/([^/]+)/([^/]+)/commit/([0-9a-fA-F]+)", commit_url)
    if not match:
        raise ValueError("Invalid GitHub commit URL.")
    owner, repo, sha = match.groups()
    return owner, repo, sha


def github_headers():
    headers = {"Accept": "application/vnd.github+json"}
    if GITHUB_TOKEN:
        headers["Authorization"] = f"Bearer {GITHUB_TOKEN}"
    return headers


def fetch_pr_data(pr_url):
    owner, repo, number = parse_pr_url(pr_url)
    base = f"https://api.github.com/repos/{owner}/{repo}/pulls/{number}"
    pr_response = requests.get(base, headers=github_headers(), timeout=20)
    pr_response.raise_for_status()
    pr_data = pr_response.json()

    files_response = requests.get(
        f"{base}/files?per_page=100", headers=github_headers(), timeout=20
    )
    files_response.raise_for_status()
    files_data = files_response.json()

    files_summary = []
    patch_snippets = []
    for item in files_data[:20]:
        files_summary.append(
            f"{item.get('filename')} (+{item.get('additions')}, -{item.get('deletions')})"
        )
        patch = item.get("patch")
        if patch:
            patch_snippets.append(f"File: {item.get('filename')}\\n{patch[:1200]}")

    return pr_data, files_summary, patch_snippets


def fetch_commit_data(commit_url):
    owner, repo, sha = parse_commit_url(commit_url)
    base = f"https://api.github.com/repos/{owner}/{repo}/commits/{sha}"
    commit_response = requests.get(base, headers=github_headers(), timeout=20)
    commit_response.raise_for_status()
    commit_data = commit_response.json()

    files_summary = []
    patch_snippets = []
    for item in commit_data.get("files", [])[:20]:
        files_summary.append(
            f"{item.get('filename')} (+{item.get('additions')}, -{item.get('deletions')})"
        )
        patch = item.get("patch")
        if patch:
            patch_snippets.append(f"File: {item.get('filename')}\\n{patch[:1200]}")

    return commit_data, files_summary, patch_snippets


def summarize_pr(pr_data, files_summary, patch_snippets):
    if not OPENAI_API_KEY:
        raise RuntimeError("Missing OPENAI_API_KEY environment variable.")

    prompt = (
        "You are summarizing a GitHub Pull Request for HR onboarding evaluation.\\n"
        "Explain what the new hire built in clear, non-technical language, then add a concise technical summary.\\n\\n"
        f"PR Title: {pr_data.get('title')}\\n"
        f"PR Author: {pr_data.get('user', {}).get('login')}\\n"
        f"PR State: {pr_data.get('state')} | Merged: {pr_data.get('merged')}\\n"
        f"PR Description:\\n{pr_data.get('body') or 'No description.'}\\n\\n"
        "Files changed:\\n- " + "\\n- ".join(files_summary) + "\\n\\n" + "\\n\\n".join(patch_snippets)
    )

    data = call_openai(prompt)

    # responses API returns output array; take first text block
    output = data.get("output", [])
    text = ""
    for item in output:
        if item.get("type") == "message":
            for content in item.get("content", []):
                if content.get("type") == "output_text":
                    text += content.get("text", "")
    return text.strip()


def summarize_commit(commit_data, files_summary, patch_snippets):
    if not OPENAI_API_KEY:
        raise RuntimeError("Missing OPENAI_API_KEY environment variable.")

    prompt = (
        "You are summarizing a GitHub Commit for HR onboarding evaluation.\\n"
        "Explain what the new hire built in clear, non-technical language, then add a concise technical summary.\\n\\n"
        f"Commit SHA: {commit_data.get('sha')}\\n"
        f"Author: {commit_data.get('commit', {}).get('author', {}).get('name')}\\n"
        f"Message: {commit_data.get('commit', {}).get('message')}\\n\\n"
        "Files changed:\\n- " + "\\n- ".join(files_summary) + "\\n\\n" + "\\n\\n".join(patch_snippets)
    )

    data = call_openai(prompt)

    output = data.get("output", [])
    text = ""
    for item in output:
        if item.get("type") == "message":
            for content in item.get("content", []):
                if content.get("type") == "output_text":
                    text += content.get("text", "")
    return text.strip()


def call_openai(prompt):
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": OPENAI_MODEL,
        "input": prompt,
        "temperature": 0.2,
    }
    last_error = None
    for attempt in range(3):
        response = requests.post(
            "https://api.openai.com/v1/responses",
            headers=headers,
            json=payload,
            timeout=60,
        )
        if response.status_code == 429:
            last_error = response.text
            time.sleep(2 ** attempt)
            continue
        if response.status_code in (401, 403):
            raise RuntimeError("OpenAI auth error. Check API key and billing.")
        response.raise_for_status()
        return response.json()
    raise RuntimeError(f"OpenAI rate limit. Try again in 1-2 minutes. ({last_error})")


def fill_template(text, data):
    return (
        text.replace("{Name}", data.get("name", ""))
        .replace("{StartDate}", data.get("start_date", ""))
        .replace("{WorkEmail}", data.get("work_email", ""))
    )


def load_credentials():
    if not TOKEN_PATH.exists():
        return None
    return Credentials.from_authorized_user_file(str(TOKEN_PATH), SCOPES)


def save_credentials(creds):
    SECRETS_DIR.mkdir(parents=True, exist_ok=True)
    TOKEN_PATH.write_text(creds.to_json(), encoding="utf-8")


def get_gmail_service():
    creds = load_credentials()
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
        save_credentials(creds)
    if not creds:
        raise RuntimeError(
            "Missing Gmail token. Run 'python3 auth.py' inside team-ops-dashboard/server first."
        )
    return build("gmail", "v1", credentials=creds)


def create_message(to_addrs, subject, body, attach=False):
    message = MIMEMultipart() if attach else MIMEText(body)
    if attach:
        message.attach(MIMEText(body))
    message["to"] = ", ".join(to_addrs)
    message["from"] = SENDER_EMAIL
    message["subject"] = subject

    if attach:
        if not ATTACHMENT_PATH.exists():
            raise FileNotFoundError(f"Attachment not found: {ATTACHMENT_PATH}")
        with ATTACHMENT_PATH.open("rb") as fh:
            part = MIMEBase("application", "pdf")
            part.set_payload(fh.read())
        encoders.encode_base64(part)
        part.add_header(
            "Content-Disposition",
            f"attachment; filename=\"{ATTACHMENT_PATH.name}\"",
        )
        message.attach(part)

    raw = base64.urlsafe_b64encode(message.as_bytes()).decode()
    return {"raw": raw}


@app.route("/send-onboarding-emails", methods=["POST"])
def send_onboarding_emails():
    payload = request.get_json() or {}
    name = payload.get("name", "").strip()
    work_email = payload.get("work_email", "").strip()
    personal_email = payload.get("personal_email", "").strip()
    start_date = payload.get("start_date", "").strip()

    recipients = [email for email in [work_email, personal_email] if email]
    if not recipients:
        return jsonify({"error": "Missing recipient emails."}), 400

    data = {
        "name": name,
        "work_email": work_email,
        "start_date": start_date,
    }

    try:
        service = get_gmail_service()
    except RuntimeError as exc:
        message = str(exc)
        if "rate limit" in message.lower():
            return jsonify({"error": message}), 429
        return jsonify({"error": message}), 401

    sent_ids = []
    for template in EMAIL_TEMPLATES:
        subject = fill_template(template["subject"], data)
        body = fill_template(template["body"], data)
        message = create_message(recipients, subject, body, attach=template["attach"])
        result = service.users().messages().send(userId="me", body=message).execute()
        sent_ids.append(result.get("id"))

    return jsonify({"status": "sent", "ids": sent_ids})


@app.route("/summarize-github", methods=["POST"])
def summarize_github_route():
    payload = request.get_json() or {}
    url = payload.get("url", "").strip()
    if not url:
        return jsonify({"error": "Missing url."}), 400

    try:
        if "/pull/" in url:
            pr_data, files_summary, patch_snippets = fetch_pr_data(url)
            summary = summarize_pr(pr_data, files_summary, patch_snippets)
            status = "Merged" if pr_data.get("merged") else pr_data.get("state", "unknown")
            title = pr_data.get("title", "")
            files_text = ", ".join(files_summary[:6])
        elif "/commit/" in url:
            commit_data, files_summary, patch_snippets = fetch_commit_data(url)
            summary = summarize_commit(commit_data, files_summary, patch_snippets)
            status = commit_data.get("commit", {}).get("message", "")
            title = commit_data.get("sha", "")[:8]
            files_text = ", ".join(files_summary[:6])
        else:
            raise ValueError("URL must be a GitHub PR or commit link.")
    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400
    except requests.HTTPError as exc:
        return jsonify({"error": github_error_message(exc.response)}), 502
    except RuntimeError as exc:
        return jsonify({"error": str(exc)}), 401
    except Exception as exc:
        return jsonify({"error": f"Unexpected error: {exc}"}), 500

    analyzed_at = datetime.utcnow().strftime("%Y-%m-%d %H:%M UTC")

    return jsonify(
        {
            "summary": summary,
            "title": title,
            "status": status,
            "files": files_text,
            "analyzed_at": analyzed_at,
        }
    )


@app.route("/github-activity", methods=["POST"])
def github_activity_route():
    payload = request.get_json() or {}
    username = payload.get("username", "").strip()
    days = int(payload.get("days", 14))
    if not username:
        return jsonify({"error": "Missing username."}), 400

    since = (datetime.utcnow() - timedelta(days=days)).strftime("%Y-%m-%d")
    search_headers = github_headers()
    search_headers["Accept"] = (
        "application/vnd.github+json, application/vnd.github.cloak-preview"
    )

    items = []

    def add_item(item_type, url, title, repo, updated_at):
        items.append(
            {
                "type": item_type,
                "url": url,
                "title": title,
                "repo": repo,
                "updated_at": updated_at,
            }
        )

    try:
        pr_query = f"author:{username} org:tokamak-network is:pr created:>={since}"
        pr_response = requests.get(
            "https://api.github.com/search/issues",
            headers=search_headers,
            params={"q": pr_query, "sort": "updated", "order": "desc", "per_page": 6},
            timeout=20,
        )
        pr_response.raise_for_status()
        for pr in pr_response.json().get("items", []):
            repo = pr.get("repository_url", "").split("/repos/")[-1]
            add_item(
                "PR",
                pr.get("html_url", ""),
                pr.get("title", ""),
                repo,
                pr.get("updated_at", ""),
            )

        commit_query = (
            f"author:{username} org:tokamak-network committer-date:>={since}"
        )
        commit_response = requests.get(
            "https://api.github.com/search/commits",
            headers=search_headers,
            params={
                "q": commit_query,
                "sort": "committer-date",
                "order": "desc",
                "per_page": 6,
            },
            timeout=20,
        )
        commit_response.raise_for_status()
        for commit in commit_response.json().get("items", []):
            repo = commit.get("repository", {}).get("full_name", "")
            add_item(
                "Commit",
                commit.get("html_url", ""),
                commit.get("commit", {}).get("message", "").split("\\n")[0],
                repo,
                commit.get("commit", {}).get("committer", {}).get("date", ""),
            )
    except requests.HTTPError as exc:
        return jsonify({"error": github_error_message(exc.response)}), 502
    except Exception as exc:
        return jsonify({"error": f"Unexpected error: {exc}"}), 500

    items.sort(key=lambda item: item.get("updated_at", ""), reverse=True)

    return jsonify({"items": items[:8], "since": since})


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8787, debug=False)
