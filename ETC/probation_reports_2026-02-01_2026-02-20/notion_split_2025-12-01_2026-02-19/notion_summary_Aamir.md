# Notion Summary - Aamir

## Overview
- Total events: 21
- Pages touched: 18
- Added blocks: 44
- Modified blocks: 6
- Event types: page: 11, content_diff: 10
- Primary editor: Aamir (11 events)
- Common themes (keywords): the, you, ethereum, and, that, what, problem, array

## Page Highlights
### Issue #1: Missing Commit-Reveal Verification
- Last edited: 2026-01-27T15:44:00.000Z
- Events: 3
- Leader election becomes manipulable and predictabl → Leader election can becomes manipulable and predic
- function reveal(uint256 revealValue) external { // ... validations ... if (s_cvsForLeaderSel
- Impact:

### Issue #2: Broken Index Management After Deactivation
- Last edited: 2026-01-27T15:59:00.000Z
- Events: 2
- → uint256 activatedOperatorsLength = s_activ
- Location: src/CommitReveal2WithLeaderSelection.sol
- Problem: When operators are deactivated during resume(), the s_activatedOperators array is reorganiz

### Why I Stopped Worrying About Key Rotation
- Last edited: 2025-12-09 06:31:00
- Events: 1
- No content summary available.

### The Cryptographic Magic Nobody Told You About
- Last edited: 2025-12-09 06:31:00
- Events: 1
- No content summary available.

### Multi-Sig vs Threshold Signatures: Which one to chose?
- Last edited: 2025-12-09 06:31:00
- Events: 1
- No content summary available.

### SYB Web3 foundational Bootcamp Proposal
- Last edited: 2025-12-16 22:54:00
- Events: 1
- No content summary available.

### Short Video Contents (Reels / Shorts)
- Last edited: 2026-01-06 06:51:00
- Events: 1
- No content summary available.

### Why public blockchain not private?
- Last edited: 2026-01-19 09:18:00
- Events: 1
- No content summary available.

### Leader Selection findings
- Last edited: 2026-01-27 15:40:00
- Events: 1
- No content summary available.

### Issue #2: Broken Index Management After Deactivation
- Last edited: 2026-01-27 15:53:00
- Events: 1
- No content summary available.

### Issue #3: Leader Selection Uses Full Array 
- Last edited: 2026-02-05 04:21:00
- Events: 1
- No content summary available.

### Leader Selection Uses Full Array 
- Last edited: 2026-02-05T04:30:00.000Z
- Events: 1
- Problem: Leader selection hashes the entire s_revealForLeaderSelection array, including zeros from n
- Current Code:
- uint256 indexForLeader = uint256(keccak256(abi.encodePacked(s_revealForLeaderSelection))) % activate

### Why public blockchain not private?
- Last edited: 2026-02-06T07:39:00.000Z
- Events: 1
- And here's the real problem. The moment someone c → And here's the real problem. The moment someone c

### What Is Ethereum?
- Last edited: 2026-02-10 16:25:00
- Events: 1
- No content summary available.

### What it expose?
- Last edited: 2026-02-10 16:26:00
- Events: 1
- No content summary available.

### What Is Ethereum?
- Last edited: 2026-02-10T16:26:00.000Z
- Events: 1
- Ethereum is often called the world's computer. But what does that actually mean?
- Ethereum is not just a cryptocurrency like Bitcoin. It's a platform. A programmable blockchain where
- These applications work through something called smart contracts. A smart contract is just code that

### What it expose?
- Last edited: 2026-02-10T16:26:00.000Z
- Events: 1
- Here's what most people don't realize about Ethereum.
- Everything you do is completely visible.
- Your wallet balance? Public. Every transaction you've made? Public. Every smart contract you've inte

### Short Video Contents (Reels / Shorts)
- Last edited: 2026-02-11T17:48:00.000Z
- Events: 1
- Is Ethereum Really Transparent or Just Public? → Is Ethereum Really Transparent or Just Public? (X)
- What Data Is Visible When You Send ETH → What Data Is Visible When You Send ETH (X)
- Why Privacy Is Missing in Ethereum → Why Privacy Is Missing in Ethereum (X)
