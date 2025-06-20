import React, { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";

import "./App.css";
import LockArtifact from "./LockABI.json";

const CONTRACT_ADDRESS = "0xBcc3B37e40eB3d8b177895191FF78cF1518aE283";
const CONTRACT_ABI = LockArtifact.abi;

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [jurorAddress, setJurorAddress] = useState("");
  const [description, setDescription] = useState("");
  const [evidenceURI, setEvidenceURI] = useState("");
  const [category, setCategory] = useState("");
  const [jurorsList, setJurorsList] = useState("");
  const [duration, setDuration] = useState("");
  const [cases, setCases] = useState([]);
  const [caseCount, setCaseCount] = useState(0);

  const handleError = (err) => {
    console.error(err);
    setError(err.message || "An error occurred");
    setTimeout(() => setError(null), 5000);
  };

  const connectWallet = async () => {
    try {
      setLoading(true);
      if (!window.ethereum) throw new Error("MetaMask not installed");
      const prov = new ethers.BrowserProvider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = await prov.getSigner();
      const account = await signer.getAddress();
      const ct = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // Commenting out owner check if contract doesn't include it
      // const ownerAddr = await ct.owner();
      // setIsOwner(ownerAddr.toLowerCase() === account.toLowerCase());
      setIsOwner(true); // Assume all connected users can act as owner (dev mode)

      setProvider(prov);
      setSigner(signer);
      setAccount(account);
      setContract(ct);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const loadCases = useCallback(async () => {
    if (!contract) return;
    try {
      setLoading(true);
      const count = await contract.caseCount();
      setCaseCount(Number(count));

      const arr = [];
      for (let i = 1; i <= count; i++) {
        const [desc, uri, cat, status, verdict, deadline] = await contract.getCaseSummary(i);
        arr.push({ id: i, desc, uri, cat, status, verdict, deadline: Number(deadline) });
      }
      setCases(arr);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [contract]);

  useEffect(() => {
    if (contract) loadCases();
  }, [contract, loadCases]);

  const handleRegisterJuror = async () => {
    if (!jurorAddress) return;
    try {
      setLoading(true);
      const tx = await contract.registerJuror(jurorAddress);
      await tx.wait();
      alert("Juror registered!");
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCase = async () => {
    try {
      setLoading(true);
      const jurorsArr = jurorsList.split(",").map(a => a.trim());
      const tx = await contract.createCase(description, evidenceURI, category, jurorsArr, Number(duration));
      await tx.wait();
      alert("Case created!");
      loadCases();
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (caseId, voteGuilty) => {
    try {
      setLoading(true);
      const tx = await contract.vote(caseId, voteGuilty);
      await tx.wait();
      alert("Vote cast!");
      loadCases();
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  if (!account) {
    return (
      <div className="wallet-connect-wrapper">
        <div className="wallet-connect-box">
          <h1>Jury System ⚖️</h1>
          <button onClick={connectWallet} disabled={loading}>
            {loading ? "Connecting..." : "Connect Wallet"}
          </button>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <h1>⚖️ Jury System</h1>
      <p><strong>Wallet:</strong> {account}</p>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {isOwner && (
        <>
          <section>
            <h2>Register Juror</h2>
            <input
              type="text"
              placeholder="Juror address"
              value={jurorAddress}
              onChange={e => setJurorAddress(e.target.value)}
            />
            <button onClick={handleRegisterJuror}>Register</button>
          </section>

          <section>
            <h2>Create Case</h2>
            <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
            <input type="text" placeholder="Evidence URI" value={evidenceURI} onChange={e => setEvidenceURI(e.target.value)} />
            <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
            <input type="text" placeholder="Jurors (comma-separated)" value={jurorsList} onChange={e => setJurorsList(e.target.value)} />
            <input type="number" placeholder="Duration (minutes)" value={duration} onChange={e => setDuration(e.target.value)} />
            <button onClick={handleCreateCase}>Create Case</button>
          </section>
        </>
      )}

      <section>
        <h2>All Cases ({caseCount})</h2>
        {cases.map(c => (
          <div key={c.id} className="case-card">
            <h3>Case #{c.id}: {c.desc}</h3>
            <p><strong>Category:</strong> {c.cat}</p>
            <p><strong>Verdict:</strong> {c.verdict}</p>
            <p><strong>Status:</strong> {["Pending","Resolved","Appealed"][c.status]}</p>
            <p><strong>Deadline:</strong> {new Date(c.deadline * 1000).toLocaleString()}</p>
            {c.status === 0 && (
              <div className="case-actions">
                <button onClick={() => handleVote(c.id, true)}>Vote Guilty</button>
                <button onClick={() => handleVote(c.id, false)}>Vote Not Guilty</button>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
