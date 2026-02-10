# Tokamak HR - Monthly Activity Report System

Tokamak Network 팀원별 월간 활동 리포트 생성 도구

## Features

- Google Drive, GitHub, Slack, Notion 활동 통합 분석
- 팀원별 활동 점수 산출 및 랭킹
- Markdown 리포트 + HTML 대시보드 생성

## Usage

```bash
python3 generate_monthly_report.py <csv_file>
```

### Example

```bash
python3 generate_monthly_report.py custom_export_2026-01-01_2026-01-31.csv
```

### Output

- `monthly_report_<period>.md` - Markdown 리포트
- `monthly_report_<period>.html` - 웹 대시보드

## Onboarding Package Generator

신규입사자 온보딩 패키지(HTML + PDF + TXT) 생성 스크립트

### Usage

```bash
python3 generate_onboarding_package.py --name "Hong Gil-dong" --team "Platform" --start-date 2026-02-12 --video-url "https://example.com/video"
```

### Live Demo

입력값을 바꿀 때마다 즉시 재생성하는 데모 모드

```bash
python3 generate_onboarding_package.py --live
```

### Output

- `welcome_<name>.html` - 온보딩 페이지
- `welcome_<name>.pdf` - 요약 PDF (ASCII-only)
- `welcome_<name>.txt` - 텍스트 요약
- OT 3분 데모 대본 섹션 포함

## Bulk Generation (CSV)

Google Sheets에서 CSV로 다운로드한 뒤, 여러 신규입사자용 파일을 일괄 생성할 수 있습니다.

### CSV Columns

Required:
- `name`

Optional:
- `team`
- `start_date`
- `account_email`
- `account_password`
- `video_url`
- `welcome_url`

### Usage

```bash
python3 generate_onboarding_package.py --csv new_hires.csv
```

## Google Drive Upload (OAuth)

자동 업로드로 welcome HTML과 영상을 Google Drive에 올리고, 공유 링크를 생성할 수 있습니다.

### 1) Install dependencies
```bash
python3 -m pip install google-api-python-client google-auth-httplib2 google-auth-oauthlib
```

### 2) Create OAuth credentials
1. Google Cloud Console에서 OAuth Client(Desktop App) 생성
2. `credentials.json` 다운로드
3. `tokamak-hr/` 폴더에 `credentials.json` 저장

### 3) Run with Drive upload
```bash
python3 generate_onboarding_package.py --csv new_hires.csv --drive-upload --drive-folder-id YOUR_FOLDER_ID --video-file "/path/to/video.mp4"
```

업로드 후 `welcome_url`이 CSV에 자동으로 채워집니다.

### Slack DM (optional)

1) Create a Slack app and install it to the workspace.
2) Add Bot Token Scopes: `chat:write`, `users:read.email`, `im:write`
3) Set env var:
```bash
export SLACK_BOT_TOKEN="xoxb-..."
```
4) Include `welcome_url` in CSV (shareable link to the HTML page).
5) Run:
```bash
python3 generate_onboarding_package.py --csv new_hires.csv --send-slack
```

## Data Source

통합 CSV 파일 (source 컬럼으로 구분):
- `drive` - Google Drive 편집 활동
- `github` - Commits, PRs, Reviews
- `slack` - Messages
- `notion` - Pages, Content edits

## Scoring System

| Activity | Points |
|----------|--------|
| Drive Edit | 2 |
| GitHub Commit | 3 |
| GitHub PR | 5 |
| GitHub Review | 4 |
| Slack Message | 1 |
| Notion Page | 3 |
| Notion Edit | 2 |

## Files

```
tokamak-hr/
├── generate_monthly_report.py    # Main script
├── monthly_report_*.md           # Generated MD reports
├── monthly_report_*.html         # Generated HTML dashboards
└── README.md
```
