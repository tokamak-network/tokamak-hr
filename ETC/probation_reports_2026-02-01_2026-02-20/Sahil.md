# Probation Completion Report - Sahil

## Period
- 2026-02-01 to 2026-02-20

## Data Coverage (by source)
- github: 288
- drive: 247
- slack: 16
- notion: 15

## Key Achievements (Evidence-led)
**GitHub (primary evidence)**
- Repositories: dust-protocol, thanos-bridge, trh-sdk
- Notable commits: fix: comprehensive name discovery + reclaim for returning users Root cause: registerMetaAddress() fails silently during…
- Recurring themes: add, feat, fix, stealth, update, wallet
**Slack**
- Active channels: project_trh, tokamak-dev, project-drb
- Discussion themes: stealth, payments, integration, addresses, can
**Notion**
- Edited pages: TRH Platform Desktop, Untitled, Q1 executable based TRH setup (Windows/Mac/Linux)
- Content signals: sequenceDiagram → sequenceDiagram, Error Recovery, The application automatically handles common errors at each setup step:, sequenceDiagram particip, TRH Platform Desktop
**Drive**
- Top actions: 접근 권한 변경, sync_item_content, access_item_content
- Files touched: 1. Weekly DEV Performance(Tokamak Network)_2026 Jan, 2. Weekly DEV Performance(Tokamak Network)_2026 Feb, Weely Peer Review Express_Sahil



## GitHub Reports
- Primary repos: dust-protocol, thanos-bridge.
- PR outcomes: no PRs recorded in this period.
- Commit outcomes: fix: comprehensive name discovery + reclaim for returning users Root cause: registerMetaAddress() f….
- Delivery themes: add, feat, fix, stealth.

## Work Focus Analysis
Delivered engineering changes focused on “fix: comprehensive name discovery + reclaim for returning users Root cause: registerMetaAddress() fails silently during…,” indicating direct execution on core product work. Primary impact centers on dust-protocol, suggesting ownership of key implementation areas. Coordination in project_trh, tokamak-dev supports cross-team alignment and delivery. Documentation updates on TRH Platform Desktop demonstrate knowledge transfer and onboarding support. Drive activity suggests operational support via frequent “접근 권한 변경” actions.

## Records (latest first)
| timestamp | source | type | action | title |
|---|---|---|---|---|
| 2026-02-18 20:02:26 | github | commit |  | fix: comprehensive name discovery + reclaim for returning users Root cause: registerMetaAddress() fails silently during onboarding (.catch(… |
| 2026-02-18 19:33:08 | github | commit |  | fix: add server-side wallet→name lookup API for reliable onboarding bypass The Graph-based fix alone isn't enough — it requires the subgrap… |
| 2026-02-18 19:19:17 | github | commit |  | fix: skip onboarding for wallets with existing registered names Root cause: when a user connects on a new browser / cleared cache, metaAddr… |
| 2026-02-18 18:59:27 | github | commit |  | fix: add MP4 fallback for background video (iOS Safari support) iOS Safari doesn't support WebM. Convert bg.webm → bg.mp4 (H.264) and add a… |
| 2026-02-18 18:55:25 | github | commit |  | feat: docs visual components + page updates - Add AtomicSwapHook, KeyManagement, PaymentLinkCard visual components - Add docs/visuals page… |
| 2026-02-18 18:48:52 | github | commit |  | fix: make all docs visual components mobile responsive - ECDHKeyDerivation & PrivacyFlow: convert pixel positions to percentages, use aspec… |
| 2026-02-18 14:25:57 | github | commit |  | fix: comprehensive UX improvements for landing, navbar, and cross-browser onboarding Footer (landing page): - Remove X logo icon and Docs l… |
| 2026-02-18 14:10:18 | github | commit |  | feat: add Docs link and X profile to landing page - Header: ghost 'Docs' button (hidden on mobile) beside Connect Wallet - Footer: X (Twitt… |
| 2026-02-18 14:01:45 | github | commit |  | feat: add full documentation section - Add /docs route (publicly accessible, no wallet auth required) - Add Docs link to navbar with starts… |
| 2026-02-18 12:58:27 | github | commit |  | perf+test: fire-and-forget announce after send, remove CLAUDE.md from tracking - useStealthSend: announce is now fire-and-forget after tx c… |
| 2026-02-18 12:45:51 | github | commit |  | perf+test: async announce, StrictMode guard, full address display + tests |
| 2026-02-18 12:20:12 | github | commit |  | fix: dark text on green buttons + responsive navbar - Navbar: 3-col layout (logo | centered nav | wallet always visible) hamburger only col… |
| 2026-02-18 12:03:58 | github | commit |  | docs: note current Privy auth stack + planned Lit Protocol PKP migration |
| 2026-02-18 11:48:52 | github | commit |  | fix: simplify landing page connect — use Privy modal for everything - Remove separate Google/Email/Farcaster icon buttons from header - Sin… |
| 2026-02-18 11:39:19 | github | commit |  | fix: add missing AlertCircleIcon import in OnboardingWizard |
| 2026-02-18 11:36:25 | github | commit |  | feat: hash wallet addresses in localStorage keys for privacy Problem: localStorage keys like `dust_payments_0x742d35Cc...` directly fingerp… |
| 2026-02-18 02:44:01 | github | commit |  | feat: persist .tok names via on-chain discovery AuthContext: isOnboarded now checks on-chain names (isNamesSettled + ownedNames). useStealt… |
| 2026-02-18 01:35:59 | github | commit |  | Update README.md |
| 2026-02-18 01:33:19 | github | commit |  | docs: rewrite README with full privacy swaps coverage, move contracts to docs/CONTRACTS.md - Give Privacy Swaps equal standing with Stealth… |
| 2026-02-18 01:17:37 | github | commit |  | docs: rewrite README end-to-end with all current features |
| 2026-02-18 01:05:26 | github | commit |  | feat: landing page overhaul — video bg, mono logo, DecryptedText effect, remove SpiritPortal |
| 2026-02-18 00:24:22 | github | commit |  | chore: update app icon, remove stale docs and unused V2UI components |
| 2026-02-18 00:24:17 | github | commit |  | feat(activities/design): update activities page and design tokens |
| 2026-02-18 00:24:11 | github | commit |  | feat(settings/pay): update account section and no-opt-in payment UI |
| 2026-02-18 00:24:07 | github | commit |  | feat(onboarding): update onboarding wizard and step components |
| 2026-02-18 00:24:01 | github | commit |  | feat(chain-selector): update chain selector styles and behavior |
| 2026-02-18 00:23:57 | github | commit |  | feat(hooks): update swap pool and note hooks for dust protocol |
| 2026-02-18 00:23:51 | github | commit |  | feat(swap): improve swap card UI and deposit modal |
| 2026-02-18 00:23:44 | github | commit |  | fix(swap): responsive mobile layout for pool stats and composition |
| 2026-02-18 00:23:26 | github | commit |  | feat(navbar): replace chain/address/disconnect into single wallet dropdown button |
| 2026-02-17 22:51:55 | github | commit |  | fix: replace all indigo/blue colors with terminal green (#00FF41) Replaces all hardcoded #4A75F0, #4F46E5, #2B5AE2, rgba(74,117,240,...), r… |
| 2026-02-17 22:39:14 | github | commit |  | fix: apply terminal aesthetic to pools page |
| 2026-02-17 22:28:09 | github | commit |  | feat: final Chakra cleanup + build fixes Port all remaining Chakra UI files to plain HTML + inline styles: - src/app/pay/[name]/page.tsx -… |
| 2026-02-17 22:17:28 | github | commit |  | feat: port remaining Chakra components to Tailwind - ConnectButton: replaced Box/Text/HStack with plain divs and Tailwind - SpiritPortal: r… |
| 2026-02-17 22:13:53 | github | commit |  | feat: port swap sub-components to Tailwind Replace all @chakra-ui/react imports in TokenInput, TokenSelector, DepositModal, SwapExecuteModa… |
| 2026-02-17 22:11:24 | github | commit |  | feat: port ActivityList, LinkCard, QRModal to Tailwind Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com> |
| 2026-02-17 22:10:54 | github | commit |  | feat: port onboarding wizard components to Tailwind Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com> |
| 2026-02-17 22:10:37 | github | commit |  | feat: rewrite swap page with terminal UI Replace Chakra UI layout with Tailwind CSS terminal aesthetic. Implements three-column desktop lay… |
| 2026-02-17 22:09:57 | github | commit |  | feat: port settings section components to Tailwind Replace all @chakra-ui/react imports (Box, Text, VStack, HStack, Button) with plain HTML… |
| 2026-02-17 22:08:20 | github | commit |  | feat: rewrite SwapCard with terminal UI Replaces Chakra UI with Tailwind CSS terminal aesthetic. Preserves all hook wiring (useSwapNotes, u… |
| 2026-02-17 22:07:42 | github | commit |  | feat: port activities, pools, wallet, links, settings pages to tailwind Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com> |
| 2026-02-17 22:06:50 | github | commit |  | feat: rewrite dashboard page with terminal UI Replace Chakra UI layout with Tailwind terminal aesthetic — STEALTH_WALLET header, PrivacyPoo… |
| 2026-02-17 22:04:08 | github | commit |  | feat: port dashboard modals to tailwind terminal style Replace Chakra UI (Box/Text/VStack/HStack/Input/Button) with Tailwind divs following… |
| 2026-02-17 22:03:13 | github | commit |  | feat: port onboarding, PinGate, and landing page to tailwind terminal style Removes all Chakra UI imports from PinGate, onboarding page, an… |
| 2026-02-17 22:02:36 | github | commit |  | feat: add NoteSelector, port PoolStats, create PoolComposition (tailwind) Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com> |
| 2026-02-17 22:01:58 | github | commit |  | feat: port PersonalLinkCard and AddressBreakdownCard to tailwind |
| 2026-02-17 22:01:00 | github | commit |  | feat: port RecentActivityCard to tailwind terminal style |
| 2026-02-17 22:00:56 | github | commit |  | feat: add PrivacyPoolCard component (tailwind terminal style) |
| 2026-02-17 22:00:34 | github | commit |  | feat: replace sidebar with top navbar (terminal style) |
| 2026-02-17 22:00:22 | github | commit |  | feat: port UnifiedBalanceCard to tailwind terminal style |
| 2026-02-17 21:59:40 | github | commit |  | feat: add v2ui terminal background effects to root layout |
| 2026-02-17 21:56:57 | github | commit |  | feat: add tailwind css, remove chakra ui Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com> |
| 2026-02-17 21:50:54 | github | commit |  | docs: add v2ui terminal migration implementation plan 18-task plan: config setup, navbar, dashboard components, swap components, remaining… |
| 2026-02-17 21:46:24 | github | commit |  | docs: add V2UI terminal aesthetic migration design Full app UI overhaul design doc: replace Chakra UI with Tailwind CSS, port V2UI terminal… |
| 2026-02-17 19:00:45 | github | commit |  | fix: isolate deposit notes per wallet address in IndexedDB Notes were stored globally in IndexedDB without any wallet binding. Switching ac… |
| 2026-02-17 18:43:45 | github | commit |  | privacy: fixed denominations, wait time, relayer hardening + fix USDC Merkle tree sync Privacy fixes (5/5): - Fixed denominations: 10 tiers… |
| 2026-02-17 17:49:53 | github | commit |  | chore: remove stale documentation - Remove deprecated deployment docs, plans, and QA reports - These docs referenced old architecture and a… |
| 2026-02-17 17:49:41 | github | commit |  | chore: cleanup config and stale references - tsconfig.json: exclude relayer/ from main project compilation - next.config.js: config updates… |
| 2026-02-17 17:49:29 | github | commit |  | refactor(relayer): convert from CommonJS JavaScript to TypeScript - index.js → index.ts: full ES module conversion with typed interfaces -… |
| 2026-02-17 17:49:14 | github | commit |  | feat(frontend): rewire swap flow for V2 privacy architecture - chains.ts: update V2 deployed addresses (pools, hook, router) - useDustSwap.… |
| 2026-02-17 17:48:56 | github | commit |  | feat(contracts): V2 deploy scripts & Sepolia broadcast artifacts - DeployV2.s.sol: full V2 deployment (pools, hook, router, permissions) -… |
| 2026-02-17 17:48:40 | github | commit |  | feat(contracts): V2 privacy swap architecture - DustSwapHook: add afterSwapReturnDelta, explicit owner constructor param - DustSwapPoolETH/… |
| 2026-02-17 16:08:35 | github | commit |  | refactor: deduplicate constants in UI, ZK circuits, and merkle trees - SwapCard.tsx: chain ID → DEFAULT_CHAIN_ID, slippage → DEFAULT_SLIPPA… |
| 2026-02-17 16:08:25 | github | commit |  | refactor: replace magic numbers in swap hooks with shared constants - useDustSwap.ts: gas limit → SWAP_GAS_LIMIT, timeout → TX_RECEIPT_TIME… |
| 2026-02-17 16:08:15 | github | commit |  | fix: remove hardcoded addresses, chain IDs, and URLs from contracts/relayer - contracts.ts: pool key uses getUSDCAddress(chainId) instead o… |
| 2026-02-17 16:08:05 | github | commit |  | refactor: centralize hardcoded constants into constants.ts Add shared constants for values previously duplicated across files: - SWAP_GAS_L… |
| 2026-02-17 15:55:36 | github | commit |  | fix: use wallet transport for tx receipt polling to avoid RPC mismatch After MetaMask submits a swap tx via its own RPC (Infura), publicCli… |
| 2026-02-17 15:01:52 | github | commit |  | clean: remove obsolete test scripts |
| 2026-02-17 15:01:01 | github | commit |  | fix(misc): add missed file updates (page, script, verifier) |
| 2026-02-17 14:59:28 | github | commit |  | fix(build): add missing api route updates for merkle tree singleton |
| 2026-02-17 14:38:19 | github | commit |  | chore(scripts): update deployment and verification scripts |
| 2026-02-17 14:38:19 | github | commit |  | feat(ui): limit chain config and update pool stats |
| 2026-02-17 14:38:00 | github | commit |  | fix(contracts): align hook abi and remove stale check |
| 2026-02-17 14:38:00 | github | commit |  | fix(client): update zk proof encoding and abi definitions |
| 2026-02-17 14:38:00 | github | commit |  | fix(build): resolve grimswap ref and server initialization |
| 2026-02-17 08:40:44 | github | commit |  | ui(mobile): redesign landing page with glassmorphism cards and improved layout |
| 2026-02-17 08:24:48 | github | commit |  | chore(mobile): optimize background image loading and refine layout |
| 2026-02-17 08:15:05 | github | commit |  | fix(dashboard): display outgoing payments and connect privacy pool logic |
| 2026-02-16 23:51:48 | github | commit |  | fix(swap): Resolving ABI mismatch and missing params in Swap Execution |
| 2026-02-16 23:43:40 | github | commit |  | fix(swap): update Quoter ABI to match V4 nested PoolKey signature |
| 2026-02-16 23:34:00 | github | commit |  | fix(script): correct LIQUIDITY_DELTA in init script and add liquidity injection script |
| 2026-02-16 23:31:41 | github | commit |  | feat(ui): implement mobile responsive landing page with custom background |
| 2026-02-16 23:25:10 | github | commit |  | fix(pool): re-initialize pool with Fee=3000 and correct sqrtPriceX96 to fix price scaling bug |
| 2026-02-16 23:17:25 | github | commit |  | fix(swap): add missing sqrtPriceLimitX96 to Quoter ABI |
| 2026-02-16 23:13:20 | github | commit |  | chore: update initialization script for low-balance testnet usage |
| 2026-02-16 23:03:25 | github | commit |  | chore: redeploy DustSwapHook with ABI fix (uint256[8]) Deployed to Sepolia: 0x06829AAC5bF68172158DE18972fb1107363500C0 - Fixes ABI mismatch… |
| 2026-02-16 22:56:22 | github | commit |  | fix: dashboard display bugs + swap gas/revert handling Dashboard fixes: - usePoolStats.ts: Fixed sqrtPriceToHumanPrice using bigint math to… |
| 2026-02-16 22:49:17 | github | commit |  | fix: align ABI encoding to uint256[8] across circuit, contracts, and frontend The ZK circuit (PrivateSwap.circom) outputs 8 public signals… |
| 2026-02-16 22:39:35 | github | commit |  | fix: add reserved1/reserved2 circuit inputs to match compiled WASM The compiled WASM expects 51 inputs (8 public + 43 private) but the code… |
| 2026-02-16 22:08:57 | github | commit |  | fix: resolve TypeScript build errors for Vercel deployment - Replace Box as="input" with native <input> in pools/page.tsx - Replace Box as=… |
| 2026-02-16 21:59:48 | github | commit |  | build fix |
| 2026-02-16 21:50:36 | github | commit |  | chore: bump version to 1.1.0 for privacy swaps release Mark release with privacy swaps feature and gas optimizations. Includes 51% gas redu… |
| 2026-02-16 21:50:13 | github | commit |  | docs: add comprehensive testing guide for privacy swaps Document complete test flow from deposit to swap execution. Include gas benchmarks,… |
| 2026-02-16 21:49:36 | github | commit |  | docs: add gas optimization details to contracts README Document all implemented optimizations with gas savings. Provide breakdown of perfor… |
| 2026-02-16 21:49:13 | github | commit |  | docs: add changelog documenting privacy swaps release Document new privacy swaps feature and gas optimizations. Track performance improveme… |
| 2026-02-16 21:48:48 | github | commit |  | docs: add comprehensive privacy swaps documentation Add detailed documentation covering architecture, user flow, and security. Include gas… |
| 2026-02-16 21:48:03 | github | commit |  | docs: add privacy swaps feature to README Document new private token swap functionality using Uniswap V4 hooks. Include gas optimization de… |
| 2026-02-16 21:47:03 | github | commit |  | refactor: update swap hook proof encoding Encode 6 public signals instead of 8 in hookData. Matches optimized circuit without reserved sign… |
| 2026-02-16 21:45:51 | github | commit |  | refactor: update proof generation for 6-signal circuit Remove reserved1/reserved2 from public signals array. Matches optimized circuit with… |
| 2026-02-16 21:45:44 | github | commit |  | refactor: update proof decoding for 6 public signals Update beforeSwap hook to decode uint256[6] instead of uint256[8]. Aligns with circuit… |
| 2026-02-16 21:45:38 | github | commit |  | perf: remove unconstrained reserved signals from circuit Remove unused reserved1 and reserved2 public signals. Reduces circuit complexity f… |
| 2026-02-16 21:45:22 | github | commit |  | perf: implement O(1) root lookup with mapping Replace O(100) linear search with constant-time mapping lookup. Saves ~208k gas per swap by e… |
| 2026-02-16 11:09:00 | github | commit |  | feat: update configuration for privacy swaps - Add DustSwap contract addresses to chain config - Update deployed hook and verifier addresse… |
| 2026-02-16 11:08:53 | github | commit |  | docs: add deployment and QA documentation - Deployed contract endpoints - Deployment checklist and commands - Graph deployment guide and st… |
| 2026-02-16 11:08:47 | github | commit |  | feat: add subgraph for event indexing - The Graph subgraph configuration - GraphQL schema for deposits and withdrawals - Mapping handlers f… |
| 2026-02-16 11:08:41 | github | commit |  | feat: add /swap page and navigation - Privacy swap page with clean interface - Add swap to sidebar navigation - Swap icon integration - Rou… |
| 2026-02-16 11:08:32 | github | commit |  | feat: add privacy swap UI components - SwapForm with token selection - Deposit flow with ZK commitment - Withdraw flow with proof generatio… |
| 2026-02-16 11:08:27 | github | commit |  | feat: add swap React hooks - useSwapDeposit for pool deposits - useSwapWithdraw for private withdrawals - useSwapQuote for price estimation… |
| 2026-02-16 11:08:21 | github | commit |  | feat: add swap core library - ZK proof generation with snarkjs - Web Worker for non-blocking proofs - Poseidon commitments and nullifiers -… |
| 2026-02-16 11:08:14 | github | commit |  | feat: add DustSwap contracts - Add all Solidity contracts for privacy swaps - MerkleTree and Groth16 verifier implementations - DustSwapPoo… |
| 2026-02-16 11:06:25 | github | commit |  | feat: add ZK circuit files for privacy-preserving swaps - Add privateSwap.wasm and privateSwap_final.zkey - Add verification_key.json for G… |
| 2026-02-15 16:00:57 | github | commit |  | chore: update env example, dependencies, and build config |
| 2026-02-15 16:00:53 | github | commit |  | refactor: improve name resolution and pool-deposit validation - Refactor useStealthName hook for cleaner state management - Add DUST_POOL_A… |
| 2026-02-15 16:00:47 | github | commit |  | feat: switch default chain to Ethereum Sepolia and auto-switch wallet - Change DEFAULT_CHAIN_ID from Thanos Sepolia to Ethereum Sepolia - A… |
| 2026-02-15 16:00:42 | github | commit |  | fix: pool eligibility filter requires actual balance not just original amount - Changed poolEligibleCount to check current balance > 0.0001… |
| 2026-02-15 16:00:36 | github | commit |  | fix: reconcile DustPool deposits with on-chain state before withdrawal - Prune phantom deposits from localStorage that don't exist on-chain… |
| 2026-02-15 16:00:28 | github | commit |  | fix: restore stealth key re-derivation and auto-claim from dashboard - Add effect to re-derive private keys after page refresh using comput… |
| 2026-02-15 16:00:20 | github | commit |  | fix: resolve EIP-7702 BigInt serialization and gas estimation failures - Convert viem signAuthorization BigInt fields (v, chainId, nonce, y… |
| 2026-02-14 23:56:10 | github | commit |  | fix: suppress TypeScript error for polymorphic Box href prop |
| 2026-02-14 23:48:00 | github | commit |  | fix: correct TypeScript error for support email link in footer |
| 2026-02-14 23:41:03 | github | commit |  | fix: add npm overrides to resolve viem peer dependency conflicts on Vercel |
| 2026-02-14 23:30:58 | github | commit |  | feat: improve navbar branding and fix Vercel deployment - Update logo color to indigo accent for better brand cohesion - Improve Dust Proto… |
| 2026-02-14 23:26:32 | github | commit |  | feat: improve username search input visibility with enhanced styling |
| 2026-02-14 23:26:06 | github | commit |  | refactor: remove 3-step explainer cards from landing page |
| 2026-02-14 23:24:52 | github | commit |  | feat: add support email to landing page footer |
| 2026-02-14 23:22:08 | github | commit |  | feat: add Twitter social login support - Enable Twitter authentication in Privy configuration - Update dependencies for social auth provide… |
| 2026-02-14 23:21:21 | github | commit |  | perf: optimize onboarding flow for instant activation - Auto-submit PIN after 6 digits without manual button click - Remove 3-second delay… |
| 2026-02-14 18:31:41 | github | commit |  | test: add EIP-7702 end-to-end test scripts Added test scripts for manual verification of EIP-7702 flows: - test-7702-drain-e2e.mjs: Tests d… |
| 2026-02-14 18:31:33 | github | commit |  | feat: deploy StealthSubAccount7702 with reentrancy guard fix Updated Ethereum Sepolia configuration to use the new StealthSubAccount7702 de… |
| 2026-02-14 18:31:18 | github | commit |  | fix: implement OpenZeppelin ReentrancyGuard and key zeroization Security improvements: - Replace custom reentrancy guard with OpenZeppelin'… |
| 2026-02-14 17:27:00 | github | commit |  | fix: resolve name display timing issue after registration Fixes race condition where newly registered names would briefly show old names or… |
| 2026-02-14 16:30:09 | github | commit |  | docs: update technical documentation for multi-chain and EIP-7702 Update docs/technical.md with: - Multi-chain architecture details - EIP-7… |
| 2026-02-14 16:05:13 | github | commit |  | docs: update README with C1-fixed DustPool addresses for both chains Update contract addresses in README.md: - Thanos Sepolia: new C1-fixed… |
| 2026-02-14 16:03:50 | github | commit |  | feat: deploy C1-fixed DustPool to Ethereum Sepolia Deploy DustPool with C1 audit fix (amount validation) to Ethereum Sepolia. New contract… |
| 2026-02-14 15:33:19 | github | commit |  | fix: resolve onboarding loop for existing users Add address guards to prevent race condition where isConnected becomes true before address… |
| 2026-02-14 14:42:31 | github | commit |  | fix: scope claimToPool preference by chainId and address - Change from global 'dust_claim_to_pool' to scoped 'dust_claim_to_pool_{chainId}_… |
| 2026-02-14 14:42:15 | github | commit |  | fix: comprehensive dark theme visibility improvements Root-level fixes: - Add data-theme="dark" and colorScheme: "dark" to html element - R… |
| 2026-02-14 14:42:01 | github | commit |  | fix: address edge cases in storage, validation, and UX Storage and state management: - Add missing activeChainId dependency in useDustPool… |
| 2026-02-14 14:41:47 | github | commit |  | fix: improve nonce handling and add double-submit guards Nonce fixes: - autoClaimLegacy now reads deployed wallet nonce before signing - sw… |
| 2026-02-14 14:41:34 | github | commit |  | fix: resolve integration issues with gas limits, RootSync, and nonces - Increase sponsor-claim gas limit from 300K to 600K for deployAndDra… |
| 2026-02-14 14:41:16 | github | commit |  | fix: resolve critical race conditions and name discovery bug Scanner fixes: - Add key snapshots in tryAutoClaim and depositToPool to preven… |
| 2026-02-14 14:41:02 | github | commit |  | feat: deploy C1-fixed DustPool contract to Thanos Sepolia Deploy new DustPool contract with C1 audit fix (amount validation). - DustPool: 0… |
| 2026-02-14 13:39:22 | github | commit |  | fix: eliminate onboarding loop, wrong name display, and performance issues Critical bug fixes: - Fix onboarding loop by restructuring isOnb… |
| 2026-02-14 13:04:51 | github | commit |  | fix: resolve onboarding loop, name registration, and dark theme issues Critical fixes: - Fix onboarding loop where existing users forced to… |
| 2026-02-14 11:50:57 | github | commit |  | feat: display username in Sidebar navigation Show registered .tok name in Sidebar when available, falling back to truncated wallet address.… |
| 2026-02-14 11:50:40 | github | commit |  | fix: restore v0 SHA-512 key derivation for pre-audit user compatibility Audit H2 changed key derivation to PBKDF2 but the v1 compat path di… |
| 2026-02-14 11:49:50 | github | commit |  | feat: implement multi-chain discovery for name resolution Update discovery functions to query ALL supported chains in parallel instead of o… |
| 2026-02-14 11:49:20 | github | commit |  | feat: add chainId parameter to useStealthName for multi-chain support Thread activeChainId through all name resolution functions to enable… |
| 2026-02-14 11:47:33 | github | commit |  | fix: resolve name not showing in dashboard after registration Fix state synchronization bug where AuthContext and ActivateStep had separate… |
| 2026-02-13 20:50:03 | github | commit |  | fix: downgrade eslint to v8 for eslint-config-next@14 compatibility |
| 2026-02-13 20:30:19 | github | commit |  | fix: make production build pass for Vercel deployment - Replace Node http/https with native fetch in server-provider.ts (fixes webpack "Can… |
| 2026-02-13 20:00:15 | github | commit |  | fix: resolve 23 production readiness issues across naming, ERC-20, Gelato, and Privy Naming (7 fixes): - Fix warmFromCanonical to populate… |
| 2026-02-13 18:51:43 | github | commit |  | feat: add ERC-20 support, cross-chain Merkle naming, Gelato relay, Privy social login, and UX fixes - ERC-20 token support: token config re… |
| 2026-02-13 15:23:44 | github | commit |  | Add project scaffold: monorepo config, docs, and README Set up npm workspaces monorepo with TypeScript base config, gitignore, CLAUDE.md wi… |
| 2026-02-13 15:23:44 | github | commit |  | Add backend server: Express API, SQLite storage, WebSocket Includes hooks endpoint, MCP tool routes, team presence, conflict detection, con… |
| 2026-02-13 15:23:44 | github | commit |  | Add MCP server: stdio transport for Claude Code integration Provides team-aware tools (team_status, check_conflicts, recent_changes, send_m… |
| 2026-02-13 15:23:44 | github | commit |  | Add CLI: crew init, slash commands, agents, and hook script crew init bootstraps a project with hooks, MCP config, CLAUDE.md, slash command… |
| 2026-02-13 15:23:44 | github | commit |  | Add VS Code extension: sidebar, team chat, activity feed Team tree view, real-time activity feed with diff viewer, live chat panel, CLAUDE.… |
| 2026-02-13 15:23:44 | github | commit |  | Add plugin package, hooks, and end-to-end tests Claude Code plugin with commands, agents, and skills. Standalone hook scripts with settings… |
| 2026-02-13 15:12:52 | github | commit |  | feat: add EIP-7702 client helpers, API route, auto-claim, and UI badge - eip7702.ts: signDrain7702, signInitialize7702, buildSignedAuthoriz… |
| 2026-02-13 15:12:44 | github | commit |  | feat: wire EIP-7702 into chain config, types, address gen, and scanner - Add subAccount7702 field to ChainContracts (Eth Sepolia: deployed… |
| 2026-02-13 15:12:26 | github | commit |  | feat: add StealthSubAccount7702 contract for EIP-7702 delegation EIP-7702 (Pectra) allows stealth EOAs to delegate code to a single impleme… |
| 2026-02-13 12:01:52 | github | commit |  | Update docs for multi-chain support Add Ethereum Sepolia contract addresses, supported networks table, chain config architecture docs, chai… |
| 2026-02-13 11:54:34 | github | commit |  | feat: add chain selector UI and wire activeChainId to all pages - New ChainSelector dropdown in sidebar (desktop + mobile) - Dashboard, Act… |
| 2026-02-13 11:54:24 | github | commit |  | feat: update client hooks and libs for multi-chain - providers.ts: add getChainProvider/getChainBatchProvider - address.ts: all compute fun… |
| 2026-02-13 11:54:12 | github | commit |  | feat: refactor 11 API routes for multi-chain support All API routes now accept chainId from request body/query and use getChainConfig() for… |
| 2026-02-13 11:54:01 | github | commit |  | feat: allow Deploy4337 to use canonical EntryPoint via env var Skip EntryPoint deployment when ENTRY_POINT env var is set. Enables deployme… |
| 2026-02-13 11:53:51 | github | commit |  | feat: add multi-chain config registry and refactor types Central chain config at src/config/chains.ts maps chainId to RPC URLs, contract ad… |
| 2026-02-13 09:32:41 | github | commit |  | fix: increase handleOps gas overhead for DustPool deposits EntryPoint v0.6 innerHandleOp checks gasleft() < callGasLimit + verificationGasL… |
| 2026-02-12 03:18:36 | github | commit |  | fix: stealth wallets deposit directly into DustPool for privacy Previously all DustPool deposits came from the sponsor wallet, creating a s… |
| 2026-02-11 18:34:22 | github | commit |  | feat: integrate Privy for social login (Google, Discord, email, Apple) Users can now sign in with social accounts or external wallets. Priv… |
| 2026-02-11 15:28:05 | github | commit |  | chore: add circuit verification key + reproducible build script - Commit verification_key.json alongside circom source so the circuit ↔ Gro… |
| 2026-02-11 12:43:48 | github | commit |  | docs: update all documentation to match current project state Update contract addresses in docs/stealth-addresses.md and docs/technical.md… |
| 2026-02-11 12:35:11 | github | commit |  | docs: rename consolidate to withdraw in README Consistent with the UI terminology update — deposit into the pool, withdraw from the pool. |
| 2026-02-11 12:34:07 | github | commit |  | ui: rename consolidate to withdraw in pool UI Simpler, more intuitive language — users deposit into the pool and withdraw from it. Updated… |
| 2026-02-11 12:31:37 | github | commit |  | docs: comprehensive README covering full protocol architecture Updated to reflect the complete Dust Protocol feature set including DustPool… |
| 2026-02-11 12:27:53 | github | commit |  | feat: add privacy pool UI — consolidate modal + dashboard integration - ConsolidateModal: recipient input, deposit list, ZK proof progress… |
| 2026-02-11 12:27:47 | github | commit |  | feat: add pool management hook + scanner integration - useDustPool: loads deposits from localStorage, consolidate via ZK proofs - useStealt… |
| 2026-02-11 12:27:38 | github | commit |  | feat: add sponsored pool deposit + withdraw API routes - /api/pool-deposit: drains stealth wallet to sponsor, deposits into DustPool with 8… |
| 2026-02-11 12:27:32 | github | commit |  | feat: add ZK proving assets + client-side DustPool library - public/zk/: WASM (1.7MB) + zkey (5.2MB) for browser proof generation - src/lib… |
| 2026-02-11 12:27:24 | github | commit |  | feat: add DustPool tests + deployment to Thanos Sepolia 10 Foundry tests: happy path, double-spend, invalid proof, stale root, zero deposit… |
| 2026-02-11 12:27:16 | github | commit |  | feat: add DustPool Solidity contracts - DustPool.sol: deposit/withdraw with Groth16 verification, nullifier double-spend protection, 30-roo… |
| 2026-02-11 12:27:09 | github | commit |  | feat: add DustPool ZK withdrawal circuit Groth16 circuit for private pool withdrawals — proves Merkle membership without revealing which de… |
| 2026-02-11 12:25:47 | github | commit |  | chore: update gitignore for DustPool build artifacts |
| 2026-02-11 10:01:47 | github | commit |  | feat: redesign pay page with tabbed layout and animated success state - Replace collapsible wallet flow with equal-weight tabs (Send with W… |
| 2026-02-11 10:01:29 | github | commit |  | fix: bridge wallet payment success to no-opt-in payment display When a user sends via connected wallet, the no-opt-in section now reflects… |
| 2026-02-11 06:55:52 | github | commit |  | add WalletConnect support for Electron and browsers without MetaMask - In browser with MetaMask: uses injected provider as before - In Elec… |
| 2026-02-11 06:40:24 | github | commit |  | add auto-update check on launch with digest comparison, auto-fix for all setup errors, and lsof-based port detection |
| 2026-02-10 14:02:37 | github | commit |  | fix: redeploy hardened factories + backward compat for legacy payments New StealthWalletFactory (0xbc8e...75D3) and StealthAccountFactory (… |
| 2026-02-10 13:39:29 | github | commit |  | fix: security hardening — reentrancy, sig malleability, key exposure, rate limiting Contracts: - Add nonReentrant guard + CEI fix to Stealt… |
| 2026-02-10 12:48:44 | github | commit |  | feat: sender navigation UX + 0x address support Add "Pay someone" search bar to landing page as primary CTA for senders, demote Connect Wal… |
| 2026-02-10 10:29:58 | github | commit |  | docs: update stealth-addresses and technical docs for ERC-4337 and unified dashboard |
| 2026-02-10 10:26:37 | github | commit |  | docs: update README with unified dashboard in features and roadmap |
| 2026-02-10 10:25:17 | github | commit |  | feat: unified multi-address dashboard with balance aggregation Replace historical StealthBalanceCard with UnifiedBalanceCard showing curren… |
| 2026-02-10 09:32:17 | github | commit |  | docs: rewrite relayer README for ERC-4337 gas sponsorship The standalone relayer service is deprecated. Document the current architecture:… |
| 2026-02-10 09:27:07 | github | commit |  | docs: update README with ERC-4337 architecture and contract addresses Reflect the shift from CREATE2 wallets to ERC-4337 stealth accounts a… |
| 2026-02-10 09:22:24 | github | commit |  | feat: add bundle API for ERC-4337 UserOperation submission Two-step self-bundling flow since Thanos Sepolia has no public ERC-4337 bundlers… |
| 2026-02-10 09:22:06 | github | commit |  | feat: integrate ERC-4337 accounts into scanner and claim flow New stealth payments now use ERC-4337 smart accounts instead of CREATE2 walle… |
| 2026-02-10 09:21:50 | github | commit |  | feat: add ERC-4337 stealth account contracts with paymaster Deploy StealthAccount (IAccount), StealthAccountFactory (CREATE2), and DustPaym… |
| 2026-02-10 05:40:03 | github | commit |  | docs: update README — move fresh address per query to done Update payment flow description to reflect server-side resolve API with eager pr… |
| 2026-02-10 05:39:25 | github | commit |  | docs: update for server-side resolve API and eager pre-announcement Update no-opt-in payment flow to reflect the new architecture: server g… |
| 2026-02-10 05:38:11 | github | commit |  | feat: server-side stealth address resolution with eager pre-announcement Add GET /api/resolve/[name] endpoint that resolves .tok names to f… |
| 2026-02-09 21:49:19 | github | commit |  | feat: integrate Railgun Privacy Pool for withdrawal unlinkability Deploy Railgun V2 contracts on Thanos Sepolia and integrate shield/unshie… |
| 2026-02-09 20:33:15 | github | commit |  | Tokamak Data Layer — on-chain data infrastructure for AI agents Full-stack blockchain data service with dual-mode architecture: MCP server… |
| 2026-02-09 10:09:45 | github | commit |  | chore: gitignore foundry build artifacts for stealth wallet contracts |
| 2026-02-09 10:09:38 | github | commit |  | feat: client-side signing for CREATE2 wallet claims autoClaimPayment() and claimPayment() check walletType — CREATE2 payments sign drain me… |
| 2026-02-09 10:09:32 | github | commit |  | feat: sponsor-claim supports CREATE2 deployAndDrain and legacy EOA Dual handler dispatches based on request shape: CREATE2 claims call fact… |
| 2026-02-09 10:09:24 | github | commit |  | feat: scanner checks both EOA and CREATE2 stealth addresses scanAnnouncements() now computes CREATE2 wallet address alongside EOA and match… |
| 2026-02-09 10:09:17 | github | commit |  | feat: add CREATE2 stealth wallet address computation and types Add factory address, creation code, and ABI constants to types. Implement co… |
| 2026-02-09 10:01:30 | github | commit |  | rewrite roadmap — CREATE2 wallets are done, update priorities moved CREATE2 stealth wallets from roadmap to "done", added architecture sect… |
| 2026-02-09 10:00:18 | github | commit |  | update readme with CREATE2 wallet factory and claim flow added StealthWalletFactory to contracts table, updated features to mention CREATE2… |
| 2026-02-09 09:53:58 | github | commit |  | fix tests for CREATE2 stealth wallets, add foundry edge cases stealth address generation now returns CREATE2 wallet addresses instead of ra… |
| 2026-02-09 08:47:25 | github | commit |  | Merge pull request #188 from tokamak-network/fix/drb-deployment-fixes fix: drb deployment issues found during testing |
| 2026-02-09 08:46:45 | github | commit |  | Merge pull request #173 from tokamak-network/fix/aws-sdk-regions replaced AWS CLI calls with AWS SDK v2 for GetAvailableRegions, loginAWS (… |
| 2026-02-09 08:32:07 | github | commit |  | resolved merge conflicts with main and fixed typed error handling as per PR #173 review kept SDK approach for aws calls, added env var cred… |
| 2026-02-09 07:53:39 | github | commit |  | docs: rewrite stealth-addresses + add full technical docs stealth-addresses.md now covers both payment flows, names, contracts, all pages,… |
| 2026-02-09 07:44:36 | github | commit |  | fix announcement retry + add privacy roadmap to readme announcement could silently fail after detecting a deposit, which meant the payment… |
| 2026-02-09 06:38:07 | github | commit |  | Merge pull request #176 from tokamak-network/fix/post-destroy-resource-cleanup added post destroy cleanup for orphaned AWS resources |
| 2026-02-09 06:37:21 | github | commit |  | feat: no-opt-in stealth payments on pay pages From https://ethresear.ch/t/interactive-no-opt-in-stealth-addresses/23274 — the receiver pre-… |
| 2026-02-09 05:10:44.004000 | slack | message |  | project_trh |
| 2026-02-09 04:37:32 | github | commit |  | added GetUninstallableIntegration and auto cleanup on install failure as per PR #39 review also updated all uninstall functions to use GetU… |
| 2026-02-09 04:37:06 | github | commit |  | fixed missing error handling in verify_cleanup as per PR #176 review added proper error checks and warning logs for all AWS resource cleanu… |
| 2026-02-08 13:38:17 | github | commit |  | add auto-fix for all setup errors: docker daemon start, port detection via lsof, stale container cleanup, disk prune, image pull retry, dep… |
| 2026-02-07 18:42:16 | github | commit |  | migrate renderer to React + Vite with terminal logs and port conflict resolution - replace monolithic setup.html with React component archi… |
| 2026-02-07 17:47:29 | github | commit |  | docs: update README with current contracts and features |
| 2026-02-07 17:45:17 | github | commit |  | chore: remove scripts and deployment files from repo These contain private keys and deployment utilities that should not be tracked in vers… |
| 2026-02-07 17:44:07.724000 | slack | message |  | tokamak-dev |
| 2026-02-07 17:43:30 | github | commit |  | feat: sponsored gas for all actions, fix link payment tracking - Add sponsored announce API (deployer pays gas for announcements) - Add spo… |
| 2026-02-07 17:38:43.234000 | slack | message |  | tokamak-dev |
| 2026-02-07 14:00:59 | github | commit |  | ui: redesign link detail page with consolidated stats and cleaner layout Overhaul the link detail page for better visual hierarchy: - Shrin… |
| 2026-02-07 14:00:52 | github | commit |  | fix: properly escape CSV export fields per RFC 4180 Wrap all CSV fields in double quotes and escape internal quotes to prevent data corrupt… |
| 2026-02-07 14:00:47 | github | commit |  | security: add rate limiting, input validation, and gas cap to sponsor-claim Harden the gas sponsorship API against abuse: - Rate limiting:… |
| 2026-02-07 14:00:42 | github | commit |  | perf: incremental scanning, batch RPC, and 30s background interval Three major performance improvements to the stealth scanner: 1. Incremen… |
| 2026-02-07 14:00:35 | github | commit |  | security: strengthen PIN key derivation with PBKDF2 (100k iterations) Replace single-round SHA-512 with PBKDF2-SHA512 at 100,000 iterations… |
| 2026-02-07 14:00:29 | github | commit |  | fix: remove private key leak from scanner console output Removed console.log statements that were printing prefixes of spending public key… |
| 2026-02-07 13:23:14 | github | commit |  | fix: support custom amount and link slug in test script |
| 2026-02-07 13:23:11 | github | commit |  | feat: add all app pages, components, and updated hooks |
| 2026-02-07 13:23:06 | github | commit |  | feat: add multi-page layout with sidebar navigation |
| 2026-02-07 13:23:02 | github | commit |  | feat: add auth context with PIN-based security |
| 2026-02-07 13:22:58 | github | commit |  | feat: add PIN-based key derivation and update stealth library |
| 2026-02-07 13:22:55 | github | commit |  | feat: add design system tokens and shared types |
| 2026-02-07 13:22:51 | github | commit |  | chore: add qrcode.react and uuid dependencies |
| 2026-02-07 13:21:32.382000 | slack | message |  | tokamak-dev |
| 2026-02-07 13:17:23.301000 | slack | message |  | tokamak-dev |
| 2026-02-07 13:15:59.012000 | slack | message |  | tokamak-dev |
| 2026-02-07 06:24:02 | github | commit |  | feat: combine .tok registration with on-chain registration Single-click registration now handles both name and on-chain identity. Added suc… |
| 2026-02-07 06:23:57 | github | commit |  | fix: scanner persistence, key validation, and contract address sync Always scan from DEPLOYMENT_BLOCK, persist payments to localStorage, va… |
| 2026-02-06 18:16:20 | github | commit |  | chore: add solc compiler for contract deployment Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com> |
| 2026-02-06 18:16:15 | github | commit |  | fix: UI alignment and Private button clickability - Fix page layout centering with flex container - Add proper padding to header and footer… |
| 2026-02-06 18:16:08 | github | commit |  | fix: redeploy contracts after testnet reset - Update fallback contract addresses to new deployments - ERC5564Announcer: 0x5ac18d5AdaC9b65E1… |
| 2026-02-06 08:21:18 | github | commit |  | chore: rebrand to Dust Protocol - Update package name and description - Update README with Dust Protocol branding - Update app title and br… |
| 2026-02-06 08:20:30 | github | commit |  | chore: add package-lock.json |
| 2026-02-06 08:19:42 | github | commit |  | docs: add project documentation - README with quick start guide - Architecture overview - Contract addresses and deployment info - API docu… |
| 2026-02-06 08:19:33 | github | commit |  | feat(scripts): add deployment scripts and manifests - Contract deployment script for Thanos Sepolia - Test payment script for E2E verificat… |
| 2026-02-06 08:19:25 | github | commit |  | test: add comprehensive test suite - Key generation and derivation tests - Stealth address computation tests - Contract interaction tests -… |
| 2026-02-06 08:19:17 | github | commit |  | feat(relayer): add privacy-preserving withdrawal service - Express.js relayer for private claims - EIP-1559 gas handling with safety buffer… |
| 2026-02-06 08:19:10 | github | commit |  | feat(app): add Next.js app with Thanos network config - App layout with Chakra UI provider - Main page with Private Wallet - Wagmi + React… |
| 2026-02-06 08:19:02 | github | commit |  | feat(ui): add Private Wallet interface - PrivateWallet: Main stealth wallet component - 5-tab navigation (Home/Send/Inbox/History/Settings)… |
| 2026-02-06 08:18:54 | github | commit |  | feat(hooks): add React hooks for stealth operations - useStealthAddress: Key generation and management - useStealthSend: Send to stealth ad… |
| 2026-02-06 08:18:45 | github | commit |  | feat(lib): add HD wallet, .tok names, and relayer client - HD wallet derivation for claim addresses - .tok naming system for human-readable… |
| 2026-02-06 08:18:38 | github | commit |  | feat(lib): add core stealth address cryptography - Key generation and derivation (secp256k1) - Stealth address computation (ERC-5564) - Vie… |
| 2026-02-06 08:18:29 | github | commit |  | feat(contracts): add ERC-5564/6538 stealth address contracts - ERC5564Announcer: Payment announcement registry - ERC6538Registry: Stealth m… |
| 2026-02-06 08:18:17 | github | commit |  | chore: initialize Dust Protocol project - Set up Next.js 14 with TypeScript - Configure dependencies for stealth address system - Add envir… |
| 2026-02-06 07:43:06 | github | commit |  | feat(stealth): redesign Private Wallet UI with History tab - Add 5-tab navigation (Home/Send/Inbox/History/Settings) - Add History tab to t… |
| 2026-02-05 20:48:03 | github | commit |  | update wallet ui for electron compatibility - show walletconnect button in electron environment - keep metamask button for browser (no chan… |
| 2026-02-05 20:47:48 | github | commit |  | add walletconnect support to useWallet hook - detect electron environment via user agent - add connectWalletConnect function with qr modal… |
| 2026-02-05 20:46:49 | github | commit |  | add walletconnect dependencies for electron wallet support - add @walletconnect/ethereum-provider - add @walletconnect/modal |
| 2026-02-05 20:41:59.869000 | slack | message |  | project_trh |
| 2026-02-05 20:40:33.824000 | slack | message |  | project_trh |
| 2026-02-05 15:08:24 | github | commit |  | fix(relayer): use EIP-1559 gas params with safety buffer - Replace legacy gasPrice with EIP-1559 maxFeePerGas/maxPriorityFeePerGas - Add 5%… |
| 2026-02-05 14:56:02 | github | commit |  | fix(stealth): split gas estimation for send vs announce - Separate gas estimation for ETH transfer (21k) and announce (120k) - Add 5% buffe… |
| 2026-02-05 14:55:04 | github | commit |  | fix(stealth): add 5% safety buffer to claim gas calculation - Adds buffer to handle RPC timing differences in gas price - Prevents "insuffi… |
| 2026-02-05 10:28:47 | github | commit |  | fix(stealth): add retry logic and TOCTOU protection for claims - Add retry logic for transient network errors (3 attempts) - Re-check balan… |
| 2026-02-05 10:28:34 | github | commit |  | fix(stealth): add balance validation and gas estimation for sends - Validate balance + gas costs before sending transaction - Use direct Th… |
| 2026-02-05 10:28:25 | github | commit |  | fix(stealth): use direct RPC for name registry reads - Remove wallet provider dependency for read-only operations - Use direct Thanos RPC f… |
| 2026-02-05 06:40:44 | github | commit |  | Merge pull request #71 from tokamak-network/fix/dynamic-secret-value-timeout-v2 FIX: removed hardcoded 20s timeout in sendSecretValueReques… |
| 2026-02-05 05:21:48 | github | commit |  | add button debouncing and setup state tracking - prevent double clicks during setup with disabled state - track setupInProgress to block co… |
| 2026-02-05 05:21:40 | github | commit |  | fix memory leak in ipc event listeners - return cleanup functions from onPullProgress, onStatusUpdate, onInstallProgress - allows proper li… |
| 2026-02-05 05:21:30 | github | commit |  | add single instance lock and container cleanup on quit - prevent multiple app instances with requestSingleInstanceLock - stop containers gr… |
| 2026-02-04 15:22:57 | github | commit |  | add port checks, timeouts and process tracking to docker module - check ports 3000, 5433, 8000 availability before starting containers - ad… |
| 2026-02-04 13:40:57 | github | commit |  | docs: add stealth addresses readme - quick start, deployed contracts, code structure - add nav link to /stealth |
| 2026-02-04 13:35:32 | github | commit |  | feat(stealth): add test config & dependencies - vitest config for stealth tests - noble/curves, noble/hashes for crypto - relayer service s… |
| 2026-02-04 13:35:18 | github | commit |  | feat(stealth): add smart contracts - ERC5564Announcer: payment announcements - ERC6538Registry: meta-address storage - StealthNameRegistry:… |
| 2026-02-04 13:35:02 | github | commit |  | feat(stealth): add Private Wallet UI - PrivateWallet component with 4 views - Home: name registration, quick actions - Send: resolve names,… |
| 2026-02-04 13:34:44 | github | commit |  | feat(stealth): add React hooks for state management - useStealthAddress: unified key & claim management - useStealthScanner: scan blockchai… |
| 2026-02-04 13:34:33 | github | commit |  | feat(stealth): add core cryptography library - secp256k1 key generation & ECDH - stealth address computation - view tag filtering (99.6% ef… |
| 2026-02-04 13:23:28.882000 | slack | message |  | project-drb |
| 2026-02-03 12:26:38 | github | commit |  | Revert "convert rpc to wss for thanos sepolia" This reverts commit a55e540b9195b17242bfb1cbcfc2097d21aee6a9. |
| 2026-02-03 07:58:36.461000 | slack | message |  | project-drb |
| 2026-02-03 06:58:27.610000 | slack | message |  | project_trh |
| 2026-02-03 05:20:45.608000 | slack | message |  | project_trh |
| 2026-02-03 05:17:01.529000 | slack | message |  | project_trh |
| 2026-02-03 05:16:54.364000 | slack | message |  | project_trh |
| 2026-02-03 04:42:52 | github | commit |  | improve drb card layout and specs display |
| 2026-02-03 04:40:26 | github | commit |  | use maniis/drb-node:alpha image |
| 2026-02-03 04:33:23 | github | commit |  | fix envrc duplicates on re-deploy |
| 2026-02-03 04:30:30 | github | commit |  | add unique stack name for rds faced rds naming conflicts while testing multiple regular nodes, now uses stack id prefix |
| 2026-02-03 04:22:38.303000 | slack | message |  | project_trh |
| 2026-02-03 04:19:34 | github | commit |  | Initial release |
| 2026-02-03 04:19:24.982000 | slack | message |  | project_trh |
| 2026-02-02 20:30:55 | github | commit |  | convert rpc to wss for thanos sepolia thanos sepolia rpc doesn't support event subscriptions over https, need wss |
| 2026-02-02 14:50:32 | github | commit |  | fixed fee estimation to use actual callback gas limit from contract |
| 2026-02-02 14:32:29 | github | commit |  | added interact and monitoring tabs for DRB system stacks |
| 2026-02-02 08:17:09 | github | commit |  | Merge pull request #187 from tokamak-network/fix/drb-integration-fixes fix: drb integration fixes |
