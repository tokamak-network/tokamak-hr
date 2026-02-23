import base64
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email import encoders
from pathlib import Path

from flask import Flask, jsonify, request
from flask_cors import CORS
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

SCOPES = ["https://www.googleapis.com/auth/gmail.send"]
BASE_DIR = Path(__file__).resolve().parent
SECRETS_DIR = BASE_DIR / ".secrets"
CREDENTIALS_PATH = SECRETS_DIR / "credentials.json"
TOKEN_PATH = SECRETS_DIR / "token.json"

SENDER_EMAIL = "irene@tokamak.network"
ATTACHMENT_PATH = Path(
    "/Users/irene/Desktop/Personal Information Usage Agreement_Tokamak Network PTE.LTD.).pdf"
)

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
        return jsonify({"error": str(exc)}), 401

    sent_ids = []
    for template in EMAIL_TEMPLATES:
        subject = fill_template(template["subject"], data)
        body = fill_template(template["body"], data)
        message = create_message(recipients, subject, body, attach=template["attach"])
        result = service.users().messages().send(userId="me", body=message).execute()
        sent_ids.append(result.get("id"))

    return jsonify({"status": "sent", "ids": sent_ids})


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8787, debug=False)
