#!/usr/bin/env python3
"""
Tokamak Network - Monthly Activity Report Generator
Usage: python generate_monthly_report.py <csv_file>
"""

import csv
import sys
import os
import re
from collections import defaultdict, Counter
from datetime import datetime

def parse_csv(filepath):
    """CSV 파일을 파싱하여 멤버별, 소스별 활동 집계"""

    data = defaultdict(lambda: {
        'drive': {'edit': 0, 'files': set()},
        'github': {
            'commit': 0, 'pr': 0, 'review': 0,
            'additions': 0, 'deletions': 0,
            'repos': defaultdict(int),
            'messages': [],
            'pr_titles': [],
            'keywords': defaultdict(int)
        },
        'slack': {'message': 0},
        'notion': {'page': 0, 'content_diff': 0, 'added': 0, 'deleted': 0, 'modified': 0}
    })

    with open(filepath, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)

        for row in reader:
            source = row.get('source', '').strip().lower()
            member = row.get('member_name', '').strip()
            action_type = row.get('type', '').strip()
            action = row.get('action', '').strip()

            if not member:
                continue

            # Google Drive - 편집 활동만
            if source == 'drive':
                if '편집' in action_type or action == 'edit' or 'edit' in action_type.lower():
                    data[member]['drive']['edit'] += 1
                    file_name = row.get('file_name', '')
                    if file_name and file_name != 'Unknown':
                        data[member]['drive']['files'].add(file_name)

            # GitHub
            elif source == 'github':
                repo = row.get('repository', '').strip()
                message = row.get('message', '').strip()
                pr_title = row.get('pr_title', '').strip()

                if action_type == 'commit':
                    data[member]['github']['commit'] += 1
                    try:
                        data[member]['github']['additions'] += int(row.get('additions', 0) or 0)
                        data[member]['github']['deletions'] += int(row.get('deletions', 0) or 0)
                    except:
                        pass

                    # Repository 집계
                    if repo:
                        data[member]['github']['repos'][repo] += 1

                    # 커밋 메시지 저장
                    if message:
                        data[member]['github']['messages'].append(message)
                        # 키워드 분석
                        keyword = extract_keyword(message)
                        if keyword:
                            data[member]['github']['keywords'][keyword] += 1

                elif action_type == 'pull_request':
                    data[member]['github']['pr'] += 1
                    if pr_title:
                        data[member]['github']['pr_titles'].append(pr_title)
                        keyword = extract_keyword(pr_title)
                        if keyword:
                            data[member]['github']['keywords'][keyword] += 1

                elif action_type == 'review':
                    data[member]['github']['review'] += 1

            # Slack
            elif source == 'slack':
                if action_type == 'message':
                    data[member]['slack']['message'] += 1

            # Notion
            elif source == 'notion':
                if action_type == 'page':
                    data[member]['notion']['page'] += 1
                elif action_type == 'content_diff':
                    data[member]['notion']['content_diff'] += 1
                    try:
                        data[member]['notion']['added'] += int(row.get('added_count', 0) or 0)
                        data[member]['notion']['deleted'] += int(row.get('deleted_count', 0) or 0)
                        data[member]['notion']['modified'] += int(row.get('modified_count', 0) or 0)
                    except:
                        pass

    return data

def extract_keyword(message):
    """커밋 메시지에서 키워드 추출 (feat, fix, refactor 등)"""
    message_lower = message.lower()

    keywords = {
        'feat': ['feat', 'feature', 'add', 'added', 'implement', 'new'],
        'fix': ['fix', 'fixed', 'bug', 'hotfix', 'patch'],
        'refactor': ['refactor', 'refactoring', 'restructure', 'reorganize'],
        'docs': ['docs', 'document', 'documentation', 'readme'],
        'test': ['test', 'testing', 'spec'],
        'chore': ['chore', 'update', 'upgrade', 'bump', 'dependency'],
        'style': ['style', 'format', 'lint', 'prettier'],
        'perf': ['perf', 'performance', 'optimize', 'optimization'],
        'ci': ['ci', 'cd', 'pipeline', 'workflow', 'github action'],
        'merge': ['merge', 'merged']
    }

    # 첫 번째 단어 또는 콜론 앞 단어 체크
    first_word = re.split(r'[:\s\(\[]', message_lower)[0]

    for key, variants in keywords.items():
        if first_word in variants:
            return key
        for variant in variants:
            if message_lower.startswith(variant):
                return key

    return 'other'

def calculate_score(member_data):
    """활동 점수 계산"""
    score = 0
    score += member_data['drive']['edit'] * 2
    score += member_data['github']['commit'] * 3
    score += member_data['github']['pr'] * 5
    score += member_data['github']['review'] * 4
    score += member_data['slack']['message'] * 1
    score += member_data['notion']['page'] * 3
    score += member_data['notion']['content_diff'] * 2
    return score

def generate_markdown(data, period, output_path):
    """Markdown 리포트 생성"""

    # 점수순 정렬
    sorted_members = sorted(data.items(), key=lambda x: calculate_score(x[1]), reverse=True)

    # 전체 통계
    total = {
        'drive_edit': sum(d['drive']['edit'] for d in data.values()),
        'github_commit': sum(d['github']['commit'] for d in data.values()),
        'github_pr': sum(d['github']['pr'] for d in data.values()),
        'github_review': sum(d['github']['review'] for d in data.values()),
        'slack_message': sum(d['slack']['message'] for d in data.values()),
        'notion_page': sum(d['notion']['page'] for d in data.values()),
        'notion_diff': sum(d['notion']['content_diff'] for d in data.values()),
    }

    md = f"""# Tokamak Network Monthly Activity Report

**Period:** {period}
**Generated:** {datetime.now().strftime('%Y-%m-%d %H:%M')}

---

## Summary

| Platform | Metric | Total |
|----------|--------|-------|
| Google Drive | Edits | {total['drive_edit']} |
| GitHub | Commits | {total['github_commit']} |
| GitHub | Pull Requests | {total['github_pr']} |
| GitHub | Reviews | {total['github_review']} |
| Slack | Messages | {total['slack_message']} |
| Notion | Pages Created | {total['notion_page']} |
| Notion | Content Edits | {total['notion_diff']} |

---

## Team Activity Ranking

| Rank | Member | Drive | GitHub | Slack | Notion | Score |
|------|--------|-------|--------|-------|--------|-------|
"""

    for i, (member, d) in enumerate(sorted_members, 1):
        github_total = d['github']['commit'] + d['github']['pr'] + d['github']['review']
        notion_total = d['notion']['page'] + d['notion']['content_diff']
        score = calculate_score(d)

        if score > 0:
            md += f"| {i} | {member} | {d['drive']['edit']} | {github_total} | {d['slack']['message']} | {notion_total} | {score} |\n"

    # GitHub 개발 활동 분석 섹션
    md += """
---

## GitHub Development Analysis

"""

    # GitHub 활동이 있는 멤버만 필터링
    github_members = [(m, d) for m, d in sorted_members
                      if d['github']['commit'] + d['github']['pr'] + d['github']['review'] > 0]

    for member, d in github_members:
        gh = d['github']
        total_github = gh['commit'] + gh['pr'] + gh['review']

        md += f"### {member}\n\n"

        # 주요 Repository
        if gh['repos']:
            md += "**Repositories:**\n\n"
            md += "| Repository | Commits |\n"
            md += "|------------|--------|\n"
            for repo, count in sorted(gh['repos'].items(), key=lambda x: -x[1])[:5]:
                md += f"| {repo} | {count} |\n"
            md += "\n"

        # 커밋 키워드 분석
        if gh['keywords']:
            md += "**Commit Types:**\n\n"
            md += "| Type | Count | Ratio |\n"
            md += "|------|-------|-------|\n"
            total_keywords = sum(gh['keywords'].values())
            for kw, count in sorted(gh['keywords'].items(), key=lambda x: -x[1]):
                ratio = (count / total_keywords * 100) if total_keywords > 0 else 0
                emoji = get_keyword_emoji(kw)
                md += f"| {emoji} {kw} | {count} | {ratio:.1f}% |\n"
            md += "\n"

        # 최근 주요 커밋
        if gh['messages']:
            md += "**Recent Commits:**\n\n"
            for msg in gh['messages'][:5]:
                # 메시지 정리 (너무 긴 경우 자르기)
                clean_msg = msg.replace('\n', ' ').strip()[:80]
                if len(msg) > 80:
                    clean_msg += "..."
                md += f"- {clean_msg}\n"
            md += "\n"

        md += "---\n\n"

    # GitHub 활동 없는 멤버 리스트
    no_github_members = [m for m, d in sorted_members
                         if d['github']['commit'] + d['github']['pr'] + d['github']['review'] == 0
                         and calculate_score(d) > 0]

    if no_github_members:
        md += "### No GitHub Activity\n\n"
        md += "다음 멤버는 이번 기간 GitHub 활동이 없습니다:\n\n"
        for member in no_github_members:
            md += f"- {member}\n"
        md += "\n---\n\n"

    # Individual Details
    md += """
## Individual Details

"""

    for member, d in sorted_members:
        score = calculate_score(d)
        if score == 0:
            continue

        md += f"""### {member}

| Platform | Activity | Count |
|----------|----------|-------|
| Drive | Edits | {d['drive']['edit']} |
| GitHub | Commits | {d['github']['commit']} |
| GitHub | PRs | {d['github']['pr']} |
| GitHub | Reviews | {d['github']['review']} |
| GitHub | Lines Added | {d['github']['additions']} |
| GitHub | Lines Deleted | {d['github']['deletions']} |
| Slack | Messages | {d['slack']['message']} |
| Notion | Pages | {d['notion']['page']} |
| Notion | Edits | {d['notion']['content_diff']} |

**Activity Score:** {score}

---

"""

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(md)

    return md

def get_keyword_emoji(keyword):
    """키워드별 이모지 반환"""
    emojis = {
        'feat': '✨',
        'fix': '🐛',
        'refactor': '♻️',
        'docs': '📝',
        'test': '🧪',
        'chore': '🔧',
        'style': '💄',
        'perf': '⚡',
        'ci': '👷',
        'merge': '🔀',
        'other': '📦'
    }
    return emojis.get(keyword, '📦')

def generate_html(data, period, output_path):
    """HTML 대시보드 생성"""

    sorted_members = sorted(data.items(), key=lambda x: calculate_score(x[1]), reverse=True)
    active_members = [(m, d) for m, d in sorted_members if calculate_score(d) > 0]
    github_members = [(m, d) for m, d in sorted_members
                      if d['github']['commit'] + d['github']['pr'] + d['github']['review'] > 0]
    no_github_members = [m for m, d in sorted_members
                         if d['github']['commit'] + d['github']['pr'] + d['github']['review'] == 0
                         and calculate_score(d) > 0]

    # 전체 통계
    total = {
        'drive': sum(d['drive']['edit'] for d in data.values()),
        'github': sum(d['github']['commit'] + d['github']['pr'] + d['github']['review'] for d in data.values()),
        'slack': sum(d['slack']['message'] for d in data.values()),
        'notion': sum(d['notion']['page'] + d['notion']['content_diff'] for d in data.values()),
    }

    # 차트 데이터
    chart_labels = [m for m, _ in active_members[:15]]
    chart_drive = [d['drive']['edit'] for _, d in active_members[:15]]
    chart_github = [d['github']['commit'] + d['github']['pr'] + d['github']['review'] for _, d in active_members[:15]]
    chart_slack = [d['slack']['message'] for _, d in active_members[:15]]
    chart_notion = [d['notion']['page'] + d['notion']['content_diff'] for _, d in active_members[:15]]

    # GitHub 멤버별 상세 데이터 생성
    github_details_html = ""
    for member, d in github_members:
        gh = d['github']

        # Repository 리스트
        repos_html = ""
        for repo, count in sorted(gh['repos'].items(), key=lambda x: -x[1])[:5]:
            repos_html += f'<div class="repo-item"><span class="repo-name">{repo}</span><span class="repo-count">{count}</span></div>'

        # 키워드 분석
        keywords_html = ""
        if gh['keywords']:
            total_kw = sum(gh['keywords'].values())
            for kw, count in sorted(gh['keywords'].items(), key=lambda x: -x[1])[:6]:
                ratio = (count / total_kw * 100) if total_kw > 0 else 0
                color = get_keyword_color(kw)
                keywords_html += f'<div class="keyword-bar"><span class="keyword-label">{kw}</span><div class="bar-container"><div class="bar" style="width: {ratio}%; background: {color};"></div></div><span class="keyword-pct">{ratio:.0f}%</span></div>'

        # 최근 커밋
        commits_html = ""
        for msg in gh['messages'][:4]:
            clean_msg = msg.replace('\n', ' ').strip()[:60]
            if len(msg) > 60:
                clean_msg += "..."
            commits_html += f'<div class="commit-item">{clean_msg}</div>'

        github_details_html += f"""
        <div class="github-card">
            <div class="github-card-header">
                <h3>{member}</h3>
                <div class="github-stats">
                    <span class="stat"><strong>{gh['commit']}</strong> commits</span>
                    <span class="stat"><strong>{gh['pr']}</strong> PRs</span>
                    <span class="stat"><strong>{gh['review']}</strong> reviews</span>
                </div>
            </div>
            <div class="github-card-body">
                <div class="github-section">
                    <h4>Repositories</h4>
                    <div class="repos-list">{repos_html}</div>
                </div>
                <div class="github-section">
                    <h4>Commit Types</h4>
                    <div class="keywords-chart">{keywords_html}</div>
                </div>
                <div class="github-section">
                    <h4>Recent Commits</h4>
                    <div class="commits-list">{commits_html}</div>
                </div>
            </div>
        </div>
        """

    html = f"""<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tokamak Network - Monthly Report ({period})</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            color: #fff;
            min-height: 100vh;
            padding: 20px;
        }}
        .container {{ max-width: 1400px; margin: 0 auto; }}
        h1 {{
            text-align: center;
            margin-bottom: 10px;
            font-size: 2.5em;
            background: linear-gradient(90deg, #00d4ff, #7b2cbf);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }}
        h2 {{
            margin: 40px 0 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid rgba(255,255,255,0.1);
        }}
        .period {{ text-align: center; color: #888; margin-bottom: 30px; }}
        .summary {{
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-bottom: 40px;
        }}
        .card {{
            background: rgba(255,255,255,0.05);
            border-radius: 16px;
            padding: 24px;
            text-align: center;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.1);
            transition: transform 0.3s;
        }}
        .card:hover {{ transform: translateY(-5px); }}
        .card h3 {{ font-size: 0.9em; color: #888; margin-bottom: 10px; }}
        .card .number {{ font-size: 2.5em; font-weight: bold; }}
        .card.drive .number {{ color: #4285f4; }}
        .card.github .number {{ color: #238636; }}
        .card.slack .number {{ color: #e01e5a; }}
        .card.notion .number {{ color: #fff; }}
        .chart-container {{
            background: rgba(255,255,255,0.05);
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 40px;
            border: 1px solid rgba(255,255,255,0.1);
        }}
        table {{
            width: 100%;
            border-collapse: collapse;
            background: rgba(255,255,255,0.05);
            border-radius: 16px;
            overflow: hidden;
        }}
        th, td {{ padding: 16px; text-align: left; }}
        th {{
            background: rgba(255,255,255,0.1);
            font-weight: 600;
            text-transform: uppercase;
            font-size: 0.85em;
            letter-spacing: 0.5px;
        }}
        tr:hover {{ background: rgba(255,255,255,0.05); }}
        td:not(:first-child) {{ text-align: center; }}
        th:not(:first-child) {{ text-align: center; }}
        .score {{ font-weight: bold; color: #00d4ff; }}
        .rank {{ width: 50px; font-weight: bold; color: #888; }}
        .rank-1 {{ color: #ffd700; }}
        .rank-2 {{ color: #c0c0c0; }}
        .rank-3 {{ color: #cd7f32; }}

        /* GitHub Details Section */
        .github-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }}
        .github-card {{
            background: rgba(255,255,255,0.05);
            border-radius: 16px;
            border: 1px solid rgba(255,255,255,0.1);
            overflow: hidden;
        }}
        .github-card-header {{
            background: rgba(35, 134, 54, 0.3);
            padding: 16px 20px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }}
        .github-card-header h3 {{ margin-bottom: 8px; }}
        .github-stats {{ display: flex; gap: 16px; font-size: 0.85em; color: #888; }}
        .github-stats .stat strong {{ color: #238636; }}
        .github-card-body {{ padding: 20px; }}
        .github-section {{ margin-bottom: 20px; }}
        .github-section:last-child {{ margin-bottom: 0; }}
        .github-section h4 {{ font-size: 0.8em; color: #888; margin-bottom: 10px; text-transform: uppercase; }}
        .repos-list {{ display: flex; flex-direction: column; gap: 6px; }}
        .repo-item {{
            display: flex;
            justify-content: space-between;
            padding: 8px 12px;
            background: rgba(255,255,255,0.05);
            border-radius: 8px;
            font-size: 0.9em;
        }}
        .repo-name {{ color: #58a6ff; }}
        .repo-count {{ color: #888; }}
        .keywords-chart {{ display: flex; flex-direction: column; gap: 8px; }}
        .keyword-bar {{
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 0.85em;
        }}
        .keyword-label {{ width: 70px; color: #888; }}
        .bar-container {{
            flex: 1;
            height: 8px;
            background: rgba(255,255,255,0.1);
            border-radius: 4px;
            overflow: hidden;
        }}
        .bar {{ height: 100%; border-radius: 4px; transition: width 0.3s; }}
        .keyword-pct {{ width: 40px; text-align: right; color: #888; }}
        .commits-list {{ display: flex; flex-direction: column; gap: 6px; }}
        .commit-item {{
            padding: 8px 12px;
            background: rgba(255,255,255,0.05);
            border-radius: 8px;
            font-size: 0.85em;
            color: #aaa;
            border-left: 3px solid #238636;
        }}
        .no-github-section {{
            margin-top: 30px;
            padding: 20px;
            background: rgba(255,255,255,0.05);
            border-radius: 16px;
            border: 1px solid rgba(255,255,255,0.1);
        }}
        .no-github-section h3 {{ margin-bottom: 10px; color: #888; }}
        .no-github-section p {{ color: #666; font-size: 0.9em; margin-bottom: 10px; }}
        .no-github-list {{ color: #aaa; font-size: 0.95em; }}

        @media (max-width: 768px) {{
            .summary {{ grid-template-columns: repeat(2, 1fr); }}
            .github-grid {{ grid-template-columns: 1fr; }}
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>Tokamak Network</h1>
        <p class="period">Monthly Activity Report - {period}</p>

        <div class="summary">
            <div class="card drive">
                <h3>Google Drive</h3>
                <div class="number">{total['drive']}</div>
            </div>
            <div class="card github">
                <h3>GitHub</h3>
                <div class="number">{total['github']}</div>
            </div>
            <div class="card slack">
                <h3>Slack</h3>
                <div class="number">{total['slack']}</div>
            </div>
            <div class="card notion">
                <h3>Notion</h3>
                <div class="number">{total['notion']}</div>
            </div>
        </div>

        <div class="chart-container">
            <canvas id="activityChart"></canvas>
        </div>

        <table>
            <thead>
                <tr>
                    <th class="rank">#</th>
                    <th>Member</th>
                    <th>Drive</th>
                    <th>GitHub</th>
                    <th>Slack</th>
                    <th>Notion</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
"""

    for i, (member, d) in enumerate(active_members, 1):
        github_total = d['github']['commit'] + d['github']['pr'] + d['github']['review']
        notion_total = d['notion']['page'] + d['notion']['content_diff']
        score = calculate_score(d)

        rank_class = f"rank-{i}" if i <= 3 else ""

        html += f"""                <tr>
                    <td class="rank {rank_class}">{i}</td>
                    <td>{member}</td>
                    <td>{d['drive']['edit']}</td>
                    <td>{github_total}</td>
                    <td>{d['slack']['message']}</td>
                    <td>{notion_total}</td>
                    <td class="score">{score}</td>
                </tr>
"""

    html += f"""            </tbody>
        </table>

        <h2>GitHub Development Analysis</h2>
        <div class="github-grid">
            {github_details_html}
        </div>
        {'<div class="no-github-section"><h3>No GitHub Activity</h3><p>다음 멤버는 이번 기간 GitHub 활동이 없습니다:</p><div class="no-github-list">' + ', '.join(no_github_members) + '</div></div>' if no_github_members else ''}
    </div>

    <script>
        const ctx = document.getElementById('activityChart').getContext('2d');
        new Chart(ctx, {{
            type: 'bar',
            data: {{
                labels: {chart_labels},
                datasets: [
                    {{
                        label: 'Drive',
                        data: {chart_drive},
                        backgroundColor: 'rgba(66, 133, 244, 0.8)',
                    }},
                    {{
                        label: 'GitHub',
                        data: {chart_github},
                        backgroundColor: 'rgba(35, 134, 54, 0.8)',
                    }},
                    {{
                        label: 'Slack',
                        data: {chart_slack},
                        backgroundColor: 'rgba(224, 30, 90, 0.8)',
                    }},
                    {{
                        label: 'Notion',
                        data: {chart_notion},
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    }}
                ]
            }},
            options: {{
                responsive: true,
                plugins: {{
                    legend: {{
                        labels: {{ color: '#fff' }}
                    }}
                }},
                scales: {{
                    x: {{
                        stacked: true,
                        ticks: {{ color: '#888' }},
                        grid: {{ color: 'rgba(255,255,255,0.1)' }}
                    }},
                    y: {{
                        stacked: true,
                        ticks: {{ color: '#888' }},
                        grid: {{ color: 'rgba(255,255,255,0.1)' }}
                    }}
                }}
            }}
        }});
    </script>
</body>
</html>
"""

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html)

def get_keyword_color(keyword):
    """키워드별 색상 반환"""
    colors = {
        'feat': '#238636',
        'fix': '#da3633',
        'refactor': '#8957e5',
        'docs': '#0969da',
        'test': '#bf8700',
        'chore': '#768390',
        'style': '#ff7b72',
        'perf': '#3fb950',
        'ci': '#a371f7',
        'merge': '#6e7681',
        'other': '#484f58'
    }
    return colors.get(keyword, '#484f58')

def main():
    if len(sys.argv) < 2:
        print("Usage: python generate_monthly_report.py <csv_file>")
        print("Example: python generate_monthly_report.py custom_export_2026-01-01_2026-01-31.csv")
        sys.exit(1)

    csv_file = sys.argv[1]

    if not os.path.exists(csv_file):
        print(f"Error: File not found - {csv_file}")
        sys.exit(1)

    # 파일명에서 기간 추출
    filename = os.path.basename(csv_file)
    try:
        period = filename.replace('custom_export_', '').replace('.csv', '').split('(')[0].strip()
    except:
        period = "Unknown Period"

    print(f"Processing: {csv_file}")
    print(f"Period: {period}")

    # 데이터 파싱
    data = parse_csv(csv_file)
    print(f"Found {len(data)} members")

    # 출력 경로
    output_dir = os.path.dirname(csv_file) or '.'
    base_name = f"monthly_report_{period.replace(' ', '_')}"

    md_path = os.path.join(output_dir, f"{base_name}.md")
    html_path = os.path.join(output_dir, f"{base_name}.html")

    # 리포트 생성
    generate_markdown(data, period, md_path)
    print(f"Markdown report: {md_path}")

    generate_html(data, period, html_path)
    print(f"HTML dashboard: {html_path}")

    print("\nDone!")

if __name__ == "__main__":
    main()
