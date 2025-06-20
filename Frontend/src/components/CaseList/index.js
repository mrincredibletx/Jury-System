import React, { useEffect, useState } from "react";

const CaseList = ({ contract }) => {
  const [caseCount, setCaseCount] = useState(0);
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const loadCases = async () => {
      try {
        const count = await contract.caseCount();
        setCaseCount(count.toNumber());

        const caseArr = [];
        for (let i = 1; i <= count; i++) {
          const c = await contract.getCaseSummary(i);
          caseArr.push({ id: i, ...c });
        }
        setCases(caseArr);
      } catch (err) {
        console.error("Failed to load cases:", err);
      }
    };

    if (contract) {
      loadCases();
    }
  }, [contract]);

  return (
    <div>
      <h3>All Cases ({caseCount})</h3>
      {cases.map((c, i) => (
        <div key={i} style={{ border: "1px solid #aaa", padding: "10px", marginBottom: "10px" }}>
          <strong>Case #{c.id}</strong>
          <p>Description: {c.description}</p>
          <p>Category: {c.category}</p>
          <p>Verdict: {c.verdict}</p>
          <p>Status: {["Pending", "Resolved", "Appealed"][c.status]}</p>
          <p>Deadline: {new Date(c.deadline * 1000).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default CaseList;
