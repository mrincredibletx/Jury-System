# ⚖️ AdvancedJurySystem 🧑‍⚖️
A decentralized smart contract jury system built on Core DAO, where registered jurors vote on cases using on-chain logic and incentives. Designed for trustless decision-making, transparent case handling, and fair appeal support.

---

## 📜 Smart Contract Details

- **Language**: Solidity ^0.8.28  
- **Network**: Core DAO / EVM-Compatible  
- **License**: MIT  
- **Contract Name**: `AdvancedJurySystem`  
- **Deployment**: Verified on Core DAO testnet / mainnet  
- **Frontend**: ReactJS + Ethers.js + TailwindCSS  

---

## 💡 Features

✅ Owner can register jurors with default reputation  
✅ Create cases with category, description & evidence (IPFS URI)  
✅ Minimum 3 jurors per case (customizable)  
✅ Jurors vote on case (Guilty / Not Guilty)  
✅ Auto-finalization on all votes  
✅ Reward system (in ETH)  
✅ Juror reputation tracking + penalties  
✅ Appeal support for resolved cases  
✅ Case status tracking & verdict summary  

---
## 🧩 Contract Structure

### Structs:
- `Juror`: Reputation, penalties, participation tracking  
- `Case`: Core case data, jurors, votes, verdicts, status, timestamps

### Enums:
- `Verdict`: NotVoted, Guilty, NotGuilty  
- `CaseStatus`: Pending, Resolved, Appealed

---

## 🔐 Access Control

| Function            | Access Level   |
|---------------------|----------------|
| `registerJuror`     | Only `owner`   |
| `createCase`        | Only `owner`   |
| `vote`              | Only `registered jurors` |
| `requestAppeal`     | Only `owner`   |

---

## 📦 Functions Overview

### Juror Management
```solidity
function registerJuror(address _juror) external onlyOwner;
 ```
## Contract Address
0x0C997Be7788F3f6E78B5879f6B00eA8511c35Df9

![Screenshot 2025-03-17 153446](https://github.com/user-attachments/assets/68495bd7-e079-4bfc-8a53-e95ad872b646)


