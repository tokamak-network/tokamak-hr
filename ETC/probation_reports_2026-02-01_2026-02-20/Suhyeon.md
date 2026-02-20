# Probation Completion Report - Suhyeon

## Period
- 2026-02-01 to 2026-02-20

## Data Coverage (by source)
- drive: 268
- github: 128
- slack: 27

## Key Achievements (Evidence-led)
**GitHub (primary evidence)**
- Repositories: auto-research-press, secure-vote, Optimal-fraud-proof
- Notable commits: Remove paper/research files from tracking and update gitignore - git rm --cached: papers/, experiments/results/real-dat…
- Recurring themes: add, fix, research, api, workflow, key
**Slack**
- Active channels: tokamak-dev, project-eco, ai-tokamak-network
- Discussion themes: research, you, https, review, com
**Drive**
- Top actions: 접근 권한 변경, 문서 공개 설정 변경, change_owner
- Files touched: DRB Weekly Call - 2026/02/19 16:57 KST - Recording, DRB Weekly Call - 2026/02/19 16:57 KST - Gemini가 작성한 회의록, DRB Weekly Call - 2026/02/17 16:52 KST - Gemini가 작성한 회의록



## GitHub Reports
- Primary repos: auto-research-press, secure-vote.
- PR outcomes: no PRs recorded in this period.
- Commit outcomes: Remove paper/research files from tracking and update gitignore - git rm --cached: papers/, experime….
- Delivery themes: add, fix, research, api.

## Work Focus Analysis
Delivered engineering changes focused on “Remove paper/research files from tracking and update gitignore - git rm --cached: papers/, experiments/results/real-dat…,” indicating direct execution on core product work. Primary impact centers on auto-research-press, suggesting ownership of key implementation areas. Coordination in tokamak-dev, project-eco supports cross-team alignment and delivery. Drive activity suggests operational support via frequent “접근 권한 변경” actions.

## Records (latest first)
| timestamp | source | type | action | title |
|---|---|---|---|---|
| 2026-02-18 03:40:33 | github | commit |  | Remove paper/research files from tracking and update gitignore - git rm --cached: papers/, experiments/results/real-data-summary.md - Add r… |
| 2026-02-17 10:15:17 | github | commit |  | Fix results page ID mismatch: resolve MACI poll ID to RLA audit ID URL path id was used directly as RLA audit ID, but the two ID sequences… |
| 2026-02-17 09:45:19 | github | commit |  | Fix radio button alignment on Against vote option Against button was missing `flex items-center justify-center` on the indicator div, causi… |
| 2026-02-17 01:09:52 | github | commit |  | Sync simulation and test scripts with PM full verification fix - experiments/simulate.ts: PM samples = PM batches (full verification) - exp… |
| 2026-02-17 00:32:11 | github | commit |  | Fix PM sampling bug and add research files to gitignore - MaciRLA.sol: Remove PM batch sampling (security fix) - PM batches have sequential… |
| 2026-02-16 12:17:22 | github | commit |  | Switch light tier to gemini-2.5-flash, add model benchmarks Light tier primary changed from gemini-3-flash-preview to gemini-2.5-flash (26x… |
| 2026-02-16 10:10:00 | github | commit |  | Hide review sidebar on mobile when project is loaded via URL When a user opens review.html?id=xxx on mobile/tablet, the sidebar project lis… |
| 2026-02-16 10:00:42 | github | commit |  | Add manuscript heading fallback for title generation failures When LLM title generation fails, instead of showing the raw topic (which may… |
| 2026-02-16 09:57:55 | github | commit |  | Fix title fallback showing raw prompt as page title When title generation fails (timeout, LLM error, etc.), the fallback was returning the… |
| 2026-02-16 09:49:25 | github | commit |  | Make GET /api/workflows public (no API key required) Workflow list is read-only and should be visible to all visitors regardless of API key… |
| 2026-02-16 06:23:17 | github | commit |  | Fix Railway build: upgrade Docker to Python 3.12, fix f-string 3.11 compat - Dockerfile: python:3.11-slim → python:3.12-slim (matches local… |
| 2026-02-16 04:16:56 | github | commit |  | Fix manuscript markers, hallucinated refs, and reviewer score inflation 1. Strip [NO CHANGES NEEDED] revision markers from final manuscript… |
| 2026-02-16 03:40:57 | github | commit |  | Add json_mode parameter to LLM providers and enable across all agents Each provider now handles json_mode natively: Gemini sets response_mi… |
| 2026-02-15 16:58:37 | github | commit |  | Upgrade to Gemini 3.x models and add new test suites - config/models.json: primary models gemini-2.5-pro/flash → gemini-3-pro-preview/flash… |
| 2026-02-15 16:48:49 | github | commit |  | Update hero tagline and fix card score alignment - Hero subtitle: "Not Everything Survives. We Publish What Does." - Fix card-score-split l… |
| 2026-02-15 16:24:17 | github | commit |  | Add Stitch design to article page, version badges, and backfill-titles CLI - article.html/article.css: sharp shadow on TOC, callout boxes,… |
| 2026-02-15 15:19:20 | github | commit |  | Bump version to 1.2.0 Stitch design system site-wide, audience-aware title generation, mobile responsive improvements. Co-Authored-By: Clau… |
| 2026-02-15 15:00:40 | github | commit |  | Apply Stitch design system site-wide, fix title generation Design system (main.css): - Sharp shadow variables, grid-lines pattern, custom s… |
| 2026-02-15 03:07:24 | github | commit |  | Refine warm amber design system: typography, color palette, accessibility - Remove Playfair Display serif from card titles (keep for hero/s… |
| 2026-02-13 08:57:27 | github | commit |  | Use logger instead of print for startup API key check print() stdout is buffered by gunicorn and not captured in Railway deploy logs. logge… |
| 2026-02-13 02:08:07 | github | commit |  | Hard-fail on missing provider API keys at startup Previously missing keys only logged a warning and the server started anyway, silently fal… |
| 2026-02-12 17:51:23 | github | commit |  | Add coauthor revision notes to collaborative review loop Coauthors now analyze reviewer feedback in parallel and produce domain-specific re… |
| 2026-02-12 16:37:41 | github | commit |  | Add fallback chain to reviewer_rotation for provider resilience When a reviewer's primary provider is unavailable (e.g. missing API key), t… |
| 2026-02-12 16:22:46 | github | commit |  | Add startup API key check for all configured providers Validates at server boot that every provider in models.json (tiers + reviewer_rotati… |
| 2026-02-12 08:46:15 | github | commit |  | Replace all hardcoded data/ fetches with API endpoints, add frontend integrity tests Frontend pages were fetching static data/index.json, d… |
| 2026-02-12 08:41:15 | github | commit |  | Fix research-queue 404: replace data/index.json with /api/projects research-queue.html was fetching the static data/index.json file which d… |
| 2026-02-12 08:35:05 | github | commit |  | Fix restored workflows missing score/rounds in /api/workflows The completed workflow restoration added in the previous commit was missing f… |
| 2026-02-12 08:30:45 | github | commit |  | Add pre-push hook: syntax check + import check + integrity tests Runs 3 checks before allowing git push: 1. Python syntax validation on cha… |
| 2026-02-12 08:21:13 | github | commit |  | Restore completed workflows from disk on server startup Previously only interrupted/orphan workflows were scanned on startup. Completed wor… |
| 2026-02-12 08:13:06 | github | commit |  | Fix cost estimate: use blended rate ($4.2/M) from real workflow data Old formula used $18/M (single expensive model), producing ~$1.50 esti… |
| 2026-02-12 07:59:14 | github | commit |  | Add benchmark output files to .gitignore Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com> |
| 2026-02-12 07:57:59 | github | commit |  | v1.2.0: Improve agents, reorganize tests, enhance Gemini support - Enhance lead_author, writer, moderator, and coauthor agents with audienc… |
| 2026-02-12 07:39:55 | github | commit |  | Fix Python 3.11 f-string backslash SyntaxError in orchestrator.py Move citations_guidance ternary out of the f-string into a separate varia… |
| 2026-02-12 07:23:25 | github | commit |  | v1.1.0: Add secondary category support, fix frontend UX, rename to Autonomous Research Press - Add optional secondary academic category for… |
| 2026-02-10 03:26:06 | github | commit |  | Upscale OG cover image to 2400x1260 for better social media preview quality Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com> |
| 2026-02-10 03:05:19 | github | commit |  | Fix root path OG meta tags for social media sharing ## Problem - https://ar-press.com → No thumbnail in Facebook/Messenger - https://ar-pre… |
| 2026-02-10 02:58:01 | github | commit |  | Add backward compatibility for legacy articles without version fields ## Changes - _enrich_completed_status: Add title, system_version, gen… |
| 2026-02-10 02:31:35 | github | commit |  | Add test result files to .gitignore - Exclude gemini_flash_*.json (test results) - Exclude WORKFLOW_TEST_RESULTS.md (test logs) - Exclude *… |
| 2026-02-10 02:30:24 | github | commit |  | Add version management system and test utilities ## Version Management - VERSION file: v1.0.0 - CHANGELOG.md: Comprehensive changelog follo… |
| 2026-02-10 01:50:48 | github | commit |  | Major workflow enhancements: audience-aware formatting, dynamic categorization, and auto-title generation ## Core Features ### 1. Audience-… |
| 2026-02-09 16:02:36 | github | commit |  | Add explainer research type, fix collaborative workflow KeyError and resume fallback - Add "explainer" research type for beginner/intermedi… |
| 2026-02-09 15:47:28 | github | commit |  | Refactor agents for Gemini Flash support, add json_repair util, add tests - Refactor all agent classes to use create_llm_for_role() instead… |
| 2026-02-09 15:18:54 | github | commit |  | Generate reviewers via LLM instead of fixed expert pool _generate_reviewers_from_category() now uses LLM (categorizer role) to create 3 top… |
| 2026-02-09 09:18:04 | github | commit |  | Add OG meta tags and cover image for link preview thumbnails - Generated 1200x630 PNG cover image (IBM Plex Sans, dark theme) - Added og:ti… |
| 2026-02-09 06:16:54 | github | commit |  | Fix uploaded report status: treat uploaded+passed as completed Uploaded external reports have no review rounds, so _build_project_summary w… |
| 2026-02-09 06:09:08 | github | commit |  | Add report download (.md) and admin external report upload - GET /api/projects/{id}/report: combines manuscript + full peer review (all rou… |
| 2026-02-09 05:13:17.003000 | slack | message |  | ai-tokamak-network |
| 2026-02-09 04:48:49.502000 | slack | message |  | tokamak-dev |
| 2026-02-09 03:54:41.740000 | slack | message |  | tokamak-dev |
| 2026-02-09 03:41:13.437000 | slack | message |  | tokamak-dev |
| 2026-02-09 03:06:31 | slack | message |  | tokamak-dev |
| 2026-02-09 03:02:46.388000 | slack | message |  | tokamak-dev |
| 2026-02-09 03:02:39.231000 | slack | message |  | tokamak-dev |
| 2026-02-09 03:02:10.674000 | slack | message |  | tokamak-dev |
| 2026-02-09 03:00:48.894000 | slack | message |  | tokamak-dev |
| 2026-02-09 02:50:39.045000 | slack | message |  | tokamak-dev |
| 2026-02-09 02:03:31.600000 | slack | message |  | tokamak-dev |
| 2026-02-09 02:00:49 | github | commit |  | Add fallback for deployments without persistent volume - Detect if /app/persistent exists, if not use ephemeral storage - Copy seed-data to… |
| 2026-02-08 18:55:04 | github | commit |  | Fix seed-data merging: copy new report directories on each deployment - Change from cp -rn (no-clobber all files) to directory-level check… |
| 2026-02-08 18:49:31 | github | commit |  | Add 5 completed research reports to seed data across diverse academic fields - Quantum Computing in Drug Discovery (CS + Medicine) - Jacque… |
| 2026-02-08 18:30:48.526000 | slack | message |  | tokamak-dev |
| 2026-02-08 18:22:38 | github | commit |  | Switch to direct Anthropic API, 3-tier model architecture, fix system param format - Replace LiteLLM routing with direct Anthropic API inte… |
| 2026-02-08 15:27:00 | github | commit |  | Add minimal coordinator auth gate Require COORDINATOR_PASSWORD for coordinator login, enforce coordinator_auth cookie on coordinator API ro… |
| 2026-02-08 14:36:28.576000 | slack | message |  | track-b-demo |
| 2026-02-08 08:26:39 | github | commit |  | UI cleanup, 24h revision deadline, author response, job queue persistence - Remove "Autonomous Research Platform" subtitle from index.html… |
| 2026-02-08 08:10:57 | github | commit |  | Add MaciRLA contract, RLA coordinator workflow, Carbon UI frontend, and E2E tests - MaciRLA.sol: Risk-Limiting Audit contract with commit-r… |
| 2026-02-08 08:00:49 | github | commit |  | Reorder nav: About first, right-align My Research/API/dark mode - Move About to leftmost position - Group My Research, API dropdown, and da… |
| 2026-02-08 07:57:12 | github | commit |  | Sync seed-data and always merge on deploy - entrypoint.sh: use cp -rn (no-clobber merge) instead of empty-check, so new seed data gets adde… |
| 2026-02-08 07:46:24 | github | commit |  | Update all hardcoded model names to match router allowed list - claude-sonnet-4 → claude-sonnet-4.5 - gpt-4-turbo-preview → gpt-5.2-pro - g… |
| 2026-02-08 07:28:56 | github | commit |  | Fix unexpected model kwarg in LeadAuthorAgent and CoauthorAgent init Both agents use create_llm_for_role() internally to resolve their mode… |
| 2026-02-08 07:23:55 | github | commit |  | Introduce LLM_API_KEY/LLM_BASE_URL as shared router key Replace provider-specific OpenRouter fallback hack with a clean LLM_API_KEY + LLM_B… |
| 2026-02-08 07:00:23 | github | commit |  | Add results/ to seed data for /api/projects endpoint Homepage reads from results/*/workflow_complete.json, not web/data/. Add 48 project re… |
| 2026-02-08 06:57:49 | github | commit |  | Add seed data for initial Railway deployment Bundle existing articles (28), metadata (57 files), and SQLite DB into seed-data/ directory. E… |
| 2026-02-08 06:22:39 | github | commit |  | Railway deploy prep: volume support, cleanup, README rewrite - Add entrypoint.sh for persistent volume symlinks (data/, results/, web/data/… |
| 2026-02-08 05:55:48 | github | commit |  | Add data/ to .gitignore (runtime SQLite DB) Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com> |
| 2026-02-08 05:51:56 | github | commit |  | Add DB layer, model config, Docker deploy, external submissions UI, and agent refactors - research_cli/db.py: SQLite database layer for API… |
| 2026-02-08 05:49:26 | github | commit |  | Add submission guidelines, About page, and 50K word limit - Backend: 50,000-word max validation in submit_manuscript() and revise_submissio… |
| 2026-02-07 16:50:52 | github | commit |  | Moderator-based accept/reject, re-classify existing articles, UX fixes Accept logic now uses moderator decision instead of score threshold:… |
| 2026-02-07 15:34:21 | github | commit |  | Fix token tracking (~62% undercount), workflow status bug, and ask-topic UX Token tracking: writer calls (draft, revision, citation, author… |
| 2026-02-07 14:54:59 | github | commit |  | Add audience level feature, parallel workers, GPT reviewers, and UI improvements - Add audience_level (beginner/intermediate/professional)… |
| 2026-02-07 11:36:38.914000 | slack | message |  | tokamak-dev |
| 2026-02-07 05:54:06 | github | commit |  | Add official MACI E2E verification and fix Merkle tree for circuit compatibility - Add maci-test/ with isolated Hardhat + MACI v2.5.0 E2E t… |
| 2026-02-07 04:46:45 | github | commit |  | Fix status_callback signature mismatch in collaborative sub-phases manuscript_writing.py and collaborative_research.py called status_callba… |
| 2026-02-07 04:27:12 | github | commit |  | Integrate collaborative workflow into API and web UI Connect the existing CollaborativeWorkflowOrchestrator (previously CLI-only) to the AP… |
| 2026-02-07 03:27:16 | github | commit |  | Add dynamic domain detection for agent prompts and KaTeX math rendering Agent prompts (writer, moderator, planner) were hardcoded to "block… |
| 2026-02-07 03:10:22 | github | commit |  | Fix desk editor model: claude-haiku-4 not available, use sonnet Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com> |
| 2026-02-07 02:51:58 | github | commit |  | Add real source retrieval and citation system for manuscripts Search OpenAlex, arXiv, Semantic Scholar, and Brave before writing to inject… |
| 2026-02-07 02:09:05 | github | commit |  | Rename platform subtitle, Ask Topic button, and show article titles - "AI-Powered Publication Platform" → "Autonomous Research Platform" -… |
| 2026-02-07 01:58:16 | github | commit |  | Exclude generated reports from git, each server maintains its own Add web/articles/ and web/data/ to .gitignore and untrack existing 66 rep… |
| 2026-02-07 01:55:44 | github | commit |  | Update API docs: add key management endpoints, fix health check path Add Key Management section documenting GET/POST/DELETE /api/admin/keys… |
| 2026-02-07 01:53:14 | github | commit |  | Add single-server static serving and dynamic API key management Mount web/ via StaticFiles so API + frontend are served from one process. A… |
| 2026-02-07 01:10:24 | github | commit |  | Add admin-only workflow deletion with RESEARCH_ADMIN_KEY auth Adds admin key concept (RESEARCH_ADMIN_KEY env var) separate from regular API… |
| 2026-02-07 01:02:05 | github | commit |  | Rename create-report to ask-topic for consistent naming - Rename create-report.html → ask-topic.html - Update page title and subtitle to "A… |
| 2026-02-07 00:55:20 | github | commit |  | Apply IBM Carbon theme consistency, expand categories to 9 fields, add theme rules - Fix border-radius across create-report.html (~19 selec… |
| 2026-02-07 00:39:18 | github | commit |  | Move real ZKP proof tests to Node.js for actual proof generation snarkjs worker threads are incompatible with Bun, so real Groth16 proof ge… |
| 2026-02-07 00:22:28 | github | commit |  | Add desk reject (editor screening) phase before peer review Insert lightweight desk screening step using claude-haiku-4 between manuscript… |
| 2026-02-06 18:52:01 | github | commit |  | Add MACI voting system with real ZKP proof generation - MACI crypto: key generation, message encryption, Poseidon hashing - Coordinator: st… |
| 2026-02-06 18:24:44 | github | commit |  | Add job queue, API key auth, rate limiting, direct submission, and API docs - Replace BackgroundTasks with asyncio.Queue + single worker fo… |
| 2026-02-06 17:45:55 | github | commit |  | Implement new collaborative workflow with research cycles and plan feedback ## Frontend - create-report.html: Redesigned with 3-step flow (… |
| 2026-02-06 16:12:11 | github | commit |  | Rebrand to Autonomous Research Press + add interrupted workflow support - Rebrand from "AI-Backed Research" to "Autonomous Research Press"… |
| 2026-02-06 11:04:42 | github | commit |  | Workflow resumed successfully: AI + Crypto paper completed Round 3 Results: - Round 1: 5.9/10 → MAJOR_REVISION - Round 2: 7.1/10 → MINOR_RE… |
| 2026-02-06 11:01:02.877000 | slack | message |  | tokamak-dev |
| 2026-02-06 10:46:51 | github | commit |  | Fix division by zero in resume workflow Problem: update_workflow_status was receiving total_rounds=0 which caused division by zero when cal… |
| 2026-02-06 10:29:44 | github | commit |  | Add checkpoint/resume system for interrupted workflows 1. Orchestrator: - _save_checkpoint(): Save state after each round - resume_from_che… |
| 2026-02-06 09:14:37.195000 | slack | message |  | ai-tokamak-network |
| 2026-02-06 07:38:42 | github | commit |  | Add debug logging for rejected section - Log workflow counts in console - Add null checks for rejected workflows - Debug rejected button vi… |
| 2026-02-06 07:12:50 | github | commit |  | Rebrand to Automated Research Lab Changed from "Quantitative Blockchain Research" to broader positioning: 1. Hero Section: - Title: "Automa… |
| 2026-02-06 06:52:12 | github | commit |  | Improve research queue: time tracking and rejected section 1. Research Queue UI: - Add collapsible rejected papers section - Split workflow… |
| 2026-02-06 06:43:11 | github | commit |  | Update favicon to academic journal style Changed from AI brain/neural network to minimalist serif "R": - Clean white background with subtle… |
| 2026-02-06 06:32:30 | github | commit |  | Clean up old rejected reports Removed all reports generated with the old single-shot system: - Deleted 18 article HTML files - Deleted 34 p… |
| 2026-02-06 05:54:36 | github | commit |  | Add comprehensive implementation summary 완료된 작업: ✅ Editorial Judgment + Author Rebuttal (TESTED, WORKING) ✅ Multi-Stage Writing (TESTED, WO… |
| 2026-02-06 05:41:39 | github | commit |  | Fix JSON parsing in DataAnalysisAgent with fallback |
| 2026-02-06 05:30:38 | github | commit |  | Implement Research Notes → Paper Writing Workflow 실제 과학자 프로세스 구현: **Phase 1: Research & Notes (raw, unpolished)** - ResearchNotesAgent: 문헌… |
| 2026-02-06 05:07:27 | github | commit |  | Implement Multi-Stage Writing System (Phase 1) Foundation for section-by-section research paper writing: **New Components:** - ResearchPlan… |
| 2026-02-06 04:43:10 | github | commit |  | Implement Author Rebuttal workflow (Option 2) - Add write_rebuttal() method to WriterAgent - Generate author rebuttal after each round's mo… |
| 2026-02-06 02:10:19.439000 | slack | message |  | project-eco |
| 2026-02-06 01:44:49 | github | commit |  | Fix syntax error: close system_prompt string |
| 2026-02-06 01:15:53 | github | commit |  | Implement Editorial Judgment: Allow moderator to exercise discretion beyond scores - Remove hard-coded score thresholds (was: >=8.0 ACCEPT,… |
| 2026-02-05 16:47:48 | github | commit |  | Use journal paper process: Accepted/Rejected status labels |
| 2026-02-05 16:32:31 | github | commit |  | Remove hardcoded articles, load all dynamically Replaced 300+ lines of hardcoded HTML with dynamic loading. Now shows top 6 most recent com… |
| 2026-02-05 16:27:51 | github | commit |  | Make index.html load articles dynamically from index.json Previously index.html showed only 4 hardcoded articles. Now it loads all complete… |
| 2026-02-05 15:54:10 | github | commit |  | Increase writer max_tokens to 16384 (Claude Opus max) Fix truncated manuscripts by removing artificial token limit. - Previous: 8000 tokens… |
| 2026-02-05 15:28:27.035000 | slack | message |  | tokamak-dev |
| 2026-02-05 15:04:17 | github | commit |  | Add reviewer context from previous rounds and fix workflow loading 1. Reviewer Context Enhancement: - Pass previous reviews to each reviewe… |
| 2026-02-05 14:50:56 | github | commit |  | Add UI design for MACI + Fraud Proof voting system New user flows: - Voter: Key generation → Vote → Key change (bribery defense) - Coordina… |
| 2026-02-05 14:45:03 | github | commit |  | Fix research-queue 404 errors and data loading - Update research-queue.html to read from web/data/index.json - Create index.json with corre… |
| 2026-02-05 14:43:51 | github | commit |  | Add MACI + Fraud Proof design and implementation plan Design decision: Use MACI-style key change mechanism with optimistic fraud proof appr… |
| 2026-02-05 14:34:45.129000 | slack | message |  | tokamak-dev |
| 2026-02-05 14:31:01 | github | commit |  | Fix CostEstimate definition order in API server Move CostEstimate class definition before TeamProposalResponse to fix NameError. Co-Authore… |
| 2026-02-05 07:02:55 | github | commit |  | Add complete backend infrastructure and research results Backend Infrastructure: - research_cli/: Complete CLI application with agents, LLM… |
| 2026-02-05 06:56:26 | github | commit |  | Initial Overleaf Import |
| 2026-02-05 06:44:05 | github | commit |  | Add comprehensive workflow visualization and analytics (Phase 1 & 2) Implemented advanced workflow monitoring and team management features:… |
| 2026-02-05 05:59:03.291000 | slack | message |  | tokamak-dev |
| 2026-02-04 08:35:49.985000 | slack | message |  | project-eco |
| 2026-02-04 01:38:22.665000 | slack | message |  | tokamak-dev |
| 2026-02-04 01:07:57.427000 | slack | message |  | project-drb |
| 2026-02-03 04:45:10 | github | commit |  | Update favicon to AI brain design and make header more compact - Replace lightning bolt favicon with AI brain featuring neural network conn… |
| 2026-02-03 04:09:22 | github | commit |  | Add favicon with lightning bolt design Added favicon for browser tab display. Favicon design: - Lightning bolt icon (⚡) on blue gradient ba… |
| 2026-02-03 03:47:07.749000 | slack | message |  | project-eco |
| 2026-02-03 03:38:04 | github | commit |  | Fix thumbnail display and smart header behavior Fixed thumbnail not showing on article cards and improved header UX. Thumbnail fixes: - Reo… |
| 2026-02-03 03:12:32 | github | commit |  | Fix integration test and deployment - Update Deploy.s.sol to use Foundry default accounts - Remove PRIVATE_KEY environment variable require… |
| 2026-02-02 17:14:59 | github | commit |  | Add thumbnails and Vercel deployment configuration Added visual thumbnails and prepared for Vercel deployment. Thumbnails: - Created SVG th… |
| 2026-02-02 15:59:27 | github | commit |  | Fix dark mode: proper background colors and harmonious design Fixed dark mode to properly change all backgrounds and maintain visual harmon… |
| 2026-02-02 15:36:16 | github | commit |  | Add dark mode support with system preference detection Implemented full dark mode with automatic theme detection and manual toggle. Feature… |
| 2026-02-02 13:59:20 | github | commit |  | Move Table of Contents to sidebar for better UX Moved TOC from sticky top navigation to left sidebar for improved reading experience. Chang… |
| 2026-02-02 08:14:40 | github | commit |  | Redesign website as modern research blog with article listing Transformed the website from single-article view to a scalable blog structure… |
| 2026-02-02 05:55:25 | github | commit |  | Update contact email to suhyeon@tokamak.network |
| 2026-02-02 05:52:46.554000 | slack | message |  | project-eco |
| 2026-02-02 05:03:22 | github | commit |  | Add Layer 2 fee structures research report with web presentation This commit adds a comprehensive research report analyzing Layer 2 fee str… |
| 2026-02-02 04:27:42 | github | commit |  | Initial commit |
| 2026-02-02 02:39:34 | github | commit |  | Add forge-std as git submodule Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com> |
| 2026-02-02 02:30:05 | github | commit |  | Add threshold cryptography voting system with anti-bribery mechanisms Implement Phase 1 MVP of secure voting system with the following feat… |
| 2026-02-02 02:29:04.165000 | slack | message |  | tokamak-dev |
| 2026-02-01 15:28:48 | github | commit |  | Initial commit |
| 2026-02-01 06:54:28.404000 | slack | message |  | project-drb |
