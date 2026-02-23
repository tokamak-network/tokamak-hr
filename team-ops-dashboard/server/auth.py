from pathlib import Path

from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = ["https://www.googleapis.com/auth/gmail.send"]
BASE_DIR = Path(__file__).resolve().parent
SECRETS_DIR = BASE_DIR / ".secrets"
CREDENTIALS_PATH = SECRETS_DIR / "credentials.json"
TOKEN_PATH = SECRETS_DIR / "token.json"


def main():
    if not CREDENTIALS_PATH.exists():
        raise FileNotFoundError(
            f"Missing OAuth client file at {CREDENTIALS_PATH}. Download it from Google Cloud Console."
        )

    flow = InstalledAppFlow.from_client_secrets_file(
        str(CREDENTIALS_PATH), SCOPES
    )
    creds = flow.run_local_server(port=0)
    SECRETS_DIR.mkdir(parents=True, exist_ok=True)
    TOKEN_PATH.write_text(creds.to_json(), encoding="utf-8")
    print("Saved token to", TOKEN_PATH)


if __name__ == "__main__":
    main()
