# HR Activity Report - Thomas

Records: 630

## By Source
- notion: 285
- github: 269
- drive: 69
- slack: 7

## By Type
- commit: 269
- content_diff: 264
- 접근 권한 변경: 48
- page: 21
- search: 10
- message: 7
- 편집 (2회): 2
- change_owner: 2
- 이동: 2
- 문서 공개 설정 변경: 2
- 편집 (4회): 1
- 편집 (5회): 1
- 편집 (46회): 1

## Key Highlights by Source
**GitHub**
- Top repositories: tokamak-dao-agent, tokamak-dao-v2, dao-action-builder
- Recent commits: feat(web): add agent credibility scoring system Track QOC lens predictions vs actual on-chain outcomes with weighted sc…
**Slack**
- Active channels: project-eco, track-b-demo
- Common themes: https, tokamak-network, github, com, can
**Notion**
- Edited pages: Tokamak DAO Agent, DEMO, Untitled
- Content snippets: ElizaOS는 플러그인 아키텍처로 TEE를 통합합니다. 핵심 플러그인은 @elizaos/ → ElizaOS는 플러그인 아키텍처로 TEE를 통…, 현재 유일하게 지원하는 벤더는 Phala Network → 현재 지원하는 유일한 벤더는 Phala Network입니다, 내부적으로 TappdClient를 사용하여 Phala의 dstack TEE와 통신 → TappdClient를 사용하여 Phala의 dstack…
**Drive**
- Top actions: 접근 권한 변경, search, 편집 (2회)
- Files touched: 2. Weekly DEV Performance(Tokamak Network)_2026 Feb, Unknown, DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13…

## Work Analysis
GitHub activity indicates work centered on feat(web): add agent credibility scoring system Track QOC lens predictions vs actual on-chain outcomes with weighted sc…. Notion edits focus on documentation pages like “Tokamak DAO Agent.” Slack discussions are most active in project-eco, track-b-demo, suggesting ongoing coordination there. Drive activity shows frequent “접근 권한 변경” actions, implying file/asset handling tasks.

## Records (latest first)
| timestamp | source | type | action | title |
|---|---|---|---|---|
| 2026-02-19 12:29:38 | github | commit |  | feat(web): add agent credibility scoring system Track QOC lens predictions vs actual on-chain outcomes with weighted scoring (high-confiden… |
| 2026-02-19 12:29:30 | github | commit |  | feat(web): add on-chain agenda sync with QOC auto-evaluation Poll DAOAgendaManager.numAgendas() every 5 minutes, import new agendas into th… |
| 2026-02-19 12:29:21 | github | commit |  | feat(client): add ElizaOS agent management UI and proxy router Add ElizaOSContext for polling agent status, ElizaAgentCard component with s… |
| 2026-02-19 12:29:12 | github | commit |  | feat(tools): add check_upgrade_path for DAO upgrade verification Verifies on-chain whether a Tokamak proxy can be upgraded by the DAO, chec… |
| 2026-02-19 12:19:13 | github | commit |  | refactor(qoc): replace persona-based agents with criterion-based architecture 4 persona agents × 7 criteria → 7 criterion agents × 1 criter… |
| 2026-02-19 11:43:40 | github | commit |  | docs: consolidate ElizaOS guide into root README Merge elizaos/README.md into the main README to provide a single documentation entry point… |
| 2026-02-19 07:39:19 | github | commit |  | fix: resolve all ESLint warnings in build Remove unused variables, imports, and components across 13 files. Suppress unavoidable no-img-ele… |
| 2026-02-19 07:25:52 | github | commit |  | refactor(nav): replace airdrop simulator with external URL Remove internal airdrop simulator implementation and redirect the "vTON Airdrop"… |
| 2026-02-19 07:07:36 | github | commit |  | feat(airdrop): add scoring engine, API, and docs Re-introduce airdrop scoring with sqrt-weighted allocation across staking amount, duration… |
| 2026-02-19 07:07:04 | github | commit |  | fix(ui): default staker list view to All Depositors The Stakers count card was showing the Net Positive count (56) on initial load. Changin… |
| 2026-02-19 06:33:29 | github | commit |  | revert(airdrop): remove scoring engine and simulation UI Remove all airdrop distribution logic, API route, UI components, types, and tests.… |
| 2026-02-19 06:28:13 | github | commit |  | feat(airdrop): add weighted scoring engine and simulation UI Implement 3-criteria airdrop distribution: staking amount, staking duration, a… |
| 2026-02-19 06:02:28 | github | commit |  | feat(sc-simulator): add ClassificationCriteria component and criteria tags Add collapsible component showing classification criteria explan… |
| 2026-02-19 06:02:23 | github | commit |  | refactor(sc-simulator): simplify PathComparisonCard to compact layout Refactor from two separate Cards to a single Card with side-by-side c… |
| 2026-02-19 06:02:18 | github | commit |  | feat(sc-simulator): add criteria-based classification rules Add CriteriaTag type and criteria field to ClassifiedFunction, with rule-based… |
| 2026-02-19 05:56:44 | github | commit |  | feat(seigniorage): add on-chain stakeOf multicall and seigniorage calculation Integrate SeigManager.stakeOf via viem multicall to compute s… |
| 2026-02-19 05:05:17 | github | commit |  | refactor(sc-simulator): simplify SC action simulator to flat function list Replace grouped contract sections with a flat list showing inlin… |
| 2026-02-19 05:04:48 | github | commit |  | feat(nav): add simulator dropdown to navigation Replace single Simulator nav link with a dropdown showing three sub-pages (vTON Issuance, v… |
| 2026-02-19 05:04:38 | github | commit |  | feat(simulation): add vTON airdrop simulator Add airdrop distribution simulation with staker data from subgraph, configurable parameters, d… |
| 2026-02-19 05:04:29 | github | commit |  | feat(sc-simulator): add SC action path classification simulator Add interactive simulator for exploring Security Council action governance… |
| 2026-02-18 15:19:54 | github | commit |  | feat(client): add agenda form, validation panel, opinion request UI - AgendaFormView for creating new agendas from the UI - AgendaEditView… |
| 2026-02-18 15:19:46 | github | commit |  | feat(api): add validation and opinion request endpoints - POST /agenda now creates as pending_review with auto-validation - GET /agenda/:id… |
| 2026-02-18 15:15:00 | github | commit |  | feat(forum): add single agent opinion generation Export getActiveAgents() and add generateSingleAgentOpinion() for requesting opinions from… |
| 2026-02-18 15:14:51 | github | commit |  | feat(forum): add 3 validation agents for agenda review Format, relevance, and feasibility validators run in parallel on agenda creation. Al… |
| 2026-02-18 15:14:42 | github | commit |  | feat(db): add validations table and extend agenda lifecycle - Add validations table with unique index on (agenda_id, validator_type) - Exte… |
| 2026-02-18 15:14:32 | github | commit |  | fix(openai): skip empty tools array in streaming requests Some OpenAI-compatible proxies (e.g., LiteLLM) hang when receiving tools: [] inst… |
| 2026-02-18 14:13:25 | github | commit |  | refactor(web): remove /app prefix from URL paths Move Forum API to /api/forum/* to resolve path collision with SPA routes. Client-side path… |
| 2026-02-18 14:05:26 | github | commit |  | feat(elizaos): enrich foundation agent with vTON governance and Economics V2 knowledge Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.c… |
| 2026-02-18 14:01:03 | github | commit |  | feat: switch to English default and add forum translate button - Translate all 4 ElizaOS character files (bio/knowledge/style) from Korean… |
| 2026-02-18 13:59:21 | github | commit |  | fix(web): fix forum detail crash and URL normalization for sub-routes - Handle object priorities in OpinionCard (prioritiesJson may contain… |
| 2026-02-18 13:50:09 | github | commit |  | feat(web): add URL routing for tab navigation and forum detail Skip boot splash on non-chat tabs, sync tab state with browser history (push… |
| 2026-02-18 13:30:51 | github | commit |  | chore: add ElizaOS deps and mcp:sse script Add @elizaos/plugin-anthropic and @fleek-platform/eliza-plugin-mcp to root dependencies. Add mcp… |
| 2026-02-18 13:30:43 | github | commit |  | feat(elizaos): add forum webhook plugin and setup guide Add tokamak-forum plugin that receives new-agenda webhooks, analyzes them via MCP t… |
| 2026-02-18 13:30:27 | github | commit |  | feat(elizaos): add 4 stakeholder persona characters Create ElizaOS character files for TON Holder (progressive), L2 Operator (conservative)… |
| 2026-02-18 13:30:19 | github | commit |  | feat(forum): add pending-agendas polling endpoint GET /forum/agent/:agentName/pending-agendas returns open agendas that the named agent has… |
| 2026-02-18 13:30:10 | github | commit |  | feat(mcp): add SSE transport server for ElizaOS Bridge the stdio MCP server to SSE on port 3001, enabling ElizaOS agents to connect via @el… |
| 2026-02-18 13:30:01 | github | commit |  | feat(mcp): add Streamable HTTP endpoint to web server Expose the 14 MCP tools via /mcp on the existing Hono server (port 3333) using statel… |
| 2026-02-18 11:25:12 | github | commit |  | feat(forum): add Forum tab frontend with agenda grid and AI opinion cards Connects to the existing SQLite-backed forum REST API to display… |
| 2026-02-17 15:43:47 | github | commit |  | feat(agents): unify agent systems with SQLite persistence Replace localStorage-only agents with SQLite-backed CRUD API. User-created agents… |
| 2026-02-17 15:22:23 | github | commit |  | feat(forum): auto-generate AI agent opinions on agenda creation 4 stakeholder agents (ton_holder, layer2_operator, validator, foundation) a… |
| 2026-02-17 15:10:48 | github | commit |  | feat(forum): add SQLite-backed forum REST API with 8 endpoints Implement Phase 1 of the forum system: bun:sqlite persistent storage and Hon… |
| 2026-02-17 07:11:57 | github | commit |  | feat(interfaces): add IProxyActionComplete for proxy management ABIs Enables full calldata decoding for proxy management functions (upgrade… |
| 2026-02-17 04:51:31 | github | commit |  | fix(tools): correct DAOAgendaManager ABI in analyze_agenda The inline agendas() ABI had wrong field order — executed:bool at index 2 where… |
| 2026-02-17 03:29:28 | github | commit |  | fix(deploy): remove nonexistent agendas.json from Dockerfile Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com> |
| 2026-02-17 03:19:10 | github | commit |  | feat(deploy): replace Railway with Fly.io configuration Railway trial expired. Switch to Fly.io with nrt region, auto-stop/start machines,… |
| 2026-02-17 03:16:36 | github | commit |  | feat(api): add tools count and uptime to health endpoint Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com> |
| 2026-02-17 03:16:32 | github | commit |  | feat(deploy): add Dockerfile and Railway configuration Multi-stage Bun build: Vite client in stage 1, runtime with Foundry in stage 2. Incl… |
| 2026-02-17 03:13:35 | github | commit |  | feat(deploy): add static file serving and SPA routing Serve built Vite output from Hono so a single `bun run start` command handles both AP… |
| 2026-02-16 02:57:33 | github | commit |  | fix(config): resolve agentlinter criticals and add hardening - Add Identity section defining agent persona and tone - Replace vague conditi… |
| 2026-02-16 02:57:26 | github | commit |  | feat(prompt): add scope guard for out-of-scope questions Prevent generic blockchain textbook answers when users ask about concepts or contr… |
| 2026-02-16 02:57:20 | github | commit |  | feat(tools): enrich addresses with contract names and warn on implementation reads - Add enrichAddress() utility to resolve raw addresses t… |
| 2026-02-15 16:07:21 | github | commit |  | feat: add presentation page Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com> |
| 2026-02-15 16:07:16 | github | commit |  | feat(config): switch to LiteLLM/OpenAI defaults with mode-specific models - Change default provider from Anthropic to OpenAI/LiteLLM-compat… |
| 2026-02-15 16:07:09 | github | commit |  | refactor(ui): update stakeholder types and rename Make Proposal to Generate Calldata - Replace dao_committee/community_member with validato… |
| 2026-02-15 16:07:00 | github | commit |  | feat(storage): add SeigManagerV1_3 storage layout Identical to V1_2 layout (same inheritance chain), verified via slot comparison of key fi… |
| 2026-02-15 16:06:55 | github | commit |  | test: add Layer2 registration fork test Test Layer2 candidate registration flow through CandidateFactory and Layer2Registry with deposit an… |
| 2026-02-15 16:06:49 | github | commit |  | test: add DAO governance fork tests - AgendaSimulation: test agenda creation and execution flow - DAOCommitteeRouting: verify selector-base… |
| 2026-02-15 16:06:42 | github | commit |  | feat(tools): enhance fork-test with glob conversion, env vars, and result clarity - Auto-convert glob wildcards (*) to regex (.*) for forge… |
| 2026-02-15 16:06:34 | github | commit |  | feat(interfaces): add complete Solidity interfaces for 8 core contracts Add comprehensive interfaces combining all function signatures for:… |
| 2026-02-15 16:06:28 | github | commit |  | docs: update contract-map with DAOCommittee and proxy investigation results - Document DAOCommittee slot0/slot1 routing architecture with f… |
| 2026-02-15 16:06:21 | github | commit |  | fix(contracts): fill missing proxy implementations and add IComplete interface pattern - Add implementation addresses for CandidateFactoryP… |
| 2026-02-15 16:06:12 | github | commit |  | feat(contracts): add DAOCommittee current implementation sources from Etherscan Fetched and saved verified Solidity sources for the two act… |
| 2026-02-13 08:56:49 | github | commit |  | feat(web): add provider selection and attestation UI Add simulator/dstack provider toggle to boot step, remote attestation act (generate +… |
| 2026-02-13 08:56:43 | github | commit |  | feat(api-server): wire dstack provider into tee-bridge Add dstack case with dynamic import to createTeeServices() switch, add @akm/tee-dsta… |
| 2026-02-13 08:56:39 | github | commit |  | feat(tee-dstack): add Phala dstack TEE runtime Implement DstackRuntime backed by @phala/dstack-sdk (TappdClient) for Intel TDX hardware TEE… |
| 2026-02-13T08:31:00.000Z | notion | content_diff |  | ElizaOS TEE |
| 2026-02-13T08:31:00.000Z | notion | content_diff |  | ElizaOS TEE |
| 2026-02-13T08:30:00.000Z | notion | content_diff |  | ElizaOS TEE |
| 2026-02-13 08:30:00 | notion | page |  | ElizaOS TEE |
| 2026-02-13 08:21:15 | github | commit |  | feat(web): add interactive web demo for TEE KMS Serve a single-page UI at localhost:3000 with 5 sequential acts: boot TEE, init root key, c… |
| 2026-02-13 06:58:31 | github | commit |  | chore: ignore presentation.html Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com> |
| 2026-02-13 06:26:12 | github | commit |  | feat(demo,tests): add demo scenarios, integration and E2E tests - 4 demo scenarios: basic signing, policy enforcement, key rotation, attest… |
| 2026-02-13 06:25:59 | github | commit |  | feat(api-server): add Hono REST API with TEE bridge - TEE bridge factory (simulator/dstack/nitro selection) - Routes: /keys, /sign, /policy… |
| 2026-02-13 06:25:48 | github | commit |  | feat(kms): add Key Management Service with viem signer - Root key generation sealed in TEE storage - HKDF-SHA256 hierarchical key derivatio… |
| 2026-02-13 06:25:36 | github | commit |  | feat(policy,attestation): add policy engine and attestation verifier - policy-engine: rule evaluation engine with caller, spending limit, r… |
| 2026-02-13 06:25:22 | github | commit |  | feat(tee): add TEE abstract interfaces and simulated runtime - tee-core: ITeeRuntime, ISealedStorage, IAttestationProvider interfaces - tee… |
| 2026-02-13 06:25:11 | github | commit |  | feat(types): add shared type definitions Define all core types for TEE key management: KeyId, KeyMetadata, PolicyRule, AttestationReport, T… |
| 2026-02-13T06:22:00.000Z | notion | content_diff |  | AI 에이전트의 지갑은 어떻게 보호되는가: TEE 기반 키 관리의 원리와 실제 |
| 2026-02-13T06:21:00.000Z | notion | content_diff |  | AI 에이전트의 지갑은 어떻게 보호되는가: TEE 기반 키 관리의 원리와 실제 |
| 2026-02-13T06:20:00.000Z | notion | content_diff |  | AI 에이전트의 지갑은 어떻게 보호되는가: TEE 기반 키 관리의 원리와 실제 |
| 2026-02-13T06:18:00.000Z | notion | content_diff |  | AI 에이전트의 지갑은 어떻게 보호되는가: TEE 기반 키 관리의 원리와 실제 |
| 2026-02-13T06:17:00.000Z | notion | content_diff |  | AI 에이전트의 지갑은 어떻게 보호되는가: TEE 기반 키 관리의 원리와 실제 |
| 2026-02-13 06:16:00 | notion | page |  | AI 에이전트의 지갑은 어떻게 보호되는가: TEE 기반 키 관리의 원리와 실제 |
| 2026-02-13T06:08:00.000Z | notion | content_diff |  | 2026-02-13 |
| 2026-02-13T06:07:00.000Z | notion | content_diff |  | 2026-02-13 |
| 2026-02-13T06:07:00.000Z | notion | content_diff |  | 2026-02-13 |
| 2026-02-13 06:04:23 | github | commit |  | chore: initialize monorepo structure |
| 2026-02-13T06:04:00.000Z | notion | content_diff |  | 2026-02-13 |
| 2026-02-13T05:57:00.000Z | notion | content_diff |  | 2026-02-13 |
| 2026-02-13T05:40:00.000Z | notion | content_diff |  | 2026-02-13 |
| 2026-02-13T05:29:00.000Z | notion | content_diff |  | 2026-02-13 |
| 2026-02-13T05:27:00.000Z | notion | content_diff |  | 2026-02-13 |
| 2026-02-13T05:23:00.000Z | notion | content_diff |  | 2026-02-13 |
| 2026-02-13T05:22:00.000Z | notion | content_diff |  | 2026-02-13 |
| 2026-02-13T05:21:00.000Z | notion | content_diff |  | 2026-02-13 |
| 2026-02-13T05:20:00.000Z | notion | content_diff |  | 2026-02-13 |
| 2026-02-13 05:19:00 | notion | page |  | 2026-02-13 |
| 2026-02-13 03:20:55 | github | commit |  | fix(on-chain): add proxy-aware ABI name resolution to query_on_chain For proxy contracts, also try the implementation's name and base name.… |
| 2026-02-13 03:20:49 | github | commit |  | fix(abis): add subdirectory fallback search to loadAbi When contracts/out/{Name}.sol/{Name}.json doesn't exist, search all subdirectories f… |
| 2026-02-13 03:20:43 | github | commit |  | fix(contracts): add name-based proxy fallback to resolveCallAddress When an implementation's address doesn't match any proxy's implementati… |
| 2026-02-13 03:20:37 | github | commit |  | test: add StorageVerify fork test with ISeigManagerFull interface Diagnoses daoSeigRate storage slot on SeigManagerProxy by comparing funct… |
| 2026-02-12 05:38:26 | github | commit |  | fix(ui): align user chat bubbles correctly in Make Proposal tab Replace wrapper <div> with <React.Fragment> so ChatBubble remains a direct… |
| 2026-02-12 05:36:45 | github | commit |  | refactor: translate all Korean text to English in prompts and UI Converts all Korean strings to English across system prompts, example flow… |
| 2026-02-12 05:29:35 | github | commit |  | docs(prompt): clarify DAOCommitteeProxy sender in analyze_proposal prompt Updates ANALYZE_PROPOSAL_PROMPT to mention that analyze_agenda si… |
| 2026-02-12 05:29:30 | github | commit |  | feat(tools): register analyze_agenda in MCP server Adds registerAnalysisTool call in registerAllTools() so the analyze_agenda tool is avail… |
| 2026-02-12 05:29:25 | github | commit |  | feat(tools): register analyze_agenda in web handler Adds analyze_agenda tool definition, ToolArgsMap entry, and executeTool switch case in… |
| 2026-02-12 05:29:19 | github | commit |  | feat(tools): add analyze_agenda tool with DAO registry ABI decoding Implements comprehensive DAO agenda analysis: calldata decoding, simula… |
| 2026-02-12 04:32:29 | github | commit |  | feat(tools): add dynamic DEX discovery and web_fetch tool Support any DEX via router_address param instead of only hardcoded registry. Add… |
| 2026-02-12 03:48:04 | github | commit |  | refactor: remove verify_token_compatibility in favor of run_fork_test The verify_token_compatibility tool was an unreliable eth_call-based… |
| 2026-02-12 03:08:18 | github | commit |  | refactor(verification): replace hardcoded DEX registry with dynamic router input Agent now discovers DEX router addresses via web search an… |
| 2026-02-12T03:04:00.000Z | notion | content_diff |  | DAO Agent |
| 2026-02-12T02:50:00.000Z | notion | content_diff |  | DAO Agent |
| 2026-02-12T02:48:00.000Z | notion | content_diff |  | DAO Agent |
| 2026-02-12T02:43:00.000Z | notion | content_diff |  | DAO Agent |
| 2026-02-12T02:41:00.000Z | notion | content_diff |  | DAO Agent |
| 2026-02-12T02:36:00.000Z | notion | content_diff |  | DAO Agent |
| 2026-02-12T02:35:00.000Z | notion | content_diff |  | DAO Agent |
| 2026-02-12T02:32:00.000Z | notion | content_diff |  | DAO Agent |
| 2026-02-12 02:32:00 | notion | page |  | DAO Agent |
| 2026-02-12 02:25:15 | github | commit |  | docs: add protocol parameters reference and remove simulator report Add docs/protocol-parameters.md listing all DAO protocol settings (emis… |
| 2026-02-12T02:09:00.000Z | notion | content_diff |  | Tokamak DAO V2 |
| 2026-02-12T02:06:00.000Z | notion | content_diff |  | Tokamak DAO V2 |
| 2026-02-11 07:49:01.800000 | drive | 편집 (4회) | 편집 (4회) | 2. Weekly DEV Performance(Tokamak Network)_2026 Feb |
| 2026-02-11 07:43:45.458000 | drive | search | search | Unknown |
| 2026-02-11 07:43:40.280000 | drive | search | search | Unknown |
| 2026-02-11 07:24:23 | github | commit |  | feat(simulation): add epoch time estimates to halving schedule table Calculate estimated time to reach each epoch based on configurable sei… |
| 2026-02-11T07:18:00.000Z | notion | content_diff |  | Tokamak DAO V2 |
| 2026-02-11T07:15:00.000Z | notion | content_diff |  | Tokamak DAO V2 |
| 2026-02-11T07:15:00.000Z | notion | content_diff |  | Tokamak DAO V2 |
| 2026-02-11T07:14:00.000Z | notion | content_diff |  | Tokamak DAO V2 |
| 2026-02-11T07:13:00.000Z | notion | content_diff |  | Tokamak DAO V2 |
| 2026-02-11T07:12:00.000Z | notion | content_diff |  | Tokamak DAO V2 |
| 2026-02-11 06:51:07 | github | commit |  | fix(simulation): clarify mint table column labels |
| 2026-02-11 04:46:12 | github | commit |  | chore: update generate-changelog command Add rule to not include Diff view links in version table. Co-Authored-By: Claude Opus 4.6 <noreply… |
| 2026-02-11 04:46:06 | github | commit |  | chore: remove obsolete sandbox architecture doc Sandbox architecture is now documented in MEMORY.md and codebase comments. Co-Authored-By:… |
| 2026-02-11 04:45:59 | github | commit |  | docs: add spec v0.1.2 and simulator report Add specification v0.1.2 with halving mechanism changes and vTON issuance simulator design/imple… |
| 2026-02-11 04:45:53 | github | commit |  | feat: add vTON issuance simulator Add interactive simulator page for visualizing the halving mechanism. Includes epoch table, supply charts… |
| 2026-02-11 04:45:46 | github | commit |  | feat(frontend): add vTON halving metrics to dashboard Add useCurrentEpoch, useHalvingRatio, useMaxSupply hooks and display halving ratio an… |
| 2026-02-11 04:45:39 | github | commit |  | feat(contracts): add halving mechanism to vTON Replace infinite issuance with max supply cap (100M vTON) and epoch-based halving mechanism.… |
| 2026-02-11 04:41:36 | github | commit |  | docs: update CLAUDE.md, README, and system prompt for tool changes Reflect removal of fetch_agenda (11→10 tools), add new fork test entries… |
| 2026-02-11 04:41:30 | github | commit |  | docs: add contract relationship map and knowledge gaps analysis - contract-map.md: Full contract relationship diagram and analysis - contra… |
| 2026-02-11 04:41:24 | github | commit |  | data: enrich contracts.json with implementation addresses and descriptions - Add actual implementation addresses for SeigManagerProxy, L1Br… |
| 2026-02-11 04:41:17 | github | commit |  | refactor: remove fetch_agenda tool and agendas.json cache The fetch_agenda tool with its local JSON cache is replaced by query_on_chain whi… |
| 2026-02-11 04:41:10 | github | commit |  | test: add fork tests for staking, seigniorage, and approveAndCall Add four new Foundry fork test files to verify on-chain behavior: - Staki… |
| 2026-02-11T04:15:00.000Z | notion | content_diff |  | Tokamak DAO V2 |
| 2026-02-11T03:24:00.000Z | notion | content_diff |  | Tokamak DAO Agent |
| 2026-02-11T03:23:00.000Z | notion | content_diff |  | Tokamak DAO Agent |
| 2026-02-11T03:22:00.000Z | notion | content_diff |  | Tokamak DAO Agent |
| 2026-02-11T03:21:00.000Z | notion | content_diff |  | Tokamak DAO Agent |
| 2026-02-11T03:20:00.000Z | notion | content_diff |  | Tokamak DAO Agent |
| 2026-02-11T03:18:00.000Z | notion | content_diff |  | Tokamak DAO Agent |
| 2026-02-11T03:17:00.000Z | notion | content_diff |  | Tokamak DAO Agent |
| 2026-02-11T03:11:00.000Z | notion | content_diff |  | Tokamak DAO Agent |
| 2026-02-11T03:10:00.000Z | notion | content_diff |  | Tokamak DAO Agent |
| 2026-02-11T03:09:00.000Z | notion | content_diff |  | Tokamak DAO Agent |
| 2026-02-11T03:08:00.000Z | notion | content_diff |  | Tokamak DAO Agent |
| 2026-02-11T03:07:00.000Z | notion | content_diff |  | Tokamak DAO Agent |
| 2026-02-11T03:03:00.000Z | notion | content_diff |  | Tokamak DAO Agent |
| 2026-02-11T03:01:00.000Z | notion | content_diff |  | Tokamak DAO Agent |
| 2026-02-11T02:57:00.000Z | notion | content_diff |  | Tokamak DAO Agent |
| 2026-02-11T02:52:00.000Z | notion | content_diff |  | Tokamak DAO V2 |
| 2026-02-11T02:52:00.000Z | notion | content_diff |  | 2026-02-11 |
| 2026-02-11T02:48:00.000Z | notion | content_diff |  | Tokamak DAO V2 |
| 2026-02-11T02:47:00.000Z | notion | content_diff |  | Tokamak DAO V2 |
| 2026-02-11T02:46:00.000Z | notion | content_diff |  | 2026-02-11 |
| 2026-02-11T02:46:00.000Z | notion | content_diff |  | Tokamak DAO Agent |
| 2026-02-11 02:46:00 | notion | page |  | Tokamak DAO V2 |
| 2026-02-11 02:46:00 | notion | page |  | Tokamak DAO Agent |
| 2026-02-11T02:45:00.000Z | notion | content_diff |  | 2026-02-11 |
| 2026-02-11T02:44:00.000Z | notion | content_diff |  | 2026-02-11 |
| 2026-02-11T02:41:00.000Z | notion | content_diff |  | 2026-02-11 |
| 2026-02-11T02:40:00.000Z | notion | content_diff |  | 2026-02-11 |
| 2026-02-11T02:39:00.000Z | notion | content_diff |  | 2026-02-11 |
| 2026-02-11T02:38:00.000Z | notion | content_diff |  | 2026-02-11 |
| 2026-02-11 02:36:00 | notion | page |  | 2026-02-11 |
| 2026-02-10 10:48:34 | github | commit |  | style(ui): improve event table layout with auto column widths Replace fixed colgroup percentages with whitespace-nowrap to prevent text wra… |
| 2026-02-10 10:48:11 | github | commit |  | fix(subgraph): restore totalTransactions counter in staking handlers The counter was lost when TON/TOS/governance data sources were removed… |
| 2026-02-10 10:23:39 | github | commit |  | chore: ignore root generated/ directory Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com> |
| 2026-02-10 10:21:22 | github | commit |  | refactor(subgraph): keep only DepositManager, remove unused data sources Remove TON, TOS, DAOCommittee indexing and related schema entities… |
| 2026-02-10 10:08:49 | github | commit |  | docs: replace boilerplate README with project documentation Cover project overview, tech stack, setup instructions, project structure, subg… |
| 2026-02-10 09:59:53 | github | commit |  | style: redesign UI with standard shadcn theme and improve readability Apply default shadcn/ui zinc color palette, add shadcn components (sk… |
| 2026-02-10T08:54:00.000Z | notion | content_diff |  | Untitled |
| 2026-02-10T08:53:00.000Z | notion | content_diff |  | Tokamak DAO Agent |
| 2026-02-10 08:53:00 | notion | page |  | 303d96a4-00a3-807f-af27-d4478b25c603 |
| 2026-02-10 07:11:11 | github | commit |  | feat: add staker lookup UI with filter, results table, and CSV export - StakerFilter: date range picker and minimum WTON amount input - Sta… |
| 2026-02-10 07:10:58 | github | commit |  | feat: add staker lookup API with GraphQL queries and mock data - Types: StakerFilter, StakerResult, StakerLookupResponse - GraphQL query: f… |
| 2026-02-10 07:10:46 | github | commit |  | feat: add subgraph for DepositManager V1 and V2 - Track DepositManager V1 (0x56E4, block 10837675) and V2 proxy (0x0b58, block 18416838) on… |
| 2026-02-10 07:10:31 | github | commit |  | chore: initialize Next.js project with dependencies and UI primitives - Next.js 16, React 19, TypeScript 5, Tailwind CSS 4 - Shadcn UI comp… |
| 2026-02-10T06:58:00.000Z | notion | content_diff |  | Tokamak DAO Agent |
| 2026-02-10T06:57:00.000Z | notion | content_diff |  | Tokamak DAO Agent |
| 2026-02-10 06:23:43 | github | commit |  | fix(web): resolve tool status stuck in running state Use tool_id for matching tool_result to tool_use events instead of name-only matching,… |
| 2026-02-10 06:23:25 | github | commit |  | feat(web): add multi-provider support with model selector Add pluggable provider system supporting Anthropic and OpenAI-compatible APIs. In… |
| 2026-02-10 05:24:50 | github | commit |  | docs: fix README to match actual codebase - Correct contract count from 44 to 42 - Add missing env vars (ANTHROPIC_BASE_URL, ANTHROPIC_MODE… |
| 2026-02-10T05:18:00.000Z | notion | content_diff |  | Tokamak DAO Agent |
| 2026-02-10 04:52:46 | github | commit |  | chore: add package-lock.json Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com> |
| 2026-02-10T04:48:00.000Z | notion | content_diff |  | B-2 |
| 2026-02-10T04:40:00.000Z | notion | content_diff |  | B-2 |
| 2026-02-10T04:39:00.000Z | notion | content_diff |  | B-2 |
| 2026-02-10T04:37:00.000Z | notion | content_diff |  | B-2 |
| 2026-02-10T04:36:00.000Z | notion | content_diff |  | B-2 |
| 2026-02-10T04:35:00.000Z | notion | content_diff |  | B-2 |
| 2026-02-10T04:34:00.000Z | notion | content_diff |  | B-2 |
| 2026-02-10T04:33:00.000Z | notion | content_diff |  | B-2 |
| 2026-02-10 04:33:00 | notion | page |  | Tokamak DAO Agent |
| 2026-02-10T04:18:00.000Z | notion | content_diff |  | A-2 |
| 2026-02-10T04:18:00.000Z | notion | content_diff |  | A-2 |
| 2026-02-10T04:17:00.000Z | notion | content_diff |  | A-2 |
| 2026-02-10T04:16:00.000Z | notion | content_diff |  | A-2 |
| 2026-02-10T04:11:00.000Z | notion | content_diff |  | A-2 |
| 2026-02-10T04:10:00.000Z | notion | content_diff |  | A-2 |
| 2026-02-10T04:09:00.000Z | notion | content_diff |  | A-2 |
| 2026-02-10T04:08:00.000Z | notion | content_diff |  | A-2 |
| 2026-02-10T04:07:00.000Z | notion | content_diff |  | A-2 |
| 2026-02-10T04:06:00.000Z | notion | content_diff |  | A-2 |
| 2026-02-10 04:06:00 | github | commit |  | refactor: centralize config, unify errors, and split Chat.tsx - Extract shared constants to src/config.ts (magic numbers → named exports) -… |
| 2026-02-10T04:04:00.000Z | notion | content_diff |  | A-2 |
| 2026-02-10T04:03:00.000Z | notion | content_diff |  | A-2 |
| 2026-02-10T04:00:00.000Z | notion | content_diff |  | A-2 |
| 2026-02-10T03:59:00.000Z | notion | content_diff |  | A-2 |
| 2026-02-10T03:58:00.000Z | notion | content_diff |  | A-2 |
| 2026-02-10T03:57:00.000Z | notion | content_diff |  | A-2 |
| 2026-02-10T03:56:00.000Z | notion | content_diff |  | A-2 |
| 2026-02-10T03:54:00.000Z | notion | content_diff |  | A-2 |
| 2026-02-10T03:54:00.000Z | notion | content_diff |  | A-2 |
| 2026-02-10T03:53:00.000Z | notion | content_diff |  | A-2 |
| 2026-02-10T03:51:00.000Z | notion | content_diff |  | A-2 |
| 2026-02-10T03:51:00.000Z | notion | content_diff |  | New Tokamak DAO Design |
| 2026-02-10 03:51:00 | notion | page |  | A-2 |
| 2026-02-09 11:51:24 | github | commit |  | feat: add network auto-switch, delegate UX, and sandbox stop loading - Auto-switch to Sepolia when wallet is on unsupported network - Set S… |
| 2026-02-09 11:42:48 | github | commit |  | refactor(sandbox): unify RPC to single proxy Remove dual-transport architecture (Wagmi proxy + MetaMask direct Fly.io URL) in favor of a si… |
| 2026-02-09 07:03:05 | github | commit |  | fix(sandbox): wait for tx receipts in fundWallet fundWallet() was not waiting for TON/vTON mint transaction receipts, causing intermittent… |
| 2026-02-09 06:42:13 | github | commit |  | fix(proposals): use exact amount for TON approve instead of unlimited Prevents MetaMask Blockaid warning by approving only the required pro… |
| 2026-02-09 04:24:56.033000 | slack | message |  | track-b-demo |
| 2026-02-09 03:45:51 | github | commit |  | fix(sandbox): use direct Fly.io URL for MetaMask and bump chain ID MetaMask caches RPC URLs per chain ID and wallet_addEthereumChain won't… |
| 2026-02-09 03:27:34 | github | commit |  | fix(sandbox): allow RPC proxy without cookie for MetaMask MetaMask's background service worker cannot access page cookies, causing write tr… |
| 2026-02-09 03:12:26 | github | commit |  | feat(web): parallel tool execution and thinking indicator Execute tool calls concurrently with Promise.all instead of sequentially. Add ani… |
| 2026-02-09 03:11:22 | github | commit |  | fix(sandbox): stable RPC proxy, block-based time travel, and UI improvements - Add cookie-based RPC proxy (/api/sandbox/rpc) to fix MetaMas… |
| 2026-02-09 02:37:54.553000 | slack | message |  | track-b-demo |
| 2026-02-09 02:02:29.767000 | slack | message |  | track-b-demo |
| 2026-02-08T14:22:00.000Z | notion | content_diff |  | Untitled |
| 2026-02-08T14:21:00.000Z | notion | content_diff |  | Untitled |
| 2026-02-08T14:20:00.000Z | notion | content_diff |  | Untitled |
| 2026-02-08T14:19:00.000Z | notion | content_diff |  | Untitled |
| 2026-02-08T14:18:00.000Z | notion | content_diff |  | Untitled |
| 2026-02-08T14:17:00.000Z | notion | content_diff |  | Untitled |
| 2026-02-08T14:16:00.000Z | notion | content_diff |  | Untitled |
| 2026-02-08T14:11:00.000Z | notion | content_diff |  | Untitled |
| 2026-02-08T14:10:00.000Z | notion | content_diff |  | Untitled |
| 2026-02-08T14:09:00.000Z | notion | content_diff |  | Untitled |
| 2026-02-08T14:08:00.000Z | notion | content_diff |  | Untitled |
| 2026-02-08T14:07:00.000Z | notion | content_diff |  | Untitled |
| 2026-02-08 14:05:57 | github | commit |  | fix(config): resolve build errors for Node.js v24 - Use sha256 hashFunction to avoid WasmHash compatibility issue - Set TypeScript target t… |
| 2026-02-08 13:56:02 | github | commit |  | feat(scripts): add sandbox deploy data generator Script that spins up a temp Anvil, deploys all contracts via forge, and captures transacti… |
| 2026-02-08 13:55:58 | github | commit |  | fix(ui): update network names for sandbox and localhost Add Sandbox (13371) to network name mappings and fix localhost chain ID from 31337… |
| 2026-02-08 13:55:53 | github | commit |  | feat(sandbox): integrate sandbox into app layout Wrap app with SandboxProvider, add SandboxButton to nav actions and SandboxBanner below na… |
| 2026-02-08 13:55:49 | github | commit |  | feat(sandbox): add sandbox UI components Add SandboxButton, SandboxBanner, SandboxModal (launch/status), and TimeTravelModal (presets + cus… |
| 2026-02-08 13:55:45 | github | commit |  | feat(sandbox): add sandbox context and hook Add SandboxProvider for session lifecycle (start, stop, restore, auto-detect dead machines) and… |
| 2026-02-08 13:55:41 | github | commit |  | feat(sandbox): add Fly.io sandbox API routes Add backend API for sandbox lifecycle: create/destroy Fly Machines running Anvil, deploy contr… |
| 2026-02-08 13:55:37 | github | commit |  | feat(sandbox): add sandbox chain config and contract overrides Define sandbox chain (ID 13371) with custom RPC transport that proxies throu… |
| 2026-02-08 13:55:33 | github | commit |  | docs(claude): add no-build note to verification rule Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com> |
| 2026-02-08 11:14:52 | github | commit |  | docs(claude): remove build restriction note Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com> |
| 2026-02-08T11:14:00.000Z | notion | content_diff |  | Untitled |
| 2026-02-08T11:14:00.000Z | notion | content_diff |  | Untitled |
| 2026-02-08T11:13:00.000Z | notion | content_diff |  | Untitled |
| 2026-02-08T11:12:00.000Z | notion | content_diff |  | Untitled |
| 2026-02-08T11:09:00.000Z | notion | content_diff |  | Untitled |
| 2026-02-08T11:08:00.000Z | notion | content_diff |  | Untitled |
| 2026-02-08T10:46:00.000Z | notion | content_diff |  | Untitled |
| 2026-02-08 08:19:05 | github | commit |  | feat(scripts): add demo base setup script Add setup-demo-base.sh that regenerates deploy-data.json by deploying contracts to a local Anvil… |
| 2026-02-08 08:19:00 | github | commit |  | feat(demo): add demo UI components and app layout integration Add demo-specific UI: - DemoBanner: persistent top banner showing demo mode s… |
| 2026-02-08 08:18:55 | github | commit |  | refactor(hooks): use useContractAddresses for demo mode support Replace all direct getContractAddresses(chainId) calls with the new useCont… |
| 2026-02-08 08:18:47 | github | commit |  | feat(demo): add demo providers and dynamic contract addresses Add demo mode infrastructure: - DemoProvider: session lifecycle, faucet, time… |
| 2026-02-08 08:18:40 | github | commit |  | feat(demo): add demo API backend with Fly.io Machines Add API routes for managing demo sessions powered by Fly.io Machines running Anvil (l… |
| 2026-02-08 08:18:34 | github | commit |  | docs(claude): add external action confirmation rule Add Rule #7 requiring user confirmation before executing any external-facing actions (g… |
| 2026-02-08 08:18:30 | github | commit |  | chore: add env examples and update gitignore Add .env.example files for both the web app (Alchemy, Fly.io demo config) and Foundry contract… |
| 2026-02-08T04:38:00.000Z | notion | content_diff |  | Untitled |
| 2026-02-08T04:23:00.000Z | notion | content_diff |  | Claude Code Agent Teams |
| 2026-02-08T04:22:00.000Z | notion | content_diff |  | Untitled |
| 2026-02-08T04:22:00.000Z | notion | content_diff |  | Untitled |
| 2026-02-08T04:17:00.000Z | notion | content_diff |  | - |
| 2026-02-08T04:17:00.000Z | notion | content_diff |  | Untitled |
| 2026-02-08T04:16:00.000Z | notion | content_diff |  | - |
| 2026-02-08 04:16:00 | notion | page |  | 301d96a4-00a3-805c-8106-c5edc0706bb5 |
| 2026-02-08T04:08:00.000Z | notion | content_diff |  | Claude Code Agent Teams |
| 2026-02-08T04:08:00.000Z | notion | content_diff |  | Claude Code Agent Teams |
| 2026-02-08T04:07:00.000Z | notion | content_diff |  | Claude Code Agent Teams |
| 2026-02-08T04:05:00.000Z | notion | content_diff |  | Claude Code Agent Teams |
| 2026-02-08 04:05:00 | notion | page |  | Claude Code Agent Teams |
| 2026-02-07 05:33:09 | github | commit |  | docs: update README with web UI and missing tools Add Web Chat UI path to architecture diagram, include verify_token_compatibility and run_… |
| 2026-02-07 05:29:44 | github | commit |  | fix(data): decode agenda call selectors in agendas.json Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com> |
| 2026-02-07 05:29:18 | github | commit |  | fix(web): localize UI to English and fix text selection visibility - Translate all Korean UI strings to English (welcome, hints, buttons) -… |
| 2026-02-07 05:17:41 | github | commit |  | fix(web): increase tool loop limits to prevent premature cutoff MAX_TOOL_ROUNDS 10→50, max_tokens 8192→16384, UI result display 2000→8000 c… |
| 2026-02-07 05:09:43 | github | commit |  | feat(web): improve markdown rendering with GFM tables and CJK emphasis fix - Add remark-gfm plugin for GitHub Flavored Markdown table suppo… |
| 2026-02-07 04:52:29 | github | commit |  | chore: remove unnecessary async, add scripts, update docs - Remove async from 3 sync functions (handleGetContractInfo, handleReadContractSo… |
| 2026-02-07 04:51:58 | github | commit |  | refactor: extract formatError and resolveCallAddress shared utilities - Add formatError() to validation.ts to replace 13 inline `err instan… |
| 2026-02-07 04:50:25 | github | commit |  | fix: correct DAI address, model ID, and rethink command paths - Fix invalid hex in DAI address (EesccdeefC → EedeAC495271d0F) - Fix Anthrop… |
| 2026-02-07 04:41:49 | github | commit |  | feat(web): register verification tools in chat UI and enforce verification-first protocol Add verify_token_compatibility and run_fork_test… |
| 2026-02-07 04:41:39 | github | commit |  | feat(mcp): add on-chain verification tools and fork testing Add verify_token_compatibility and run_fork_test tools for evidence-based token… |
| 2026-02-06 10:03:13 | github | commit |  | docs: add Games section to README Replace inline Ping Pong link with a dedicated Games table listing both Ping Pong and Tetris with play li… |
| 2026-02-06 10:00:58 | github | commit |  | fix(tetris): fix rendering and line clear bugs - Rename COLORS/PIECE_TYPES to avoid global const redeclaration errors - Flip Y-axis mapping… |
| 2026-02-06 09:36:34 | github | commit |  | feat(tetris): add Tetris game and register on landing page Copy 9 source files (game logic, renderer, input, scoring) to games/tetris/ and… |
| 2026-02-06 08:47:25 | github | commit |  | docs: format key principles as bullet list Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com> |
| 2026-02-06 08:46:26 | github | commit |  | docs: move demo link below screenshot image Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com> |
| 2026-02-06 08:41:26 | github | commit |  | feat: add game hub landing page and Vercel deployment - Add index.html with game listing for the minigame hub - Configure Vercel to serve f… |
| 2026-02-06 07:20:19 | github | commit |  | docs: expand README with design principles and pipeline details Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com> |
| 2026-02-06 07:11:38 | github | commit |  | Update README.md |
| 2026-02-06 07:09:44 | github | commit |  | docs: rewrite README in English and remove game details Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com> |
| 2026-02-06 07:08:31 | github | commit |  | docs: simplify README to focus on motivation and overview Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com> |
| 2026-02-06 07:06:42 | github | commit |  | docs: rename project directory reference to tokamak-agent-teams Update README project structure to match the GitHub repository name. Co-Aut… |
| 2026-02-06 07:05:52 | github | commit |  | docs: add README with project overview and ping-pong showcase Comprehensive README documenting: - Inspiration from Anthropic's parallel Cla… |
| 2026-02-06 07:05:41 | github | commit |  | feat: add ping-pong game built autonomously by 3 agents First game produced by Tokamak Forge — built with zero human coding: - 93 commits,… |
| 2026-02-06 07:05:27 | github | commit |  | feat: add real-time monitoring dashboard WebSocket-based dashboard for monitoring autonomous agent builds: - server.js: HTTP + WebSocket se… |
| 2026-02-06 07:05:15 | github | commit |  | feat: add forge.sh bootstrap entry point Main CLI script that orchestrates the full build pipeline: - Validates prerequisites (API key, git… |
| 2026-02-06 07:05:04 | github | commit |  | feat: add Docker container orchestration Multi-agent container setup for autonomous game building: - Dockerfile: Node 20 slim image with Cl… |
| 2026-02-06 07:04:50 | github | commit |  | feat: add game scaffolding templates Agent constitution and game specification templates: - CLAUDE.md.template: agent behavior rules, task… |
| 2026-02-06 07:04:39 | github | commit |  | init: initialize project with .gitignore and env config Set up project foundation with security-first approach: - .gitignore to exclude .en… |
| 2026-02-06T04:19:00.000Z | notion | content_diff |  | 2026-02-06 |
| 2026-02-06T04:18:00.000Z | notion | content_diff |  | 2026-02-06 |
| 2026-02-06 04:18:00 | notion | page |  | 2026-02-06 |
| 2026-02-06 03:54:11 | github | commit |  | fix(mcp): add input validation and security hardening - Add validation.ts with address, hex, slot, BigInt validators - Fix path traversal v… |
| 2026-02-06T03:24:00.000Z | notion | content_diff |  | Building a C compiler with a team of parallel Claudes |
| 2026-02-06T03:23:00.000Z | notion | content_diff |  | Building a C compiler with a team of parallel Claudes |
| 2026-02-06T03:22:00.000Z | notion | content_diff |  | Building a C compiler with a team of parallel Claudes |
| 2026-02-06T03:21:00.000Z | notion | content_diff |  | Building a C compiler with a team of parallel Claudes |
| 2026-02-06T03:19:00.000Z | notion | content_diff |  | Building a C compiler with a team of parallel Claudes |
| 2026-02-06T03:18:00.000Z | notion | content_diff |  | Building a C compiler with a team of parallel Claudes |
| 2026-02-06T03:17:00.000Z | notion | content_diff |  | Building a C compiler with a team of parallel Claudes |
| 2026-02-06T03:16:00.000Z | notion | content_diff |  | Building a C compiler with a team of parallel Claudes |
| 2026-02-06T03:15:00.000Z | notion | content_diff |  | Building a C compiler with a team of parallel Claudes |
| 2026-02-06T03:14:00.000Z | notion | content_diff |  | Building a C compiler with a team of parallel Claudes |
| 2026-02-06T03:13:00.000Z | notion | content_diff |  | Building a C compiler with a team of parallel Claudes |
| 2026-02-06T03:12:00.000Z | notion | content_diff |  | Building a C compiler with a team of parallel Claudes |
| 2026-02-06 03:11:00 | notion | page |  | Building a C compiler with a team of parallel Claudes |
| 2026-02-05 12:16:43 | github | commit |  | refactor: replace Bun-only import.meta.dir with portable path resolution - Add src/mcp/paths.ts as central path module using fileURLToPath… |
| 2026-02-05 11:54:55 | github | commit |  | chore: add Claude Code custom commands Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com> |
| 2026-02-05 11:54:50 | github | commit |  | feat(scripts): add agenda fetcher, storage layouts, and reader utils Add fetch-agendas.ts for caching DAO proposal data, storage layout JSO… |
| 2026-02-05 11:54:45 | github | commit |  | feat(contracts): add verified Solidity sources and Foundry config Add 42 verified contract source trees (746 .sol files) covering the full… |
| 2026-02-05T11:54:00.000Z | notion | content_diff |  | Tokamak DAO Agent |
| 2026-02-05 11:53:47 | github | commit |  | docs: rewrite README with architecture and setup guide Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com> |
| 2026-02-05 11:50:32 | github | commit |  | chore: remove unused files and imports Delete unused data collection scripts (find-contracts.ts, find-layer2s.ts) and remove unused viem/ch… |
| 2026-02-05 11:44:57 | github | commit |  | feat(web): add web chat UI with Anthropic tool_use loop - Extract handler functions from 6 MCP tool files for reuse - Add unified tool regi… |
| 2026-02-05T11:19:00.000Z | notion | content_diff |  | Tokamak DAO Agent |
| 2026-02-05T10:59:00.000Z | notion | content_diff |  | Tokamak DAO Agent |
| 2026-02-05T10:54:00.000Z | notion | content_diff |  | Tokamak DAO Agent |
| 2026-02-05T10:51:00.000Z | notion | content_diff |  | Tokamak DAO Agent |
| 2026-02-05T10:51:00.000Z | notion | content_diff |  | Tokamak DAO Agent |
| 2026-02-05T10:35:00.000Z | notion | content_diff |  | Tokamak DAO Agent |
| 2026-02-05T10:35:00.000Z | notion | content_diff |  | Tokamak DAO Agent |
| 2026-02-05T10:29:00.000Z | notion | content_diff |  | Tokamak DAO Agent |
| 2026-02-05T10:25:00.000Z | notion | content_diff |  | Tokamak DAO Agent |
| 2026-02-05 10:24:00 | notion | page |  | Tokamak DAO Agent |
| 2026-02-05T07:37:00.000Z | notion | content_diff |  | Scenario |
| 2026-02-05T07:33:00.000Z | notion | content_diff |  | Scenario |
| 2026-02-05T07:32:00.000Z | notion | content_diff |  | Scenario |
| 2026-02-05T07:20:00.000Z | notion | content_diff |  | DEMO — |
| 2026-02-05 07:13:13.383000 | slack | message |  | project-eco |
| 2026-02-05T07:11:00.000Z | notion | content_diff |  | DEMO — |
| 2026-02-05T07:08:00.000Z | notion | content_diff |  | DEMO — |
| 2026-02-05T07:06:00.000Z | notion | content_diff |  | DEMO — |
| 2026-02-05T07:05:00.000Z | notion | content_diff |  | DEMO — |
| 2026-02-05T07:03:00.000Z | notion | content_diff |  | DEMO |
| 2026-02-05T07:01:00.000Z | notion | content_diff |  | DEMO |
| 2026-02-05T07:00:00.000Z | notion | content_diff |  | DEMO |
| 2026-02-05T06:58:00.000Z | notion | content_diff |  | DEMO |
| 2026-02-05T06:56:00.000Z | notion | content_diff |  | DEMO |
| 2026-02-05T06:55:00.000Z | notion | content_diff |  | DEMO |
| 2026-02-05T06:53:00.000Z | notion | content_diff |  | DEMO |
| 2026-02-05T06:51:00.000Z | notion | content_diff |  | DEMO |
| 2026-02-05T06:49:00.000Z | notion | content_diff |  | DEMO |
| 2026-02-05T06:48:00.000Z | notion | content_diff |  | DEMO |
| 2026-02-05T06:46:00.000Z | notion | content_diff |  | DEMO |
| 2026-02-05T06:44:00.000Z | notion | content_diff |  | DEMO |
| 2026-02-05T06:43:00.000Z | notion | content_diff |  | DEMO |
| 2026-02-05 06:41:59 | github | commit |  | fix(scripts): parse cast call output in faucet Extract only the numeric value from `cast call` output, which includes a scientific notation… |
| 2026-02-05 06:39:17 | github | commit |  | feat(scripts): add local faucet script Send 1,000 ETH, 10,000 TON, and 10,000 vTON to any address on local Anvil via `npm run faucet -- <ad… |
| 2026-02-05T06:34:00.000Z | notion | content_diff |  | DEMO |
| 2026-02-05T06:32:00.000Z | notion | content_diff |  | DEMO |
| 2026-02-05T06:31:00.000Z | notion | content_diff |  | DEMO |
| 2026-02-05T06:29:00.000Z | notion | content_diff |  | DEMO |
| 2026-02-05T06:28:00.000Z | notion | content_diff |  | DEMO |
| 2026-02-05T05:59:00.000Z | notion | content_diff |  | 2026-02-05 |
| 2026-02-05T05:57:00.000Z | notion | content_diff |  | 2026-02-05 |
| 2026-02-05T05:55:00.000Z | notion | content_diff |  | 2026-02-05 |
| 2026-02-05 05:42:10.267000 | drive | 편집 (5회) | 편집 (5회) | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Gemini가 작성한 회의록 |
| 2026-02-05 05:37:43.351000 | drive | 편집 (2회) | 편집 (2회) | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Recording |
| 2026-02-05 05:37:42.513000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Recording |
| 2026-02-05 05:37:42.513000 | drive | change_owner | change_owner | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Recording |
| 2026-02-05 05:37:42.513000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Recording |
| 2026-02-05 05:37:42.513000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Recording |
| 2026-02-05 05:37:42.513000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Recording |
| 2026-02-05 05:37:42.513000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Recording |
| 2026-02-05 05:37:42.513000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Recording |
| 2026-02-05 05:37:42.513000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Recording |
| 2026-02-05 05:37:42.513000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Recording |
| 2026-02-05 05:37:42.513000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Recording |
| 2026-02-05 05:37:42.513000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Recording |
| 2026-02-05 05:37:42.513000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Recording |
| 2026-02-05 05:37:42.513000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Recording |
| 2026-02-05 05:37:42.513000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Recording |
| 2026-02-05 05:37:42.513000 | drive | 이동 | 이동 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Recording |
| 2026-02-05 05:37:42.513000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Recording |
| 2026-02-05 05:37:42.513000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Recording |
| 2026-02-05 05:37:42.513000 | drive | 문서 공개 설정 변경 | 문서 공개 설정 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Recording |
| 2026-02-05 05:37:42.513000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Recording |
| 2026-02-05 05:37:42.513000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Recording |
| 2026-02-05 05:37:42.513000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Recording |
| 2026-02-05 05:37:42.513000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Recording |
| 2026-02-05 05:37:42.513000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Recording |
| 2026-02-05 05:37:42.513000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Recording |
| 2026-02-05 05:37:42.513000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Recording |
| 2026-02-05 05:37:42.513000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Recording |
| 2026-02-05 05:37:42.513000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Recording |
| 2026-02-05 05:17:42.502000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Gemini가 작성한 회의록 |
| 2026-02-05 05:17:42.502000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Gemini가 작성한 회의록 |
| 2026-02-05 05:17:42.502000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Gemini가 작성한 회의록 |
| 2026-02-05 05:17:42.502000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Gemini가 작성한 회의록 |
| 2026-02-05 05:17:42.502000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Gemini가 작성한 회의록 |
| 2026-02-05 05:17:42.502000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Gemini가 작성한 회의록 |
| 2026-02-05 05:17:42.502000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Gemini가 작성한 회의록 |
| 2026-02-05 05:17:42.502000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Gemini가 작성한 회의록 |
| 2026-02-05 05:17:42.502000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Gemini가 작성한 회의록 |
| 2026-02-05 05:17:42.502000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Gemini가 작성한 회의록 |
| 2026-02-05 05:17:42.502000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Gemini가 작성한 회의록 |
| 2026-02-05 05:17:42.502000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Gemini가 작성한 회의록 |
| 2026-02-05 05:17:42.502000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Gemini가 작성한 회의록 |
| 2026-02-05 05:17:42.502000 | drive | 이동 | 이동 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Gemini가 작성한 회의록 |
| 2026-02-05 05:17:42.502000 | drive | change_owner | change_owner | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Gemini가 작성한 회의록 |
| 2026-02-05 05:17:42.502000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Gemini가 작성한 회의록 |
| 2026-02-05 05:17:42.502000 | drive | 문서 공개 설정 변경 | 문서 공개 설정 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Gemini가 작성한 회의록 |
| 2026-02-05 05:17:42.502000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Gemini가 작성한 회의록 |
| 2026-02-05 05:17:42.502000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Gemini가 작성한 회의록 |
| 2026-02-05 05:17:42.502000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Gemini가 작성한 회의록 |
| 2026-02-05 05:17:42.502000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Gemini가 작성한 회의록 |
| 2026-02-05 05:17:42.502000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Gemini가 작성한 회의록 |
| 2026-02-05 05:17:42.502000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Gemini가 작성한 회의록 |
| 2026-02-05 05:17:42.502000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Gemini가 작성한 회의록 |
| 2026-02-05 05:17:42.502000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Gemini가 작성한 회의록 |
| 2026-02-05 05:17:42.502000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Gemini가 작성한 회의록 |
| 2026-02-05 05:17:42.502000 | drive | 접근 권한 변경 | 접근 권한 변경 | DAO Demo_Thomas, Kevin, Jason, Zena, Harvey - 2026/02/05 13:58 KST - Gemini가 작성한 회의록 |
| 2026-02-05 05:12:22 | github | commit |  | chore(deploy): update local contract addresses Update localhost (chain 1337) contract addresses to match latest local deployment. Co-Author… |
| 2026-02-05 05:12:19 | github | commit |  | chore(proposals): renumber demo TIP IDs by status Reorder demo proposal TIP numbers to reflect their lifecycle progression (TIP-002 execute… |
| 2026-02-05 05:12:15 | github | commit |  | docs(specs): remove outdated changelog entries Remove "Removed" section from v0.2.0 changelog that listed features no longer relevant to th… |
| 2026-02-05T05:11:00.000Z | notion | content_diff |  | 2026-02-05 |
| 2026-02-05T05:09:00.000Z | notion | content_diff |  | 2026-02-05 |
| 2026-02-05T05:08:00.000Z | notion | content_diff |  | 2026-02-05 |
| 2026-02-05T05:07:00.000Z | notion | content_diff |  | 2026-02-05 |
| 2026-02-05 05:06:00 | notion | page |  | 2026-02-05 |
| 2026-02-05 04:59:22 | github | commit |  | chore(deploy): set local periods to 1 hour Voting delay, voting period, and timelock delay are all set to 1 hour for local testing. Timeloc… |
| 2026-02-05 04:03:54 | github | commit |  | chore(deploy): use test accounts for local SecurityCouncil members Set foundation to TEST_ACCOUNT_1 and external member to TEST_ACCOUNT_2 i… |
| 2026-02-05 04:02:13 | github | commit |  | docs(research): add security council intervention model comparison Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com> |
| 2026-02-05T04:00:00.000Z | notion | content_diff |  | DEMO |
| 2026-02-05T03:59:00.000Z | notion | content_diff |  | DEMO |
| 2026-02-05T03:55:00.000Z | notion | content_diff |  | DEMO |
| 2026-02-05T03:55:00.000Z | notion | content_diff |  | DEMO |
| 2026-02-05T03:53:00.000Z | notion | content_diff |  | DEMO |
| 2026-02-05T03:47:00.000Z | notion | content_diff |  | Scenario |
| 2026-02-05T03:47:00.000Z | notion | content_diff |  | Scenario |
| 2026-02-05 03:38:14 | github | commit |  | feat(proposals): add timeline lifecycle timestamps and ETA Add useProposalTimestamps and useProposalEta hooks to fetch queued/executed time… |
| 2026-02-05T03:37:00.000Z | notion | content_diff |  | DEMO |
| 2026-02-05 03:35:47 | github | commit |  | docs(readme): add time-travel testing guide for proposals Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com> |
| 2026-02-05T03:35:00.000Z | notion | content_diff |  | DEMO |
| 2026-02-05 03:34:00 | notion | page |  | DEMO — |
| 2026-02-05 03:20:18.622000 | drive | search | search | Unknown |
| 2026-02-05 03:20:18.472000 | drive | search | search | Unknown |
| 2026-02-05T03:01:00.000Z | notion | content_diff |  | Scenario |
| 2026-02-05 02:57:26 | github | commit |  | chore(deploy): update local deploy script and contract addresses Set voting period to 1 day for local testing and update faucet addresses a… |
| 2026-02-05 02:53:52 | github | commit |  | feat(proposals): count unique voters from VoteCast events Add useVoterCount hook that queries VoteCast event logs to determine unique voter… |
| 2026-02-05T02:53:00.000Z | notion | content_diff |  | New Tokamak DAO Design |
| 2026-02-05T02:48:00.000Z | notion | content_diff |  | Issue |
| 2026-02-05 02:47:00 | notion | page |  | Issue |
| 2026-02-05T02:41:00.000Z | notion | content_diff |  | Scenario |
| 2026-02-05 02:31:39 | github | commit |  | fix(frontend): use blockchain timestamps and block-to-seconds conversion Switch from useBlockNumber to useBlock to derive timestamps from c… |
| 2026-02-05 02:31:29 | github | commit |  | chore(deploy): redeploy contracts to Sepolia and update addresses Redeploy all governance contracts after voting delay and threshold fixes.… |
| 2026-02-05 02:31:21 | github | commit |  | fix(contracts): use block-based voting delay and include delegated power DEFAULT_VOTING_DELAY was set to 86400 (seconds) but the contract u… |
| 2026-02-05T02:31:00.000Z | notion | content_diff |  | Scenario |
| 2026-02-05 02:07:38 | github | commit |  | fix(proposals): support GFM tables and improve heading hierarchy Add remark-gfm plugin for markdown table rendering and increase heading fo… |
| 2026-02-05T01:57:00.000Z | notion | content_diff |  | Scenario |
| 2026-02-05T01:56:00.000Z | notion | content_diff |  | Scenario |
| 2026-02-05T01:55:00.000Z | notion | content_diff |  | Scenario |
| 2026-02-05T01:55:00.000Z | notion | content_diff |  | New Tokamak DAO Design |
| 2026-02-05T01:55:00.000Z | notion | content_diff |  | Proposal |
| 2026-02-05 01:55:00 | notion | page |  | Scenario |
| 2026-02-05T01:52:00.000Z | notion | content_diff |  | New Tokamak DAO Design |
| 2026-02-04T10:58:00.000Z | notion | content_diff |  | Ralph |
| 2026-02-04 10:53:06 | github | commit |  | feat(contracts): add on-chain contract analysis and documentation system Add comprehensive contract analysis tooling and RAG documentation:… |
| 2026-02-04T10:53:00.000Z | notion | content_diff |  | Ralph |
| 2026-02-04T09:57:00.000Z | notion | content_diff |  | Ralph |
| 2026-02-04T09:54:00.000Z | notion | content_diff |  | Ralph |
| 2026-02-04T09:54:00.000Z | notion | content_diff |  | Ralph |
| 2026-02-04T09:50:00.000Z | notion | content_diff |  | Ralph |
| 2026-02-04T09:45:00.000Z | notion | content_diff |  | Ralph |
| 2026-02-04T09:44:00.000Z | notion | content_diff |  | Ralph |
| 2026-02-04T09:41:00.000Z | notion | content_diff |  | Ralph |
| 2026-02-04T09:41:00.000Z | notion | content_diff |  | Ralph |
| 2026-02-04T09:40:00.000Z | notion | content_diff |  | Ralph |
| 2026-02-04T09:34:00.000Z | notion | content_diff |  | Ralph |
| 2026-02-04T09:34:00.000Z | notion | content_diff |  | Ralph |
| 2026-02-04T09:33:00.000Z | notion | content_diff |  | Ralph |
| 2026-02-04T09:31:00.000Z | notion | content_diff |  | Ralph |
| 2026-02-04T09:30:00.000Z | notion | content_diff |  | Ralph |
| 2026-02-04T09:29:00.000Z | notion | content_diff |  | Ralph |
| 2026-02-04T09:29:00.000Z | notion | content_diff |  | DAO Governance |
| 2026-02-04 09:29:00 | notion | page |  | Ralph |
| 2026-02-04 09:12:59 | github | commit |  | chore: add tasks directory to gitignore Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com> |
| 2026-02-04 09:11:22 | github | commit |  | feat: integrate RAG pipeline into chat API - Add knowledge base initialization on server startup - Implement RAG context injection in syste… |
| 2026-02-04 09:11:15 | github | commit |  | docs: add Tokamak DAO knowledge base documents Add markdown documents covering: - Governance processes and voting mechanisms - Contract add… |
| 2026-02-04 09:11:10 | github | commit |  | feat: add knowledge base module with hybrid search Add core knowledge management system including: - Document schema and metadata types - M… |
| 2026-02-04 08:53:03.572000 | drive | search | search | Unknown |
| 2026-02-04 08:52:53.153000 | drive | search | search | Unknown |
| 2026-02-04 08:52:50.508000 | drive | search | search | Unknown |
| 2026-02-04 08:39:39 | github | commit |  | docs: add project documentation Add documentation files: - README.md with installation and usage instructions - CLAUDE.md with development… |
| 2026-02-04 08:39:34 | github | commit |  | feat: add Chat component with streaming support Implement main chat functionality: - Real-time SSE streaming for AI responses - Chat bubble… |
| 2026-02-04 08:39:27 | github | commit |  | feat: add terminal-style UI theme and chat styles Implement Tokamak DAO themed styling: - Dark terminal color palette with CSS variables -… |
| 2026-02-04 08:39:21 | github | commit |  | feat: add React app entry point Set up React 19 client application: - StrictMode enabled - Root mounting with createRoot API - App componen… |
| 2026-02-04 08:39:16 | github | commit |  | feat: add Hono backend server with Anthropic API Implement streaming chat API: - Hono server running on port 3000 - /api/chat endpoint with… |
| 2026-02-04 08:39:11 | github | commit |  | feat: add Vite build configuration Configure Vite for React development: - React plugin for JSX transformation - API proxy to backend serve… |
| 2026-02-04 08:39:05 | github | commit |  | chore: initialize project with Bun and TypeScript Set up Tokamak DAO Agent project with: - Bun runtime with TypeScript support - Dependenci… |
| 2026-02-04 08:34:36.288000 | slack | message |  | project-eco |
| 2026-02-04T08:13:00.000Z | notion | content_diff |  | WIP |
| 2026-02-04T08:05:00.000Z | notion | content_diff |  | WIP |
| 2026-02-04T08:05:00.000Z | notion | content_diff |  | WIP |
| 2026-02-04T08:01:00.000Z | notion | content_diff |  | WIP |
| 2026-02-04T08:01:00.000Z | notion | content_diff |  | WIP |
| 2026-02-04 06:16:31 | github | commit |  | fix(demo): regenerate package-lock.json for Vercel Remove stale local path references to use npm registry package. Co-Authored-By: Claude O… |
| 2026-02-04 06:14:01 | github | commit |  | fix(demo): update tsconfig for Vercel compatibility Change moduleResolution from bundler to node and add esModuleInterop and allowSynthetic… |
| 2026-02-04 05:47:24 | github | commit |  | fix(demo): use npm registry package for Vercel deployment Replace local file reference with npm version ^0.1.8 and add explicit TypeScript… |
| 2026-02-04 04:51:50.987000 | slack | message |  | project-eco |
| 2026-02-04T04:50:00.000Z | notion | content_diff |  | WIP |
| 2026-02-04T04:48:00.000Z | notion | content_diff |  | WIP |
| 2026-02-04T04:25:00.000Z | notion | content_diff |  | WIP |
| 2026-02-03T11:09:00.000Z | notion | content_diff |  | WIP |
| 2026-02-03 11:07:58 | github | commit |  | chore: update claude commands and fix gitignore - Add generate-changelog and set-voting-delay commands - Remove unused contracts-test, depl… |
| 2026-02-03 11:04:58 | github | commit |  | docs(specs): fix proposal creation cost in 0.1.0 spec Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com> |
| 2026-02-03 10:46:44 | github | commit |  | chore(deps): update dao-action-builder to 0.1.8 Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com> |
| 2026-02-03 10:45:20 | github | commit |  | chore: release @tokamak-ecosystem/dao-action-builder@0.1.8 |
| 2026-02-03 10:44:44 | github | commit |  | refactor: optimize regex caching and remove unused code - Cache regex patterns as module-level constants for performance - abi-utils.ts: AD… |
| 2026-02-03 10:40:13 | github | commit |  | feat(demo): add TON and WTON contracts to demo app Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com> |
| 2026-02-03 10:33:28 | github | commit |  | fix(theme): prevent flash of wrong theme on page reload Add inline script to apply theme before React hydration, preventing the flash from… |
| 2026-02-03 10:31:55 | github | commit |  | docs(specs): add proposal threshold change to changelog Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com> |
| 2026-02-03 10:29:42 | github | commit |  | docs(specs): update proposal threshold to include delegated vTON Proposal creation now requires balance + delegated vTON >= 0.25% of total… |
| 2026-02-03 10:29:41 | github | commit |  | feat(proposal-form): improve requirement descriptions with tooltip - Rename "TON Burn Cost" to "Proposal Fee" with spam prevention explanat… |
| 2026-02-03T10:06:00.000Z | notion | content_diff |  | WIP |
| 2026-02-03 10:03:30 | github | commit |  | docs: sync README to packages and add sync guideline - Copy root README.md to packages/dao-action-builder/README.md - Add README synchroniz… |
| 2026-02-03T10:01:00.000Z | notion | content_diff |  | WIP |
| 2026-02-03 09:55:05 | github | commit |  | docs: add Etherscan links to contract addresses Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com> |
| 2026-02-03 09:50:06 | github | commit |  | chore: remove redundant docs folder Documentation is now consolidated in README.md Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com> |
| 2026-02-03 09:40:56 | github | commit |  | refactor(action-builder): simplify to predefined Tokamak contracts only - Remove Auto ABI (Etherscan) and Manual calldata modes - Remove St… |
| 2026-02-03 09:36:14 | github | commit |  | chore: release @tokamak-ecosystem/dao-action-builder@0.1.7 |
| 2026-02-03 09:36:00 | github | commit |  | docs: add complete contract and function documentation to README - Add TON, WTON, SeigManager, CandidateFactory contracts - Add missing fun… |
| 2026-02-03 09:26:20 | github | commit |  | docs: add Tokamak contract addresses to README Add complete list of Tokamak Network contract addresses for both mainnet and sepolia network… |
| 2026-02-03 09:25:21 | github | commit |  | fix(tokamak): correct CandidateFactory Sepolia proxy address Update to the correct CandidateFactoryProxy address verified on Sepolia Ethers… |
| 2026-02-03 09:20:21 | github | commit |  | chore: release @tokamak-ecosystem/dao-action-builder@0.1.6 |
| 2026-02-03 09:20:09 | github | commit |  | feat: add TON and WTON contract addresses - TON: mainnet 0x2be5e8c109e2197D077D13A82dAead6a9b3433C5 - TON: sepolia 0xa30fe40285B8f5c0457DbC… |
| 2026-02-03 08:47:14 | github | commit |  | docs: add release guidelines to CLAUDE.md - Default to patch release unless explicitly specified - Add auto-confirm command for release pro… |
| 2026-02-03 08:46:53 | github | commit |  | chore: release @tokamak-ecosystem/dao-action-builder@0.1.5 |
| 2026-02-03 08:45:47 | github | commit |  | feat: add comprehensive DAOCommitteeProxy callable functions - Add SeigManager (27 functions) and CandidateFactory (4 functions) predefined… |
| 2026-02-03 08:01:14 | github | commit |  | docs(specs): fix relative links in version table Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com> |
| 2026-02-03 07:56:18 | github | commit |  | docs: reorganize documentation and add project rules - Add development rules and guidelines to CLAUDE.md - Move specification section from… |
| 2026-02-03 07:37:16 | github | commit |  | feat(demo): add dark mode and design system overhaul - Add theme toggle with localStorage persistence - Implement CSS custom properties for… |
| 2026-02-03 05:36:50 | github | commit |  | feat: add Sepolia network support with contract addresses - Add NetworkType and ContractAddresses types - Add mainnet and sepolia addresses… |
| 2026-02-03 05:28:17 | github | commit |  | fix(docs): correct package name in installation instructions Changed @tokamak-network to @tokamak-ecosystem Co-Authored-By: Claude Opus 4.5… |
| 2026-02-03 05:26:50 | github | commit |  | chore: release @tokamak-ecosystem/dao-action-builder@0.1.4 Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com> |
| 2026-02-03 05:26:05 | github | commit |  | docs(readme): adjust changelog heading levels Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com> |
| 2026-02-03 05:24:52 | github | commit |  | docs(readme): update spec changelog and table format Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com> |
| 2026-02-03 05:18:52 | github | commit |  | feat(demo): show only DAO-controllable contracts - Display only 7 contracts controllable by DAOCommitteeProxy - Auto-fill mainnet addresses… |
| 2026-02-03 05:09:45 | github | commit |  | docs: document DAO governance contracts and functions Rewrite README to focus on: - Contracts controllable by DAOCommitteeProxy - Available… |
| 2026-02-03 05:09:39 | github | commit |  | feat(tokamak): add DAO governance actions Add predefined methods for contracts controllable by DAOCommitteeProxy: - DAOCommittee: blacklist… |
| 2026-02-03 04:57:53 | github | commit |  | feat(contracts): make governance params DAO-adjustable Convert timelockDelay, gracePeriod, and passRate from hardcoded constants to configu… |
| 2026-02-03 04:21:40 | github | commit |  | style(proposals): use Badge for status and simplify title - Replace plain text status with Badge components (success/warning/error) - Remov… |
| 2026-02-03T04:21:00.000Z | notion | content_diff |  | - |
| 2026-02-03T04:11:00.000Z | notion | content_diff |  | WIP |
| 2026-02-03 04:11:00 | notion | page |  | WIP |
| 2026-02-03 03:59:54 | github | commit |  | chore(deps): update dao-action-builder to 0.1.2 Add dependency documentation to CLAUDE.md with version check instructions. Co-Authored-By:… |
| 2026-02-03 03:59:18 | github | commit |  | style(proposals): simplify requirements section layout Replace 4-card grid with minimal 2-row list for better visual balance. Remove colore… |
| 2026-02-03 03:57:09 | github | commit |  | chore: release @tokamak-ecosystem/dao-action-builder@0.1.3 Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com> |
| 2026-02-03 03:54:45 | github | commit |  | docs: update package name in README Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com> |
| 2026-02-03 03:45:30.364000 | drive | search | search | Unknown |
| 2026-02-03 03:44:32 | github | commit |  | chore: release @tokamak-ecosystem/dao-action-builder@0.1.2 Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com> |
| 2026-02-03 03:44:06 | github | commit |  | docs: remove Etherscan API references from README Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com> |
| 2026-02-03 03:40:26 | github | commit |  | chore: release @tokamak-ecosystem/dao-action-builder@0.1.1 Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com> |
| 2026-02-03T03:39:00.000Z | notion | content_diff |  | New Tokamak DAO Design |
| 2026-02-03T03:39:00.000Z | notion | content_diff |  | New Tokamak DAO Design |
| 2026-02-03 03:36:45 | github | commit |  | feat(contracts): add proposal threshold requirement for spam prevention - Add proposalThreshold (0.25% of vTON supply) to DAOGovernor - Dis… |
| 2026-02-03 03:35:01 | github | commit |  | fix: rename publish scripts to release Avoid npm workspace script name conflict by renaming "publish" to "release" Co-Authored-By: Claude O… |
| 2026-02-03 03:34:02 | github | commit |  | feat: add automated npm publish script Add publish.sh script for automated npm publishing with: - Semantic version bumping (patch/minor/maj… |
| 2026-02-03 03:29:53 | github | commit |  | chore: rename package scope to @tokamak-ecosystem Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com> |
| 2026-02-02T10:43:00.000Z | notion | content_diff |  | New Tokamak DAO Design |
| 2026-02-02T10:40:00.000Z | notion | content_diff |  | New Tokamak DAO Design |
| 2026-02-02 10:37:10 | github | commit |  | fix(ui): increase select small size height to prevent text clipping Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com> |
| 2026-02-02 10:36:33 | github | commit |  | feat(proposals): add burn rate UI and voting burn warning - Add burn rate input field to CreateProposalForm - Display burn rate with toolti… |
| 2026-02-02 10:36:11 | github | commit |  | feat(contracts): add burn rate to proposals - Add burnRate parameter to propose() function - Add MAX_BURN_RATE constant (10000 = 100%) - Ad… |
| 2026-02-02 10:35:31 | github | commit |  | style(ui): update card overflow and select focus styles - Add overflow-visible to card for tooltips - Change select focus from ring to bord… |
| 2026-02-02T10:35:00.000Z | notion | content_diff |  | New Tokamak DAO Design |
| 2026-02-02T08:05:00.000Z | notion | content_diff |  | 2026-02-02 |
| 2026-02-02 07:29:44 | github | commit |  | feat(proposals): integrate dao-action-builder library for proposal actions - Add @shinthom/dao-action-builder for ABI loading and calldata… |
| 2026-02-02T05:34:00.000Z | notion | content_diff |  | 2026-02-02 |
| 2026-02-02T05:32:00.000Z | notion | content_diff |  | 2026-02-02 |
| 2026-02-02T05:32:00.000Z | notion | content_diff |  | 2026-02-02 |
| 2026-02-02 05:31:56 | github | commit |  | refactor: merge tokamak package into core - Move all Tokamak methods (TON, WTON, DepositManager, etc.) into core package - Remove separate… |
| 2026-02-02T05:30:00.000Z | notion | content_diff |  | New Tokamak DAO Design |
| 2026-02-02T05:30:00.000Z | notion | content_diff |  | 2026-02-02 |
| 2026-02-02T05:29:00.000Z | notion | content_diff |  | vTON DAO Governance Model — 0.1.0 |
| 2026-02-02T05:28:00.000Z | notion | content_diff |  | New Tokamak DAO Design |
| 2026-02-02T05:22:00.000Z | notion | content_diff |  | 2026-02-02 |
| 2026-02-02T05:09:00.000Z | notion | content_diff |  | 2026-02-02 |
| 2026-02-02T05:08:00.000Z | notion | content_diff |  | 2026-02-02 |
| 2026-02-02 05:04:54 | github | commit |  | chore: rename packages to @tokamak-network scope - Rename @dao-action-builder/core to @tokamak-network/dao-action-builder - Rename @dao-act… |
| 2026-02-02 05:03:10.679000 | slack | message |  | project-eco |
| 2026-02-02T05:03:00.000Z | notion | content_diff |  | 2026-02-02 |
| 2026-02-02T04:56:00.000Z | notion | content_diff |  | 2026-02-02 |
| 2026-02-02T04:56:00.000Z | notion | content_diff |  | 2026-02-02 |
| 2026-02-02 04:51:23 | github | commit |  | feat(demo): add two-column layout with sidebar - Left sidebar displays contract list for easy navigation - Right panel shows action builder… |
| 2026-02-02 04:42:28 | github | commit |  | feat(contracts): add time-travel CLI script for local development Add a utility script to easily manipulate blockchain time in local Anvil… |
| 2026-02-02 04:32:29 | github | commit |  | refactor(core): remove Etherscan API dependency - Delete abi-loader.ts and useAbiLoader hook - Create abi-utils.ts with utility functions -… |
| 2026-02-02 04:23:43 | github | commit |  | docs: add local development guide to README Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com> |
| 2026-02-02 04:23:41 | github | commit |  | feat(examples): add demo web app for library testing - Add Vite + React demo app in examples/demo - Demonstrate predefined methods (ERC20,… |
| 2026-02-02 04:21:05 | github | commit |  | feat(contracts): add local development environment with Anvil - Add Faucet deployment to DeployLocalScript - Create start-anvil.sh to start… |
| 2026-02-02 04:19:20 | github | commit |  | feat: initial implementation of DAO Action Builder library - Add @dao-action-builder/core package with: - Etherscan ABI loading with proxy… |
| 2026-02-02 04:01:05.356000 | drive | search | search | Unknown |
| 2026-02-02T03:40:00.000Z | notion | content_diff |  | 2026-02-02 |
| 2026-02-02T03:40:00.000Z | notion | content_diff |  | 2026-02-02 |
| 2026-02-02T03:36:00.000Z | notion | content_diff |  | 2026-02-02 |
| 2026-02-02T03:34:00.000Z | notion | content_diff |  | 2026-01-30 |
| 2026-02-02T03:33:00.000Z | notion | content_diff |  | 2026-01-30 |
| 2026-02-02 03:32:56.766000 | drive | 편집 (2회) | 편집 (2회) | 1. Weekly DEV Performance(Tokamak Network)_2026 Jan |
| 2026-02-02 03:32:10.369000 | drive | search | search | Unknown |
| 2026-02-02T03:31:00.000Z | notion | content_diff |  | 2026-01-30 |
| 2026-02-01 14:55:04.499000 | drive | 편집 (46회) | 편집 (46회) | 1-1. PO Process_셀프 피드백_Thomas |
| 2026-02-01T10:01:00.000Z | notion | content_diff |  | New Tokamak DAO Design |
| 2026-02-01T09:32:00.000Z | notion | content_diff |  | #1: Missing Seigniorage Update in Deposit/Withdrawal |
