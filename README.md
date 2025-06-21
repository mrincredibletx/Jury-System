# ⚖️ Advanced Jury System 🧑‍⚖️  
Decentralized, Transparent, and Trustless Courtroom on the Blockchain

---

## 📚 Table of Contents
- [Project Title](#project-title)  
- [Project Description](#project-description)  
- [Project Vision](#project-vision)  
- [Future Scope](#future-scope)  
- [Key Features](#key-features)  
- [How It Works](#how-it-works)  
- [Frontend Showcase](#frontend-showcase)  
- [Smart Contract Details](#smart-contract-details)  
- [Contract Structure](#contract-structure)  
- [Access Control](#access-control)  
- [Contract Address](#contract-address)

---

## 📌 Project Title  
**Advanced Jury System** – A decentralized on-chain court-like mechanism built on Core DAO to enable fair voting, transparent case tracking, and juror-based verdict resolution.

---

## 🧾 Project Description  
The **Advanced Jury System** empowers decentralized governance in dispute resolution. Built on **Core DAO**, it allows an owner to create legal cases, assign jurors, and receive tamper-proof verdicts via smart contracts.  

By leveraging **on-chain voting**, **IPFS-based evidence**, and **reputation tracking**, the system ensures integrity, transparency, and accountability — eliminating the need for centralized control in arbitration systems.

---

## 🌐 Project Vision  
- **Trustless Justice**: Eliminate bias with code-enforced verdicts.  
- **On-Chain Transparency**: All actions and votes are logged and auditable.  
- **Juror Incentivization**: Encourage responsible voting via ETH rewards and reputation.  
- **Appeal Mechanism**: Support second-level reviews to maintain fairness.  
- **Scalable Arbitration**: A base system for DAOs, governance protocols, or decentralized courts.

---

## 🔭 Future Scope  
- **Multi-tier Court Support**: Implement appellate and supreme-level jurisdictions.  
- **Decentralized Juror Selection**: Use randomness or staking for fair juror assignment.  
- **Token-Based Governance**: Introduce native tokenomics for voting, penalties, and incentives.  
- **ZK Voting**: Enable anonymous but verifiable votes via Zero Knowledge Proofs.  
- **Mobile dApp**: Support for jury interaction on mobile platforms.  
- **Cross-Chain Case Handling**: Allow court usage across other EVM chains.  
- **Case Analytics Dashboard**: For reputation tracking, verdict patterns, and juror stats.

---

## 🧩 Key Features

| Feature | Description |
|--------|-------------|
| **Juror Registration** | Owner registers jurors with an initial reputation. |
| **Decentralized Case Creation** | Owner creates cases with category, description & IPFS evidence. |
| **On-Chain Voting** | Jurors cast votes (Guilty / Not Guilty) on-chain. |
| **Auto-Finalization** | Verdict determined when all jurors vote. |
| **Reputation Management** | Jurors gain/lose reputation based on participation and fairness. |
| **Appeal Support** | Owner can initiate appeals for reviewed verdicts. |
| **Rewards + Penalties** | ETH-based incentives and penalties based on activity and accuracy. |

---

## ⚙️ How It Works

1. **Connect Wallet** – Authenticate with MetaMask to access juror or owner features.  
2. **Register Jurors** – Owner assigns eligible addresses as jurors.  
3. **Create Case** – Owner submits case data and IPFS-stored evidence.  
4. **Vote on Case** – Jurors vote “Guilty” or “Not Guilty” via the frontend.  
5. **View Verdict** – Verdict automatically finalized once all votes are submitted.  
6. **Request Appeal** – Owner can file an appeal for re-evaluation.

---

## 🖼 Frontend Showcase
### Contract Address
0xD84Dfcac2d5b618EfA89342a0887B1DAB60DFb65

### Demo Preview

![Jury System Preview](https://github.com/user-attachments/assets/68495bd7-e079-4bfc-8a53-e95ad872b646)

### 1. Home – Connect Your Wallet  
![Screenshot 2025-06-20 184545](https://github.com/user-attachments/assets/b4b7fad6-5329-4dc2-85f5-592716e53834)

### 2. Juror Dashboard  
![Screenshot 2025-06-20 185852](https://github.com/user-attachments/assets/a243a1be-476f-4377-8558-104f30822d98)

### 3. Case Details  
![Screenshot 2025-06-20 192407](https://github.com/user-attachments/assets/420116ca-db2c-4f37-9036-b85161166f11)

![Screenshot 2025-06-20 192430](https://github.com/user-attachments/assets/4808176c-1f5a-434b-a2f2-b183c5f22fd2)

---

## 📜 Smart Contract Details

| Item | Value |
|------|-------|
| **Language** | Solidity ^0.8.28 |
| **Network** | Core DAO (EVM-compatible) |
| **Contract Name** | `AdvancedJurySystem` |
| **License** | MIT |
| **Frontend** | ReactJS + Ethers.js + TailwindCSS |

---

## 🧬 Contract Structure

### 🏗 Structs:
- **Juror**: Tracks address, reputation, penalties, participation count.  
- **Case**: Stores title, description, IPFS evidence, jurors, votes, verdict, and status.

### 📚 Enums:
- `Verdict`: `NotVoted`, `Guilty`, `NotGuilty`  
- `CaseStatus`: `Pending`, `Resolved`, `Appealed`

---

## 🔐 Access Control

| Function          | Access Level        |
|-------------------|---------------------|
| `registerJuror`   | Only `owner`        |
| `createCase`      | Only `owner`        |
| `vote`            | Only `registered jurors` |
| `requestAppeal`   | Only `owner`        |

---

## 📦 Example Function

### Juror Registration
```solidity
function registerJuror(address _juror) external onlyOwner;
